import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Cadastro } from "./pages/cadastro";
import { Home } from "./pages/home";
import { Indique } from "./pages/indique";
import { Conta } from "./pages/conta";
import { Play } from "./pages/play";
import { Redeem } from "./pages/redeem";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Indique" component={Indique} />
        <Stack.Screen name="Conta" component={Conta} />
        <Stack.Screen name="Play" component={Play} />
        <Stack.Screen name="Redeem" component={Redeem} />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
}
