import { Alert, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { deleteButtonStyles } from "../styles/deleteStyles";

type Props = {
  onConfirm: () => void;
};

export function DeleteButton({ onConfirm }: Props) {
  const handlePress = () => {
    Alert.alert("Confirmar exclusão", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: onConfirm },
    ]);
  };

  return (
    <Pressable onPress={handlePress} style={deleteButtonStyles.button}>
      <Feather name="trash-2" size={16} color="#fff" />
    </Pressable>
  );
}
