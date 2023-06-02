import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";

const StoreCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://placehold.it/300x150" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.storeName}>상점 이름</Text>
        <Text style={styles.storeNumber}>전화번호</Text>
        <Text style={styles.instagramId}>인스타그램 아이디</Text>
        <Text
          style={styles.storeAddress}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          매장주소
        </Text>
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
    height: "70%",
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
    color: "grey",
    fontSize: 16,
  },
});

export default StoreCard;
