import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../Components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 1.3}px;
  margin-bottom: 40px;
`;

const TouchAble = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  margin-top: 20px;
  color:${props => props.theme.blueColor};
`;

export default ({ navigation }) => (
    <View>
        <Image source={require("../../assets/pppop_logo.png")} />
        <AuthButton text={"Create New Account"} onPress={() => navigation.navigate("Signup")} />
        <TouchAble onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log In</LoginLinkText>
            </LoginLink>
        </TouchAble>
    </View>
);