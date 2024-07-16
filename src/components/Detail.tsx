import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/Colors";

type DetailProps = {
  title?: string;
  extraText?: string;
  icon: ReactNode;
};

export const Detail = ({ title, extraText, icon }: DetailProps) => {
  return (
    <View style={styles.container}>
      {icon}
      <View>
        {title && <Text style={styles.title}>{title}</Text>}
        {extraText && <Text style={styles.text}>{extraText}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: Colors.gray,
    borderRadius: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "600",
  },
  text: {
    fontSize: 13,
    color: Colors.white,
  },
});
