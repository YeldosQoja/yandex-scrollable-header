import { useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  clamp,
  Extrapolation,
  interpolate,
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  HEADER_DELTA,
  HEADER_HEIGHT,
  TAB_PADDING,
  TABS_HEIGHT,
  TOPBAR_HEIGHT,
} from "@/constants";
import { Colors } from "@/Colors";
import { Tab } from "./Tab";

type TabsProps = {
  y: SharedValue<number>;
  tabs: string[];
  offsets: number[];
  isScrollAnimating: SharedValue<boolean>;
  selectedIndex: SharedValue<number>;
  onSelect: (index: number) => void;
};

type Measurement = {
  offset: number;
  width: number;
};

export const Tabs = ({
  y,
  tabs,
  offsets,
  selectedIndex,
  onSelect,
  isScrollAnimating,
}: TabsProps) => {
  const tabsView = useAnimatedRef<Animated.ScrollView>();
  const [measurements, setMeasurements] = useState<Measurement[]>(
    Array(offsets.length).fill({ offset: 0, width: 0 })
  );

  const x = useSharedValue(0);

  useDerivedValue(() => {
    if (!isScrollAnimating.value) {
      const scrollY = clamp(y.value, offsets[0], offsets[offsets.length - 1]);
      for (let i = 0; i < offsets.length; i++) {
        if (
          offsets[i] - 64 <= scrollY &&
          (i + 1 === offsets.length || scrollY < offsets[i + 1] - 64)
        ) {
          selectedIndex.value = i;
        }
      }
    }
  });

  useDerivedValue(() => {
    scrollTo(tabsView, measurements[selectedIndex.value].offset, 0, true);
  }, [measurements]);

  const maskedViewStyle = useAnimatedStyle(
    () => ({
      width: interpolate(
        selectedIndex.value,
        tabs.map((_, i) => i),
        measurements.map(({ width }) => width),
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: withTiming(
            interpolate(
              x.value - measurements[selectedIndex.value].offset - TAB_PADDING,
              [0, 100],
              [0, -100],
              Extrapolation.EXTEND
            ),
            {
              duration: 50,
            }
          ),
        },
      ],
    }),
    [tabs, measurements]
  );

  const tabsStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      y.value,
      [HEADER_DELTA - 24, HEADER_DELTA],
      [24, 0],
      Extrapolation.CLAMP
    );
    return {
      top: interpolate(
        y.value,
        [0, HEADER_DELTA],
        [HEADER_HEIGHT - TABS_HEIGHT, TOPBAR_HEIGHT],
        {
          extrapolateRight: Extrapolation.CLAMP,
        }
      ),
      borderTopStartRadius: borderRadius,
      borderTopEndRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  const handleMeasure = (index: number, { offset, width }: Measurement) => {
    setMeasurements(
      measurements.map((m, i) => {
        if (i === index) {
          return { offset: offset - TAB_PADDING, width };
        }
        return m;
      })
    );
  };

  return (
    <Animated.View style={[styles.container, tabsStyle]}>
      <Animated.View style={[styles.maskedView, maskedViewStyle]} />
      <Animated.ScrollView
        ref={tabsView}
        horizontal
        onScroll={({
          nativeEvent: {
            contentOffset: { x: value },
          },
        }) => {
          x.value = value;
        }}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}>
        {tabs.map((title, index) => {
          const active = useDerivedValue(() => {
            return selectedIndex.value === index;
          });
          return (
            <Tab
              key={index}
              title={title}
              active={active}
              onSelect={() => void onSelect(index)}
              onMeasure={(offset, width) =>
                void handleMeasure(index, { offset, width })
              }
            />
          );
        })}
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    height: TABS_HEIGHT + 12,
    backgroundColor: Colors.black,
  },
  maskedView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.gray,
    borderRadius: 16,
    top: 16,
    bottom: 16,
  },
});
