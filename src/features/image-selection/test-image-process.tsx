import { ProcessResult, process } from "mlkit-module";
import { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";

export const TestImageProcess = () => {
  const { top, bottom } = useSafeAreaInsets();
  const imageSource = require("../../../assets/test.jpg");
  const [result, setResult] = useState<ProcessResult | undefined>();
  const { width, height } = useWindowDimensions();
  const [imageRenderRect, setImageRenderRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [imageActualRect, setImageActualRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const processImage = async () => {
    const img = Image.resolveAssetSource(imageSource);
    console.log("test process", img);

    try {
      const response = await process(img.uri);
      setResult(response);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!imageRenderRect.width || !result) return;

    const aspectRatioSpace = imageRenderRect.width / imageRenderRect.height;
    const aspectRatioImage = result.width / result.height;

    if (aspectRatioSpace < aspectRatioImage) {
      const newHeight = imageRenderRect.width / aspectRatioImage;
      const newTop = (imageRenderRect.height - newHeight) / 2;
      setImageActualRect({
        x: 0,
        y: newTop,
        width: imageRenderRect.width,
        height: newHeight,
      });
    } else {
      const newWidth = imageRenderRect.height * aspectRatioImage;
      const newLeft = (imageRenderRect.width - newWidth) / 2;
      setImageActualRect({
        x: newLeft,
        y: 0,
        width: newWidth,
        height: imageRenderRect.height,
      });
    }
  }, [imageRenderRect, result]);

  return (
    <View
      className="flex-1"
      style={{
        paddingTop: Platform.select({
          ios: top,
          android: 0,
        }),
        paddingBottom: bottom,
      }}
    >
      <View className="flex-1">
        <Image
          className="h-full w-full "
          resizeMode="contain"
          source={imageSource}
          onLayout={(event) => {
            setImageRenderRect(event.nativeEvent.layout);
          }}
        />
      </View>

      <View className="absolute w-full" style={{ bottom }}>
        <View className="flex w-full justify-around flex-row">
          <Button onPress={processImage}>
            <Text className="text-white text-[16px]">Process</Text>
          </Button>
        </View>
      </View>

      {result && (
        <View className="absolute w-full h-full" style={{ bottom }}>
          {result.blocks.map((block, index) => {
            return (
              <View
                key={index}
                className="absolute border border-red-500"
                style={{
                  top: block.y * imageActualRect.height + imageActualRect.y,
                  left: block.x * imageActualRect.width + imageActualRect.x,
                  width: block.width * imageActualRect.width,
                  height: block.height * imageActualRect.height,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
