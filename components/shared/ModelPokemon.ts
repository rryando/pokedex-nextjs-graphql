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

export const getPokemonDetailGraphQLPayload = (
  payload: RequestPokemonDetailName
) => {
  return `query getPokemonDetail {
    result: pokemon_v2_pokemonspecies(limit: 1 where: {name: { _eq: \"${payload.name}\" }}) {
      id
      name
      description: pokemon_v2_pokemonspeciesflavortexts(limit: 1, order_by: {}) {
        flavor_text
      }
      gender_rate
      has_gender_differences
      capture_rate
      evolution: pokemon_v2_evolutionchain {
        pokemon: pokemon_v2_pokemonspecies {
          name
          id
          evolutions: pokemon_v2_pokemonevolutions {
            min_level
            min_affection
            min_beauty
            min_happiness
            gender_id
            time_of_day
            move: pokemon_v2_move {
              name
            }
            by_held_item: pokemonV2ItemByHeldItemId {
              name
            }
            item: pokemon_v2_item {
              name
            }
            evolution_trigger: pokemon_v2_evolutiontrigger {
              name
            }
            location: pokemon_v2_location {
              name
            }
          }
        }
      }
      egg_groups: pokemon_v2_pokemonegggroups {
            group: pokemon_v2_egggroup {
              name
            }
          }
      pokemons: pokemon_v2_pokemons {
            id
            name
            height
            weight
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
              }
            }
            abilities: pokemon_v2_pokemonabilities {
              ability: pokemon_v2_ability {
                name
              }
            }
            stats: pokemon_v2_pokemonstats {
              base_stat
              stat: pokemon_v2_stat {
                name
              }
            }
          }
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
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
}

export function fetchPokemonDetailGraphql(req: RequestPokemonDetailName) {
  const payload: any = getPokemonDetailGraphQLPayload({ name: req.name });

  return axios({
    url: BETA_POKE_GRAPHQL_URL,
    method: "POST",
    data: {
      query: payload,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
}

export type RequestPagination = {
  limit: number;
  offset: number;
  count: number;
};

export type RequestPokemonDetailName = {
  name: string | string[];
};

export type PokemonResultType = {
  id: number;
  name: string;
};

export type PokemonResultsType = {
  pokemons: PokemonResultType[] | [];
};

export type PokemonDescriptionType = {
  flavor_text: string;
};

export type PokemonEvolutionType = {
  min_level: number | string | null;
  min_affection: number | string | null;
  min_beauty: number | string | null;
  min_happiness: number | string | null;
  gender_id: number | string | null;
  time_of_day: string;
  move: number | string | null;
  by_held_item: number | string | null;
  item: number | string | null;
  evolution_trigger: {
    name: string | null;
  } | null;
  location: number | string | null;
};

export type PokemonEggGroupType = {
  group: {
    name: string | null;
  };
};

export type PokemonDetailTypeNameType = {
  type: {
    name: string | null;
  };
};

export type PokemonDetailAbilityNametype = {
  ability: {
    name: string | null;
  };
};

export type PokemonDetailStatType = {
  base_stat: number | string | null;
  stat: {
    name: string | null;
  };
};

export type PokemonDetailsDataType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonDetailTypeNameType[] | [] | null;
  abilities: PokemonDetailAbilityNametype[] | [] | null;
  stats: PokemonDetailStatType[] | [] | null;
};

export type PokemonDetailResultDataType = {
  id: number;
  name: string;
  description: PokemonDescriptionType[] | [];
  gender_rate: number;
  has_gender_differences: boolean;
  capture_rate: number;
  evolution: {
    pokemon: PokemonEvolutionType[] | [] | null;
  };
  egg_groups: PokemonEggGroupType[] | [] | null;
  pokemons: PokemonDetailsDataType[] | [] | null;
};

export type PokemonDetailsResultsType = {
  result: PokemonDetailResultDataType[] | [];
};
