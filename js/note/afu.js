// 阿福apng
const afuMain = document.getElementById("mainMedia");
setInterval(
    () => {
        afuMain.src = afuMain.src; // 重新加载触发循环
    },
    5100
); // 每5.1秒循环一次（动画时长）
// 阿福搜索功能
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

// 高亮关键词
const highlightMatch = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
};

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();
    resultsContainer.innerHTML = '';

    if (!keyword) return;

    // 找到第一个匹配项
    const firstMatch = jsonData.find(item => 
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (firstMatch) {
        const highlightedName = highlightMatch(firstMatch.name, keyword);
        resultsContainer.innerHTML = `
            <div class="result-item">
                <div class="name">${highlightedName}</div>
                <div class="position">${firstMatch.position}</div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = '<div class="result-item">无匹配结果</div>';
    }
});

// 阿福tips显示
const tipbubble = document.getElementsByClassName("tips");
tips.textContent = tips[Math.floor(Math.random() * tips.length)];

// 阿福控制键显示
const controls = document.getelementbyclass("controls");
afuMain.onMouseOver = function() {
    controls.style.display = "block";
}