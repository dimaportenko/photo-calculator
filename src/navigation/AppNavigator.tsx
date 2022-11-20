import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "../CameraScreen";

import * as routes from "./routes";

type AppNavigatorParams = {
  [routes.CAMERA_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParams>();

export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.CAMERA_SCREEN} component={CameraScreen} />
  </Stack.Navigator>
);
