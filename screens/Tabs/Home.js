import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
    <View>
        <Loader/>
    </View>
);