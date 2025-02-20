import { Text, View, TextInput, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "@/src/components/Participant";
import { Button } from "@/src/components/button";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participants already exists",
        "Participants already exists in the list, please add another one"
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleDeleteParticipant(name: string) {
    Alert.alert(
      "Remove Participant",
      `Do you like to remove the participant ${name}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () =>
            setParticipants((prevState) =>
              prevState.filter((participant) => participant !== name)
            ),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Event Name</Text>
      <Text style={styles.eventDate}>Wednesday, February 19h of 2025</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Participant Name"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
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
            Nobody is in the event yet? Add some participants!
          </Text>
        )}
      />
    </View>
  );
}
