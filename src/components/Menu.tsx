import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import { HEADER_DELTA, HEADER_HEIGHT, TABS_HEIGHT } from "@/constants";
import { Menu as MenuModel } from "@/Food";

type MenuProps = {
  y: SharedValue<number>;
  menu: MenuModel;
  onMeasure: (index: number, offset: number) => void;
};

export const Menu = ({ y, menu, onMeasure }: MenuProps) => {
  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [HEADER_DELTA / 3, HEADER_DELTA - 24],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <>
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
        {menu.map((food, index) => (
          <View
            key={food.title}
            style={styles.section}
            onLayout={({
              nativeEvent: {
                layout: { y },
              },
            }) => void onMeasure(index, y + HEADER_DELTA + 1)}>
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
    paddingBottom: TABS_HEIGHT + 12,
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
  menu: {
    backgroundColor: Colors.black,
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
