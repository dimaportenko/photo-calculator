import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useImageSelection = () => {
  const [selectedAsset, setSelectedAsset] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >();
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setSelectedAsset(result.assets?.[0]);
    }
  };

  return {
    asset: selectedAsset,
    pickImageAsync,
  };
};
