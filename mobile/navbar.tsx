import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";

export const Navbar = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20,
        height: 60,
        backgroundColor: "#2B2B2B",
        borderTopWidth: 1,
        borderTopColor: "#FFFFFF",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", { randomProp: Math.random().toString() })
        }
      >
        <Image
          style={{
            width: 25,
            height: 25,
            resizeMode: "cover",
          }}
          source={require("./assets/home.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Play")}>
        <Image
          style={{
            width: 25,
            height: 25,
            resizeMode: "cover",
          }}
          source={require("./assets/play.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
        <Image
          style={{
            width: 25,
            height: 25,
            resizeMode: "cover",
          }}
          source={require("./assets/people.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
