// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function () {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframe = document.getElementById('iframe');

    // 创建 IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 如果 iframe 进入了视窗，添加类名触发动画
          iframeContainer.classList.add('iframe-visible');
          observer.unobserve(entry.target);  // 停止观察
        }
      });
    }, {
      threshold: 0.5  // 只有当 iframe 进入视窗 50% 以上时，才触发动画
    });

    observer.observe(iframeContainer);  // 开始观察 iframe 容器
  });
