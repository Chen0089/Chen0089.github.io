// 初始化神经网络
const net = new brain.recurrent.LSTM();

// 训练数据
const trainingData = [
    { input: 'Hello', output: 'Hi there!' },
    { input: 'How are you?', output: 'I am good, thank you!' },
    { input: 'What is your name?', output: 'I am a chatbot.' },
    { input: 'Bye', output: 'Goodbye!' }
];

// 训练神经网络
net.train(trainingData);

// 获取DOM元素
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 发送消息函数
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        // 添加用户消息到聊天框
        chatBox.innerHTML += `<div class="user-message">You: ${userMessage}</div>`;
        
        // 获取机器人回复
        const botReply = net.run(userMessage);
        
        // 添加机器人回复到聊天框
        chatBox.innerHTML += `<div class="bot-message">Bot: ${botReply}</div>`;
        
        // 清空输入框
        userInput.value = '';
        
        // 滚动到聊天框底部
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// 绑定发送按钮点击事件
sendBtn.addEventListener('click', sendMessage);

// 绑定回车键事件
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
