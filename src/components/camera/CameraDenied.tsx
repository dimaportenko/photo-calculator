import { View, Text, Linking } from "react-native";
import tw from "../../lib/tailwind";

export const CameraDenied = () => {
  const goToSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-2xl`}>Camera permission denied</Text>
      <Text style={tw`text-2xl`}>
        Go to{" "}
        <Text style={tw`text-blue-300`} onPress={() => goToSettings()}>
          Settings
        </Text>{" "}
        allow Camera access
      </Text>
    </View>
  );
};
