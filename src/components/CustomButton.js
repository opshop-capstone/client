import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // 아이콘을 위한 패키지 import

const CustomButton = ({ onPress, iconName, title, containerStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle ? containerStyle : styles.squareButton}>
        <Icon name={iconName} size={24} color="white" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  squareButton: {
    width: 60, // 원하는 크기로 지정
    height: 60,
    borderRadius: 8,
    backgroundColor: "#727272",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
});

export default CustomButton;
