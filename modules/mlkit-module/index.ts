import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to MLKitModule.web.ts
// and on native platforms to MLKitModule.ts
import MLKitModule from './src/MLKitModule';
import MLKitModuleView from './src/MLKitModuleView';
import { ChangeEventPayload, MLKitModuleViewProps } from './src/MLKitModule.types';

// Get the native constant value.
export const PI = MLKitModule.PI;

export function hello(): string {
  return MLKitModule.hello();
}

export async function setValueAsync(value: string) {
  return await MLKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(MLKitModule ?? NativeModulesProxy.MLKitModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MLKitModuleView, MLKitModuleViewProps, ChangeEventPayload };
