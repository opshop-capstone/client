import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import {
  CustomButton,
  ButtonNoFlex,
  AddToCartButton,
  Button,
} from "../components";
import styled from "styled-components";
import { CartContext, ItemContext, UserContext } from "../contexts";

const LowContainer = styled.View`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Contour = styled.View`
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.imgBackground};
`;

const Goods = ({ route, product, navigation }) => {
  const productId = route.params.productId;
  const [cartMessage, setCartMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [title, setTitle] = useState("");
  const [productPrice, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [detailCutUrl, setDetailCutUrl] = useState(null);
  const [size, setSize] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { cartItems, setCartItems } = useContext(ItemContext);
  const { cart, setCart } = useContext(CartContext);
  const { user, setUserInfo } = useContext(UserContext);

  const AddToCartHandler = () => {
    axios({
      method: "post",
      url: `http://opshop.shop:3000/opshop/carts/add`,
      // url:
      //   `http://opshop.shop:3000/opshop/carts/add?productId=` + { productId },
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
      params: {
        productId: productId,
      },
    })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.name);
        console.log(err.stack);
        alert("담기 실패");
      });
  };
  //상품 상세
  useEffect(() => {
    try {
      // 상품 상세 api
      axios
        .get(`http://opshop.shop:3000/opshop/products/${productId}`)

        .then(function (response) {
          const result = response.data.result.info[0];
          const test = response.data.result;
          const imageArr =
            response.data.result.images[0].product_image.split(",");

          if (result) {
            console.log(response.data.result);
            setStoreName(result.store_name);
            setTitle(result.title);
            setPrice(result.price);
            setContent(result.content);
            setSize(result.size);
            setCategory(result.category);
            setImageUrl(imageArr[0]);
            setDetailCutUrl(imageArr[1]);
          }
        })
        .catch(function (error) {
          console.log(error);
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

  const handleAddToCart = () => {
    setCartMessage("Added to Cart!");
    setShowModal(true);
  };

  const handleMoveToCart = () => {
    console.log("Navigating to Cart");
    setShowModal(false);
  };

  const handleContinueShopping = () => {
    setCartMessage("");
    setShowModal(false);
  };
  const handlelike = async () => {
    await axios({
      method: "post",
      url: "http://opshop.shop:3000/opshop/products/liked",
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
      params: {
        productId: productId,
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

  const StyledText = styled.Text`
    font-size: 14px;
    color: #111;
    font-weight: 600;
    margin: 10px;
  `;

  return (
    <Container>
      <ScrollView>
        <Image source={{ uri: `${imageUrl}` }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.shopName}>{storeName}</Text>
          <Text style={styles.productName}>{title}</Text>
          <Text style={styles.brandName}>브랜드이름</Text>
          <Text style={styles.brandName}>카테고리 : {category}</Text>
          <Text style={styles.description}>{size}</Text>
          <Text style={styles.price}>{productPrice.toLocaleString()} 원</Text>
          <Contour />
          <StyledText>상품 설명</StyledText>
          <Text style={styles.description}>{content}</Text>
          <StyledText>상품 디테일컷</StyledText>
        </View>

        <Image source={{ uri: `${detailCutUrl}` }} style={styles.detailCut} />
      </ScrollView>

      <LowContainer>
        <CustomButton
          iconName="heart"
          title="찜하기"
          onPress={() => {
            handlelike();
          }}
          containerStyle={{
            width: 60, // 원하는 크기로 지정
            height: 60,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#111",
          }}
        />
        <ButtonNoFlex
          containerStyle={{
            width: 290,
            borderRadius: 8,
            backgroundColor: "#111",
            height: 60,
            marginLeft: 10,
          }}
          onPress={() => {
            let duplication = cartItems.findIndex((a) => {
              console.log(a);
              return a.name == title;
            });
            const addToCart = () => {
              setCartItems([
                ...cartItems,
                {
                  id: cartItems.length + 1,
                  name: title,
                  price: `${productPrice}`,
                  image: `${imageUrl}`,
                },
              ]);
              handleAddToCart();
              AddToCartHandler();
            };
            duplication == -1
              ? addToCart()
              : alert("장바구니에 같은 상품이 존재해요!");
          }}
          title="장바구니에 담기"
        />
      </LowContainer>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <StyledText>장바구니에 </StyledText>
          <StyledText> '{title}' 이 </StyledText>
          <StyledText> 담겼어요! </StyledText>
          <Contour />

          <View style={styles.modalButtonsContainer}>
            <Button
              title="장바구니로 이동하기"
              onPress={() => {
                handleMoveToCart();
                navigation.navigate("Cart");
              }}
              containerStyle={{
                marginTop: 0,
                backgroundColor: "#fff",
              }}
              textStyle={{
                color: "#111",
                fontSize: 20,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            />
            <Button title="쇼핑 계속하기" onPress={handleContinueShopping} />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailCut: {
    width: "100%",
    height: 1500,
    resizeMode: "cover",
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  brandName: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
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

export default Goods;
