import React from "react";
import styles from "../styles/Home.module.css";
import { Cards } from "../components";
import usePresenterPokemonAPI from "./api/PresenterPokemonAPI";
import { PokemonResultType } from "./api/ModelPokemon";

export default function Home() {
  const {
    pokemonData,
    getPokemonSpriteImageUrl,
    handleScroll,
    isMoreCardLoading,
    online,
    isOfflineReady,
  } = usePresenterPokemonAPI();

  return (
    <div className={styles.container}>
      {!online && (
        <div className={styles.pokemonCardContainer}>
          <h4>{"you are offline"}</h4>
        </div>
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
                imgUrl={getPokemonSpriteImageUrl(pokemon.id)}
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
