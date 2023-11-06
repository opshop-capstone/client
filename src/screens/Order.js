import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Card } from "react-native-elements";
import styled from "styled-components";
import { Button, CustomButton } from "../components";
import { ItemContext, UserContext } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Linking from "expo-linking";

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonIcon = styled(Ionicons).attrs({
  name: "pencil",
  size: 22,
  marginRight: 20,
})`
  color: ${({ theme }) => theme.text};
`;
const CheckButtonIcon = styled(Ionicons).attrs({
  name: "checkmark-circle",
  size: 60,
})`
  color: green;
`;

const AddToCartHandler = () => {};
const StyledText = styled.Text`
  font-size: 18px;
  color: #111;
  font-weight: 600;
  margin: 5px;
`;

const Order = ({ navigation, route }) => {
  const total_price = route.params.sum;
  const { cartItems, setCartItems } = useContext(ItemContext);
  const { address, setAddress } = useContext(ItemContext);
  const { user, setUserInfo } = useContext(UserContext);

  const link = (url) => {
    Linking.openURL(url);
  };

  //상품 총합 계산
  let sum = 0;
  cartItems.map((item) => {
    sum += parseFloat(item.price);
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleMoveToCart = () => {
    console.log("Navigating to Cart");
    setShowModal(false);
  };

  const handleContinueShopping = () => {
    setShowModal(false);
  };
  const [showModal2, setShowModal2] = useState(false);

  const handleAddToCart2 = () => {};

  const handleMoveToCart2 = () => {
    console.log("Navigating to Cart");
    setShowModal2(false);
  };

  const handleContinueShopping2 = () => {
    setShowModal2(false);
  };
  const [shop, setShop] = useState({
    store: "VINTAGE TALK",
    storeDescription:
      "서울시 성북구 석관동 58-283 성북A 터미널 SH로지스 빈티지톡",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard",
  });

  const itemIdArr = [];
  cartItems.map((a, i) => {
    itemIdArr.push(a.product_id);
  });

  const itemPriceArr = [];
  cartItems.map((a, i) => {
    itemPriceArr.push(a.price);
  });

  const [addressID, setAddressId] = useState(1);

  const handleOrder = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3000/opshop/payment",
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
      params: {
        ///////버전 1
        itemId: itemIdArr.join(),
        addressId: address[0].address_id,
        itemPrice: itemPriceArr.join(),
        quantity: cartItems.length,
        totalPrice: total_price,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response) {
          console.log(response);
          console.log(response.data);
          link(response.data);
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
    setShowModal2(true);
  };

  // const handleOrder = () => {
  //   //상품 하나만 받아올때
  //   axios({
  //     method: "post",
  //     url: `http://localhost:3000/opshop/payment`,
  //     headers: {
  //       "x-access-token": `${user?.jwt}`,
  //     },
  //     data: {
  //       itemId: "1",
  //       addressId: 1,
  //       //addressId 주소 API에 없음
  //       item_price: "2000",
  //       quantity: cartItems.length,
  //       total_price: total_price,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       console.log(err.name);
  //       console.log(err.stack);

  //       alert("주문하기 실패");
  //     });
  //   setShowModal2(true);
  // };
  return (
    <View style={styles.container}>
      <ScrollView>
        <StyledText>구매 상품</StyledText>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>
            {cartItems[0].title} 외 {cartItems.length - 1}개
          </Card.Title>
          <Card.Divider />
          {cartItems.map((a, i) => {
            return (
              <Text key={i} style={styles.cardText}>
                {a.title} - {parseInt(a.price).toLocaleString()}원
              </Text>
            );
          })}
        </Card>
        <TotalPrice>
          <StyledText>결제수단</StyledText>

          {/* <CustomButton
            iconName="pencil"
            title="수정하기"
            style={{ width: 20, height: 20, backgroundColor: "red" }}
          /> */}
          <TouchableOpacity
            onPress={() => {
              handleAddToCart();
            }}
          >
            <ButtonIcon />
          </TouchableOpacity>
        </TotalPrice>
        <Card containerStyle={styles.card}>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <Image
              style={styles.image}
              source={require("../../assets/kakao-pay.png")}
            />
            <StyledText style={styles.cardText}>카카오페이</StyledText>
          </View>
        </Card>
        <TotalPrice>
          <StyledText>배송 (기본 배송지로 설정됩니다!)</StyledText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditAddress", { orderKey: 1 });
            }}
          >
            <ButtonIcon />
          </TouchableOpacity>
        </TotalPrice>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>{address[0].name}</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>
            {address[0].road_address} , {address[0].detail_address}{" "}
          </Text>
        </Card>
        <Card containerStyle={(styles.card, { marginTop: 1 })}>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <Image
              style={styles.image}
              source={require("../../assets/cj-delivery.jpeg")}
            />
            <StyledText>주문 확인 후 2-3일 소요</StyledText>
          </View>
        </Card>
        <Card containerStyle={styles.card}>
          <TotalPrice>
            <StyledText style={{ fontSize: 18, color: "grey" }}>
              주문금액 :
            </StyledText>
            <StyledText>{sum.toLocaleString()}원</StyledText>
          </TotalPrice>
          <TotalPrice>
            <StyledText style={{ fontSize: 18, color: "grey" }}>
              배송비 :
            </StyledText>
            <StyledText>3,000원</StyledText>
          </TotalPrice>
          <TotalPrice>
            <StyledText style={{ fontSize: 18, color: "grey" }}>
              합계 :
            </StyledText>
            <StyledText>{(sum + 3000).toLocaleString()} 원</StyledText>
          </TotalPrice>
        </Card>
      </ScrollView>
      <Button
        onPress={handleOrder}
        title="주문하기"
        containerStyle={styles.button}
      />
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <StyledText style={{ fontSize: 20, fontWeight: "bold" }}>
            결제수단 변경하기
          </StyledText>
          <Image
            style={{ width: 100, height: 100, borderRadius: 10, marginTop: 30 }}
            source={require("../../assets/kakao-pay.png")}
          />
          <StyledText>Kakao Pay</StyledText>
          <View style={styles.modalButtonsContainer}>
            <Button title="변경" onPress={handleContinueShopping} />
            <Button
              title="결제수단 유지하기"
              containerStyle={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#000",
              }}
              textStyle={{ color: "#111" }}
              onPress={() => {
                handleContinueShopping();
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={showModal2} animationType="slide">
        <View style={styles.modalContainer}>
          <StyledText style={{ fontSize: 40, fontWeight: "bold" }}>
            주문 완료!
          </StyledText>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: "https://ifh.cc/g/M2TJZp.png" }}
          />
          <CheckButtonIcon />
          <Text style={styles.cardText}>
            {shop.store}에 주문이 접수되었어요!
          </Text>
          <View style={styles.modalButtonsContainer}>
            <Button
              title="주문내역 확인하기"
              onPress={() => {
                handleContinueShopping2();
                navigation.reset({ routes: [{ name: "Home" }] });

                navigation.navigate("OrderHistory");
              }}
            />
            <Button
              title="홈으로 돌아가기"
              containerStyle={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#000",
              }}
              textStyle={{ color: "#111" }}
              onPress={() => {
                handleContinueShopping2();
                navigation.reset({ routes: [{ name: "Home" }] });
                // navigation.navigate("Home");
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f1f1f1",
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  cardText: {
    marginTop: 15,
    fontSize: 16,
    color: "grey",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonsContainer: {
    justifyContent: "space-between",
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
});

export default Order;
