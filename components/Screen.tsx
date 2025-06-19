import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
