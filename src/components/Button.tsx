import { Pressable, Text } from "react-native";

export const Button = () => {
  return (
    <Pressable onPress={() => alert("Button pressed")}>
      <Text>Test</Text>
    </Pressable>
  );
};
