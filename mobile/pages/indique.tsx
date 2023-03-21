import { StatusBar } from "expo-status-bar";
import { Share } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Navbar } from "../navbar";
import { UserProgress } from "../types";

export const Indique = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [referral, setReferral] = useState("");

  useEffect(() => {
    // check session and redirect to home
    const main = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        return navigation.navigate("Cadastro");
      }

      const userProgress = await supabase
        .from("UserProgress")
        .select("*")
        .eq("userId", data.session.user.id)
        .single();

      const { referral } = userProgress.data as UserProgress;

      setReferral(referral);
    };

    main();
  }, []);

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
          Indique e ganhe
        </Text>

        <View
          style={{
            width: "100%",
            backgroundColor: "#2B2B2B",
            borderRadius: 8,
            flexDirection: "column",
            gap: 20,
            padding: 30,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>
            Estou ganhando recompensas para assistir!{"\n"}Vem ganhar comigo!
            {"\n"}
            👇👇👇🤑{"\n"}
            https://tik-cash.vercel.app/app?code={referral}
          </Text>

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
            <TouchableOpacity
              onPress={async () => {
                const { data, error } = await supabase.auth.getSession();

                if (error || !data.session) {
                  return navigation.navigate("Cadastro");
                }

                Share.share({
                  message: `Estou ganhando recompensas para assistir!\nVem ganhar comigo! \n👇👇👇🤑\nhttps://tik-cash.vercel.app/app?code=${referral}`,
                });
              }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Compartilhar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

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
