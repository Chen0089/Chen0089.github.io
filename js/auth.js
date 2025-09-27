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
 * 使用Web Crypto API进行SHA-256哈希
 * @param {string} message - 要哈希的字符串
 * @returns {Promise<string>} 哈希后的十六进制字符串
 */
async function sha256Hash(message) {
    // 将字符串编码为Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    
    // 使用Web Crypto API进行SHA-256哈希
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // 将ArrayBuffer转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

/**
 * 密码哈希函数（使用用户名作为盐值）
 * @param {string} password - 明文密码
 * @param {string} username - 用户名（作为盐值）
 * @returns {Promise<string>} 加盐哈希后的密码
 */
async function hashPassword(password, username) {
    // 使用用户名作为盐值，增加哈希安全性
    const saltedPassword = username + password;
    return await sha256Hash(saltedPassword);
}

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
async function handleRegister() {
    const username = registerUsername.value.trim();
    const password = registerPassword.value;
    const confirm = confirmPassword.value;
    
    // 表单验证
    if (!validateRegisterForm(username, password, confirm)) {
        return;
    }
    
    try {
        // 对密码进行加盐哈希处理
        const hashedPassword = await hashPassword(password, username);
        
        // 创建用户对象（存储哈希后的密码）
        const user = {
            username: username,
            password: hashedPassword, // 存储哈希值，而非明文
            registerDate: new Date().toISOString()
        };
        
        // 存储用户信息
        localStorage.setItem(`user_${username}`, JSON.stringify(user));
        
        showMessage('注册成功！请登录', 'success');
        
        // 清空表单并切换到登录
        clearRegisterForm();
        showLoginForm();
        
    } catch (error) {
        console.error('密码哈希错误:', error);
        showMessage('注册过程中发生错误，请重试', 'error');
    }
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
 * 验证用户登录凭据
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<boolean>} 是否验证成功
 */
async function verifyCredentials(username, password) {
    const userData = localStorage.getItem(`user_${username}`);
    
    if (!userData) {
        return false;
    }
    
    try {
        const user = JSON.parse(userData);
        const hashedPassword = await hashPassword(password, username);
        
        // 使用恒定时间比较来防止时序攻击
        return constantTimeCompare(user.password, hashedPassword);
    } catch (error) {
        console.error('凭据验证错误:', error);
        return false;
    }
}

/**
 * 恒定时间比较函数（防止时序攻击）
 * @param {string} a - 第一个字符串
 * @param {string} b - 第二个字符串
 * @returns {boolean} 是否相等
 */
function constantTimeCompare(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}

/**
 * 处理用户登录
 */
async function handleLogin() {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    
    // 表单验证
    if (!validateLoginForm(username, password)) {
        return;
    }
    
    try {
        // 验证用户凭据
        const isValid = await verifyCredentials(username, password);
        
        if (!isValid) {
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
        
    } catch (error) {
        console.error('登录过程错误:', error);
        showMessage('登录过程中发生错误，请重试', 'error');
    }
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

// 事件监听器 - 使用异步函数包装器
showRegisterBtn.addEventListener('click', showRegisterForm);
showLoginBtn.addEventListener('click', showLoginForm);

registerBtn.addEventListener('click', () => {
    handleRegister().catch(error => {
        console.error('注册错误:', error);
        showMessage('注册过程中发生错误', 'error');
    });
});

loginBtn.addEventListener('click', () => {
    handleLogin().catch(error => {
        console.error('登录错误:', error);
        showMessage('登录过程中发生错误', 'error');
    });
});

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);
