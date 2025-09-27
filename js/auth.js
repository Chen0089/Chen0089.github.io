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

// 切换表单显示元素
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

/**
 * 显示消息提示
 * @param {string} text - 消息内容
 * @param {string} type - 消息类型 ('success' 或 'error')
 */
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
}

/**
 * 隐藏消息提示
 */
function hideMessage() {
    message.style.display = 'none';
}

/**
 * 切换到注册表单
 */
function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    hideMessage();
}

/**
 * 切换到登录表单
 */
function showLoginForm() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    hideMessage();
}

/**
 * 验证注册表单数据
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} confirm - 确认密码
 * @returns {boolean} 是否验证通过
 */
function validateRegisterForm(username, password, confirm) {
    if (username.length < 3) {
        showMessage('用户名至少需要3个字符', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showMessage('密码至少需要6个字符', 'error');
        return false;
    }
    
    if (password !== confirm) {
        showMessage('两次输入的密码不一致', 'error');
        return false;
    }
    
    if (localStorage.getItem(`user_${username}`)) {
        showMessage('该用户名已被注册', 'error');
        return false;
    }
    
    return true;
}

/**
 * 验证登录表单数据
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {boolean} 是否验证通过
 */
function validateLoginForm(username, password) {
    if (username === '') {
        showMessage('请输入用户名', 'error');
        return false;
    }
    
    if (password === '') {
        showMessage('请输入密码', 'error');
        return false;
    }
    
    return true;
}

/**
 * 处理用户注册
 */
function handleRegister() {
    const username = registerUsername.value.trim();
    const password = registerPassword.value;
    const confirm = confirmPassword.value;
    
    // 表单验证
    if (!validateRegisterForm(username, password, confirm)) {
        return;
    }
    
    // 创建用户对象
    const user = {
        username: username,
        password: password,
        registerDate: new Date().toISOString()
    };
    
    // 存储用户信息
    localStorage.setItem(`user_${username}`, JSON.stringify(user));
    
    showMessage('注册成功！请登录', 'success');
    
    // 清空表单并切换到登录
    clearRegisterForm();
    showLoginForm();
}

/**
 * 清空注册表单
 */
function clearRegisterForm() {
    registerUsername.value = '';
    registerPassword.value = '';
    confirmPassword.value = '';
}

/**
 * 处理用户登录
 */
function handleLogin() {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    
    // 表单验证
    if (!validateLoginForm(username, password)) {
        return;
    }
    
    // 获取用户信息
    const userData = localStorage.getItem(`user_${username}`);
    
    if (!userData) {
        showMessage('用户名或密码错误', 'error');
        return;
    }
    
    const user = JSON.parse(userData);
    
    if (user.password !== password) {
        showMessage('用户名或密码错误', 'error');
        return;
    }
    
    // 登录成功
    localStorage.setItem('currentUser', username);
    showMessage('登录成功！正在跳转...', 'success');
    
    // 延迟跳转
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * 检查登录状态并跳转
 */
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
    }
}

// 事件监听器
showRegisterBtn.addEventListener('click', showRegisterForm);
showLoginBtn.addEventListener('click', showLoginForm);
registerBtn.addEventListener('click', handleRegister);
loginBtn.addEventListener('click', handleLogin);

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);
