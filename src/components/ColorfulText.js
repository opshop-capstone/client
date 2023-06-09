import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ColorfulText = ({ value }) => {
  let textColor;
  let status;
  switch (value) {
    case "PREPARE":
      textColor = "blue";
      status = "배송 준비 중";
      break;
    case "DELIVERING":
      textColor = "green";
      status = "배송 중";

      break;
    case "DELIVERD":
      textColor = "black";
      status = "배송 완료";

      break;
    case "CANCELING":
      textColor = "red";
      status = "주문 취소 중";

      break;
    case "CANCELED":
      textColor = "orange";
      status = "취소완료";

      break;

    default:
      textColor = "black";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 50,
    // width: 50,
    // borderRadius: 25,
    // backgroundColor: "lightgray",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ColorfulText;
