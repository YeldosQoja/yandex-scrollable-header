import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header, Menu, Tabs, TopBar } from "@/components";
import { useSharedValue } from "react-native-reanimated";
import { Colors } from "@/Colors";
import { menu } from "@/menu";

const image = require("../assets/cover.jpg");

export default function () {
  const scrollView = useRef<ScrollView>(null);
  const [offsets, setOffsets] = useState<number[]>(Array(menu.length).fill(0));

  const y = useSharedValue(0);
  const isScrollAnimating = useSharedValue(false);
  const selectedIndex = useSharedValue(0);

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

  const handleSelect = (index: number) => {
    selectedIndex.value = index;
    if (scrollView.current) {
      isScrollAnimating.value = true;
      scrollView.current.scrollTo({ y: offsets[index] });
    }
  };
  return (
    <View style={styles.container}>
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
          isScrollAnimating.value = false;
        }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.absoluteFill}>
        <Menu
          {...{
            y,
            menu,
            onMeasure: handleMeasure,
          }}
        />
      </ScrollView>
      <Tabs
        {...{
          y,
          offsets,
          onSelect: handleSelect,
          selectedIndex,
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
