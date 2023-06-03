import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Profile,
  OpMain,
  PopularShop,
  Shop,
  Goods,
  Cart,
  Order,
  OrderHistory,
  EditAddress,
  SearchPage,
} from "../screens";
import { IconButton, Image } from "../components";
import Home from "./Home";
import MyPage from "./MyPage";
import { Button } from "react-native";
import { Input } from "react-native-elements";

const Stack = createStackNavigator();
const Container = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.background};
`;
const LogoTitle = () => {
  return (
    <Image
      style={{ width: 80, height: 20, borderRadius: 0 }}
      url="https://ifh.cc/g/M2TJZp.png"
      // source={require("../../assets/LogoTitle.png")}
    />
  );
};
const Main = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        overflow: "hidden",
        headerTitleAlign: "auto",
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "MyPage",
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="PopularShop"
        component={PopularShop}
        options={({ navigation }) => ({
          tabBarStyle: { display: undefined },
          title: "Main",
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "상점",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="Goods"
        component={Goods}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "상품",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "장바구니",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "주문하기",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />

      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "주문 내역 확인",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "회원 정보 수정",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={({ navigation }) => ({
          title: "Main",
          headerTitle: "검색",
          headerRight: () => (
            <Container>
              <IconButton
                name="menu"
                onPress={() => navigation.navigate("PopularShop", { key: 2 })}
              />
              <IconButton
                name="search"
                onPress={() => navigation.navigate("SearchPage")}
              />
              <IconButton
                name="cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </Container>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Main;
