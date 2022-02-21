import axios from "axios";

const POKE_API_URL = "https://pokeapi.co/api/v2";
const BETA_POKE_GRAPHQL_URL = "https://beta.pokeapi.co/graphql/v1beta";

export function fetchPokemon() {
  return fetch(`${POKE_API_URL}/pokemon`).then((res) => res.json());
}

export const getPokemonGraphQLPayload = (
  limit: number = 100,
  offset: number = 100
) => {
  return `query getPokemons {
    pokemons: pokemon_v2_pokemonspecies(
      limit: ${limit}
      offset: ${offset}
      order_by: {id: asc}
      ) {
        id
        name
    }
  }`;
};

export function fetchPokemonGraphql(req?: RequestPagination) {
  let payload: any = getPokemonGraphQLPayload();
  if (req) payload = getPokemonGraphQLPayload(req.limit, req.offset);

  return axios({
    url: BETA_POKE_GRAPHQL_URL,
    method: "POST",
    data: {
      query: payload,
    },
  }).then((response) => {
    return response.data.data;
  });
}

export type RequestPagination = {
  limit: number;
  offset: number;
  count: number;
};

export type PokemonResultType = {
  id: number;
  name: string;
};

export type PokemonResultsType = {
  pokemons: PokemonResultType[] | [];
};
