print("==========================================")
print("          RULE-BASED CHATBOT")
print("==========================================")

print("\nChatbot: Hello! I am a simple AI chatbot.")
print("Chatbot: Type 'bye' to exit.")

while True:
    user = input("\nYou: ").lower().strip()
    clean = user.replace("?", " ").replace("!", " ").replace(".", " ").replace(",", " ")
    words = clean.split()

    if "hello" in words or "hi" in words:
        print("Bot: Hello! How can I help you?")

    elif "how are you" in clean:
        print("Bot: I am fine. Thank you!")

    elif "name" in words:
        print("Bot: I am a Rule-Based AI Chatbot.")

    elif "ai" in words:
        print("Bot: AI stands for Artificial Intelligence.")

    elif "college" in words:
        print("Bot: I can answer simple questions using predefined rules.")

    elif "thank" in words or "thanks" in words:
        print("Bot: You're welcome!")

    elif "bye" in words or "goodbye" in words:
        print("Bot: Goodbye! Have a nice day.")
        break

    else:
        print("Bot: Sorry, I don't understand that.")

print("\n==========================================")