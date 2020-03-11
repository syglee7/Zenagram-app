import React from 'react';
import styled from "styled-components";
import ProTypes from 'prop-types';
import constants from "../constants";
import {ActivityIndicator} from "react-native";

const TouchAble = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props => props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0 50px;
  border-radius: 4px;
  width: ${constants.width / 1.5 }px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({text, onPress, loading = false, bgColor = null }) => {
    return (
        <TouchAble disabled={loading} onPress={onPress}>
            <Container bgColor={bgColor}>
               {loading? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
            </Container>
        </TouchAble>
    )
};

AuthButton.propTypes = {
    loading: ProTypes.bool,
    text: ProTypes.string.isRequired,
    onPress: ProTypes.func.isRequired
};

export default AuthButton;