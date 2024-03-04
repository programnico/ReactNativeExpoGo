import React, { useState } from 'react'
import { StyleSheet, View, Button, Text, ImageBackground } from "react-native";
import * as Google from "expo-google-app-auth";

import { AuthGoogleGestion } from '../funciones/AuthGoogleGestion';
export const AuthenticationScreen = ({ navigation }) => {
    const { getUsuarioById } = AuthGoogleGestion();
    const [stateEmailUser, setStateEmailUser] = useState("");
    const signInAsync = async () => {
        try {
            const logInResult = await Google.logInAsync({
                iosClientId: `your ios client id`,
                androidClientId: `your android client id`,
            });

            if (logInResult.type === "success") {
                getUsuarioById(logInResult.user.email, logInResult.user.name);
                setStateEmailUser(logInResult.user.email);
                //recomendado pasar usuario por parametro props
                //navigation.navigate("Index");
                navigation.navigate({ name: 'Index', params: { email: logInResult.user.email }, merge: true, });
            }
        } catch (error) {
            console.log("LoginScreen.js 19 | error with login", error);
        }
    };
    return (
        <ImageBackground source={require('../assets/Login.png')} resizeMode="cover" style={styles.login}>
            <View style={styles.container}>
                <View style={styles.contButton}>
                    <Button title="Iniciar session con Google" onPress={signInAsync} color="rgb(180, 180, 180)" />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contButton: {
        width: '75%',
        alignSelf: 'center'
    },
    login: {
        width: '100%',
        height: '100%'
    }
})