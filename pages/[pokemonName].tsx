import React from "react";
import Link from "next/link";
import styles from "../styles/PokemonDetails.module.css";
import usePresenterPokemonDetail from "./api/PresenterPokemonDetail";
import ScrollableTray from "../components/ScrollableTray/ScrollableTray";
import InlineContentList from "../components/InlineContentList/InlineContentList";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Timeline from "../components/Timeline/Timeline";

export default function PokemonDetailsView() {
  const { pokemonName, pokemonDetails } = usePresenterPokemonDetail();
  const [pokemonNameVarian, setPokemonNameVarian] = React.useState(pokemonName);

  const getPokemonDetailByName = (name: any = pokemonNameVarian) => {
    return pokemonDetails?.pokemons?.filter(
      (pokemon: any) => pokemon.name === name
    )[0];
  };

  function aboutSectionChildren(pokemonDetailName: any = pokemonName) {
    const {
      height = "unknown",
      weight = "unknown",
      id = "unknown",
      name = "unknown",
      abilities = [],
      types = [],
    } = getPokemonDetailByName(pokemonDetailName) || {};

    const abilityList = abilities?.map((ability: any) => {
      return <span style={{ marginRight: "8px" }}>{ability.ability.name}</span>;
    });

    const typeList = types?.map((type: any) => {
      return <span style={{ marginRight: "8px" }}>{type.type.name}</span>;
    });

    return (
      <div style={{ textAlign: "left" }}>
        <h4 className={styles.contentHead}>{"Description"}</h4>
        {pokemonDetails?.description.map((desc) => (
          <p className={styles.contentValue}>{desc.flavor_text}</p>
        ))}

        <h4 className={styles.contentHead}>{"About"}</h4>
        <InlineContentList title={"Height"} content={height} />
        <InlineContentList title={"Weight"} content={weight} />
        <InlineContentList title={"ID"} content={id} />
        <InlineContentList title={"Name"} content={name} />
        <InlineContentList title={"Abilities"} content={abilityList} />
        <InlineContentList title={"Types"} content={typeList} />
        <InlineContentList
          title={"Capture Rate"}
          content={pokemonDetails?.capture_rate}
        />
        <InlineContentList
          title={"Gender Rate"}
          content={pokemonDetails?.gender_rate}
        />
        <InlineContentList
          title={"Has Gender Difference"}
          content={pokemonDetails?.has_gender_differences.toString()}
        />
      </div>
    );
  }

  function statusSectionChildren(pokemonDetailName: any = pokemonName) {
    const { stats = [] } = getPokemonDetailByName(pokemonDetailName) || {};

    return (
      <div style={{ textAlign: "left" }}>
        <h4 className={styles.contentHead}>{"Status"}</h4>
        {stats?.map((stat: any) => (
          <ProgressBar title={stat.stat.name} value={stat.base_stat} />
        ))}
      </div>
    );
  }

  function evoSectionChildren() {
    const { pokemon = [] } = pokemonDetails?.evolution || { pokemon: [] };

    return (
      <>
        <h4 className={styles.contentHead}>{"Evolution Timeline"}</h4>
        <Timeline content={pokemon} />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pokemonDetailsTopNav}>
        <div
          className={styles.pokemonDetailsTopNavLeft}
          onClick={() => console.log("click")}
        >
          <Link href="/">
            <div style={{ cursor: "pointer" }}>
              <i className={`${styles.arrow} ${styles.left}`}></i>
              {"Back"}
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.pokemonCardContainer}> </div>
      <div className={styles.pokemonDetailsBG}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            pokemonDetails?.id || 0
          }.png`}
          loading={"lazy"}
          className={styles.pokemonDetailsImage}
        />
      </div>
      <ScrollableTray
        aboutSectionTitle={"About"}
        statusSectionTitle={"Status"}
        evolutionSectionTitle={"Evolution"}
        aboutSection={aboutSectionChildren(pokemonNameVarian)}
        statusSection={statusSectionChildren(pokemonNameVarian)}
        evolutionSection={evoSectionChildren()}
      />
    </div>
  );
}
