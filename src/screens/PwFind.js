import React, { useState } from "react";
import { Button, Image, Input } from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants"; //현재 단말기의 시스템 정보를 불러오기 위함
const { manifest } = Constants;

const Container = styled.View`
flex : 1;
justify-content : center;
align-items : center;
background-color: ${({ theme }) => theme.background} ;
padding : 0 20px;
padding-top : ${({ insets: { top } }) => top}px
padding-bottom : ${({ insets: { bottom } }) => bottom}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111;
  font-weight: 600;
  margin-bottom: 15px;
`;

const PwFind = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container insets={insets}>
      <Image
        style={{ width: 200, height: 200 }}
        url="https://ifh.cc/g/M2TJZp.png"
      />

      <StyledText>비밀번호찾기</StyledText>
      <Input label="이메일" />
      <Input label="휴대전화" />

      <Button
        title="인증번호 전송"
        onPress={() => {
          navigation.navigate("회원가입");
        }}
      />
    </Container>
  );
};

export default PwFind;
