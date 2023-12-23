import { Text, View } from "react-native";

import { Button } from "@/components/Button";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home page</Text>
      <Button />
    </View>
  );
}
