import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup, PwFind } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="로그인"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="회원가입"
        component={Signup}
        options={{
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="비밀번호찾기"
        component={PwFind}
        options={{ headerTitleAlign: "center", headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
