import { View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Inicial() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Ir para Home"
        onPress={() => router.push("/navigation/home")}
      />
    </View>
  );
}
