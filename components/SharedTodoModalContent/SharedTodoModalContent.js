import { useEffect, useState } from "react";
import { Keyboard, View, Text, Button, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { URL_TODO_APP } from '@env';
import { styles } from "./sharedTodoModalContent.styles";

export default function SharedTodoModalContent({
  id,
  title,
  shared_with_id,
  completed,
}) {
  const [author, setAuthor] = useState({});
  const [sharedWith, setSharedWith] = useState({});
  useEffect(() => {
    fetchInfo();
  }, []);

  async function fetchInfo() {
    const response = await fetch(
      `${URL_TODO_APP}/todos/shared_todos/${id}`,
      {
        method: "GET",
      }
    );
    const { author, shared_with } = await response.json();
    setAuthor(author);
    setSharedWith(shared_with);
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Shared Tasks</Text>
      <Text style={[styles.todo, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.title]}>Status</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.title, { color: "white" }]}>
          {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.description]}>PARTICIPANTS
      {" "}{" "}<Feather name = "users" size={15}/>
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {author.name}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {sharedWith.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
