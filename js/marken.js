// 模拟数据库中的信息
var database = {
    basicInfo: {
        name: "Marken",
        company: "业余开发者Chen0089"
    },
    basicChat: {
        hello: [
            "你好👋，有什么能帮上忙的吗？",
            "你好👋，有什么能可以解答的吗？",
            "我不好（",
            "你也好好的！",
            "你好！！",
            "你好，我是Marken，是业余开发者Chen0089的作品... May I help you?"
        ]
    }
};

function getResponse() {
    var userInput = document.getElementById('userInput').value;
    var aiResponse = generateResponse(userInput);
    displayResponse(aiResponse);
}

function generateResponse(userInput) {
    if (userInput.includes("你好")) {
        return database.basicChat.hello[Math.random * database.basicChat.hello.length];
    } else if (userInput.includes("Marken")) {
        return "你好，我是" + database.basicInfo.name + "，是" + database.basicInfo.company + "的作品，有什么我可以为你解答的吗？话说你是怎么知道我的名字的？";
    } else if (userInput.includes("你好")) {
        return "你好👋，有什么可以解答的吗？"
    }
    else {
        var fuzzyResponses = [
            "我不理解你的意思...",
            "让我想想怎么回答...",
            "这是个有趣的问题，让我思考一下。",
            "很抱歉，我暂时没有相关的答案。",
            "我还在学习中，还不能回答这个问题呜呜呜...",
            "请问你再说什么？我听不懂！",
            "服务器繁忙，请稍后再试"// deepseek菜蛋
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
