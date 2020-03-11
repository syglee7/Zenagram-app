import React, {useState} from "react";
import styled from "styled-components";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {useMutation} from "react-apollo-hooks";
import {CREATE_ACCOUNT} from "./AuthQueries";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { GOOGLE_ID, FACEBOOK_ID } from 'react-native-dotenv'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.lightGreyColor};
  
`;

export default ({ navigation }) => {
    const firstNameInput = useInput("");
    const lastNameInput = useInput("");
    const userNameInput = useInput("");
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            username: userNameInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value
        }
    });

    const handleSignUp = async () => {
        const { value: email } = emailInput;
        const { value: firstName } = firstNameInput;
        const { value: lastName } = lastNameInput;
        const { value: userName } = userNameInput;


        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "") {
            return Alert.alert("Email can't be empty");
        } else if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }

        if (firstName === "" || lastName === "") {
            return Alert.alert("I need your name");
        }

        if (userName === "") {
            return Alert.alert("Invalid username");
        }

        try {
            setLoading(true);
            const {data: {createAccount}} = await createAccountMutation();
            Alert.alert("Account Created", "Log in now");
            if (createAccount) {
                navigation.navigate("Login", { email });
            }
        } catch (e) {
            Alert.alert("Username or Email taken.");
        } finally {
            setLoading(false);
        }
    };

    const facebookSignUp  = async () => {
        try {
            setLoading(true);
            await Facebook.initializeAsync(FACEBOOK_ID);
            const {
                type,
                token
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,first_name,last_name,email`);
                const {email, first_name, last_name, name } = await response.json();
                updateFormData(email, first_name, last_name, name);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    const googleSignUp = async () => {
        try {
            setLoading(true);
            const result = await Google.logInAsync({
                androidClientId: GOOGLE_ID,
                scopes: ['profile', 'email'],
            });


            if (result.type === 'success') {
                let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${result.accessToken}` },
                });
                const {email, family_name, given_name, name} = await userInfoResponse.json();
                updateFormData(email, family_name, given_name, name);
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (email, firstName, lastName, username) => {
        emailInput.setValue(email);
        firstNameInput.setValue(firstName);
        lastNameInput.setValue(lastName);
        userNameInput.setValue(username);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <AuthInput
                        {...firstNameInput}
                        placeholder="First Name"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <AuthInput
                        {...lastNameInput}
                        placeholder="Last Name"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <AuthInput
                        {...emailInput}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="send"
                        autoCorrect={false}
                    />
                    <AuthInput
                        {...userNameInput}
                        placeholder="User Name"
                        autoCorrect={false}
                    />
                    <AuthButton loading={loading} text="Sign Up" onPress={handleSignUp}/>
                    <FBContainer>
                        <AuthButton
                            bgColor={"#2D4DA7"}
                            text="Sign Up With FaceBook"
                            onPress={facebookSignUp}
                            loading={false}
                        />
                        <AuthButton
                            bgColor={"#EE1922"}
                            text="Sign Up With Google"
                            onPress={googleSignUp}
                            loading={false}
                        />
                    </FBContainer>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};