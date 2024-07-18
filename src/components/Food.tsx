import { Image, StyleSheet, Text, View } from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons";
import { Food as FoodModel } from "@/Food";
import { Colors } from "@/Colors";
import { CARD_WIDTH } from "@/constants";

type FoodProps = {
  food: FoodModel;
};

export const Food = ({ food }: FoodProps) => {
  const { name, price, calories, image } = food;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image}
      />
      <View style={{ margin: 4, flex: 1 }}>
        <Text style={styles.price}>{`₸${price}`}</Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 15,
            marginTop: 4,
          }}>
          {name}
        </Text>
        <Text style={styles.calories}>{`${calories} g`}</Text>
      </View>
      <View style={styles.button}>
        <Iconicons
          name="add-outline"
          size={22}
          color={Colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.darkGray,
    padding: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  image: {
    width: CARD_WIDTH - 10,
    height: (CARD_WIDTH - 10) * 0.9,
    borderRadius: 20,
    objectFit: "cover",
  },
  price: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  calories: {
    color: "#888784",
    fontSize: 14,
    marginVertical: 4,
  },
  button: {
    backgroundColor: Colors.gray,
    borderRadius: 20,
    padding: 6,
    alignItems: "center",
  },
});
