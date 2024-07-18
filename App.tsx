import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { images } from "@/menu";
import Screen from "@/Screen";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Asset.loadAsync(images);
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Screen />
    </>
  );
}
