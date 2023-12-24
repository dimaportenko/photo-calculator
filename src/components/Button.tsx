import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

type Props = PropsWithChildren<{
  onPress: () => void;
}>;

export const Button = ({ onPress, children }: Props) => {
  return (
    <Pressable
      className="p-4 rounded-full bg-blue-500 active:bg-blue-400"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
