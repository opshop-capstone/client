import React, { useState, useContext, useEffect } from "react";
import { ItemContext, UserContext } from "../contexts";
import {
  Button,
  CustomButton,
  ItemCard,
  ShopCard,
  StoreCard,
} from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ScrollView, View } from "react-native";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  flex-grow: 1;

  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  margin: 20px;
  font-size: 20px;
  color: #111;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BoxContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Contour = styled.View`
  margin: 10px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.imgBackground};
`;

const LowContainer = styled.View`
  position: sticky;
  margin: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemContainer = styled.View`
  margin: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;

const category = [
  { id: 1, name: "thumbs-up", title: "인기상품" },
  { id: 3, name: "color-wand", title: "신상품" },
  { id: 2, name: "shirt", title: "부위별" },
  { id: 4, name: "ios-copy", title: "브랜드별" },
  { id: 5, name: "ios-glasses", title: "패션잡화" },
  { id: 6, name: "ios-glasses", title: "패션잡화" },
];
const Shop = ({ navigation, route }) => {
  const storeId = route.params.storeId;
  const store_image_url = route.params.store_image_url;

  const { setUser } = useContext(UserContext);
  const [shopItem, setShopItem] = useState([{ d: "d" }, { b: "d" }]);
  const [shopInfo, setShopInfo] = useState({});
  const { testItems, setTestItems } = useContext(ItemContext);

  // 동시에 받아오기
  useEffect(() => {
    axios
      .all([
        axios.get(`http://opshop.shop:3000/opshop/stores/${storeId}`),
        axios.get(`http://opshop.shop:3000/opshop/stores/${storeId}/info`),
      ])
      .then(
        axios.spread((response1, response2) => {
          const result = response1.data.result;

          if (result) {
            setShopItem([...result]);
            setShopInfo(...response2.data.result);
            console.log(response1.data.result);
            // setTestItems([...result]);
          }
        })
      )

      .catch((err) => console.log(err));
  }, []);

  const [categoryKey, setCategoryKey] = useState(1);
  return (
    <Container>
      <ScrollView>
        <ShopCard
          onPress={() => {
            console.log("Navigating detail page");
          }}
          image={store_image_url}
          title={shopInfo.store_name}
          description={
            shopInfo.zipcode +
            "  " +
            shopInfo.road_address +
            " , " +
            shopInfo.detail_address
          }
          contactInformation={"email : " + shopInfo.email}
          tel={"tel : " + shopInfo.tel}
        />
        {/* <StoreCard /> */}
        <Button title="구독하기" />
        <Contour />
        <FlatList
          data={category}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomButton
              key={item.id}
              containerStyle={{
                width: 60, // 원하는 크기로 지정
                height: 60,
                borderRadius: 8,
                marginRight: 16,
                backgroundColor: item.id == categoryKey ? "black" : "#d5d5d5",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setCategoryKey(item.id);
              }}
              iconName={item.name}
              title={item.title}
            />
          )}
        />

        {categoryKey == 1 && (
          <View>
            <StyledText>매장 인기 상품</StyledText>
            <ItemContainer>
              {/* <ItemCard
            onPress={() => {
              navigation.navigate("Goods");
            }}
            url="https://m.oldlook.co.kr/web/product/big/ok31400.JPG"
          /> */}

              {shopItem.map((a, i) => {
                return (
                  <ItemCard
                    key={i}
                    onPress={() => {
                      navigation.navigate("Goods", { productId: a.product_id });
                    }}
                    url={a.product_thumbnail}
                    productTitle={a.title}
                    shopName="VINTAGE TALK"
                    price="39,000원"
                  />
                );
              })}
            </ItemContainer>
          </View>
        )}
        {categoryKey == 2 && <StyledText>부위별</StyledText>}
        {categoryKey == 3 && <StyledText>신상품</StyledText>}
        {categoryKey == 4 && <StyledText>브랜드별</StyledText>}
        {categoryKey == 5 && <StyledText>패션잡화</StyledText>}
      </ScrollView>
    </Container>
  );
};

export default Shop;
