import { ReactNode } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { screenStyles } from "../styles/screenStyles";

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <StatusBar style="light" translucent />

      <KeyboardAvoidingView
        style={screenStyles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={screenStyles.container}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
