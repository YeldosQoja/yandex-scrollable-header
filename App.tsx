import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import { TopBar, Header, Menu } from "@/components";
import { Colors } from "@/Colors";
import { foods } from "@/foods";
import { useSharedValue } from "react-native-reanimated";

const image = require("./assets/cover.jpg");

export default function App() {
  const [ready, setReady] = useState(false);
  const y = useSharedValue(0);

  useEffect(() => {
    (async () => {
      await Asset.loadAsync([
        image,
        ...foods
          .map((food) => food.items)
          .flat()
          .map(({ image }) => image),
      ]);
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header {...{ y, image }} />
      <Menu {...{ y }}/>
      <TopBar {...{ y }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
