import { View } from "react-native";

import { TestImageProcess } from "@/features/image-selection/test-image-process";

export default function Home() {
  return (
    <View className="flex-1 bg-black">
      <TestImageProcess />
    </View>
  );
}
