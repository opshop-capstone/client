import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";

const StoreCard = ({ image, title, description, contactInformation, tel }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.storeName}>{title}</Text>
        <Text style={styles.storeNumber}>{tel}</Text>
        <Text style={styles.instagramId}>{contactInformation}</Text>
        <Text style={styles.storeAddress}>{description}</Text>
        {/* <Button title="상점 구독하기" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    marginHorizontal: 15,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 10,
  },
  imageContainer: {
    height: "60%",
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  storeNumber: {
    fontSize: 16,
    marginBottom: 4,
  },
  instagramId: {
    fontSize: 16,
  },
  storeAddress: {
    margin: 5,
    color: "grey",
    fontSize: 14,
  },
});

export default StoreCard;
