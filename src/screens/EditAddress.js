import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Card, SocialIcon } from "react-native-elements";
import styled from "styled-components";
import {
  Button,
  CustomButton,
  Checkbox,
  Input,
  ButtonNoFlex,
} from "../components";
import { ItemContext, UserContext } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Postcode from "@actbase/react-daum-postcode";

const InputContainer = styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
`;
const TotalPrice = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
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

const StyledText = styled.Text`
  font-size: 18px;
  color: #111;
  font-weight: 600;
  margin: 5px;
`;

const StyledButton = styled.Button`
  background-color: black;
  color: white;
`;

const EditAddress = ({ navigation, route }) => {
  const orderKey = route.params.orderKey;
  const { user, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    console.log(user?.jwt);
    try {
      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/mypage/address",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data;
          console.log("dd");
          console.log(result);
          if (result) {
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
  }, []);
  const [showModal, setShowModal] = useState(false);
  const { address, setAddress } = useContext(ItemContext);
  const [recipient, setRecipent] = useState("");
  const [addressNickname, setAddressNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState(0);
  const [postCode, setPostCode] = useState(false);

  const handleEditModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const [showModal2, setShowModal2] = useState(false);

  const handleAddAddress = () => {
    setShowModal2(true);
  };

  const handleContinueShopping2 = () => {
    setShowModal2(false);
  };
  const editAddress = () => {
    setAddress();
  };
  const getAddressData = (data) => {
    let defaultAddress = ""; // 기본주소
    if (data.buildingName === "N") {
      defaultAddress = data.apartment;
    } else {
      defaultAddress = data.buildingName;
    }
    console.log(data);
    setShippingAddress(data.address + "," + defaultAddress);
    setZipcode(data.zonecode);

    setPostCode(false);

    // navigation.goBack();
    // route.params.onSelect({
    //   zone_code: data.zonecode,
    //   default_address: data.address + " " + defaultAddress,
    // });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StyledText>회원 정보</StyledText>
        <Card containerStyle={styles.card}>
          <TotalPrice
            onPress={() => {
              handleEditModalOpen();
            }}
          >
            <Text style={styles.cardTitle}>박상호</Text>
            <ButtonIcon />
          </TotalPrice>
          <Card.Divider />
          <Text style={styles.cardText}>Email : email@example.com </Text>
          <Text style={styles.cardText}>PW : ************* </Text>
        </Card>
        <StyledText>배송지</StyledText>
        {address.map((item, i) => {
          return (
            <Card containerStyle={styles.card}>
              <TotalPrice
                onPress={() => {
                  setAddressNumber(i);
                  const splitAddress = item.address.split(",");
                  setAddressNickname(item.addressName);
                  setShippingAddress(splitAddress[0]);
                  setDetailAddress(splitAddress[1]);
                  handleEditModalOpen();
                }}
              >
                <Text style={styles.cardTitle}>{item.addressName}</Text>
                <ButtonIcon />
              </TotalPrice>
              <Card.Divider />
              <Text style={styles.cardText}>{item.zipcode} </Text>
              <Text style={styles.cardText}>{item.address} </Text>

              <Checkbox
                title="해당 배송지를 기본 배송지로"
                // def={item.is_main == "Y" ? 1 : 0}
                def={i == 0 ? 1 : 0}
                onPress={() => {
                  address.map((a, i) => {
                    if (a.is_main == "Y") {
                      a.is_main = "N";
                    }
                  });
                  item.is_main = "Y";
                  setAddress([...address]);
                  console.log(address);

                  // 배열 순서 바꾸는 방식으로 기본 배송지
                  let tmp = item;
                  address[i] = address[0];
                  address[0] = tmp;
                  setAddress([...address]);
                  console.log(address);
                }}
              />
            </Card>
          );
        })}
      </ScrollView>
      <Button
        onPress={handleAddAddress}
        title="배송지 추가하기"
        containerStyle={styles.button}
      />
      {orderKey == 1 ? (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="주문화면으로 돌아가기"
          containerStyle={styles.orderBackButton}
          textStyle={{ color: "black", textDecorationLine: "underline" }}
        />
      ) : (
        <></>
      )}
      <Modal visible={showModal} animationType="slide">
        <ScrollView>
          <View style={styles.modalContainer}>
            <StyledText style={{ fontSize: 20, fontWeight: "bold" }}>
              배송지 변경하기
            </StyledText>
            <Input
              label="이름 (필수)"
              placeholder="수령인"
              value={recipient}
              onChangeText={setRecipent}
            />
            <Input
              label="배송지 별칭(선택)"
              placeholder="배송지명"
              value={addressNickname}
              onChangeText={setAddressNickname}
            />
            <Input
              label="휴대전화 (필수)"
              placeholder="'-'는 제외하고 입력해주세요"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 35,
              }}
            >
              <Input
                onFocus={() => {}}
                label="우편번호"
                value={zipcode}
                placeholder="우편번호"
                containerStyle={{ width: 300 }}
              />

              <ButtonNoFlex
                textStyle={{ fontSize: 16 }}
                containerStyle={{ height: 40 }}
                title="주소찾기"
                onPress={() => {
                  setPostCode(true);
                }}
              />
            </View> */}
            {postCode == true ? (
              <Postcode
                style={{ width: "100%", height: 320 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={(data) => {
                  getAddressData(data);
                }}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 35,
                }}
              >
                <Input
                  onFocus={() => {}}
                  label="우편번호"
                  value={zipcode}
                  placeholder="우편번호"
                  containerStyle={{ width: 300 }}
                />

                <ButtonNoFlex
                  textStyle={{ fontSize: 16 }}
                  containerStyle={{ height: 40 }}
                  title="주소찾기"
                  onPress={() => {
                    setPostCode(true);
                  }}
                />
              </View>
            )}

            {shippingAddress == false ? (
              <></>
            ) : (
              <>
                <Input
                  label="주소 (필수)"
                  placeholder="판교역로 166, 분당 주공, 백현동 53"
                  value={shippingAddress}
                  onChangeText={setShippingAddress}
                />
                <Input
                  label="상세 주소 ( ',' 은 입력하지 말아주세요 ) (필수)"
                  placeholder="아파트 동과 호수  "
                  value={detailAddress}
                  onChangeText={setDetailAddress}
                />
              </>
            )}

            <View style={styles.modalButtonsContainer}>
              <Button
                title="변경"
                onPress={() => {
                  address[addressNumber] = {
                    id: addressNumber,
                    zipcode: zipcode,
                    addressName: addressNickname,
                    address: shippingAddress + "," + detailAddress,
                  };
                  setAddress([...address]);
                  console.log(address);
                  handleModalClose();
                }}
              />
              <Button
                title="취소"
                containerStyle={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#000",
                }}
                textStyle={{ color: "#111" }}
                onPress={() => {
                  handleModalClose();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Modal visible={showModal2} animationType="slide">
        <ScrollView>
          <View style={styles.modalContainer}>
            <StyledText style={{ fontSize: 20, fontWeight: "bold" }}>
              배송지 추가하기
            </StyledText>
            <Input
              label="이름 (필수)"
              placeholder="수령인"
              value={recipient}
              onChangeText={setRecipent}
            />
            <Input
              label="배송지 별칭(선택)"
              placeholder="배송지명"
              value={addressNickname}
              onChangeText={setAddressNickname}
            />
            <Input
              label="휴대전화 (필수)"
              placeholder="'-'는 제외하고 입력해주세요"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 35,
              }}
            >
              <Input
                onFocus={() => {}}
                label="우편번호"
                value={zipcode}
                placeholder="우편번호"
                containerStyle={{ width: 300 }}
              />

              <ButtonNoFlex
                textStyle={{ fontSize: 16 }}
                containerStyle={{ height: 40 }}
                title="주소찾기"
                onPress={() => {
                  setPostCode(true);
                }}
              />
            </View> */}
            {postCode == true ? (
              <Postcode
                style={{ width: "100%", height: 320, marginTop: 10 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={(data) => {
                  getAddressData(data);
                }}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 35,
                }}
              >
                <Input
                  onFocus={() => {}}
                  label="우편번호"
                  value={zipcode}
                  placeholder="우편번호"
                  containerStyle={{ width: 300 }}
                />

                <ButtonNoFlex
                  textStyle={{ fontSize: 16 }}
                  containerStyle={{ height: 40 }}
                  title="주소찾기"
                  onPress={() => {
                    setPostCode(true);
                  }}
                />
              </View>
            )}

            {shippingAddress == false ? (
              <></>
            ) : (
              <>
                <Input
                  label="주소 (필수)"
                  placeholder="판교역로 166, 분당 주공, 백현동 53"
                  value={shippingAddress}
                  onChangeText={setShippingAddress}
                />
                <Input
                  label="상세 주소 ( ',' 은 입력하지 말아주세요 ) (필수)"
                  placeholder="아파트 동과 호수  "
                  value={detailAddress}
                  onChangeText={setDetailAddress}
                />
              </>
            )}

            <View style={styles.modalButtonsContainer}>
              <Button
                title="추가"
                onPress={() => {
                  setAddress([
                    ...address,
                    {
                      id: address.length + 1,
                      zipcode: zipcode,
                      addressName: addressNickname,
                      address: shippingAddress + "," + detailAddress,
                    },
                  ]);
                  handleContinueShopping2();

                  console.log(address);
                }}
              />
              <Button
                title="취소"
                containerStyle={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#000",
                }}
                textStyle={{ color: "#111" }}
                onPress={() => {
                  handleContinueShopping2();
                }}
              />
            </View>
          </View>
        </ScrollView>
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
    padding: 30,
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
  zipcodeInput: {
    height: 40,
    borderColor: "#a6a6a6",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  orderBackButton: {
    backgroundColor: "#f1f1f1",
    margin: 0,
    borderColor: "black",
  },
});

export default EditAddress;
