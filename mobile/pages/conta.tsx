import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Navbar } from "../navbar";

export const Conta = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // check session and redirect to home
    const main = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        return navigation.navigate("Cadastro");
      }

      setEmail(data.session.user.email ?? "");
      setLoading(false);
    };
    main();
  }, []);

  if (loading) {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#fff",
              padding: 20,
              borderRadius: 20,
              backgroundColor: "#2B2B2B",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Image
              style={{
                width: 14,
                height: 11,
                resizeMode: "cover",
              }}
              source={require("../assets/arrow.png")}
            />
            <Text style={{ fontSize: 16, color: "#fff" }}>Voltar</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
            Carregando...
          </Text>

          <StatusBar style="auto" />
        </View>

        <Navbar navigation={navigation} />
      </>
    );
  }

  const save = async () => {
    if (email) {
      await supabase.auth.updateUser({
        email,
      });
    } else if (password) {
      await supabase.auth.updateUser({
        password,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#fff",
            padding: 20,
            borderRadius: 20,
            backgroundColor: "#2B2B2B",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            style={{
              width: 14,
              height: 11,
              resizeMode: "cover",
            }}
            source={require("../assets/arrow.png")}
          />
          <Text style={{ fontSize: 16, color: "#fff" }}>Voltar</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Sua conta
        </Text>

        <TextInput
          placeholder="E-mail"
          keyboardType="default"
          textContentType="emailAddress"
          placeholderTextColor="#1C1C1C"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          keyboardType="default"
          secureTextEntry={true}
          textContentType="password"
          placeholderTextColor="#1C1C1C"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
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
          <TouchableOpacity onPress={save} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Salvar configurações</Text>
          </TouchableOpacity>
        </LinearGradient>

        <StatusBar style="auto" />
      </View>

      <Navbar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 30,
    paddingHorizontal: 30,
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
