import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function SendMessageScreen({ navigation }) {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!sender.trim() || !recipient.trim() || !message.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://10.0.2.2:3000/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, recipient, message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      Alert.alert(
        "Message Status",
        result.status || "Message sent successfully!"
      );
      setMessage("");
    } catch (error) {
      Alert.alert("Error", "Failed to send message");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Nav Bar */}
      <View style={styles.navBar}>
        <Pressable style={[styles.navButton, styles.navButtonActive]}>
          <Text style={[styles.navButtonText, styles.navButtonTextActive]}>
            Send
          </Text>
        </Pressable>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Retrieve")}
        >
          <Text style={styles.navButtonText}>Retrieve</Text>
        </Pressable>
      </View>

      <Text style={styles.header}>📤 Send Message</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Sender"
          value={sender}
          onChangeText={setSender}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChangeText={setRecipient}
          editable={!loading}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          editable={!loading}
        />
        <Pressable
          style={[
            styles.button,
            (loading ||
              !sender.trim() ||
              !recipient.trim() ||
              !message.trim()) &&
              styles.disabledButton,
          ]}
          onPress={handleSend}
          disabled={
            loading || !sender.trim() || !recipient.trim() || !message.trim()
          }
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f4f8",
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  navButtonActive: {
    backgroundColor: "#4CAF50",
  },
  navButtonText: {
    color: "#444",
    fontWeight: "bold",
  },
  navButtonTextActive: {
    color: "#fff",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#37474F",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
