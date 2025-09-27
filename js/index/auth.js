// DOM元素
const loginBtn = document.getElementById('login-btn');
const userInfo = document.getElementById('user-info');
const userAvatar = document.getElementById('user-avatar');
const usernameDisplay = document.getElementById('username-display');
const logoutBtn = document.getElementById('logout-btn');

/**
 * 更新用户界面显示状态
 * @param {Object|null} user - 用户对象或null（未登录状态）
 */
function updateUserUI(user) {
    if (user) {
        // 用户已登录
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userAvatar.textContent = user.username.charAt(0).toUpperCase();
        usernameDisplay.textContent = user.username;
    } else {
        // 用户未登录
        loginBtn.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

/**
 * 检查用户登录状态并更新UI
 * @returns {boolean} 是否已登录
 */
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        const userData = localStorage.getItem('user_' + currentUser);
        
        if (userData) {
            const user = JSON.parse(userData);
            updateUserUI(user);
            return true;
        } else {
            // 用户数据不存在，清除登录状态
            localStorage.removeItem('currentUser');
        }
    }
    
    updateUserUI(null);
    return false;
}

/**
 * 处理用户退出登录
 */
function handleLogout() {
    localStorage.removeItem('currentUser');
    checkLoginStatus();
    alert('已成功退出登录');
}

// 事件监听器
logoutBtn.addEventListener('click', handleLogout);

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
