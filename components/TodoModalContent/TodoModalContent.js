import { useState } from "react";
import { Keyboard, View, Text, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./todoModalContent.styles";
import { URL_TODO_APP } from '@env';


export default function TodoModalContent({ id, title }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(`${URL_TODO_APP}/todos/shared_todos`, {
        
    headers : {
        "Content-Type" : "application/json",
    },
      method: "POST",
      body: JSON.stringify({
        todo_id: id,
        user_id: 1, 
        email: email, 
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
    Alert.alert(
      "Congratulations 🎉",
      `You successfully shared ${title} with ${email}`,
      [{ text: "Okay" }]
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Share your task</Text>
      <Text style={[styles.todo, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={styles.description}>
        Enter the email of the user you want to share your task with. Share a
        task with someone and stay in sinc with your goals everyday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
}