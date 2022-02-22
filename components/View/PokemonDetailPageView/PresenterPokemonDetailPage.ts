import React from "react";
import localForage from "localforage";
import { useRouter } from "next/router";
import {
  fetchPokemonDetailGraphql,
  PokemonDetailsResultsType,
} from "../../shared/ModelPokemon";
import useOfflineDetection from "../../../utils/useOfflineDetection";
import getValue from "../../../utils/localForageSync";

export default function usePresenterPokemonDetail() {
  const router = useRouter();
  const { pokemonName } = router.query;
  const { online } = useOfflineDetection();
  const [isError, setIsError] = React.useState(false);
  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetailsResultsType["result"][0]>();

  React.useEffect(() => {
    async function getPokemonDetailsFromStorage() {
      const storageFetchResponse = (await getValue("pokemonDetails")) || [];
      // @ts-ignore because value from localForage was misalign with type
      if (Boolean(storageFetchResponse[pokemonName])) {
        // @ts-ignore because value from localForage was misalign with type
        setPokemonDetails(storageFetchResponse[pokemonName]);
        return;
      } else {
        handleFetchPokemonDetailFromGraphQL();
        return;
      }
    }

    getPokemonDetailsFromStorage();
    // else do error handler on no pokemon name
  }, [pokemonName]);

  const handleFetchPokemonDetailFromGraphQL = async () => {
    setIsError(false);
    const fetchPokemonResult = await fetchPokemonDetailGraphql({
      name: pokemonName || "bulbasaur",
    });

    if (!fetchPokemonResult) {
      setIsError(true);
      return;
    }

    const storageFetchResponse = (await getValue("pokemonDetails")) || [];

    // @ts-ignore because value from localForage was misalign with type
    if (!storageFetchResponse[pokemonName]) {
      await localForage.setItem("pokemonDetails", {
        // @ts-ignore because value from localForage was misalign with type
        ...storageFetchResponse,
        // @ts-ignore because value from localForage was misalign with type
        [pokemonName]: fetchPokemonResult.result[0],
      });
    }

    setPokemonDetails(fetchPokemonResult.result[0]);
  };

  return {
    pokemonName,
    pokemonDetails,
    online,
    isError,
  };
}
