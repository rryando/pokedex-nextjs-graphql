import React from "react";
import styles from "../styles/Home.module.css";
import Cards from "../components/Cards/Cards";
import usePresenterPokemonAPI from "./api/PresenterPokemonAPI";
import { PokemonResultType } from "./api/ModelPokemon";

export default function Home() {
  const {
    pokemonData,
    getPokemonSpriteImageUrl,
    handleScroll,
    isMoreCardLoading,
  } = usePresenterPokemonAPI();

  return (
    <div className={styles.container}>
      <div className={styles.pokemonCardContainer} onScroll={handleScroll}>
        <div className={styles.pokemonCardGridWrapper}>
          {pokemonData.pokemons?.map((pokemon: PokemonResultType) => (
            <Cards
              id={pokemon.id}
              name={pokemon.name}
              imgUrl={getPokemonSpriteImageUrl(pokemon.id)}
              isLoading={false}
            />
          ))}

          {isMoreCardLoading &&
            [...Array(6)].map((_, index) => (
              <Cards
                id={index}
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
