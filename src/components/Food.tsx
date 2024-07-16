import { Image, Text, View } from "react-native";
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
    <View
      style={{
        width: CARD_WIDTH,
        backgroundColor: Colors.darkGray,
        padding: 5,
        borderRadius: 20,
        marginBottom: 8,
      }}>
      <Image
        style={{
          width: CARD_WIDTH - 10,
          height: (CARD_WIDTH - 10) * 0.9,
          borderRadius: 20,
          objectFit: "cover",
        }}
        source={image}
      />
      <View style={{ margin: 4, flex: 1 }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            fontWeight: "600",
            marginTop: 6,
          }}>{`₸${price}`}</Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 15,
            marginTop: 4,
          }}>
          {name}
        </Text>
        <Text
          style={{
            color: "#888784",
            fontSize: 14,
            marginVertical: 4,
          }}>{`${calories} g`}</Text>
      </View>
      <View
        style={{
          backgroundColor: "#42413E",
          borderRadius: 20,
          padding: 6,
          alignItems: "center",
        }}>
        <Iconicons
          name="add-outline"
          size={22}
          color={Colors.white}
        />
      </View>
    </View>
  );
};
