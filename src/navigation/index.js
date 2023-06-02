import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";
import { ProgressContext, UserContext } from "../contexts";
import Main from "./Main";
import { Spinner } from "../components";

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {user?.jwt ? <Main /> : <Auth />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
// 결제페이지 먼저?
