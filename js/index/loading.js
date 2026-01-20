document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
		document.querySelector("#loader").style.visibility = "visible";
	}
	else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
	}
};
document.getElementById('flarum-loading').style.display = 'block';
var flarum = {
	extensions: {}
};

document.addEventListener('DOMContentLoaded', function() {
    // 创建欢迎页面
    const welcomeHTML = `
        <div id="welcome-screen">
            <div class="welcome-content">
                <div class="welcome-logo">chen0089</div>
                <div class="welcome-subtitle">个人学习与创作空间</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        </div>
        <div class="expanding-circle"></div>
    `;
    
    // 插入到body最前面
    document.body.insertAdjacentHTML('afterbegin', welcomeHTML);
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const expandingCircle = document.querySelector('.expanding-circle');
    
    // 简单加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(startTransition, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
    
    function startTransition() {
        // 等待1秒
        setTimeout(() => {
            // 开始圆圈放大
            expandingCircle.classList.add('active');
            
            // 开始模糊消失
            setTimeout(() => {
                welcomeScreen.classList.add('fade-out');
            }, 150);
            
            // 完成后显示主页
            setTimeout(() => {
                welcomeScreen.remove();
                expandingCircle.remove();
                document.querySelector('.main-content').classList.add('show');
            }, 1650);
        }, 1000);
    }
    
    // 页面加载完成加速
    window.addEventListener('load', () => {
        clearInterval(interval);
        loadingProgress.style.width = '100%';
        setTimeout(startTransition, 300);
    });
    
    // 超时保护
    setTimeout(() => {
        if (!welcomeScreen.classList.contains('fade-out')) {
            clearInterval(interval);
            loadingProgress.style.width = '100%';
            setTimeout(startTransition, 300);
        }
    }, 5000);
});// 新建一个welcome.js文件或添加到现有JS中
document.addEventListener('DOMContentLoaded', function() {
    // 创建欢迎页面
    const welcomeHTML = `
        <div id="welcome-screen">
            <div class="welcome-content">
                <div class="welcome-logo">chen0089</div>
                <div class="welcome-subtitle">个人学习与创作空间</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        </div>
        <div class="expanding-circle"></div>
    `;
    
    // 插入到body最前面
    document.body.insertAdjacentHTML('afterbegin', welcomeHTML);
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const expandingCircle = document.querySelector('.expanding-circle');
    
    // 简单加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(startTransition, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
    
    function startTransition() {
        // 等待1秒
        setTimeout(() => {
            // 开始圆圈放大
            expandingCircle.classList.add('active');
            
            // 开始模糊消失
            setTimeout(() => {
                welcomeScreen.classList.add('fade-out');
            }, 150);
            
            // 完成后显示主页
            setTimeout(() => {
                welcomeScreen.remove();
                expandingCircle.remove();
                document.querySelector('.main-content').classList.add('show');
            }, 1650);
        }, 1000);
    }
    
    // 页面加载完成加速
    window.addEventListener('load', () => {
        clearInterval(interval);
        loadingProgress.style.width = '100%';
        setTimeout(startTransition, 300);
    });
    
    // 超时保护
    setTimeout(() => {
        if (!welcomeScreen.classList.contains('fade-out')) {
            clearInterval(interval);
            loadingProgress.style.width = '100%';
            setTimeout(startTransition, 300);
        }
    }, 5000);
});
