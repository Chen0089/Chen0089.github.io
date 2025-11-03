// 安全的随机数生成函数
function secureRandomInt(min, max) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return min + (randomBuffer[0] % range);
}

function secureRandomFloat(min, max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomValue = randomBuffer[0] / (0xFFFFFFFF + 1);
    return min + randomValue * (max - min);
}

function secureRandomChoice(array) {
    if (array.length === 0) return null;
    const index = secureRandomInt(0, array.length - 1);
    return array[index];
}

// 银行类型定义
const banks = [
    {
        name: "🏦 社区银行",
        description: "小型银行，安保较弱但资金有限",
        difficulty: "简单",
        moves: 10,
        policeCount: 2,
        cameraCount: 1,
        baseReward: 20000,
        jailTurns: 3,
        color: "#27ae60"
    },
    {
        name: "🏦 城市商业银行",
        description: "中等规模的银行，安保适中",
        difficulty: "中等",
        moves: 8,
        policeCount: 3,
        cameraCount: 2,
        baseReward: 50000,
        jailTurns: 4,
        color: "#f39c12"
    },
    {
        name: "🏦 国家中央银行",
        description: "大型银行，安保严密但资金雄厚",
        difficulty: "困难",
        moves: 6,
        policeCount: 4,
        cameraCount: 3,
        baseReward: 100000,
        jailTurns: 6,
        color: "#e74c3c"
    },
    {
        name: "💎 珠宝银行",
        description: "专门存放珠宝的银行，超高安保",
        difficulty: "专家",
        moves: 5,
        policeCount: 5,
        cameraCount: 4,
        baseReward: 200000,
        jailTurns: 8,
        color: "#9b59b6"
    }
];

// 存款类型定义
const depositTypes = [
    {
        name: "💳 活期存款",
        description: "随时存取，利率较低",
        minAmount: 0,
        interestRate: 0.005, // 0.5%
        fluctuation: 0.002, // 波动范围
        lockPeriod: 0, // 无锁定期
        color: "#3498db"
    },
    {
        name: "📈 定期存款(短期)",
        description: "3个月定期，利率适中",
        minAmount: 1000,
        interestRate: 0.015, // 1.5%
        fluctuation: 0.005,
        lockPeriod: 3, // 3回合
        color: "#2ecc71"
    },
    {
        name: "💰 定期存款(中期)",
        description: "6个月定期，利率较高",
        minAmount: 5000,
        interestRate: 0.025, // 2.5%
        fluctuation: 0.008,
        lockPeriod: 6, // 6回合
        color: "#f39c12"
    },
    {
        name: "🚀 大额存单",
        description: "1年期，高利率但需要大额资金",
        minAmount: 20000,
        interestRate: 0.04, // 4%
        fluctuation: 0.01,
        lockPeriod: 12, // 12回合
        color: "#e74c3c"
    },
    {
        name: "🎯 特色存款",
        description: "特殊产品，利率波动大",
        minAmount: 10000,
        interestRate: 0.03, // 3%
        fluctuation: 0.015,
        lockPeriod: 8, // 8回合
        color: "#9b59b6"
    }
];

// 游戏状态
const gameState = {
    cash: 1000,
    deposit: 0,
    properties: [],
    cards: [],
    deposits: [],
    turn: 1,
    mood: 50,
    wealthLevel: 1,
    wealthExp: 0,
    inJail: false,
    jailTurns: 0,
    donated: 0,
    news: "科技园区政策利好，房产预计上涨！",
    interestRates: {},
    lastRateUpdate: 0,
    propertyMarket: [
        { id: 1, name: "市中心公寓", basePrice: 500, currentPrice: 500, trend: 0 },
        { id: 2, name: "科技园办公楼", basePrice: 800, currentPrice: 800, trend: 0 },
        { id: 3, name: "海边别墅", basePrice: 1200, currentPrice: 1200, trend: 0 },
        { id: 4, name: "大学城商铺", basePrice: 600, currentPrice: 600, trend: 0 },
        { id: 5, name: "工业区仓库", basePrice: 400, currentPrice: 400, trend: 0 }
    ],
    eventLog: ["游戏开始！你获得了1000元现金。"],
    bankJob: {
        active: false,
        problems: [],
        currentProblem: 0,
        salary: 0
    },
    robGame: {
        grid: [],
        playerPos: { x: 0, y: 0 },
        movesLeft: 8,
        success: false,
        reward: 50000,
        selectedBank: null
    },
    travelOptions: [
        { name: "本地公园", cost: 50, moodGain: 10 },
        { name: "海滨度假", cost: 300, moodGain: 30 },
        { name: "雪山之旅", cost: 500, moodGain: 50 },
        { name: "欧洲环游", cost: 1000, moodGain: 80 }
    ]
};

