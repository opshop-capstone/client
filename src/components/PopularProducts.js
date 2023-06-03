import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const PopularProducts = ({ navigation }) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    try {
      // 왜 response.data.result값이 undefined가 오는거지
      axios
        .get("http://opshop.shop:3000/opshop/products")

        .then(function (response) {
          const result = response.data.result;
          if (result) {
            setItemList(
              result.sort((a, b) => {
                b.like_count - a.like_count;
              })
            );
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log("error");
          alert(error);
        });
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      return () => {
        isMount = false;
      };
    }
  }, []);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Goods", { productId: item.product_id });
      }}
    >
      <View style={styles.card}>
        <View style={styles.likesContainer}>
          <Feather name="thumbs-up" size={20} color="black" />
          <Text style={styles.likesText}>{item.like_count}</Text>
        </View>
        <Image
          // source={require("../../assets/icon.png")}
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.storeName}>{item.store_name}</Text>
          <Text style={styles.price}>{item.price}원</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.styledText}>좋아요 순으로 정렬됩니다.</Text>
      <FlatList
        data={itemList}
        keyExtractor={(item) => item.product_id}
        renderItem={renderProductCard}
        initialNumToRender={10}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  likesText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  styledText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 15,
  },
  likesIcon: {
    width: 16,
    height: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  storeName: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "black",
  },
});

export default PopularProducts;
