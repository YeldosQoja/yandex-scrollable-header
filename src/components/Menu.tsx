import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Iconicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Food } from "./Food";
import { Detail } from "./Detail";
import { Colors } from "@/Colors";
import { foods } from "@/foods";
import {
  HEADER_DELTA,
  HEADER_HEIGHT,
  SEGMENTED_CONTROL_HEIGHT,
} from "../constants";

type MenuProps = {
  y: SharedValue<number>;
};

export const Menu = ({ y }: MenuProps) => {
  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [HEADER_DELTA / 3, HEADER_DELTA - 24],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const segmentedControlStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      y.value,
      [HEADER_DELTA - 24, HEADER_DELTA],
      [24, 0],
      Extrapolation.CLAMP
    );
    return {
      borderTopStartRadius: borderRadius,
      borderTopEndRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      transform: [
        {
          translateY: interpolate(
            y.value,
            [0, HEADER_DELTA],
            [0, -HEADER_DELTA],
            {
              extrapolateRight: Extrapolation.CLAMP,
            }
          ),
        },
      ],
    };
  });

  return (
    <>
      <Animated.ScrollView
        onScroll={({
          nativeEvent: {
            contentOffset: { y: value },
          },
        }) => {
          y.value = value;
        }}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.header, headerStyle]}>
          <Text style={styles.headerTitle}>Burger King</Text>
          <View style={styles.details}>
            <Detail
              {...{
                icon: (
                  <MaterialIcons
                    name="delivery-dining"
                    size={24}
                    color={Colors.white}
                    style={{ marginRight: 6 }}
                  />
                ),
                title: "30-40",
                extraText: "min",
              }}
            />
            <Detail
              {...{
                icon: (
                  <Iconicons
                    name="star"
                    size={18}
                    color={Colors.white}
                    style={{ marginRight: 6 }}
                  />
                ),
                title: "4.9",
                extraText: "200+",
              }}
            />
            <Detail
              icon={
                <Iconicons
                  name="ellipsis-horizontal"
                  color={Colors.white}
                  size={24}
                />
              }
            />
          </View>
        </Animated.View>
        <Animated.View style={styles.menu}>
          {foods.map((food) => (
            <View
              key={food.title}
              style={styles.section}>
              <Text style={styles.sectionTitle}>{food.title}</Text>
              <View style={styles.foods}>
                {food.items.map((food) => (
                  <Food
                    key={food.name}
                    food={food}
                  />
                ))}
              </View>
            </View>
          ))}
        </Animated.View>
      </Animated.ScrollView>
      <Animated.ScrollView
        horizontal
        style={[styles.segmentedControl, segmentedControlStyle]}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}>
        {foods.map(({ title }, index) => (
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: index === 0 ? "#42413E" : Colors.black,
            }}
            key={title}>
            <Text
              style={{
                fontSize: 17,
                color: index === 0 ? Colors.white : "#42413E",
              }}>
              {title}
            </Text>
          </Pressable>
        ))}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    height: HEADER_HEIGHT,
    padding: 12,
    paddingBottom: SEGMENTED_CONTROL_HEIGHT + 12,
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "600",
    marginBottom: 12,
  },
  details: {
    flexDirection: "row",
  },
  segmentedControl: {
    ...StyleSheet.absoluteFillObject,
    top: HEADER_HEIGHT - SEGMENTED_CONTROL_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    height: SEGMENTED_CONTROL_HEIGHT + 12,
    backgroundColor: Colors.black,
  },
  menu: {
    backgroundColor: Colors.black,
  },
  button: {
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  foods: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  section: {
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.white,
    marginVertical: 16,
  },
});
