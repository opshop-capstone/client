import React, { useState, useRef, useContext, useEffect } from "react";
import { Button, Image, Input, ErrorMessage } from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ProgressContext, UserContext } from "../contexts";
import { validateEmail, removeWhitespace } from "../utils";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Signin = ({ navigation }) => {
  const { setUserInfo } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const refPassword = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  //이메일 공백 제거와 이메일 형식 검사
  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "정확한 이메일 형식으로 입력해주세요."
    );
  };
  const _handlePasswordChange = (password) => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
  };

  const _handleSigninBtnPress = async () => {
    spinner.start();

    setTimeout(async () => {
      await axios
        .post("http://opshop.shop:3000/opshop/login", {
          email: `${email}`,
          password: `${password}`,
        })
        .then((response) => {
          console.log(response.data);
          console.log(email);
          if (response.data.result) {
            const userId = response.data.result.userId;
            const jwt = response.data.result.jwt;
            const userEmail = email;
            setUserInfo({ userId, userEmail, jwt });
            spinner.stop();
          } else {
            alert("Error", response.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.name);
          console.log(err.stack);
          alert("로그인 실패");
        });
    }, 1000);
  };

  // const _handleSigninBtnPress = async () => {
  //   try {
  //     setUser(123);
  //     console.log(user.uid);
  //     console.log("로그인");
  //   } catch (e) {
  //     alert("로그인 에러", e.message);
  //   }
  // };
  return (
    <KeyboardAwareScrollView>
      <Container insets={insets}>
        <Image
          style={{ width: 200, height: 200 }}
          url="https://ifh.cc/g/M2TJZp.png"
        />
        <StyledText style={{ fontSize: 28, fontWeight: 500 }}>
          빈티지 아이콘,
        </StyledText>
        <StyledText>구제통합 OP Shop</StyledText>
        <Input
          label="이메일"
          placeholder="aaaaa@email.com"
          returnKeyType="next"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => {
            refPassword.current.focus();
          }}
        />
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="password"
          returnKeyType="next"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title="비회원으로 둘러보기"
          onPress={() => {
            setUserInfo({ jwt: "111" });
          }}
          containerStyle={{
            marginTop: 0,
            backgroundColor: "#fff",
          }}
          textStyle={{
            color: "#5d5d5d",
            fontSize: 20,
            textDecorationLine: "underline",
          }}
        />
        <Button
          title="로그인"
          onPress={() => {
            _handleSigninBtnPress();
          }}
          disabled={disabled}
        />

        <Button
          title="회원가입"
          onPress={() => {
            navigation.navigate("회원가입");
          }}
          containerStyle={{
            marginTop: 0,
            backgroundColor: "#fff",
          }}
          textStyle={{ color: "#111" }}
        />
        <Button
          title="비밀번호를 잊으셨나요?"
          onPress={() => {
            navigation.navigate("비밀번호찾기");
          }}
          containerStyle={{
            marginTop: 0,
            backgroundColor: "#fff",
          }}
          textStyle={{ color: "#5d5d5d", fontSize: 20 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
