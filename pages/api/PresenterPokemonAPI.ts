import React from "react";
import localForage from "localforage";
import {
  fetchPokemonGraphql,
  RequestPagination,
  PokemonResultsType,
} from "./ModelPokemon";
import { debounce } from "../../utils/debounce";
import useOfflineDetection from "../../utils/useOfflineDetection";
import getValue from "../../utils/localForageSync";

const MAX_PAGE_LIMIT_PER_LOAD = 20;

export default function usePresenterPokemonAPI() {
  const { online } = useOfflineDetection();
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

  // on mount, initial load pokemon
  React.useEffect(() => {
    async function getPokemonDataFromStorage() {
      const storageFetchResponse = await getValue("pokemonDetails");
      const pokemonData = await getValue("pokemonData");

      if (pokemonData) {
        // @ts-ignore
        setPokemonData({ pokemons: pokemonData });
        setPagination({
          // @ts-ignore
          offset: pokemonData.length,
          limit: MAX_PAGE_LIMIT_PER_LOAD,
          // @ts-ignore
          count: pokemonData.length,
        });
      } else {
        triggerFetch();
      }

      console.log(storageFetchResponse);
      // @ts-ignore
      setOfflinePokemonList(storageFetchResponse);
    }

    getPokemonDataFromStorage();
  }, []);

  const triggerFetch = () => {
    handleFetchPokemonFromGraphQL(pagination);
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

  const handleFetchPokemonFromGraphQL = async (payload: RequestPagination) => {
    const fetchPokemonResult = await fetchPokemonGraphql(payload);
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
      count: pokemonData.pokemons.length + fetchPokemonResult.pokemons.length,
    }));

    setIsMoreCardLoading(false);
  };

  const getPokemonSpriteImageUrl = (pokemonId: Number = 1) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      pokemonId || 1
    }.png`;
  };

  const isOfflineReady = (pokemonName: string) => {
    // @ts-ignore
    return Boolean(offlinePokemonList[pokemonName]);
  };

  return {
    pokemonData,
    getPokemonSpriteImageUrl,
    triggerFetch,
    handleScroll,
    isMoreCardLoading,
    online,
    isOfflineReady,
  };
}
