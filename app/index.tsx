import { View } from "react-native";

import { ImageSelection } from "@/features/image-selection";

export default function Home() {
  return (
    <View className="flex-1 bg-black">
      <ImageSelection />
    </View>
  );
}
