import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { useSharedValue } from "react-native-reanimated";
import { TopBar, Header, Menu, Tabs } from "@/components";
import { Colors } from "@/Colors";
import { menu } from "@/foods";

const image = require("./assets/cover.jpg");

export default function App() {
  const [ready, setReady] = useState(false);
  const scrollView = useRef<ScrollView>(null);
  const [offsets, setOffsets] = useState<number[]>(Array(menu.length).fill(0));

  const y = useSharedValue(0);
  const selectedIndex = useSharedValue(0);
  const isScrollAnimating = useSharedValue(false);

  useEffect(() => {
    (async () => {
      await Asset.loadAsync([
        image,
        ...menu
          .map((food) => food.items)
          .flat()
          .map(({ image }) => image),
      ]);
      setReady(true);
    })();
  }, []);

  const handleMeasure = (index: number, offset: number) => {
    setOffsets(
      offsets.map((o, i) => {
        if (index === i) {
          return offset;
        }
        return o;
      })
    );
  };

  if (!ready) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header {...{ y, image }} />
      <ScrollView
        ref={scrollView}
        onScroll={({
          nativeEvent: {
            contentOffset: { y: value },
          },
        }) => {
          y.value = value;
        }}
        onMomentumScrollEnd={() => {
          console.log("onScrollAnimationEnd");
          isScrollAnimating.value = false;
        }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.absoluteFill}>
        <Menu
          y={y}
          onMeasure={handleMeasure}
          menu={menu}
        />
      </ScrollView>
      <Tabs
        {...{
          y,
          selectedIndex,
          offsets,
          scrollView,
          isScrollAnimating,
          tabs: menu.map(({ title }) => title),
        }}
      />
      <TopBar y={y} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
