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