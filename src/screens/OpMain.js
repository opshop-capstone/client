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
import Constants from "expo-constants"; //현재 단말기의 시스템 정보를 불러오기 위함
const { manifest } = Constants;

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
`;
const BoxContainer = styled.View`
  flex: 1;
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
      navigation.navigate("Shop", { storeId: 3 });
      break;
    case 1:
      navigation.navigate("Shop", { storeId: 2 });
      break;
    case 2:
      navigation.navigate("Shop", { storeId: 5 });
      break;
    case 3:
      navigation.navigate("Shop", { storeId: 5 });
      break;
    case 4:
      navigation.navigate("Shop", { storeId: 4 });
      break;
    default:
      break;
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
        url: `http://${manifest.debuggerHost
          .split(":")
          .shift()}:3000/opshop/products/reco/lists`,
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
        url: `http://${manifest.debuggerHost
          .split(":")
          .shift()}:30000/opshop/mypage/address`,
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
            {shopItem == "" ? (
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
