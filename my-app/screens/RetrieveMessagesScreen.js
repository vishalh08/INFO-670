import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function RetrieveMessagesScreen({ navigation }) {
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRetrieve = async () => {
    if (!recipient.trim()) {
      Alert.alert("Validation Error", "Please enter a recipient username.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/retrieveMessages?recipient=${encodeURIComponent(
          recipient
        )}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessages(result.messages || []);
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve messages");
      setMessages([]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Nav Bar */}
      <View style={styles.navBar}>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Send")}
        >
          <Text style={styles.navButtonText}>Send</Text>
        </Pressable>
        <Pressable style={[styles.navButton, styles.navButtonActive]}>
          <Text style={[styles.navButtonText, styles.navButtonTextActive]}>
            Retrieve
          </Text>
        </Pressable>
      </View>

      <Text style={styles.header}>📥 Retrieve Messages</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Recipient Username"
          value={recipient}
          onChangeText={setRecipient}
          editable={!loading}
        />
        <Pressable
          style={[
            styles.button,
            (loading || !recipient.trim()) && styles.disabledButton,
          ]}
          onPress={handleRetrieve}
          disabled={loading || !recipient.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Retrieve</Text>
          )}
        </Pressable>

        <ScrollView style={styles.messagesContainer}>
          {messages.length === 0 && !loading ? (
            <Text style={styles.noMsgText}>No messages found.</Text>
          ) : (
            messages.map((msg, i) => (
              <View
                key={i}
                style={styles.messageBubble}
              >
                <Text style={styles.messageText}>{msg}</Text>
              </View>
            ))
          )}
        </ScrollView>
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
    backgroundColor: "#2196F3",
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
    flex: 1,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  noMsgText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
  },
});
