def get_words(text):
    clean = text.lower().replace("?", " ").replace("!", " ").replace(".", " ").replace(",", " ")
    return clean, clean.split()


def chatbot(user_input):
    clean, words = get_words(user_input)

    if "hello" in words or "hi" in words:
        return "Hello! How can I help you?"

    elif "name" in words:
        return "I am a simple Python chatbot."

    elif "how are you" in clean:
        return "I am fine. Thank you!"

    elif "college" in words:
        return "I can help you with college-related questions."

    elif "bye" in words or "goodbye" in words:
        return "Goodbye! Have a nice day."

    elif "help" in words:
        return "Sure! Ask me something."

    else:
        return "Sorry, I don't understand that."


print("Chatbot: Hello! Type 'bye' to exit.")

while True:
    user = input("You: ")
    clean, words = get_words(user)

    response = chatbot(user)
    print("Chatbot:", response)

    if "bye" in words or "goodbye" in words:
        break