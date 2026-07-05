document.addEventListener('DOMContentLoaded', function () {
    // 防止重复创建开屏遮罩
    if (document.getElementById('welcome-screen')) return;

    // 开屏HTML结构
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
    document.body.insertAdjacentHTML('afterbegin', welcomeHTML);

    // DOM缓存
    const welcomeScreen = document.getElementById('welcome-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const expandingCircle = document.querySelector('.expanding-circle');
    let transitionTriggered = false; // 过渡锁，防止多次执行

    // 进度自动增长
    let progress = 0;
    const progressTimer = setInterval(() => {
        // 增速放缓，前快后慢更自然
        const add = progress < 60 ? Math.random() * 12 + 4 : Math.random() * 6 + 1;
        progress += add;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressTimer);
            if (!transitionTriggered) setTimeout(startTransition, 400);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 120);

    // 页面完全加载时直接拉满进度，快速跳过等待
    window.addEventListener('load', () => {
        clearInterval(progressTimer);
        loadingProgress.style.width = '100%';
        if (!transitionTriggered) setTimeout(startTransition, 200);
    });

    // 超时兜底：5秒强制关闭开屏，避免卡死
    setTimeout(() => {
        if (transitionTriggered) return;
        clearInterval(progressTimer);
        loadingProgress.style.width = '100%';
        startTransition();
    }, 5000);

    // 退场动画逻辑
    function startTransition() {
        if (transitionTriggered) return;
        transitionTriggered = true;

        // 环形扩散光效
        expandingCircle.classList.add('active');

        // 延迟淡出遮罩
        setTimeout(() => {
            welcomeScreen.classList.add('fade-out');
        }, 180);

        // 动画结束后销毁DOM、显示主页内容
        setTimeout(() => {
            welcomeScreen.remove();
            expandingCircle.remove();
            const mainDom = document.querySelector('.main-content');
            if (mainDom) mainDom.classList.add('show');
        }, 1700);
    }
});
