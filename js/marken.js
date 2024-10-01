// 模拟数据库中的信息
var database = {
    Marken: {
        name: "Marken",
        company: "业余开发者Chen0089"
    }
};

function getResponse() {
    var userInput = document.getElementById('userInput').value;
    var aiResponse = generateResponse(userInput);
    displayResponse(aiResponse);
}

function generateResponse(userInput) {
    if (userInput.includes("你好")) {
        return "你好！我是" + database.Marken.name + "，是" + database.Marken.company + "的作品。有什么我能帮助你的？";
    } else if (userInput.includes("Marken")) {
        return "你好，我是" + database.Marken.name + "，是" + database.Marken.company + "的作品，有什么我可以为你解答的吗？话说你是怎么知道我的名字的？";
    } else if (userInput.includes("你个傻逼")) {
        return "请您不要骂我好不好:("
    } else if (userInput.includes("傻逼")) {
        return "请您不要骂我好不好:("
    }
    else {
        var fuzzyResponses = [
            "我不理解你的意思呜呜呜",
            "让我想想怎么回答。",
            "这是个有趣的问题，让我思考一下。",
            "很抱歉，我暂时没有相关的答案。",
            "我还在学习中，还不能回答这个问题呜呜呜。",
            "请问你再说什么？我听不懂！"
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
