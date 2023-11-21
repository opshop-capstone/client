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
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants"; //현재 단말기의 시스템 정보를 불러오기 위함
const { manifest } = Constants;

const Contour = styled.View`
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.imgBackground};
`;
const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;

const PopularProducts = ({ navigation }) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    try {
      // 왜 response.data.result값이 undefined가 오는거지
      axios
        .get(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:3000/opshop/products`
        )

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
      <ItemContainer>
        <TouchableOpacity
          style={styles.activeButton}
          onPress={() => {
            setItemList(
              itemList.sort((a, b) => {
                b.like_count - a.like_count;
              })
            );
          }}
        >
          <Text style={styles.buttonText}>좋아요 순으로 정렬</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setItemList(
              itemList.sort((a, b) => {
                a.price - b.price;
              })
            );
          }}
        >
          <Text style={styles.buttonText}>가격 순으로 정렬</Text>
        </TouchableOpacity>
      </ItemContainer>
      <Contour />
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
    marginHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "grey",

    // 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
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
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
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
  activeButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PopularProducts;
