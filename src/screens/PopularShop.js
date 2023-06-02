import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts";
import { Button, CustomButton, Image, Input, ShopCard } from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111;
  font-weight: 600;
  margin-bottom: 15px;
`;

const BoxContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Contour = styled.View`
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

const PopularShop = ({ route, navigation }) => {
  const [popularShop, setPopularShop] = useState([]);
  const [categoryShop, setCategoryShop] = useState([]);
  useEffect(() => {
    try {
      // 왜 response.data.result값이 undefined가 오는거지
      axios
        .get("http://opshop.shop:3000/opshop/stores")

        .then(function (response) {
          const result = response.data.result;
          if (result) {
            console.log(result);
            setPopularShop(result);
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
      // 왜 response.data.result값이 undefined가 오는거지
      axios
        .get("http://opshop.shop:3000/opshop/category")

        .then(function (response) {
          const result = response.data.result;
          if (result) {
            console.log(result);
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
  const { key } = route.params; // 전 화면에서 눌렀던 위에 카테고리 버튼 key받아오는
  useEffect(() => {}, [{ key }]);
  const [categoryKey, setCategoryKey] = useState(key);
  const { setUser } = useContext(UserContext);

  return (
    <Container>
      <ScrollView>
        <BoxContainer>
          <LowContainer>
            {[
              { name: "flame", title: "인기상점" },
              { name: "location", title: "지역별" },
              { name: "apps", title: "카테고리" },
              { name: "heart", title: "찜한상품" },
              { name: "star", title: "인기상품" },
            ].map((a, i) => {
              return i == categoryKey ? (
                <CustomButton
                  key={i}
                  containerStyle={{
                    width: 60, // 원하는 크기로 지정
                    height: 60,
                    borderRadius: 8,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#111",
                  }}
                  onPress={() => {}}
                  iconName={a.name}
                  title={a.title}
                />
              ) : (
                <CustomButton
                  key={i}
                  onPress={() => {
                    setCategoryKey(i);
                  }}
                  iconName={a.name}
                  title={a.title}
                />
              );
            })}
          </LowContainer>
        </BoxContainer>
        <Contour />
        {categoryKey == 0 && (
          <View>
            {/* <ShopCard
              onPress={() => {
                navigation.navigate("Shop");
              }}
              image="data:image/png;base64,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"
              title="VINTAGE TALK"
              description="서울시 성북구 석관동 58-283 성북A 터미널 SH로지스 빈티지톡 수입 구제샵, 명품 브랜드 빈티지샵 쇼핑몰"
            /> */}
            {popularShop.map((a, i) => {
              return (
                <ShopCard
                  key={i}
                  image={a.store_image_url}
                  title={a.store_name}
                  description={a.content}
                  onPress={() => {
                    navigation.navigate("Shop", {
                      storeId: a.id,
                      store_image_url: a.store_image_url,
                    });
                  }}
                />
              );
            })}
          </View>
        )}

        {categoryKey == 1 &&
          [1, 2, 3, 4, 5, 6].map((a, i) => {
            return (
              <ShopCard
                key={i}
                image="https://ifh.cc/g/M2TJZp.png"
                title="상점명"
                description="description"
              />
            );
          })}
        {categoryKey == 2 && <StyledText>카테고리</StyledText>}
        {categoryKey == 3 && <StyledText>상의 하의 아우터 신발</StyledText>}
        {categoryKey == 4 && <StyledText>인기상품을 확인해보세요!</StyledText>}
      </ScrollView>
    </Container>
  );
};

export default PopularShop;
