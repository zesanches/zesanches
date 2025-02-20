import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
  onPress: () => void;
  text: string;
  type: "delete" | "add";
}

export function Button({ onPress, text, type }: ButtonProps) {
  const styleButton = {
    delete: styles.delete,
    add: styles.add,
  };

  return (
    <TouchableOpacity style={styleButton[type]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
