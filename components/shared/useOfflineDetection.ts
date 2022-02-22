import React from "react";

export default function useOfflineDetection() {
  let [online, isOnline] = React.useState<boolean>(false);

  const setOnline = () => {
    isOnline(true);
  };
  const setOffline = () => {
    isOnline(false);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      isOnline(window.navigator.onLine);
    }

    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return {
    online,
  };
}
