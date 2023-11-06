import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import ItemCard from "./ItemCard";
import { ProgressContext } from "../contexts";

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;
const Category = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("아우터");
  const [categoryId, setCategoryId] = useState(1);
  const [categoryItem, setCategoryItem] = useState([]);
  const { spinner } = useContext(ProgressContext);

  useEffect(() => {
    try {
      // 왜 response.data.result값이 undefined가 오는거지
      axios
        .get("http://localhost:3000/opshop/categories")

        .then(function (response) {
          const result = response.data.result;
          if (result) {
            console.log(result);

            setCategoryItem(result[categoryId]);
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
    }
  }, [categoryId]);

  const categories = [
    { category: "상의", category_id: 0 },
    { category: "하의", category_id: 2 },
    { category: "원피스", category_id: 3 },
    { category: "아우터", category_id: 1 },
    { category: "신발", category_id: 5 },
    { category: "패션잡화", category_id: 6 },
    { category: "럭셔리", category_id: 7 },
  ];

  const renderTab = (item, id) => (
    <TouchableOpacity
      style={[styles.tab, item === selectedCategory && styles.activeTab]}
      onPress={() => {
        spinner.start();

        setSelectedCategory(item);
        setCategoryId(id);
        console.log(categoryId);
        setTimeout(() => {
          spinner.stop();
        }, 300);
      }}
    >
      <Text style={styles.tabText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderTab(item.category, item.category_id)}
        keyExtractor={(item) => item}
      />
      <ItemContainer>
        {categoryItem.map((a, i) => {
          return (
            <ItemCard
              key={i}
              onPress={() =>
                navigation.navigate("Goods", {
                  productId: a.product_id,
                })
              }
              url={a.product_thumbnail}
              productTitle={a.product_title}
              shopName={a.category}
            />
          );
        })}
      </ItemContainer>
    </View>
  );
};

const getDataForCategory = (category) => {
  // 데이터를 해당 카테고리에 맞게 가져오는 로직을 작성합니다.
  // 예를 들어, API 호출이나 데이터 필터링 등의 작업이 포함될 수 있습니다.
  // 이 예시에서는 단순히 해당 카테고리명과 인덱스를 반환하도록 하였습니다.
  return Array.from({ length: 10 }, (_, index) => `${category} ${index + 1}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
});

export default Category;
