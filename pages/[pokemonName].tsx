import React from "react";
import PokemonDetailPageView from "../components/View/PokemonDetailPageView";
import { OnlineContext } from "../components/shared/OnlineContext";
import useOfflineDetection from "../components/shared/useOfflineDetection";
import { BottomAlert } from "../components/blocks";

export default function PokemonDetailPage() {
  const { online } = useOfflineDetection();

  return (
    <OnlineContext.Provider value={online}>
      <PokemonDetailPageView />
      {!online && (
        <BottomAlert
          title="You are offline"
          content="Please check your internet connection"
        />
      )}
    </OnlineContext.Provider>
  );
}
