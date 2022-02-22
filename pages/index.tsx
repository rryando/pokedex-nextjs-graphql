import React from "react";
import HomePageView from "../components/View/HomePageView";
import { OnlineContext } from "../components/shared/OnlineContext";
import useOfflineDetection from "../components/shared/useOfflineDetection";
import { BottomAlert } from "../components/blocks";

export default function HomePage() {
  const { online } = useOfflineDetection();

  return (
    <OnlineContext.Provider value={online}>
      <HomePageView />
      {!online && (
        <BottomAlert
          title="You are offline"
          content="Please check your internet connection"
        />
      )}
    </OnlineContext.Provider>
  );
}
