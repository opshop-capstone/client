import React, { useState, useRef, useContext } from "react";
import { Button, Image, Input } from "../components";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../contexts";
import { Alert, TextInput } from "react-native";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111;
  font-weight: 600;
  margin-bottom: 15px;
`;

// const signup = async ({ email, password, name }) => {
//   setLoading(true);
//   setTimeout(async () => {
//     setLoading(false);
//     console.log(inputs);
//     await axios
//       .post("http://13.125.249.247/filme/user", {
//         identification: `${inputs.identification}`,
//         password: `${inputs.password}`,
//         name: `${inputs.name}`,
//       })
//       .then((response) => {
//         if (response.data.isSuccess != true) {
//           Alert.alert("오류", response.data.message);
//         } else {
//           Alert.alert("가입이 완료되었습니다.");
//           navigation.navigate("Login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         Alert.alert("오류", err.message);
//       });
//   }, 2000);
// };
const Signup = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refPhoneNumber = useRef(null);

  const _handleSignupBtnPress = async () => {
    // { email, password, name } 원래 파라미터에 들어가 있던거
    setTimeout(async () => {
      console.log(email, password, name);
      await axios
        .post("http://opshop.shop:3000/opshop/join", {
          email: `${email}`,
          password: `${password}`,
          nickname: `${name}`,
        })
        .then((response) => {
          if (password !== passwordConfirm) {
            alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
          } else {
            console.log(response.data);
            if (response.data.isSuccess != true) {
              Alert.alert("오류", response.data.message);
            } else {
              Alert.alert("가입이 완료되었습니다.");
              navigation.navigate("로그인");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("오류", err.message);
        });
    }, 2000);
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={100}>
      <Container insets={insets}>
        <Image
          style={{ width: 200, height: 200 }}
          url="https://ifh.cc/g/M2TJZp.png"
        />

        <StyledText>회원가입</StyledText>
        <Input
          label="이름"
          placeholder="홍길동"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => {
            refEmail.current.focus();
          }}
        />
        <Input
          ref={refEmail}
          label="이메일"
          placeholder="aaaa@email.com"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => {
            refPassword.current.focus();
          }}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="password"
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => {
            refPasswordConfirm.current.focus();
          }}
          secureTextEntry={true}
        />

        <TextInput style={{ height: 0.1 }} />
        <Input
          ref={refPasswordConfirm}
          label="비밀번호 확인"
          placeholder="password confirm"
          returnKeyType="next"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true}
          onSubmitEditing={() => {
            refPhoneNumber.current.focus();
          }}
          secureTextEntry={true}
        />
        <Input
          ref={refPhoneNumber}
          label="휴대폰번호"
          placeholder="'-'는 제외하고 입력하세요."
          returnKeyType="next"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Button title="회원가입" onPress={_handleSignupBtnPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
