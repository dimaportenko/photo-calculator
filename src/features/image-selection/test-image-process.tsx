import { process } from "mlkit-module";
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";

export const TestImageProcess = () => {
  const { top, bottom } = useSafeAreaInsets();
  const imageSource = require("../../../assets/test.jpg");

  const processImage = async () => {
    const img = Image.resolveAssetSource(imageSource);
    console.log("test process", img);

    const response = await process(img.uri);
    console.log("response", response);
  };

  return (
    <View className="flex-1" style={{ paddingTop: top, paddingBottom: bottom }}>
      <View className="flex-1">
        <Image
          className="h-full w-full"
          resizeMode="contain"
          source={imageSource}
        />
      </View>

      <View className="absolute w-full" style={{ bottom }}>
        <View className="flex w-full justify-around flex-row">
          <Button onPress={processImage}>
            <Text className="text-white text-[16px]">Process</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
