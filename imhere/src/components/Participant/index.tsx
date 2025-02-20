import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";

interface ParticipantProps {
  name: string;
  onRemove: (name: string) => void;
}

export function Participant({ name, onRemove }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Button onPress={() => onRemove(name)} text="-" type="delete" />
    </View>
  );
}
