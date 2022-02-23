import React from "react";
import { Overlay } from "../components/blocks";

export default function offlineMode() {
  return (
    <div>
      <Overlay
        title={"OFFLINE: No internet connection detected"}
        content={"your activity may be limited"}
      />
    </div>
  );
}
