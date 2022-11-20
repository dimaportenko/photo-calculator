import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import tw from "./lib/tailwind";
import { AppNavigator } from "./navigation/AppNavigator";
import { navigationRef } from "./navigation/navigation";
import { navigationTheme } from "./navigation/navigationTheme";

export const AppContainer = () => {
  return (
    <View style={tw`flex-1`}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};
