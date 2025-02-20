import { Text, View, TextInput, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "@/src/components/Participant";
import { Button } from "@/src/components/button";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);

  function handleParticipantAdd() {
    setParticipants((prevState) => [
      ...prevState,
      `Participante ${prevState.length + 1}`,
    ]);
  }

  function handleDeleteParticipant(name: string) {
    Alert.alert(
      "Remover participante",
      `Deseja remover o participante ${name}?`,
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => console.log(name) },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Quinta-feira, 13 de Fev. de 2025</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
        />
        <Button onPress={handleParticipantAdd} text="+" type="add" />
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={(name) => handleDeleteParticipant(name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes a sua lista
            de presença
          </Text>
        )}
      />
    </View>
  );
}
