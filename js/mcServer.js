// 获取所有带有 'scroll-to' 类的链接
const scrollLinks = document.querySelectorAll('.scroll-to');

// 为每个链接添加点击事件监听器
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 防止默认跳转行为
        
        // 获取目标部分的类名
        const targetClass = this.getAttribute('data-target');
        
        // 查找对应类名的元素
        const targetElement = document.querySelector(`.${targetClass}`);
        
        if (targetElement) {
            // 使用 smooth scroll 平滑滚动到目标元素
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
