import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ShopCard = ({
  onPress,
  image,
  title,
  description,
  contactInformation,
  tel,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
        <Text style={styles.description}>{contactInformation}</Text>
        <Text style={styles.description}>{tel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 95,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 15,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    numberOfLines: 3,
    ellipsizeMode: "tail",
  },
});

export default ShopCard;
