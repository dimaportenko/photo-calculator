import { Pressable, Text } from "react-native";

export const Button = () => {
  return (
    <Pressable onPress={() => alert("Button pressed")}>
      <Text className="text-[18px] pt-4 text-blue-500">Test</Text>
    </Pressable>
  );
};
