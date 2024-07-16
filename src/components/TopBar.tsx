import { StyleSheet, Text, View } from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/Colors";
import Contants from "expo-constants";
import { HEADER_DELTA, TOPBAR_HEIGHT } from "@/constants";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const ICON_SIZE = 30;

type TopBarProps = {
  y: SharedValue<number>;
};

export const TopBar = ({ y }: TopBarProps) => {
  const containerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [HEADER_DELTA - 48, HEADER_DELTA],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: y.value < HEADER_DELTA ? 0 : 1,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    backgroundColor: y.value < HEADER_DELTA ? "#42413E" : Colors.black,
  }));

  const backIconStyle = useAnimatedStyle(() => ({
    left: interpolate(
      y.value,
      [HEADER_DELTA - 48, HEADER_DELTA],
      [12, 0],
      Extrapolation.CLAMP
    ),
  }));

  const favoriteIconStyle = useAnimatedStyle(() => ({
    right: interpolate(
      y.value,
      [HEADER_DELTA - 48, HEADER_DELTA],
      [ICON_SIZE + 24, ICON_SIZE],
      Extrapolation.CLAMP
    ),
  }));

  const searchIconStyle = useAnimatedStyle(() => ({
    right: interpolate(
      y.value,
      [HEADER_DELTA - 48, HEADER_DELTA],
      [12, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: Colors.black },
          containerStyle,
        ]}
      />
      <Animated.View style={[styles.icon, iconStyle, backIconStyle]}>
        <Iconicons
          size={22}
          color="white"
          name="arrow-back-outline"
        />
      </Animated.View>
      <Animated.Text style={[styles.title, titleStyle]}>
        Burger King
      </Animated.Text>
      <Animated.View style={[styles.icon, iconStyle, favoriteIconStyle]}>
        <Iconicons
          size={22}
          color="white"
          name="heart-outline"
        />
      </Animated.View>
      <Animated.View style={[styles.icon, iconStyle, searchIconStyle]}>
        <Iconicons
          size={22}
          color="white"
          name="search-outline"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Contants.statusBarHeight,
    height: Contants.statusBarHeight + TOPBAR_HEIGHT,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE * 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