// DOM元素
const cashEl = document.getElementById('cash');
const depositEl = document.getElementById('deposit');
const totalAssetsEl = document.getElementById('total-assets');
const moodEl = document.getElementById('mood');
const moodProgressEl = document.getElementById('mood-progress');
const wealthLevelEl = document.getElementById('wealth-level');
const levelProgressEl = document.getElementById('level-progress');
const levelBenefitsEl = document.getElementById('level-benefits');
const propertiesListEl = document.getElementById('properties-list');
const propertyMarketEl = document.getElementById('property-market');
const eventLogEl = document.getElementById('event-log');
const newsContentEl = document.getElementById('news-content');
const cardsOwnedEl = document.getElementById('cards-owned');
const bankJobModal = document.getElementById('bank-job-modal');
const mathProblemEl = document.getElementById('math-problem');
const answerInputEl = document.getElementById('answer-input');
const submitAnswerBtn = document.getElementById('submit-answer');
const cardModal = document.getElementById('card-modal');
const cardResultEl = document.getElementById('card-result');
const closeCardBtn = document.getElementById('close-card');
const robBankModal = document.getElementById('rob-bank-modal');
const gameGridEl = document.getElementById('game-grid');
const movesCountEl = document.getElementById('moves-count');
const closeRobGameBtn = document.getElementById('close-rob-game');
const quizCardModal = document.getElementById('quiz-card-modal');
const quizQuestionEl = document.getElementById('quiz-question');
const quizAnswerEl = document.getElementById('quiz-answer');
const submitQuizBtn = document.getElementById('submit-quiz');
const travelModal = document.getElementById('travel-modal');
const travelOptionsEl = document.getElementById('travel-options');
const closeTravelBtn = document.getElementById('close-travel');

// 初始化利率
function initInterestRates() {
    depositTypes.forEach(deposit => {
        gameState.interestRates[deposit.name] = calculateCurrentRate(deposit);
    });
    gameState.lastRateUpdate = gameState.turn;
}

// 计算当前利率（考虑波动）
function calculateCurrentRate(depositType) {
    const baseRate = depositType.interestRate;
    const fluctuation = depositType.fluctuation;
    const randomChange = secureRandomFloat(-fluctuation, fluctuation);
    return Math.max(0.001, baseRate + randomChange); // 最低0.1%
}

// 更新利率（每3回合更新一次）
function updateInterestRates() {
    if (gameState.turn - gameState.lastRateUpdate >= 3) {
        depositTypes.forEach(deposit => {
            gameState.interestRates[deposit.name] = calculateCurrentRate(deposit);
        });
        gameState.lastRateUpdate = gameState.turn;
        addToLog("💹 银行存款利率更新了！快去查看最新利率吧！");
    }
}

// 初始化游戏
function initGame() {
    initInterestRates();
    updateUI();
    
    // 事件监听
    document.getElementById('end-turn').addEventListener('click', endTurn);
    document.getElementById('buy-card-btn').addEventListener('click', buyCard);
    document.getElementById('use-card-btn').addEventListener('click', useCard);
    document.getElementById('deposit-btn').addEventListener('click', () => bankAction('deposit'));
    document.getElementById('withdraw-btn').addEventListener('click', () => bankAction('withdraw'));
    document.getElementById('rob-bank-btn').addEventListener('click', startRobBank);
    document.getElementById('travel-btn').addEventListener('click', showTravelOptions);
    document.getElementById('donate-btn').addEventListener('click', donate);
    submitAnswerBtn.addEventListener('click', checkAnswer);
    closeCardBtn.addEventListener('click', () => cardModal.style.display = 'none');
    closeRobGameBtn.addEventListener('click', () => robBankModal.style.display = 'none');
    submitQuizBtn.addEventListener('click', checkQuizAnswer);
    closeTravelBtn.addEventListener('click', () => travelModal.style.display = 'none');
    
    // 初始新闻
    newsContentEl.textContent = gameState.news;
}

// 更新UI
function updateUI() {
    // 更新资产
    cashEl.textContent = gameState.cash;
    depositEl.textContent = gameState.deposit;
    totalAssetsEl.textContent = gameState.cash + gameState.deposit;
    moodEl.textContent = gameState.mood;
    moodProgressEl.style.width = `${gameState.mood}%`;
    
    // 更新财富等级
    wealthLevelEl.textContent = gameState.wealthLevel;
    const expNeeded = getExpForNextLevel();
    levelProgressEl.style.width = `${(gameState.wealthExp / expNeeded) * 100}%`;
    updateLevelBenefits();
    
    // 更新房地产列表
    propertiesListEl.innerHTML = '';
    if (gameState.properties.length === 0) {
        propertiesListEl.innerHTML = '<p>暂无房地产</p>';
    } else {
        gameState.properties.forEach(prop => {
            const statusClass = prop.status === 'damaged' ? 'damaged' : 
                              prop.status === 'destroyed' ? 'destroyed' : 'normal';
            const statusText = prop.status === 'damaged' ? '损毁' : 
                             prop.status === 'destroyed' ? '消失' : '正常';
            
            const propertyEl = document.createElement('div');
            propertyEl.className = 'property-item';
            propertyEl.innerHTML = `
                <div class="property-name">${prop.name} 
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="property-details">
                    <span>当前价值: ${prop.currentPrice}</span>
                    <span>${prop.trend > 0 ? '↑' : prop.trend < 0 ? '↓' : '→'} ${Math.abs(prop.trend)}%</span>
                </div>
                ${prop.status === 'damaged' ? 
                    `<button class="buy-btn" onclick="repairProperty(${prop.id})">修复 (${Math.round(prop.basePrice * 0.9)})</button>` : 
                    `<button class="sell-btn" onclick="sellProperty(${prop.id})">出售</button>`
                }
            `;
            
