import React from "react";
import Link from "next/link";
import styles from "./styles/PokemonDetails.module.css";
import usePresenterPokemonDetail from "./PresenterPokemonDetailPage";
import {
  ScrollableTray,
  InlineContentList,
  ProgressBar,
  Timeline,
  Overlay,
} from "../../blocks";

import {
  imageLoader,
  pokemonImageLoader,
  ImageWrapper,
} from "../../../utils/imageLoader";

export default function PokemonDetailsView() {
  const { pokemonName, pokemonDetails, online, isError } =
    usePresenterPokemonDetail();

  const getPokemonDetailByName = (name: any = pokemonName) => {
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

    const abilityList = abilities?.map((ability: any, idx: number) => {
      return (
        <span key={idx} style={{ marginRight: "8px" }}>
          {ability.ability.name}
        </span>
      );
    });

    const typeList = types?.map((type: any, idx: number) => {
      return (
        <span key={idx} style={{ marginRight: "8px" }}>
          {type.type.name}
        </span>
      );
    });

    return (
      <div style={{ textAlign: "left" }}>
        <h4 className={styles.contentHead}>{"Description"}</h4>
        {pokemonDetails?.description.map((desc, idx: number) => (
          <p key={idx} className={styles.contentValue}>
            {desc.flavor_text}
          </p>
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
        {stats?.map((stat: any, idx: number) => (
          <ProgressBar
            key={idx}
            title={stat.stat.name}
            value={stat.base_stat}
          />
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
    <div className={styles.container} id={"pokemonDetailBG"}>
      {isError && (
        <Overlay
          title={"something went wrong, is your internet connection working?"}
          content={"if you want to browse offline, click anywhere to dismiss"}
        />
      )}
      <div className={styles.pokemonDetailsTopNav}>
        <div className={styles.pokemonDetailsTopNavLeft}>
          <Link href="/">
            <div style={{ cursor: "pointer" }}>
              <i className={`${styles.arrow} ${styles.left}`}></i>
              {"Back"}
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.pokemonDetailsBG}>
        {!online && (
          <h4
            className={styles.contentHead}
            style={{ marginBottom: "20px" }}
            id={"offline-details-text"}
          >
            {"You're Offline"}
          </h4>
        )}
        <ImageWrapper
          loader={() => pokemonImageLoader(pokemonDetails?.id)}
          src={imageLoader()}
          loading={"lazy"}
          className={styles.pokemonDetailsImage}
          width={300}
          height={300}
        />
      </div>
      <ScrollableTray
        aboutSectionTitle={"About"}
        statusSectionTitle={"Status"}
        evolutionSectionTitle={"Evolution"}
        aboutSection={aboutSectionChildren(pokemonName)}
        statusSection={statusSectionChildren(pokemonName)}
        evolutionSection={evoSectionChildren()}
      />
    </div>
  );
}
