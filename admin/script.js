// 在页面加载时显示已存储的文章
window.onload = function() {
    displayPosts();
};

// 添加文章
document.getElementById('addPost').addEventListener('click', function() {
    const title = prompt('请输入文章标题:');
    const content = prompt('请输入文章内容:');
    if (title && content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    } else {
        alert('标题和内容不能为空!');
    }
});

// 显示文章
function displayPosts() {
    const output = document.getElementById('output');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    output.innerHTML = ''; // 清空输出
    posts.forEach(post => {
        output.innerHTML += `<h3>${post.title}</h3><p>${post.content}</p>`;
    });
}

// 查看文章
document.getElementById('viewPosts').addEventListener('click', function() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (posts.length === 0) {
        alert('没有可查看的文章。');
    } else {
        let postPreview = posts.map(post => `标题: ${post.title}\n内容: ${post.content}`).join('\n\n');
        alert('文章预览:\n' + postPreview);
    }
});

// 清空文章
document.getElementById('clearPosts').addEventListener('click', function() {
    if (confirm('确定要清空所有文章吗?')) {
        localStorage.removeItem('posts');
        displayPosts();
    }
});
