import { View, Text } from "react-native";
import { CameraDenied } from "../components/camera/CameraDenied";
import { SimpleLoading } from "../components/loading/SimpleLoading";
import tw from "../lib/tailwind";
import { useCameraPermissions } from "../logic/permissions/useCameraPermissions";

export const CameraScreen = () => {
  const { cameraPermission } = useCameraPermissions();

  if (!cameraPermission) {
    return <SimpleLoading />;
  }

  if (cameraPermission === "denied") {
    return <CameraDenied />;
  }

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Camera Screen</Text>
    </View>
  );
};
