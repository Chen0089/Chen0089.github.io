document.getElementById("send-button").addEventListener(
    "click",
    function() {
        let userInput = document.getElementById("input-field").value;
            if (userInput.trim() !== "") {
            addMessage(userInput, "user");
            document.getElementById("input-field").value = "";
            // Here you would call your backend (e.g., GPT model) to get a response
            simulateBotResponse(userInput);
        }
    }
);

    function addMessage(
        text,
        sender
    ) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = text;
        document.getElementById("messages").appendChild(messageDiv);
        document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
    }

    function simulateBotResponse(userInput) {
        // Simulate a simple bot response for now
        const botResponse = "You said: " + userInput;
        setTimeout(() => {
            addMessage(botResponse, "bot");
        }, 1000);
    }
