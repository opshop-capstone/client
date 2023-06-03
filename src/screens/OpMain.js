import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { FlatList, View } from "react-native";
import { Image, IconButton, ItemCard, CustomButton } from "../components";
import { SliderBox } from "react-native-image-slider-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native";
import axios from "axios";
import { ItemContext, UserContext } from "../contexts";
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
`;
const BoxContainer = styled.View`
  flex: 1;
  padding: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.background};
`;
const Contour = styled.View`
  border-bottom-width: 6px;
  border-color: grey;
  margin: 6px;
`;
const LowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: #111;
  font-weight: 600;
  margin-bottom: 15px;
`;

const sliderTouch = (index, navigation) => {
  switch (index) {
    case 0:
      navigation.navigate("Cart");
  }
};

const OpMain = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const [shopItem, setShopItem] = useState([]);
  const [state, setState] = useState({
    currentIndex: 1,
  });
  const { user, setUserInfo } = useContext(UserContext);
  const { address, setAddress } = useContext(ItemContext);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/products/reco/lists",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;
          if (result) {
            setShopItem(result);
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
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/mypage/address",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;
          console.log(result);
          if (result) {
            console.log("result");
            setAddress([...address, result]);
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
  return (
    <Container>
      <ScrollView>
        <View style={{ width: "100%", height: "30%", flex: 1 }}>
          <SliderBox
            images={[
              require("../../assets/sliderImage7.jpeg"),
              require("../../assets/sliderImage2.jpeg"),
              require("../../assets/sliderImage3.jpeg"),
              require("../../assets/sliderImage4.jpeg"),
              require("../../assets/sliderImage.jpeg"),
              require("../../assets/sliderImage5.jpeg"),
              require("../../assets/sliderImage6.gif"),
            ]}
            onCurrentImagePressed={(index) => {
              console.log("image pressed index : " + index);
              sliderTouch(index, navigation);
            }}
            currentImageEmitter={(index) => {
              // 이미지가 바뀔때 어떤 동작을 할지 설정
              setState({
                currentIndex: index + 1,
              });
            }}
            dotColor="rgba(0,0,0,0)"
            inactiveDotColor="rgba(0,0,0,0)"
            resizeMode="cover"
            autoplay
            circleLoop
          />
          <View
            style={{
              position: "absolute",
              bottom: "8%",
              right: 0,
              paddingTop: 4,
              paddingRight: 6,
              paddingBottom: 4,
              paddingLeft: 10,
              borderTopLeftRadius: 14,
              borderBottomLeftRadius: 14,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Text style={{ fontSize: 10, color: "#ffffff" }}>
              {state.currentIndex}/7
            </Text>
          </View>
        </View>
        {/* <SliderBox
          images={[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDcI_0jxpFkyyTTJLScppbfluqc6VB_MdEw&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPLnqrA3M61JMMEkL2b3dvyYSJuwo5UkMgg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcaEucQHS70XZxXNOMNashZcMpuDWG_nAQJg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-VJYZTX_fNSe78o5U0g7qIsWXt5gHbF0DQ&usqp=CAU",
          ]}
          onCurrentImagePressed={(index) => {
            console.log("image pressed index : " + index);
            sliderTouch(index);
          }}
          dotColor="rgba(0,0,0,0)"
          inactiveDotColor="rgba(0,0,0,0)"
          resizeMode="cover"
          autoplay
          circleLoop
        /> */}
        <BoxContainer>
          <LowContainer>
            {[
              { name: "flame", title: "인기상점" },
              { name: "star", title: "인기상품" },
              { name: "apps", title: "카테고리" },
              { name: "heart", title: "찜한상품" },
              { name: "location", title: "지역별" },
            ].map((a, i) => {
              return (
                <CustomButton
                  key={i}
                  onPress={() => {
                    navigation.navigate("PopularShop", { key: i });
                  }}
                  iconName={a.name}
                  title={a.title}
                />
              );
            })}
          </LowContainer>
        </BoxContainer>
        <Contour />
        <BoxContainer>
          <StyledText>당신을 위한 추천 아이템</StyledText>
          <ItemContainer>
            {shopItem == [] ? (
              <StyledText>로그인 후 제공됩니다.</StyledText>
            ) : (
              shopItem.map((a, i) => {
                return (
                  <ItemCard
                    key={i}
                    onPress={() => {
                      navigation.navigate("Goods", { productId: a.product_id });
                    }}
                    url={a.thumbnail}
                    productTitle={a.title}
                    shopName={a.store_name}
                    price={a.price.toLocaleString() + "원"}
                  />
                );
              })
            )}
          </ItemContainer>
        </BoxContainer>
      </ScrollView>
    </Container>
  );
};

export default OpMain;
