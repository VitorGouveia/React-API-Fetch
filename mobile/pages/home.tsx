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
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { Navbar } from "../navbar";

const scale = (
  inputY: number,
  yRange: [number, number],
  xRange: [number, number]
) => {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const percent = (inputY - yMin) / (yMax - yMin);
  const outputX = percent * (xMax - xMin) + xMin;

  return outputX;
};

export const Home = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [state, setState] = useState({
    end_goal: 10_000,
    start_goal: 0,
    current: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          return navigation.navigate("Cadastro");
        }

        // get current coins
        const userProgress = await supabase
          .from("UserProgress")
          .select("*")
          .eq("userId", data.session.user.id)
          .single();

        const progress = userProgress.data as
          | {
              coins: number;
              userId: string;
            }
          | undefined;

        setState((state) => {
          return {
            ...state,
            current: progress?.coins ?? 0,
          };
        });
      };

      main();
    }, [supabase, navigation])
  );

  useEffect(() => {
    // check session and redirect to home
    const main = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        return navigation.navigate("Cadastro");
      }

      // get current coins
      const userProgress = await supabase
        .from("UserProgress")
        .select("*")
        .eq("userId", data.session.user.id)
        .single();

      const progress = userProgress.data as
        | {
            coins: number;
            userId: string;
          }
        | undefined;

      setState((state) => {
        return {
          ...state,
          current: progress?.coins ?? 0,
        };
      });
    };
    main();
  }, [supabase, navigation]);

  const redeem = () => {
    navigation.navigate("Redeem");
  };

  const progress = scale(
    state.current,
    [state.start_goal, state.end_goal],
    [0, 100]
  );

  return (
    <>
      <View style={styles.container}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
          }}
          source={require("../assets/tiktok-icon.png")}
        />

        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Bem-vindo
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
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>ASSISTIR VÍDEOS</Text>
          </TouchableOpacity>
        </LinearGradient>

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
            onPress={() => navigation.navigate("Indique")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>INDIQUE E GANHE</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View
          style={{
            width: "100%",
            backgroundColor: "#2B2B2B",
            borderRadius: 8,
            flexDirection: "column",
            gap: 20,
            padding: 40,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {state.current} Moedas
          </Text>
          <Text style={{ color: "#fff", fontSize: 20 }}>Meta</Text>

          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{ alignItems: "center", gap: 4, flexDirection: "row" }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "cover",
                }}
                source={require("../assets/coin.png")}
              />

              <Text style={{ color: "#fff", fontSize: 20 }}>0</Text>
            </View>

            <View
              style={{ alignItems: "center", gap: 4, flexDirection: "row" }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "cover",
                }}
                source={require("../assets/coin.png")}
              />

              <Text style={{ color: "#fff", fontSize: 20 }}>10.000</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 30,
              borderRadius: 9999,
              backgroundColor: "#fff",
              alignItems: "flex-start",
            }}
          >
            <LinearGradient
              colors={["hsla(194, 100%, 50%, 1)", "hsla(302, 100%, 50%, 1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: "100%",
                // width: `${Math.floor((state.current / state.end_goal) * 100)}%`,
                width: `${Math.max(progress, 10)}%`,
                backgroundColor: "red",
                borderRadius: 9999,
              }}
            />
          </View>

          <TouchableOpacity
            disabled={state.current < state.end_goal}
            onPress={redeem}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "hsla(112, 100%, 40%, 1)",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              opacity: state.current < state.end_goal ? 0.5 : 1,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}>
              PEGAR RECOMPENSA
            </Text>
          </TouchableOpacity>
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
    alignItems: "center",
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
