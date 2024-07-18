import { Colors } from "@/Colors";
import { Pressable, Text } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type TabProps = {
  title: string;
  active: SharedValue<boolean>;
  onSelect: () => void;
  onMeasure: (offset: number, width: number) => void;
};

export const Tab = ({ title, active, onSelect, onMeasure }: TabProps) => {
  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(active.value ? Colors.white : "#42413E"),
  }));
  return (
    <Pressable
      style={{
        paddingHorizontal: 12,
        borderRadius: 16,
      }}
      onPress={onSelect}
      onLayout={({
        nativeEvent: {
          layout: { x, width },
        },
      }) => void onMeasure(x, width)}>
      <Animated.Text
        style={[
          {
            fontSize: 17,
          },
          textStyle,
        ]}>
        {title}
      </Animated.Text>
    </Pressable>
  );
};
