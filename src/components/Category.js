import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("상의");

  const categories = ["상의", "아우터", "원피스", "가방", "신발", "악세사리"];

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[styles.tab, item === selectedCategory && styles.activeTab]}
      onPress={() => setSelectedCategory(item)}
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
        renderItem={renderTab}
        keyExtractor={(item) => item}
      />
      <FlatList
        data={getDataForCategory(selectedCategory)}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
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
