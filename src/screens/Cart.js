import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import { Button } from "../components";
import { ItemContext, ProgressContext, UserContext } from "../contexts";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { CheckBox } from "react-native-elements";

const FixContainer = styled.View`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TotalPrice = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: space;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: #111;
  font-weight: 600;
  margin: 10px;
`;

const ButtonIcon = styled(Feather).attrs({
  name: "x",
  size: 22,
})`
  color: white;
`;

const Cart = ({ navigation }) => {
  const [remove, setRemove] = useState(false);
  const { cartItems, setCartItems } = useContext(ItemContext);
  const removeItem = (product_id) => {
    axios({
      method: "post",
      url: `http://opshop.shop:3000/opshop/carts/remove?productId=
         ${product_id} `,
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
    })
      .then((response) => {
        console.log("상품번호" + product_id);

        const updatedCartItems = cartItems.filter(
          (item) => item.product_id !== product_id
        );
        setCartItems(updatedCartItems);
        setRemove(!remove);
        // console.log(cartItems);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.name);
        console.log(err.stack);
        alert("remove 실패");
      });
  };

  // 카트에 있는 상품 로드
  const { user, setUserInfo } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  useEffect(() => {
    try {
      spinner.start();

      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/carts",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          setTimeout(() => {
            spinner.stop();
          }, 1000);
          const result = response.data.result;

          if (result) {
            setCartItems(result);
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
  }, [remove]);

  let sum = 0;

  cartItems.map((item) => {
    sum += parseFloat(item.price);
  });

  // const removeItem = (id) => {
  //   const updatedCartItems = cartItems.filter((item) => item.id !== id);
  //   setCartItems(updatedCartItems);
  // };

  return (
    <View style={styles.container}>
      <StyledText>{cartItems.length}개 상품</StyledText>
      <ScrollView>
        {cartItems.map((item) => (
          <View style={styles.productCard} key={item.product_id}>
            <Image source={{ uri: item.url }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>{`${parseInt(
                item.price
              ).toLocaleString()}원`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log(item);
                console.log(item.product_id);
                removeItem(item.product_id);
              }}
              style={styles.deleteButton}
            >
              <ButtonIcon />
              {/* <Text style={styles.deleteButtonText}>X</Text> */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TotalPrice>
        <StyledText style={{ fontSize: 20, color: "grey" }}>합계 :</StyledText>
        <StyledText>{sum.toLocaleString()} 원</StyledText>
      </TotalPrice>
      <FixContainer>
        <Button
          title="주문하기"
          onPress={() => {
            navigation.navigate("Order", { sum: sum });
          }}
        ></Button>
      </FixContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexGrow: 1,
    padding: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 95,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productImage: {
    width: 75,
    height: "100%",
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  deleteButton: {
    backgroundColor: "#111",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Cart;
