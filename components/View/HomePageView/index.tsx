import React from "react";
import styles from "./styles/HomePage.module.css";
import { Cards, Overlay } from "../../blocks";
import usePresenterHomePage from "./PresenterHomePage";
import { PokemonResultType } from "../../shared/ModelPokemon";
import { pokemonImageLoader } from "../../../utils/imageLoader";

export default function HomePageView() {
  const {
    pokemonData,
    handleScroll,
    isMoreCardLoading,
    online,
    isOfflineReady,
    isError,
  } = usePresenterHomePage();

  return (
    <div className={styles.container}>
      {!online && (
        <div className={styles.pokemonCardContainer}>
          <h4>{"you are offline"}</h4>
        </div>
      )}

      {isError && (
        <Overlay
          title={"something went wrong, is your internet connection working?"}
          content={"if you want to browse offline, click anywhere to dismiss"}
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
                id={pokemon.id}
                name={pokemon.name}
                imgUrl={pokemonImageLoader(pokemon.id)}
                isLoading={false}
                offlineReady={isOfflineReady(pokemon.name)}
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
