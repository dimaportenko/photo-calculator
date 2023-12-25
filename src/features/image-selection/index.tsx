import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { hello, process } from "mlkit-module";

import { useImageSelection } from "./use-image-selection";

import { Button } from "@/components/Button";

export const ImageSelection = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { asset, pickImageAsync } = useImageSelection();

  const processImage = async () => {
    if (!asset) {
      return;
    }

    const response = await process(asset.uri);
    console.log("test process", response);
  };

  return (
    <View className="flex-1" style={{ paddingTop: top, paddingBottom: bottom }}>
      <View className="flex-1">
        <Image
          className="h-full w-full"
          resizeMode="contain"
          source={{ uri: asset?.uri }}
        />
      </View>

      <View className="absolute w-full" style={{ bottom }}>
        <View className="flex w-full justify-around flex-row">
          <Button onPress={pickImageAsync}>
            <Text className="text-white text-[16px]">Pick an image</Text>
          </Button>
          {!!asset?.uri && (
            <Button onPress={processImage}>
              <Text className="text-white text-[16px]">Process</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};
