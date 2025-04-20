// 笔记数据
const jsonData = [
    { "name": "将军饮马", "position": "经典几何模型>将军饮马" },
    { "name": "手拉手模型", "url": "经典几何模型>手拉手模型" },
    { "name": "蝴蝶模型", "url": "经典几何模型>蝴蝶模型" }
    // 先暂时只来这些作为测试
];

document.addEventListener('DOMContentLoaded', function() {
    // 文件夹展开/收起功能
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', function(e) {
            // 防止点击链接时触发
            if (e.target.tagName === 'A') return;
            this.classList.toggle('open');
            
            // 切换相邻的子菜单显示状态
            const subTree = this.parentElement.querySelector('.sub-tree');
            if (subTree) {
                subTree.style.display = this.classList.contains('open') ? 'block' : 'none';
            }
        });
    });

    // 笔记导航功能
    const noteLinks = document.querySelectorAll('.file-tree a');
    const welcome = document.getElementById('welcome');
    const noteContents = document.querySelectorAll('.note-content');

    noteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有active类
            noteLinks.forEach(l => l.classList.remove('active'));
            noteContents.forEach(c => c.classList.remove('active'));
            // 添加active类到当前点击的链接
            this.classList.add('active');
            // 隐藏欢迎信息
            welcome.style.display = 'none';
            // 显示对应的笔记内容
            const noteId = this.getAttribute('data-note');
            document.getElementById(noteId).classList.add('active');
        });
    });

    // 默认展开第一个文件夹
    if (folders.length > 0) {
        folders[0].classList.add('open');
        const firstSubTree = folders[0].parentElement.querySelector('.sub-tree');
        if (firstSubTree) {
            firstSubTree.style.display = 'block';
        }
    }
});

// 阿福apng
const afuMain = document.getElementById("mainMedia");
setInterval(
    () => {
        afuMain.src = afuMain.src; // 重新加载触发循环
    },
    5100
); // 每5.1秒循环一次（动画时长）
// 阿福搜索功能

// 数据在最开头

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
const tips = [
    "你为啥不动一下导航栏捏",
    "喵喵喵，可爱不？",
    "总之，废话不多说=不多说废话，所以这是一个tip(",
    ":D",
    ":P",
    ":)",
    "(:",
    "^_^",
    "^-^",
    "让我看看你要刷新多少次才能看到这条tip",
    "666这个入喜欢学习",
    "114514", // 彩蛋辣，这个的行数也是很臭滴
    "锟斤拷锟&*斤拷烫烫烫&",
    "不要慌，这只是一个程序员陷阱：while(1){print(程序员)}",
    "[空]",
    "(抓头)到底是哪里出错了呀!!!!",
    "您有1条未读消息（我发的哈哈哈🤣）"
]
tips.textContent = tips[Math.floor(Math.random() * tips.length)];

// 阿福主页跳转
const gohome = document.getElementsByClassName("home")

// 将军饮马模型函数
function showSolution(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function drawSymmetry() {
    document.getElementById('a-sym').classList.remove('hidden');
    document.getElementById('sym-line').classList.remove('hidden');
}

function drawShortestPath() {
    document.getElementById('shortest-path').classList.remove('hidden');
}

// 手拉手模型函数
function drawHandShake() {
    const elements = document.querySelectorAll('#small-tri, #small-tri + text, #small-tri + text + text, #line-bd, #line-ce');
    elements.forEach(el => el.classList.remove('hidden'));
}

// 蝴蝶模型函数
function showButterflyAreas() {
    const areas = document.querySelectorAll('#area-aob, #area-cod, #area-aod, #area-boc');
    areas.forEach(el => el.classList.remove('hidden'));
}

// 复制角的步骤控制
let currentStep = 0;
const maxSteps = 5;

function nextStep() {
    if (currentStep < maxSteps) {
        currentStep++;
        updateCopyAngleSteps();
    }
}

function resetSteps() {
    currentStep = 0;
    updateCopyAngleSteps();
}

function updateCopyAngleSteps() {
    // 隐藏所有步骤
    for (let i = 1; i <= maxSteps; i++) {
        document.getElementById(`step${i}`).classList.add('hidden');
        document.getElementById(`step${i}-text`).classList.add('hidden');
    }
    
    // 显示当前及之前的步骤
    for (let i = 1; i <= currentStep; i++) {
        document.getElementById(`step${i}`).classList.remove('hidden');
        document.getElementById(`step${i}-text`).classList.remove('hidden');
    }
    
    // 更新步骤文本
    const stepTexts = [
        "请按步骤查看作图过程",
        "第一步：画一条射线PD'作为新角的一边",
        "第二步：以相同半径在O和P点画弧",
        "第三步：测量原角上的弦长EF",
        "第四步：在新位置复制弦长EF",
        "第五步：完成角的复制"
    ];
    document.getElementById('step-text').textContent = stepTexts[currentStep];
}

// 半圆旋转功能
function showSolution(id) {
    document.getElementById('basic-solution').classList.toggle('hidden');
    document.getElementById('advanced-solution').classList.toggle('hidden');
}

function showRotated() {
    document.getElementById('rotated-semi').classList.toggle('hidden');
    document.getElementById('sector').classList.toggle('hidden');
}

function showShadow() {
    document.getElementById('shadow-area').classList.toggle('hidden');
}