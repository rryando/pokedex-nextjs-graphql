import React from "react";
import localForage from "localforage";
import {
  fetchPokemonGraphql,
  RequestPagination,
  PokemonResultsType,
} from "../../shared/ModelPokemon";
import { debounce } from "../../../utils/debounce";
import getValue from "../../../utils/localForageSync";

// limit per fetch for pagination
const MAX_PAGE_LIMIT_PER_LOAD = 20;

export default function usePresenterHomePage() {
  const [pagination, setPagination] = React.useState<RequestPagination>({
    offset: 0,
    limit: MAX_PAGE_LIMIT_PER_LOAD,
    count: 0,
  });

  const [pokemonData, setPokemonData] = React.useState<PokemonResultsType>({
    pokemons: [],
  });
  const [offlinePokemonList, setOfflinePokemonList] = React.useState([]);
  const [isMoreCardLoading, setIsMoreCardLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // on mount, initial load pokemon
  React.useEffect(() => {
    // fetch data from localForage
    async function getPokemonDataFromStorage() {
      const storageFetchResponse = await getValue("pokemonDetails");
      const pokemonData = await getValue("pokemonData");
      if (pokemonData) {
        // @ts-ignore because value from localForage was misalign with type
        setPokemonData({ pokemons: pokemonData });
        // update pagination so no need to load more if localForage has data
        setPagination({
          // @ts-ignore because value from localForage was misalign with type
          offset: pokemonData.length,
          limit: MAX_PAGE_LIMIT_PER_LOAD,
          // @ts-ignorebecause value from localForage was misalign with type
          count: pokemonData.length,
        });
      } else {
        triggerFetch();
      }
      // @ts-ignore because value from localForage was misalign with type
      if (storageFetchResponse) setOfflinePokemonList(storageFetchResponse);
    }

    getPokemonDataFromStorage();
  }, []);

  // wrapper for fetching data from graphql
  const triggerFetch = () => {
    handleFetchPokemonFromGraphQL(pagination);
  };

  // fetch data from API
  const handleFetchPokemonFromGraphQL = async (payload: RequestPagination) => {
    setIsError(false);
    setIsMoreCardLoading(false);
    const fetchPokemonResult = await fetchPokemonGraphql(payload);

    if (!fetchPokemonResult) {
      setIsError(true);
      return;
    }

    setPokemonData((prevState: PokemonResultsType) => {
      const pokemonData = [
        ...prevState.pokemons,
        ...fetchPokemonResult.pokemons,
      ];
      localForage.setItem("pokemonData", pokemonData);

      return { pokemons: pokemonData };
    });

    setPagination((prevState: RequestPagination) => ({
      offset: prevState.offset + prevState.limit,
      limit: prevState.limit,
      count: pokemonData?.pokemons.length + fetchPokemonResult.pokemons.length,
    }));

    setIsMoreCardLoading(false);
  };

  const handleScroll = debounce((e: any) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    // do nothing if count is max
    if (pagination.count < pagination.offset) return;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsMoreCardLoading(true);
      triggerFetch();
    }
  }, 250);

  const isOfflineReady = (pokemonName: string) => {
    // @ts-ignore
    return Boolean(offlinePokemonList[pokemonName]);
  };

  return {
    pokemonData,
    triggerFetch,
    handleScroll,
    isMoreCardLoading,
    isOfflineReady,
    isError,
  };
}
