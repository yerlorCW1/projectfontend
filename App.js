import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import Signup from "./screens/signup"; // Renamed from signup to Signup
import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }} // Corrected typo
        />
        <Stack.Screen
          name="signup"
          component={Signup} // Corrected component name
          options={{ headerShown: false }} // Corrected typo
        />
        <Stack.Screen
          name="tabs"
          component={Tabs} // Ensure Tabs is imported or defined
          options={{ headerShown: false }} // Corrected typo
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
