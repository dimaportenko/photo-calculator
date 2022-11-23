import { ActivityIndicator, View } from "react-native";
import tw from "../../lib/tailwind";

export const SimpleLoading = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" />
    </View>
  );
};
