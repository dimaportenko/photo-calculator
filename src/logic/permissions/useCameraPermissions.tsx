import { useEffect, useState } from "react";
import {
  Camera,
  CameraPermissionRequestResult,
} from "react-native-vision-camera";

export const useCameraPermissions = () => {
  const [cameraPermission, setCameraPermission] = useState<
    CameraPermissionRequestResult | undefined
  >();

  const getPermissions = async () => {
    const permissions = await Camera.requestCameraPermission();
    setCameraPermission(permissions);
  };

  // get the current permission status
  useEffect(() => {
    getPermissions();
  }, []);

  return { cameraPermission, getPermissions };
};
