import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts";
import { Button, Input } from "../components";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import Constants from "expo-constants"; //현재 단말기의 시스템 정보를 불러오기 위함
const { manifest } = Constants;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  margin-top: 3px;
  font-size: 14px;
  color: grey;
`;

const Profile = ({ navigation }) => {
  const { user, setUserInfo } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `http://${manifest.debuggerHost
          .split(":")
          .shift()}:3000/opshop/mypage`,
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;

          if (result) {
            console.log(result);
            setProfile(...result);
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
    }
  }, []);
  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.profileImg}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{user.userEmail}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("OrderHistory")}
        >
          <Text style={styles.cardText}>주문 내역 확인</Text>
          <StyledText>통합 주문내역을 확인하세요!</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("EditAddress", {
              orderKey: 0,
              name: profile.name,
            })
          }
        >
          <Text style={styles.cardText}>배송지 수정</Text>
          <StyledText>주소와 회원정보를 수정하세요!</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log(user.userEmail)}
        >
          <Text style={styles.cardText}>결제 수단</Text>
          <StyledText>결제하실 카드를 등록 / 변경하세요!</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log("나의 후기")}
        >
          <Text style={styles.cardText}>나의 후기</Text>
          <StyledText>내가 작성한 상점 후기를 확인하세요!</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => console.log("My Inquiry")}
        >
          <Text style={styles.cardText}>나의 문의</Text>
          <StyledText>
            상점과 OP Shop에 대한 나의 문의 내역을 확인하세요!
          </StyledText>
        </TouchableOpacity>
      </View>

      <Button title="로그아웃" onPress={() => setUserInfo({ userIdx: "" })} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 15,
    flexWrap: "wrap",
  },
  profile: {
    borderWidth: 1,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImg: {
    width: 50,
    height: 50,
  },
  profileInfo: {
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  cardContainer: {
    width: "90%",
    flex: 1,
    marginHorizontal: 15,
  },
  card: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
