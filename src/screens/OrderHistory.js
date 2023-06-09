import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Card } from "react-native-elements";
import styled from "styled-components";
import { ItemContext, UserContext } from "../contexts";
import { Button, ButtonNoFlex, ColorfulText } from "../components";
import axios from "axios";

const TotalPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  margin: 3px;
  color: #111;
`;
const OrderHistory = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("orderHistory");
  const { cartItems, setCartItems } = useContext(ItemContext);
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [cancelOrder, setCancelOrder] = useState([]);

  let sum = 0;

  const result = () => {
    orderList.filter((item) => {
      item.status == "CANCELED";
    });
  };
  cartItems.map((item) => {
    sum += parseFloat(item.price);
  });
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://opshop.shop:3000/opshop/mypage/orders",
        headers: {
          "x-access-token": `${user?.jwt}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;
          if (result) {
            setOrderList(result);
            // console.log(result);
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
  }, [refresh]);

  const handleCancel = async (orderId) => {
    await axios({
      method: "post",
      url: `http://opshop.shop:3000/opshop/mypage/order-cancel/${orderId}`,
      headers: {
        "x-access-token": `${user?.jwt}`,
      },
    })
      .then((response) => {
        if (response) {
          console.log(response.data);
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
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "orderHistory" && styles.activeTab,
            ]}
            onPress={() => {
              handleTabChange("orderHistory");
              setRefresh(!refresh);
            }}
          >
            <Text style={styles.tabText}>주문 내역</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "shippingTracking" && styles.activeTab,
            ]}
            onPress={() => handleTabChange("shippingTracking")}
          >
            <Text style={styles.tabText}>배송 조회</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "orderCancellation" && styles.activeTab,
            ]}
            onPress={() => {
              handleTabChange("orderCancellation");
              result();
              console.log(cancelOrder[0]);
              setRefresh(!refresh);
            }}
          >
            <Text style={styles.tabText}>주문 취소</Text>
          </TouchableOpacity>
        </View>
        {/* Render content based on the selected tab */}
        {activeTab === "orderHistory" && (
          <View style={styles.container}>
            {orderList.map((a, i) => {
              return (
                <Card containerStyle={styles.card} key={i}>
                  <TotalPrice>
                    <Card.Title style={styles.cardTitle}>
                      주문 번호 : {a.order_id}
                    </Card.Title>
                    <Text style={styles.cardText}>{a.date}</Text>
                  </TotalPrice>
                  <Card.Divider />
                  <StyledText>{a.product_name}</StyledText>
                  <StyledText>가격 : {a.price.toLocaleString()}원</StyledText>
                  <StyledText>주문자 : {a.orderer} 님</StyledText>

                  <StyledText>배송지명 : {a.address_name}</StyledText>
                  <StyledText>{a.address}</StyledText>
                  <TotalPrice style={{ marginTop: 9 }}>
                    <ColorfulText value={a.status} />
                    {/* <TouchableOpacity
                      style={styles.stateButton}
                      onPress={() => {
                        Alert.alert(
                          "해당 주문을 취소하시겠어요?",
                          "맞으시면 '취소'를 눌러주세요.",
                          [
                            {
                              text: "아니요",

                              style: "cancel",
                            },
                            {
                              text: "취소",
                              onPress: () => {
                                handleCancel(a.order_id);
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <Text style={{ color: "white" }}>주문 취소</Text>
                    </TouchableOpacity> */}
                  </TotalPrice>
                </Card>
              );
            })}
          </View>
        )}
        {activeTab === "shippingTracking" && <View>{<Text>배송</Text>}</View>}
        {activeTab === "orderCancellation" && (
          <View style={styles.container}>
            {orderList.map((a, i) => {
              return (
                <Card containerStyle={styles.card} key={i}>
                  <TotalPrice>
                    <Card.Title style={styles.cardTitle}>
                      주문 번호 : {a.order_id}
                    </Card.Title>
                    <Text style={styles.cardText}>{a.date}</Text>
                  </TotalPrice>
                  <Card.Divider />
                  <StyledText>{a.product_name}</StyledText>
                  <StyledText>가격 : {a.price.toLocaleString()}원</StyledText>
                  <StyledText>주문자 : {a.orderer} 님</StyledText>

                  <StyledText>배송지명 : {a.address_name}</StyledText>
                  <StyledText>{a.address}</StyledText>
                  <TotalPrice style={{ marginTop: 9 }}>
                    <ColorfulText value={a.status} />
                    <TouchableOpacity
                      style={styles.stateButton}
                      onPress={() => {
                        Alert.alert(
                          "해당 주문을 취소하시겠어요?",
                          "맞으시면 '취소'를 눌러주세요.",
                          [
                            {
                              text: "아니요",

                              style: "cancel",
                            },
                            {
                              text: "취소",
                              onPress: () => {
                                handleCancel(a.order_id);
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <Text style={{ color: "white" }}>주문 취소</Text>
                    </TouchableOpacity>
                  </TotalPrice>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },

  cardText: {
    fontSize: 16,
    color: "grey",
  },
  stateButton: {
    backgroundColor: "#111",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  activeStateButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
export default OrderHistory;
