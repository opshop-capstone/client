import React from "react";
import styled from "styled-components/native";
import propTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  margin: 4px;
  width: 40%;
  justify-content: center;
  align-items: center;
  background-color: #111;
`;

const ProfileImage = styled.Image`
  width: 145px;
  height: 145px;
  border-radius: 10px;
  resize-mode: contain;
  background-color: #727272;
`;
// 넘치게 배열할거면 width, height 설정 %로 하지말자 - 스크롤뷰 작동을 안함

const ItemTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  /* //
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; */
`;

const ImageContainer = styled.View`
  margin-bottom: 5px;
  border-radius: 10px;
`;
const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imgBtnBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(Ionicons).attrs({
  name: "heart",
  size: 22,
})`
  color: ${({ theme }) => theme.imgBtnIcon};
`;

const CartButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const ItemCard = ({ url, style, onPress, productTitle, shopName, price }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        margin: 5,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }}
      onPress={onPress}
    >
      <ImageContainer>
        <ProfileImage style={style} source={{ uri: url }} />
        <CartButton />
      </ImageContainer>
      <ItemTitle>{shopName}</ItemTitle>
      <Text style={{ fontWeight: 700 }} numberOfLines={1} ellipsizeMode="tail">
        {productTitle}
      </Text>
      <ItemTitle>{price}</ItemTitle>
    </TouchableOpacity>
  );
};

// ItemCard.propTypes = {
//   url: propTypes.string,
// };

export default ItemCard;
