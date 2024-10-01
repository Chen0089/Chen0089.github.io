// 模拟数据库中的信息
var database = {
    Marken: {
        name: "Marken",
        company: "Kei"
    }
};

function getResponse() {
    var userInput = document.getElementById('userInput').value;
    var aiResponse = generateResponse(userInput);
    displayResponse(aiResponse);
}

function generateResponse(userInput) {
    if (userInput.includes("你好")) {
        return "你好！我是" + database.Marken.name + "，是" + database.Marken.company + "的产品。有什么我能帮助你的？";
    } else if (userInput.includes("Marken")) {
        return "我是" + database.Marken.name + "，是" + database.Marken.company + "的产品，有什么我可以为你解答的吗？";
    } else {
        var fuzzyResponses = [
            "我不确定我理解你的意思。",
            "让我想想怎么回答。",
            "这是个有趣的问题，让我思考一下。",
            "很抱歉，我暂时没有相关的答案。",
            "我还在学习中，还不能回答这个问题。"
        ];
        var randomIndex = Math.floor(Math.random() * fuzzyResponses.length);
        return fuzzyResponses[randomIndex];
    }
}

function displayResponse(response) {
    var chatbox = document.getElementById('chatbox');
    var userMessage = document.createElement('p');
    userMessage.textContent = "你: " + document.getElementById('userInput').value;
    var aiMessage = document.createElement('p');
    aiMessage.textContent = "Marken: " + response;

    chatbox.appendChild(userMessage);
    chatbox.appendChild(aiMessage);

    document.getElementById('userInput').value = "";
}
