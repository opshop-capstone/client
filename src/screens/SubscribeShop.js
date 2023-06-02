import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, ItemCard } from "../components";
import axios from "axios";
import { ProgressContext, UserContext } from "../contexts";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

const SUBSCRIBED_STORES = [
  { id: 1, name: "상점1", imageUrl: "https://placehold.it/150x150" },
  { id: 2, name: "상점2", imageUrl: "https://placehold.it/150x150" },
  { id: 3, name: "상점3", imageUrl: "https://placehold.it/150x150" },
  { id: 4, name: "상점4", imageUrl: "https://placehold.it/150x150" },
  { id: 5, name: "상점5", imageUrl: "https://placehold.it/150x150" },
];

const SubscribeShop = ({ navigation }) => {
  const [showNewProducts, setShowNewProducts] = useState(true);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(1);

  const { spinner } = useContext(ProgressContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/mypage/liked",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;

          if (result) {
            setLikedProducts(result);
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
  }, [refresh]);

  // useEffect(() => {
  //   try {
  //     axios({
  //       method: "get",
  //       url: "http://opshop.shop:3000/opshop/mypage/subscribe",
  //       headers: {
  //         "x-access-token": `${user?.jwt}`,
  //       },
  //     })
  //       .then(function (response) {
  //         const result = response.data.result;

  //         if (result) {
  //           console.log("result");
  //           console.log(result);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         console.log("error");
  //         alert(error);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //     alert(e);
  //   } finally {
  //     return () => {
  //       isMount = false;
  //     };
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subscribedStoresContainer}>
        <Text style={styles.newProductsTitle}>내가 구독한 상점 </Text>
        <FlatList
          data={SUBSCRIBED_STORES}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.storeItemContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.storeItemImage}
              />
              <Text style={styles.storeItemName}>{item.name}ㅇㅇ</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, showNewProducts && styles.activeTab]}
          onPress={() => setShowNewProducts(true)}
        >
          찜한 상품
        </Text>
        <Text
          style={[styles.tab, !showNewProducts && styles.activeTab]}
          onPress={() => setShowNewProducts(false)}
        >
          신상품
        </Text>
      </View>

      <View style={styles.newProductsContainer}>
        <ScrollView>
          <View style={styles.itemContainer}>
            {showNewProducts ? (
              <>
                <Text style={styles.newProductsTitle}>
                  내가 찜한 상품을 확인해보세요!
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    spinner.start();
                    setRefresh(!refresh);
                    setTimeout(() => {
                      spinner.stop();
                    }, 300);
                  }}
                >
                  <View style={styles.refreshButton}>
                    <Ionicons name="refresh" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.newProductsTitle}>
                구독한 매장의 신상품을 확인해보세요!
              </Text>
            )}
            {showNewProducts
              ? likedProducts.map((product, i) => (
                  <View key={product.id} style={styles.newProductItemContainer}>
                    <ItemCard
                      key={i}
                      onPress={() => {
                        navigation.navigate("Goods", {
                          productId: product.product_id,
                        });
                      }}
                      url={product.product_thumbnail}
                      productTitle={product.title}
                      shopName={product.store_name}
                      price={product.price.toLocaleString() + "원"}
                    />
                  </View>
                ))
              : [1, 2, 3, 4, 5, 6].map((a, i) => {
                  return (
                    <ItemCard
                      key={i}
                      url="https://ifh.cc/g/M2TJZp.png"
                      onPress={() => {
                        navigation.navigate("Goods", { productId: i });
                      }}
                    />
                  );
                })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  subscribedStoresContainer: {
    height: 100,
    marginBottom: 16,
  },
  storeItemContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  storeItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    height: 60,
    borderRadius: 30,
  },
  storeItemName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  newProductsContainer: {
    flex: 1,
  },
  newProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  newProductItemContainer: {
    marginRight: 16,
    width: 150,
    height: 200,
  },
  newProductItemImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  newProductItemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    height: 50,
    width: "90%",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#d9d9d9",
    fontSize: 18,
  },
  activeTab: {
    color: "black",
  },
  content: {
    flex: 1,
  },
  tabContent: {
    width: "45%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "auto",
    flexWrap: "wrap",
  },
  refreshButton: {
    width: 30,
    height: 30,
    backgroundColor: "black",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SubscribeShop;
