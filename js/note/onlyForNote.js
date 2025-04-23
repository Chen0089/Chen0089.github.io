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
