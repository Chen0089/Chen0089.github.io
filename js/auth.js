// DOM元素
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const message = document.getElementById('message');

// 登录相关元素
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

// 注册相关元素
const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');
const confirmPassword = document.getElementById('confirm-password');
const registerBtn = document.getElementById('register-btn');

// 切换表单显示
document.getElementById('show-register').addEventListener('click', function() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    hideMessage();
});

document.getElementById('show-login').addEventListener('click', function() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    hideMessage();
});

// 显示消息
function showMessage(text, type) {
    message.textContent = text;
    message.className = 'message ' + type;
    message.style.display = 'block';
}

// 隐藏消息
function hideMessage() {
    message.style.display = 'none';
}

// 用户注册
registerBtn.addEventListener('click', function() {
    const username = registerUsername.value.trim();
    const password = registerPassword.value;
    const confirm = confirmPassword.value;
    
    // 表单验证
    if (username.length < 3) {
        showMessage('用户名至少需要3个字符', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('密码至少需要6个字符', 'error');
        return;
    }
    
    if (password !== confirm) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    // 检查用户名是否已存在
    if (localStorage.getItem('user_' + username)) {
        showMessage('该用户名已被注册', 'error');
        return;
    }
    
    // 创建用户对象
    const user = {
        username: username,
        password: password, // 实际应用中应对密码进行哈希处理
        registerDate: new Date().toISOString()
    };
    
    // 存储用户信息
    localStorage.setItem('user_' + username, JSON.stringify(user));
    
    showMessage('注册成功！请登录', 'success');
    
    // 清空表单
    registerUsername.value = '';
    registerPassword.value = '';
    confirmPassword.value = '';
    
    // 切换到登录表单
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// 用户登录
loginBtn.addEventListener('click', function() {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    
    // 表单验证
    if (username === '') {
        showMessage('请输入用户名', 'error');
        return;
    }
    
    if (password === '') {
        showMessage('请输入密码', 'error');
        return;
    }
    
    // 获取用户信息
    const userData = localStorage.getItem('user_' + username);
    
    if (!userData) {
        showMessage('用户名或密码错误', 'error');
        return;
    }
    
    const user = JSON.parse(userData);
    
    if (user.password !== password) {
        showMessage('用户名或密码错误', 'error');
        return;
    }
    
    // 登录成功，设置登录状态并跳转到主页
    localStorage.setItem('currentUser', username);
    showMessage('登录成功！正在跳转...', 'success');
    
    // 延迟跳转，让用户看到成功消息
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
});

// 页面加载时检查是否已登录
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // 如果已登录，直接跳转到主页
        window.location.href = 'index.html';
    }
    
    // 添加容器样式
    document.querySelector('.container').classList.add('auth-container');
    document.querySelector('.header').classList.add('auth-header');
});
