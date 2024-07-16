import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/Colors";
import { HEADER_HEIGHT } from "@/constants";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type HeaderProps = {
  image: any;
  y: SharedValue<number>;
};

export const Header = ({ image, y }: HeaderProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          y.value,
          [0, -HEADER_HEIGHT],
          [1.1, 2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={image}
        style={styles.cover}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["transparent", Colors.black]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
