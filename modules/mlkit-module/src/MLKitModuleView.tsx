import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MLKitModuleViewProps } from './MLKitModule.types';

const NativeView: React.ComponentType<MLKitModuleViewProps> =
  requireNativeViewManager('MLKitModule');

export default function MLKitModuleView(props: MLKitModuleViewProps) {
  return <NativeView {...props} />;
}
