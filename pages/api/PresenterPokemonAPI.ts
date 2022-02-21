import React from "react";
import {
  fetchPokemonGraphql,
  RequestPagination,
  PokemonResultsType,
} from "./ModelPokemon";
import { debounce } from "../../utils/debounce";

const MAX_PAGE_LIMIT_PER_LOAD = 20;

export default function usePresenterPokemonAPI() {
  const [pagination, setPagination] = React.useState<RequestPagination>({
    offset: 0,
    limit: MAX_PAGE_LIMIT_PER_LOAD,
    count: 0,
  });

  const [pokemonData, setPokemonData] = React.useState<PokemonResultsType>({
    pokemons: [],
  });

  const [isMoreCardLoading, setIsMoreCardLoading] = React.useState(false);

  // on mount, initial load pokemon
  React.useEffect(() => {
    triggerFetch();
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
    setPokemonData((prevState: PokemonResultsType) => ({
      pokemons: [...prevState.pokemons, ...fetchPokemonResult.pokemons],
    }));

    setPagination((prevState: RequestPagination) => ({
      offset: prevState.offset + prevState.limit,
      limit: prevState.limit,
      count: pokemonData.pokemons.length + fetchPokemonResult.pokemons.length,
    }));

    setIsMoreCardLoading(false);
  };

  const getPokemonSpriteImageUrl = (pokemonId: Number = 1) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  return {
    pokemonData,
    getPokemonSpriteImageUrl,
    triggerFetch,
    handleScroll,
    isMoreCardLoading,
  };
}
