import React, { useState, useContext, useEffect } from "react";
import { ItemContext, UserContext } from "../contexts";
import {
  Button,
  ButtonNoFlex,
  CustomButton,
  ItemCard,
  ShopCard,
  StoreCard,
} from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

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
  margin: 10px;
`;
const Contour = styled.View`
  margin: 10px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.imgBackground};
`;

const LowContainer = styled.View`
  position: sticky;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15;
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
  { id: 6, name: "bag", title: "럭셔리" },
];
const Shop = ({ navigation, route }) => {
  const storeId = route.params.storeId;
  const store_image_url = route.params.store_image_url;

  const { user } = useContext(UserContext);
  const [shopItem, setShopItem] = useState([{ d: "d" }, { b: "d" }]);
  const [shopInfo, setShopInfo] = useState({});
  const { testItems, setTestItems } = useContext(ItemContext);
  //아이콘
  const BlackButton = ({ icon, text, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color="white" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };
  //구독 & 취소
  const handleSubscribe = async () => {
    await axios({
      method: "post",
      url: "http://opshop.shop:3000/opshop/stores/subscribe",
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
      params: {
        storeId: storeId,
      },
    })
      .then((response) => {
        if (response) {
          console.log(response.data);
          alert(response.data.message);
        } else {
          alert("Error", response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.name);
        console.log(err.stack);

        alert("주문하기 실패");
      });
  };
  // 동시에 받아오기
  useEffect(() => {
    console.log(storeId);
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
            console.log(response2.data.result);
            setShopInfo(...response2.data.result);
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
        {/* <ShopCard
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
        /> */}
        <StoreCard
          onPress={() => {
            console.log("상점 정보 페이지로 이동");
          }}
          image={store_image_url ? store_image_url : shopInfo.store_thumbnail}
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
        <LowContainer>
          <BlackButton icon="call" text="연락하기" />
          <BlackButton
            icon="notifications"
            text="구독하기"
            onPress={handleSubscribe}
          />
          <BlackButton icon="newspaper" text="리뷰쓰기" />
        </LowContainer>
        <Contour />
        <BoxContainer>
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
                  backgroundColor: item.id == categoryKey ? "black" : "#727272",
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
        </BoxContainer>

        {categoryKey == 1 && (
          <View>
            <StyledText>매장 인기 상품</StyledText>
            <ItemContainer>
              {shopItem.map((a, i) => {
                return (
                  <ItemCard
                    key={i}
                    onPress={() => {
                      navigation.navigate("Goods", { productId: a.product_id });
                    }}
                    url={a.product_thumbnail}
                    productTitle={a.title}
                    shopName={shopInfo.store_name}
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
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    marginRight: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
export default Shop;
