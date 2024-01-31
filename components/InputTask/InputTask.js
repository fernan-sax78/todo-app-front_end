import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { URL_TODO_APP } from '@env';
import { styles } from "./inputTask.styles";

export default function InputTask({ todos, setTodos }) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojies(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojies(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (messageBody === "") {
      return;
    } else {
      const response = await fetch(`${URL_TODO_APP}/todos`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          title: messageBody,
        }),
      });
      const newTodo = await response.json();
      setTodos([...todos, { ...newTodo, shared_with_id: null }]);
      Keyboard.dismiss();
      setMessageBody("");
    }
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {showEmojies && (
          <Animated.View
            style={[
              styles.emojiesContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📝" />
            <RenderEmoji emoji="🎁" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🏃🏻‍♂️" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? "black" : "#00000050"}
              style={{ paddingLeft: 15 }}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

