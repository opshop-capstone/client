import { StatusBar } from "react-native";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import Navigation from "./navigation";
import {
  UserProvider,
  ItemContext,
  CartProvider,
  UserContext,
  ProgressProvider,
} from "./contexts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

LogBox.ignoreAllLogs();

export default function App() {
  // const { user, setUserInfo } = useContext(UserContext);
  // useEffect(() => {
  //   try {
  //     axios({
  //       method: "get",
  //       url: "http://opshop.shop:3000/opshop/mypage/address",
  //       headers: {
  //         "x-access-token": `${user?.jwt}`,
  //       },
  //     })
  //       .then(function (response) {
  //         const result = response.data;
  //         console.log(user?.jwt);
  //         console.log(user.jwt);
  //         console.log(result);
  //         if (result) {
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
  // }, [{ user }]);
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 2,
    //   name: "Product 2",
    //   price: "49000",
    //   image: "https://ifh.cc/g/M2TJZp.png",
    // },
    // {
    //   id: 3,
    //   name: "Product 3",
    //   price: 0,
    //   image: "https://ifh.cc/g/M2TJZp.png",
    // },
  ]);

  const [testItems, setTestItems] = useState([]);
  const [address, setAddress] = useState([
    // {
    //   id: 1,
    //   zipcode: "22563",
    //   addressName: "본가",
    //   is_main: "Y",
    //   address:
    //     "인천광역시 미추홀구 주승로 96번길 42, 주안한신휴플러스 201동 407호",
    // },
    // {
    //   id: 2,
    //   addressName: "학교",
    //   zipcode: "22563",
    //   is_main: "N",
    //   address: "용인시 수지구 죽전로 152, 단국대학교",
    // },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <UserProvider>
          <CartProvider>
            <ItemContext.Provider
              value={{
                cartItems,
                setCartItems,
                address,
                setAddress,
                testItems,
                setTestItems,
              }}
            >
              <StatusBar
                backgroundColor={theme.background}
                barStyle="dark-content"
              />
              <Navigation />
            </ItemContext.Provider>
          </CartProvider>
        </UserProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
