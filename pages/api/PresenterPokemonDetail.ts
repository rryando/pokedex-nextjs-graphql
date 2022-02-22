import React from "react";
import localForage from "localforage";
import { useRouter } from "next/router";
import {
  fetchPokemonDetailGraphql,
  PokemonDetailsResultsType,
} from "./ModelPokemon";
import useOfflineDetection from "../../utils/useOfflineDetection";
import getValue from "../../utils/localForageSync";

export default function usePresenterPokemonDetail() {
  const router = useRouter();
  const { pokemonName } = router.query;
  const { online } = useOfflineDetection();
  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetailsResultsType["result"][0]>();

  React.useEffect(() => {
    async function getPokemonDetailsFromStorage() {
      const storageFetchResponse = await getValue("pokemonDetails");
      // @ts-ignore
      if (Boolean(storageFetchResponse[pokemonName])) {
        // @ts-ignore
        setPokemonDetails(storageFetchResponse[pokemonName]);
        return;
      } else {
        handleFetchPokemonDetailFromGraphQL();
      }
    }

    getPokemonDetailsFromStorage();
    // else do error handler on no pokemon name
  }, [pokemonName]);

  const handleFetchPokemonDetailFromGraphQL = async () => {
    const fetchPokemonResult = await fetchPokemonDetailGraphql({
      name: pokemonName || "bulbasaur",
    });

    setPokemonDetails(fetchPokemonResult.result[0]);

    localForage.getItem("pokemonDetails", (err, value: any) => {
      if (err) {
        console.log("error", err);
      }
      // @ts-ignore because value can't be set to type
      if (!value[pokemonName]) {
        localForage.setItem("pokemonDetails", {
          ...value,
          // @ts-ignore
          [pokemonName]: fetchPokemonResult.result[0],
        });
      }
    });
  };

  return {
    pokemonName,
    pokemonDetails,
    online,
  };
}
