import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to MLKitModule.web.ts
// and on native platforms to MLKitModule.ts
import MLKitModule from "./src/MLKitModule";
import MLKitModuleView from "./src/MLKitModuleView";
import {
  ChangeEventPayload,
  MLKitModuleViewProps,
} from "./src/MLKitModule.types";

// Get the native constant value.
export const PI: number = MLKitModule.PI;

export function hello(): string {
  return MLKitModule.hello();
}

export async function setValueAsync(value: string) {
  return await MLKitModule.setValueAsync(value);
}

export type Block = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ProcessResult = {
  width: number;
  height: number;
  blocks: Block[];
};

export async function process(imgSrc: string): Promise<ProcessResult> {
  return await MLKitModule.process(imgSrc);
}

const emitter = new EventEmitter(MLKitModule ?? NativeModulesProxy.MLKitModule);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { MLKitModuleView, MLKitModuleViewProps, ChangeEventPayload };
