// 导航和主题控制脚本
        let currentLanguage = 'zh';
        let isDarkMode = false;

        // 侧边栏切换功能
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const toggleBtn = document.getElementById('toggleBtn');
            
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleBtn.innerHTML = '☰';
            } else {
                toggleBtn.innerHTML = '✕';
            }
        }

        // 语言切换功能
        function setLanguage(lang) {
            currentLanguage = lang;
            
            // 更新按钮状态
            document.querySelectorAll('.control-btn[data-lang]').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
            
            // 这里可以添加实际的语言切换逻辑
            console.log('切换到语言:', lang);
            // updateLanguageContent(lang);
        }

        // 主题切换功能
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeBtn = document.getElementById('themeBtn');
            
            if (isDarkMode) {
                body.setAttribute('data-theme', 'dark');
                themeBtn.innerHTML = '☀️ 明亮';
                themeBtn.classList.remove('active');
            } else {
                body.removeAttribute('data-theme');
                themeBtn.innerHTML = '🌙 暗黑';
                themeBtn.classList.add('active');
            }
            
            // 保存主题设置
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }

        // 内容切换功能
        function showContent(contentId, element) {
            // 隐藏所有内容
            document.querySelectorAll('.note-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // 显示选中的内容
            document.getElementById(contentId).style.display = 'block';
            
            // 更新导航链接状态
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            element.classList.add('active');
            
            // 在移动端自动收起侧边栏
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.add('collapsed');
                document.getElementById('mainContent').classList.add('expanded');
                document.getElementById('toggleBtn').innerHTML = '☰';
            }
        }

        // 原有的功能函数（保持不变）
        function showSolution(solutionId) {
            console.log('显示解法:', solutionId);
            // 原有的解法显示逻辑
        }

        function showRotated() {
            console.log('显示旋转图形');
            // 原有的旋转图形显示逻辑
        }

        function showShadow() {
            console.log('显示阴影区域');
            // 原有的阴影区域显示逻辑
        }

        // 页面加载时的初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 恢复保存的主题设置
            const savedTheme = localStorage.getItem('theme');
            const themeBtn = document.getElementById('themeBtn');
            
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeBtn.innerHTML = '☀️ 明亮';
                themeBtn.classList.remove('active');
                isDarkMode = true;
            }
            
            // 响应式处理
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    const sidebar = document.getElementById('sidebar');
                    const mainContent = document.getElementById('mainContent');
                    if (sidebar.classList.contains('collapsed')) {
                        mainContent.classList.add('expanded');
                    }
                }
            });
        });

        // 移动端侧边栏处理
        function toggleMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('mobile-open');
        }

        // 点击主内容区域时收起侧边栏（移动端）
        document.getElementById('mainContent').addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.remove('collapsed');
                    this.classList.remove('expanded');
                    document.getElementById('toggleBtn').innerHTML = '✕';
                }
            }
        });