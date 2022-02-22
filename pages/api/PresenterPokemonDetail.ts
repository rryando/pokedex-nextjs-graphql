import React from "react";
import { useRouter } from "next/router";
import {
  fetchPokemonDetailGraphql,
  PokemonDetailsResultsType,
} from "./ModelPokemon";

export default function usePresenterPokemonDetail() {
  const router = useRouter();
  const { pokemonName } = router.query;
  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetailsResultsType["result"][0]>();

  React.useEffect(() => {
    if (pokemonName) {
      handleFetchPokemonDetailFromGraphQL();
    }
    // else do error handler on no pokemon name
  }, [pokemonName]);

  const handleFetchPokemonDetailFromGraphQL = async () => {
    const fetchPokemonResult = await fetchPokemonDetailGraphql({
      name: pokemonName || "",
    });

    setPokemonDetails(fetchPokemonResult.result[0]);
  };

  return {
    pokemonName,
    pokemonDetails,
  };
}
