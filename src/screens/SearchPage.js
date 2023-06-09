import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { ItemCard } from "../components";
import axios from "axios";
import { ProgressContext } from "../contexts";

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;

const Contour = styled.View`
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.imgBackground};
`;

const popularSearchTerms = ["폴로", "겐조", "마크곤잘레스", "나이키"];

const recentlyViewedProducts = [
  {
    id: "1",
    name: "Nike Air Max 270 React",
  },
  {
    id: "2",
    name: "adidas Originals NMD_R1",
  },
  {
    id: "3",
    name: "Converse Chuck Taylor All Star",
  },
];

const SearchPage = () => {
  const [recentlyViewed, setRecentlyViewed] = useState(recentlyViewedProducts);

  const renderPopularSearchTerm = ({ item }) => (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => {
        handleSearch(item);
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderRecentlyViewedProduct = ({ item }) => (
    <TouchableOpacity style={{ marginRight: 10 }}>
      <Image
        source={item.image}
        style={{ width: 100, height: 100, resizeMode: "cover" }}
      />
      <Text style={{ fontSize: 16 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const { spinner } = useContext(ProgressContext);
  const handleSearch = (searchIs) => {
    spinner.start();
    axios({
      method: "get",
      url: `http://opshop.shop:3000/opshop/products`,

      params: {
        search: searchIs,
      },
    })
      .then((response) => {
        console.log(response.data.result);
        setSearchItem(response.data.result);
        setTimeout(() => {
          spinner.stop();
        }, 500);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.name);
        console.log(err.stack);

        alert("검색 실패");
      });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* input 박스 */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSearch(searchText)}
        >
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>
      {/*  */}
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
            인기 검색어
          </Text>
          <FlatList
            data={popularSearchTerms}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPopularSearchTerm}
          />
        </View>
        <Contour />
        <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
          검색 결과
        </Text>
        {searchItem == "" ? <Text>검색결과가 없습니다.</Text> : <></>}
        <ItemContainer>
          {searchItem.map((a, i) => {
            return (
              <ItemCard
                url={a.thumbnail}
                productTitle={a.title}
                price={a.price}
                shopName={a.store_name}
              />
            );
          })}
        </ItemContainer>
        <View>
          {/* <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            최근 본 상품
          </Text>
          <ItemContainer>
            {recentlyViewed.map((a, i) => {
              return (
                <ItemCard
                  url="https://ifh.cc/g/M2TJZp.png"
                  productTitle="상품명"
                  shopName="상점명"
                />
              );
            })}
          </ItemContainer> */}

          <FlatList
            data={recentlyViewed}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              <ItemCard
                url="https://ifh.cc/g/M2TJZp.png"
                productTitle="상품명"
                shopName="dd"
              />;
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SearchPage;
