import React from "react";
import styles from "./styles/HomePage.module.css";
import { Cards, BottomAlert } from "../../blocks";
import usePresenterHomePage from "./PresenterHomePage";
import { PokemonResultType } from "../../shared/ModelPokemon";
import { pokemonImageLoader } from "../../../utils/imageLoader";

export default function HomePageView() {
  const {
    pokemonData,
    handleScroll,
    isMoreCardLoading,
    isOfflineReady,
    isError,
  } = usePresenterHomePage();

  return (
    <div className={styles.container}>
      {isError && (
        <BottomAlert
          title={"something went wrong, on our End"}
          content={"please try again later"}
          bg={"red"}
        />
      )}

      <div
        className={styles.pokemonCardContainer}
        id={"scroll-container"}
        onScroll={handleScroll}
      >
        <div className={styles.pokemonCardGridWrapper}>
          {pokemonData.pokemons?.map(
            (pokemon: PokemonResultType, idx: number) => (
              <Cards
                key={idx}
                id={pokemon.id || 0}
                name={pokemon.name || ""}
                imgUrl={pokemonImageLoader(pokemon.id)}
                isLoading={false}
                offlineReady={isOfflineReady(pokemon.name || "")}
              />
            )
          )}

          {isMoreCardLoading &&
            [...Array(6)].map((_, index) => (
              <Cards
                id={index}
                key={index}
                name={"Loading..."}
                imgUrl={""}
                isLoading={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
