import React, {useState} from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {useMutation} from "react-apollo-hooks";
import {CONFRIM_SECRET} from "./AuthQueries";
import {useLogIn} from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFRIM_SECRET, {
        variables: {
            secret: confirmInput.value,
            email: route.params.email
        }
    });
    const handleConfirm = async () => {
        const { value } = confirmInput;
        if (value === "" || !value.includes(" ")) {
            return Alert.alert("Invalid Secret");
        }
        try {
            setLoading(true);
            const {data: { confirmSecret }} = await confirmSecretMutation();
            if (confirmSecret !== "" || confirmSecret ===  false) {
                logIn(confirmSecret);
            } else {
                Alert.alert("Wrong Secret!");
            }
        } catch (e) {
            Alert.alert("Can't confirm Secret");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...confirmInput}
                    placeholder="Secret"
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={handleConfirm}
                    autoCorrect={false}
                />
                <AuthButton loading={loading} text="Confirm" onPress={handleConfirm}/>
            </View>
        </TouchableWithoutFeedback>
    );
};