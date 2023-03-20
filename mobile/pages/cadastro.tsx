import { StatusBar } from "expo-status-bar";
import { Alert, Linking } from "react-native";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { useEffect, useState } from "react";

export const Cadastro = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["hsla(302, 100%, 12%, 1)", "hsla(184, 100%, 13%, 1)"]}
        end={{ x: -0.2, y: 0.3 }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          gap: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
          }}
          source={require("../assets/tiktok-icon.png")}
        />

        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Faça seu login
        </Text>

        <View style={{ width: "70%", gap: 12 }}>
          <TextInput
            placeholder="E-mail"
            keyboardType="default"
            placeholderTextColor="#1C1C1C"
            style={styles.input}
          />

          <TextInput
            placeholder="Senha"
            keyboardType="default"
            placeholderTextColor="#1C1C1C"
            style={styles.input}
          />

          <LinearGradient
            colors={["hsla(184, 100%, 50%, 1)", "hsla(302, 100%, 50%, 1)"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              height: 50,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <TouchableOpacity
          onPress={async () => {
            await Linking.openURL(
              "https://pepper.com.br/checkout/index.html?p=21168&o=16335"
            );
          }}
          style={{
            height: 50,
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "hsla(112, 100%, 40%, 1)",
            elevation: 20,
            shadowColor: "hsla(112, 100%, 40%, 1)",
          }}
        >
          <Text style={styles.buttonText}>LIBERAR ACESSO</Text>
        </TouchableOpacity>
      </LinearGradient>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    color: "gray",
    height: 52,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
