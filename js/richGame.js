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
    
    // 创建存档按钮
    createSaveButton();
    
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
            propertiesListEl.appendChild(propertyEl);
        });
    }
    
    // 更新房地产市场
    propertyMarketEl.innerHTML = '';
    gameState.propertyMarket.forEach(prop => {
        const trendClass = prop.trend > 0 ? 'up' : prop.trend < 0 ? 'down' : '';
        const trendIcon = prop.trend > 0 ? '↑' : prop.trend < 0 ? '↓' : '→';
        
        const marketEl = document.createElement('div');
        marketEl.className = 'property-card';
        marketEl.innerHTML = `
            <div class="property-name">${prop.name}</div>
            <div class="property-details">
                <span>价格: ${prop.currentPrice}</span>
                <span class="price-trend ${trendClass}">${trendIcon} ${Math.abs(prop.trend)}%</span>
            </div>
            <div class="actions">
                <button class="buy-btn" onclick="buyProperty(${prop.id})">购买</button>
            </div>
        `;
        propertyMarketEl.appendChild(marketEl);
    });
    
    // 更新事件日志
    eventLogEl.innerHTML = '';
    gameState.eventLog.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = log;
        eventLogEl.appendChild(logEntry);
    });
    eventLogEl.scrollTop = eventLogEl.scrollHeight;
    
    // 更新卡片数量
    cardsOwnedEl.textContent = `当前拥有卡片: ${gameState.cards.length}张`;
    
    // 更新存款列表显示
    updateDepositList();
    
    // 更新按钮状态
    document.getElementById('rob-bank-btn').disabled = gameState.inJail;
    document.getElementById('travel-btn').disabled = gameState.inJail;
    document.getElementById('donate-btn').disabled = gameState.wealthLevel < 5;
}

// 更新存款列表显示
function updateDepositList() {
    const depositListEl = document.getElementById('deposit-list');
    if (!depositListEl) return;
    
    if (gameState.deposits.length === 0) {
        depositListEl.innerHTML = '<p style="color: #666; text-align: center;">暂无存款</p>';
    } else {
        depositListEl.innerHTML = gameState.deposits.map((deposit, index) => {
            const turnsLeft = Math.max(0, deposit.lockPeriod - (gameState.turn - deposit.startTurn));
            const currentRate = gameState.interestRates[deposit.type];
            
            return `
                <div class="deposit-item">
                    <div>
                        <strong>${deposit.type}</strong><br>
                        <small>${deposit.amount.toLocaleString()}元 · ${(currentRate * 100).toFixed(2)}%</small>
                    </div>
                    <div style="text-align: right;">
                        <span style="color: ${turnsLeft > 0 ? '#e74c3c' : '#27ae60'};">
                            ${turnsLeft > 0 ? '锁定中' : '可取款'}
                        </span><br>
                        <small>${turnsLeft > 0 ? turnsLeft + '回合' : ''}</small>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// 获取升级所需经验
function getExpForNextLevel() {
    return gameState.wealthLevel * 1000;
}

// 更新等级福利
function updateLevelBenefits() {
    let benefits = "";
    if (gameState.wealthLevel >= 5) {
        benefits += "捐献提高赦免几率";
    }
    if (gameState.wealthLevel >= 10) {
        benefits += " | 购买私人飞机";
    }
    if (gameState.wealthLevel >= 100) {
        benefits += " | 建立国家";
    }
    levelBenefitsEl.textContent = benefits || "暂无特殊福利";
}

// 购买房地产
function buyProperty(id) {
    const property = gameState.propertyMarket.find(p => p.id === id);
    if (!property) return;
    
    if (gameState.cash >= property.currentPrice) {
        gameState.cash -= property.currentPrice;
        gameState.properties.push({
            id: property.id,
            name: property.name,
            basePrice: property.currentPrice,
            currentPrice: property.currentPrice,
            trend: property.trend,
            status: 'normal'
        });
        
        addToLog(`购买了${property.name}，花费${property.currentPrice}元`);
        updateUI();
    } else {
        addToLog(`现金不足，无法购买${property.name}`);
    }
}

// 出售房地产
function sellProperty(id) {
    const propertyIndex = gameState.properties.findIndex(p => p.id === id);
    if (propertyIndex === -1) return;
    
    const property = gameState.properties[propertyIndex];
    gameState.cash += property.currentPrice;
    addToLog(`出售了${property.name}，获得${property.currentPrice}元`);
    gameState.properties.splice(propertyIndex, 1);
    updateUI();
}

// 修复房地产
function repairProperty(id) {
    const property = gameState.properties.find(p => p.id === id);
    if (!property || property.status !== 'damaged') return;
    
    const repairCost = Math.round(property.basePrice * 0.9);
    if (gameState.cash >= repairCost) {
        gameState.cash -= repairCost;
        property.status = 'normal';
        addToLog(`修复了${property.name}，花费${repairCost}元`);
        updateUI();
    } else {
        addToLog(`现金不足，无法修复${property.name}`);
    }
}

// 银行存款/取款
function bankAction(action) {
    if (action === 'deposit' || action === 'withdraw') {
        showDepositSelection(action);
    }
}

// 显示存款选择界面
function showDepositSelection(action) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    const title = action === 'deposit' ? "💰 选择存款类型" : "💸 选择取款账户";
    const description = action === 'deposit' ? 
        "选择适合您的存款产品，利率会随时间波动" : 
        "选择要取款的账户，定期存款提前取款会有损失";
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <h2>${title}</h2>
            <p>${description}</p>
            
            ${action === 'deposit' ? `
                <div class="deposit-selection" id="deposit-selection">
                    ${depositTypes.map((deposit, index) => {
                        const currentRate = gameState.interestRates[deposit.name];
                        const displayRate = (currentRate * 100).toFixed(2);
                        return `
                            <div class="deposit-option" onclick="selectDeposit(${index}, '${action}')" 
                                 style="border-left: 5px solid ${deposit.color}">
                                <div class="deposit-header">
                                    <span class="deposit-name">${deposit.name}</span>
                                    <span class="interest-rate" style="background: ${deposit.color}">
                                        ${displayRate}%
                                    </span>
                                </div>
                                <div class="deposit-description">${deposit.description}</div>
                                <div class="deposit-details">
                                    <div class="deposit-stat">
                                        <span>📊 基准利率:</span>
                                        <span>${(deposit.interestRate * 100).toFixed(2)}%</span>
                                    </div>
                                    <div class="deposit-stat">
                                        <span>📈 波动范围:</span>
                                        <span>±${(deposit.fluctuation * 100).toFixed(2)}%</span>
                                    </div>
                                    <div class="deposit-stat">
                                        <span>💰 最低金额:</span>
                                        <span>${deposit.minAmount.toLocaleString()}元</span>
                                    </div>
                                    <div class="deposit-stat">
                                        <span>⏰ 锁定期:</span>
                                        <span>${deposit.lockPeriod === 0 ? '无' : deposit.lockPeriod + '回合'}</span>
                                    </div>
                                    <div class="deposit-stat">
                                        <span>📅 下次利率更新:</span>
                                        <span>${3 - (gameState.turn - gameState.lastRateUpdate)}回合后</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : `
                <div class="withdrawal-selection" id="withdrawal-selection">
                    ${gameState.deposits.length === 0 ? 
                        '<p style="text-align: center; color: #666; padding: 40px;">暂无存款</p>' :
                        gameState.deposits.map((deposit, index) => {
                            const depositType = depositTypes.find(d => d.name === deposit.type);
                            const turnsLeft = Math.max(0, deposit.lockPeriod - (gameState.turn - deposit.startTurn));
                            const penalty = turnsLeft > 0 ? deposit.amount * 0.1 : 0;
                            
                            return `
                                <div class="withdrawal-option" onclick="selectWithdrawal(${index})">
                                    <div class="withdrawal-header">
                                        <span class="account-name">${deposit.type}</span>
                                        <span class="account-balance">${deposit.amount.toLocaleString()}元</span>
                                    </div>
                                    <div class="withdrawal-details">
                                        <div class="withdrawal-stat">
                                            <span>存入时间:</span>
                                            <span>第${deposit.startTurn}回合</span>
                                        </div>
                                        <div class="withdrawal-stat">
                                            <span>锁定期剩余:</span>
                                            <span class="${turnsLeft > 0 ? 'locked' : 'unlocked'}">
                                                ${turnsLeft > 0 ? turnsLeft + '回合' : '可自由取款'}
                                            </span>
                                        </div>
                                        ${turnsLeft > 0 ? `
                                            <div class="withdrawal-stat warning">
                                                <span>⚠️ 提前取款罚金:</span>
                                                <span>${penalty.toLocaleString()}元</span>
                                            </div>
                                            <div class="withdrawal-stat warning">
                                                <span>💸 实际到账:</span>
                                                <span>${(deposit.amount - penalty).toLocaleString()}元</span>
                                            </div>
                                        ` : `
                                            <div class="withdrawal-stat">
                                                <span>💰 可获利息:</span>
                                                <span>${calculateInterest(deposit).toLocaleString()}元</span>
                                            </div>
                                        `}
                                    </div>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            `}
            
            <button class="submit-btn" onclick="closeDepositSelection()" style="margin-top: 20px;">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.id = 'deposit-selection-modal';
}

// 选择存款类型
function selectDeposit(depositIndex, action) {
    const depositType = depositTypes[depositIndex];
    
    if (action === 'deposit') {
        const amount = parseInt(prompt(`请输入${depositType.name}的存款金额（最低${depositType.minAmount}元）:`));
        
        if (isNaN(amount) || amount <= 0) {
            alert('请输入有效金额');
            return;
        }
        
        if (amount < depositType.minAmount) {
            alert(`该存款产品最低需要${depositType.minAmount}元`);
            return;
        }
        
        if (gameState.cash < amount) {
            alert('现金不足');
            return;
        }
        
        // 创建存款记录
        gameState.deposits.push({
            type: depositType.name,
            amount: amount,
            startTurn: gameState.turn,
            lockPeriod: depositType.lockPeriod,
            interestRate: gameState.interestRates[depositType.name]
        });
        
        gameState.cash -= amount;
        addToLog(`💰 成功存入${depositType.name} ${amount.toLocaleString()}元，当前利率${(gameState.interestRates[depositType.name] * 100).toFixed(2)}%`);
        
    }
    
    closeDepositSelection();
    updateUI();
}

// 选择取款账户
function selectWithdrawal(depositIndex) {
    const deposit = gameState.deposits[depositIndex];
    const depositType = depositTypes.find(d => d.name === deposit.type);
    const turnsLeft = Math.max(0, deposit.lockPeriod - (gameState.turn - deposit.startTurn));
    const penalty = turnsLeft > 0 ? deposit.amount * 0.1 : 0;
    const interest = calculateInterest(deposit);
    const totalAmount = deposit.amount + interest - penalty;
    
    if (turnsLeft > 0) {
        const confirmWithdraw = confirm(`该存款还有${turnsLeft}回合锁定期，提前取款将扣除${penalty.toLocaleString()}元罚金，实际到账${totalAmount.toLocaleString()}元。确定要提前取款吗？`);
        if (!confirmWithdraw) return;
    }
    
    // 移除存款记录
    gameState.deposits.splice(depositIndex, 1);
    gameState.cash += totalAmount;
    
    if (turnsLeft > 0) {
        addToLog(`💸 提前取款${deposit.type}，扣除罚金后到账${totalAmount.toLocaleString()}元`);
    } else {
        addToLog(`💰 到期取款${deposit.type}，获得本金${deposit.amount.toLocaleString()}元 + 利息${interest.toLocaleString()}元，总计${totalAmount.toLocaleString()}元`);
    }
    
    closeDepositSelection();
    updateUI();
}

// 计算存款利息
function calculateInterest(deposit) {
    const depositType = depositTypes.find(d => d.name === deposit.type);
    const currentRate = gameState.interestRates[deposit.type];
    const turnsHeld = gameState.turn - deposit.startTurn;
    
    // 使用存入时的利率和当前利率的平均值
    const effectiveRate = (deposit.interestRate + currentRate) / 2;
    return Math.round(deposit.amount * effectiveRate * turnsHeld);
}

// 关闭存款选择
function closeDepositSelection() {
    const modal = document.getElementById('deposit-selection-modal');
    if (modal) {
        modal.remove();
    }
}

// 购买机遇卡
function buyCard() {
    if (gameState.cash >= 200) {
        gameState.cash -= 200;
        gameState.cards.push(generateRandomCard());
        addToLog('购买了一张机遇卡');
        updateUI();
    } else {
        addToLog('现金不足，无法购买机遇卡');
    }
}

// 使用机遇卡
function useCard() {
    if (gameState.cards.length === 0) {
        alert('没有可用的机遇卡');
        return;
    }
    
    const card = gameState.cards.pop();
    applyCardEffect(card);
    updateUI();
}

// 生成随机卡片
function generateRandomCard() {
    const cards = [
        { name: '现金红包', effect: 'cash', value: 500 },
        { name: '存款翻倍利息', effect: 'doubleInterest' },
        { name: '价格冻结', effect: 'freezePrices' },
        { name: '强制交易', effect: 'forcedTrade' },
        { name: '房产增值', effect: 'propertyBoost', value: 1.2 },
        { name: '赦免卡', effect: 'pardon' },
        { name: '答题卡', effect: 'quiz' }
    ];
    
    return secureRandomChoice(cards);
}

// 应用卡片效果
function applyCardEffect(card) {
    cardResultEl.textContent = `你使用了机遇卡：${card.name}`;
    cardModal.style.display = 'flex';
    
    switch(card.effect) {
        case 'cash':
            gameState.cash += card.value;
            addToLog(`获得现金红包${card.value}元`);
            break;
        case 'doubleInterest':
            addToLog('下一回合存款利息将翻倍');
            break;
        case 'freezePrices':
            addToLog('房地产价格将冻结3回合');
            break;
        case 'forcedTrade':
            addToLog('强制交易效果已触发');
            break;
        case 'propertyBoost':
            gameState.properties.forEach(prop => {
                prop.currentPrice = Math.round(prop.currentPrice * card.value);
            });
            addToLog('所有房产价值提升20%');
            break;
        case 'pardon':
            if (gameState.inJail) {
                gameState.inJail = false;
                gameState.jailTurns = 0;
                addToLog('你被赦免了！重获自由！');
            } else {
                addToLog('你获得了赦免卡，可以在入狱时使用');
                gameState.cards.push(card);
            }
            break;
        case 'quiz':
            startQuiz();
            break;
    }
}

// 开始答题卡
function startQuiz() {
    const questions = [
        { question: "中国的首都是哪个城市？", answer: "北京" },
        { question: "太阳系中最大的行星是？", answer: "木星" },
        { question: "《红楼梦》的作者是谁？", answer: "曹雪芹" },
        { question: "水的化学式是什么？", answer: "H2O" },
        { question: "一年有多少个月？", answer: "12" }
    ];
    
    const randomQuestion = secureRandomChoice(questions);
    quizQuestionEl.textContent = randomQuestion.question;
    quizCardModal.style.display = 'flex';
    quizAnswerEl.value = '';
    quizAnswerEl.focus();
    
    quizCardModal.dataset.correctAnswer = randomQuestion.answer;
}

// 检查答题卡答案
function checkQuizAnswer() {
    const userAnswer = quizAnswerEl.value.trim();
    const correctAnswer = quizCardModal.dataset.correctAnswer;
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        const rewards = [200, 400, 800, 1000, 1500];
        const reward = secureRandomChoice(rewards);
        gameState.cash += reward;
        addToLog(`回答正确！获得${reward}元奖金`);
        quizCardModal.style.display = 'none';
        updateUI();
    } else {
        alert('答案错误！');
        quizAnswerEl.value = '';
        quizAnswerEl.focus();
    }
}

// 开始抢银行
function startRobBank() {
    if (gameState.inJail) {
        addToLog('你现在在监狱中，无法抢银行！');
        return;
    }
    
    showBankSelection();
}

// 显示银行选择界面
function showBankSelection() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <h2>🏦 选择目标银行</h2>
            <p>高风险高回报！选择合适的银行开始行动</p>
            <div class="bank-selection" id="bank-selection">
                ${banks.map((bank, index) => `
                    <div class="bank-option" onclick="selectBank(${index})" 
                         style="border-left: 5px solid ${bank.color}">
                        <div class="bank-header">
                            <span class="bank-name">${bank.name}</span>
                            <span class="bank-difficulty" style="background: ${bank.color}">${bank.difficulty}</span>
                        </div>
                        <div class="bank-description">${bank.description}</div>
                        <div class="bank-details">
                            <div class="bank-stat">
                                <span>💰 奖励:</span>
                                <span class="reward">${bank.baseReward.toLocaleString()}元</span>
                            </div>
                            <div class="bank-stat">
                                <span>👮 警察:</span>
                                <span>${bank.policeCount}个</span>
                            </div>
                            <div class="bank-stat">
                                <span>📹 监控:</span>
                                <span>${bank.cameraCount}个</span>
                            </div>
                            <div class="bank-stat">
                                <span>👣 步数:</span>
                                <span>${bank.moves}步</span>
                            </div>
                            <div class="bank-stat">
                                <span>⏳ 入狱:</span>
                                <span>${bank.jailTurns}回合</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="submit-btn" onclick="closeBankSelection()" style="margin-top: 20px;">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.id = 'bank-selection-modal';
}

// 选择银行
function selectBank(bankIndex) {
    const bank = banks[bankIndex];
    gameState.robGame.selectedBank = bank;
    
    addToLog(`选择了${bank.name}！难度：${bank.difficulty}，目标奖励：${bank.baseReward.toLocaleString()}元`);
    
    // 关闭选择模态框
    closeBankSelection();
    
    // 开始抢银行游戏
    initRobGame();
    robBankModal.style.display = 'flex';
}

// 关闭银行选择
function closeBankSelection() {
    const modal = document.getElementById('bank-selection-modal');
    if (modal) {
        modal.remove();
    }
}

// 初始化抢银行游戏
function initRobGame() {
    const bank = gameState.robGame.selectedBank;
    if (!bank) return;
    
    // 使用选定银行的设置
    gameState.robGame.movesLeft = bank.moves;
    gameState.robGame.reward = bank.baseReward;
    
    // 创建5x5网格
    const grid = [];
    for (let i = 0; i < 5; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            grid[i][j] = 'empty';
        }
    }
    
    // 设置玩家起始位置
    grid[0][0] = 'player';
    gameState.robGame.playerPos = { x: 0, y: 0 };
    
    // 设置出口位置
    grid[4][4] = 'exit';
    
    // 使用选定银行的障碍物数量
    const policeCount = bank.policeCount;
    const cameraCount = bank.cameraCount;
    
    // 随机放置警察
    for (let i = 0; i < policeCount; i++) {
        let x, y;
        do {
            x = secureRandomInt(0, 4);
            y = secureRandomInt(0, 4);
        } while (grid[x][y] !== 'empty' || (x === 0 && y === 0) || (x === 4 && y === 4));
        grid[x][y] = 'police';
    }
    
    // 随机放置监控
    for (let i = 0; i < cameraCount; i++) {
        let x, y;
        do {
            x = secureRandomInt(0, 4);
            y = secureRandomInt(0, 4);
        } while (grid[x][y] !== 'empty' || (x === 0 && y === 0) || (x === 4 && y === 4));
        grid[x][y] = 'camera';
    }
    
    gameState.robGame.grid = grid;
    renderRobGame();
}

// 渲染抢银行游戏
function renderRobGame() {
    const bank = gameState.robGame.selectedBank;
    
    gameGridEl.innerHTML = '';
    movesCountEl.textContent = gameState.robGame.movesLeft;
    
    // 更新模态框标题显示当前银行信息
    const modalTitle = robBankModal.querySelector('h2');
    const modalDesc = robBankModal.querySelector('p');
    modalTitle.innerHTML = `${bank.name} - ${bank.difficulty}难度`;
    modalDesc.innerHTML = `${bank.description} - 奖励.baseReward.to: ${bank.baseRewLocaleStringard.toLocaleString()}元`;
()}元`;
    
    for (let i =    
    for (let i = 0; i <  0; i < 5; i++) {
5; i++) {
               for (let j =  for (let j = 0;0; j < 5; j j < 5; j++)++) {
            const cell = document {
            const cell = document.createElement.createElement('div');
           ('div');
            cell.className cell.className = 'grid-cell';
 = 'grid-cell';
            
                       
            const cellType = gameState const cellType = gameState.robGame.grid[i.robGame.grid[i][j];
            
            switch(cellType) {
                case 'player':
                    cell.classList.add('player-pos');
                    cell.textContent = '👤';
                    cell.title = '你的位置';
                    break;
                case 'police':
                    cell.classList.add('pol][j];
            
            switch(cellType) {
                case 'player':
                    cell.classList.add('player-pos');
                    cell.textContent = '👤';
                    cell.title = '你的位置';
                    break;
                case 'police':
                    cell.classList.add('police');
                    cell.textContentice');
                    cell.textContent = ' = '👮';
                    cell👮';
                    cell.title.title = '警察 - 碰到 = '警察 - 碰到会被抓会被抓！';
                    break！';
                    break;
               ;
                case 'camera':
                    case 'camera':
                    cell cell.classList.add('camera.classList.add('camera');
                   ');
                    cell.text cell.textContentContent = '📹';
                    cell.title = = '📹';
                    cell.title = '监控 '监控摄像头 - 碰到会被抓！';
                    break;
摄像头 - 碰到会被抓！';
                    break;
                               case 'exit':
                    case 'exit':
                    cell cell.classList.add('exit');
                    cell.text.classList.add('exit');
                    cell.textContent = '💰';
Content = '💰';
                                       cell.title = '金库 - cell.title = '金库 -  到达这里就成功了！';
到达这里就成功了！';
                    break;
                    break;
                default:
                    cell                default:
                    cell.classList.add('empty');
                   .classList.add('empty');
                    cell.text cell.textContent = '⬜';
                    cell.title = '安全区域';
            }
            
            cell.addEventListener('click', () => movePlayer(i, j));
            gameGridEl.appendChild(cell);
        }
    }
}

// 移动玩家
function movePlayer(x, y) {
    if (Content = '⬜';
                    cell.title = '安全区域';
            }
            
            cell.addEventListener('click', () => movePlayer(i, j));
            gameGridEl.appendChild(cell);
        }
    }
}

// 移动玩家
function movePlayer(x, y) {
    if (gameState.robGame.mgameState.robGame.movesLeftovesLeft <= 0) return;
 <= 0) return;
    
    const    
    const playerPos = game playerPos = gameState.robGame.playerState.robGame.playerPos;
Pos;
    const bank = gameState    const bank = gameState.robGame.robGame.selectedBank;
    
.selectedBank;
    
       const isAdjacent = (
        Math const isAdjacent = (
        Math.abs(player.abs(playerPos.x - x) <= 1 && 
        Math.abs(playerPos.x - x) <= 1 && 
        Math.abs(playerPos.y - y) <= 1 &&
Pos.y - y) <= 1 &&
        !(        !(playerPos.x === x && playerPos.yplayerPos.x === x && playerPos.y === === y)
    );
 y)
    );
    
    if    
    if (!isAdjacent) (!isAdjacent) {
        {
        alert('只能移动到相邻的 alert('只能移动到相邻的格子格子（包括对角线）（包括对角线）！');
       ！');
        return;
    }
 return;
    }
    
    gameState.robGame.grid[playerPos.x][playerPos.y] = 'empty';
    
    if (gameState.robGame.grid[x][y] === 'police' || 
        gameState.robGame.grid[x][y] === 'camera    
    gameState.robGame.grid[playerPos.x][playerPos.y] = 'empty';
    
    if (gameState.robGame.grid[x][y] === 'police' || 
        gameState.robGame.grid[x][y] === 'camera') {
        addToLog(`') {
        addToLog(`在${bank.name在${bank.name}被}被警察抓住了！抢银行失败警察抓住了！抢银行失败！`);
！`);
        gameState.in        gameState.inJail = trueJail = true;
        gameState;
        gameState.jail.jailTTurnsurns = bank.jailT = bank.jailTurnsurns;
        robBankModal.style;
        robBankModal.style.display = 'none';
       .display = 'none';
        updateUI();
        return;
    updateUI();
        return;
    }
    
    game }
    
    gameState.robGame.grid[xState.robGame.grid[x][y] = '][y] = 'player';
    gameplayer';
    gameState.robGameState.robGame.player.playerPos = { x,Pos = { x, y };
 y };
    
    gameState.rob    
    gameState.robGameGame.movesLeft--;
    
.movesLeft--;
    
    if    if (gameState. (gameState.robGamerobGame.grid[x][y].grid[x][y] === ' === 'exit') {
        const reward = gameState.robGame.reward;
        // 根据银行难度调整奖励比例
        const bonusMultiplier = bank.difficulty === '简单' ? 0.15 : 
                              bank.difficulty === '中等' ? 0.2 :
                              bank.dexit') {
        const reward = gameState.robGame.reward;
        // 根据银行难度调整奖励比例
        const bonusMultiplier = bank.difficulty === '简单' ? 0.15 : 
                              bank.difficulty === '中等' ? 0.2ifficulty === :
                              bank.difficulty === '困难' ? 0 '困难' ? 0..25 : 0.3;
25 : 0.3;
        const bonus = Math.round(reward * bonusMultiplier * (game        const bonus = Math.round(reward * bonusMultiplier * (gameState.robState.robGame.movesLeft / bankGame.movesLeft / bank.m.moves));
        const totalRewoves));
        const totalRewardard = reward + bonus = reward + bonus;
        
;
        
        gameState.cash +=        gameState.cash += totalReward;
        add totalReward;
        addToLogToLog(`🎉 ${(`🎉 ${bank.namebank.name}抢劫大成功！获得}抢劫大成功！获得${reward${reward.toLocaleString()}元.toLocaleString()}元基础基础奖励 + ${bon奖励 + ${bonus.toLocaleus.toLocaleString()}元步数String()}元步数奖励，奖励，总计${totalRew总计${totalReward.toard.toLocaleString()}元！真正的LocaleString()}元！真正的富豪诞生！`);
富豪诞生！`);
        gameState        gameState..robGame.success = true;
        robBankModal.style.display = 'none';
        updateUI();
        return;
    }
    
    if (gameState.robGame.mrobGame.success = true;
        robBankModal.style.display = 'none';
        updateUI();
        return;
    }
    
    if (gameState.robGame.movesLeft <= 0) {
ovesLeft <= 0) {
        addToLog(`${        addToLog(`${bank.name}抢银行失败！移动次数用完了！`);
bank.name}抢银行失败！移动次数用完了！`);
        gameState.inJail = true;
               gameState.inJail = true;
        game gameStateState.jailTurns = Math.floor(bank.j.jailTurns = Math.floor(bank.jailTailTurns / 2);
        robBankModal.style.display =urns / 2);
        robBankModal.style.display = ' 'none';
        updateUI();
       none';
        updateUI();
        return;
 return;
    }
    
       }
    
    renderRob renderRobGame();
}

// 显示Game();
}

// 显示旅游选项旅游选项
function showTravel
function showTravelOptions()Options() {
    if ( {
    if (gameState.inJail) {
gameState.inJail) {
               addToLog(' addToLog('你现在你现在在监狱中，在监狱中，无法旅游！');
       无法旅游！');
        return;
    }
    
    return;
    }
    
    travel travelOptionsEl.innerHTML = '';
OptionsEl.innerHTML = '';
    game    gameState.travelOptions.forEach(optionState.travelOptions.forEach( => {
        const optionoption => {
        const optionEl =El = document.createElement('div document.createElement('div');
        optionEl.className = 'property-card';
        optionEl.innerHTML = `
            <div class="property-name">${option.name}</div>
            <div class="property-details">
                <span>费用: ${option.cost}元</span>
               ');
        optionEl.className = 'property-card';
        optionEl.innerHTML = `
            <div class="property-name">${option.name}</div>
            <div class="property-details">
                <span>费用: ${option.cost}元</span>
                <span>心情提升: +${option <span>心情提升: +.moodG${option.moodGain}</ain}</span>
            </span>
            </div>
div>
            <button class="buy            <button class="buy-btn-btn" onclick="travel('" onclick="travel('${option.name}${option.name}')">')">选择</button>
        `选择</button>
        `;
       ;
        travelOptionsEl travelOptionsEl.appendChild(option.appendChild(optionEl);
    });
    
   El);
    });
    
    travel travelModal.style.display = 'Modal.style.display = 'flex';
flex';
}

// 旅游
function}

// 旅游
function travel travel(destinationName) {
    const(destinationName) {
    const destination = game destination = gameState.travelState.travelOptions.find(opt => optOptions.find(opt => opt.name ===.name === destinationName);
    if (! destinationName);
    if (!destination) return;
destination) return;
    
       
    if (gameState if (gameState.cash >=.cash >= destination.cost) {
 destination.cost) {
        game        gameStateState.cash -= destination.cost;
        gameState.mood = Math.min(100, gameState.mood + destination.moodGain);
        addToLog(`去了${destinationName}旅游，心情值提升${destination.moodG.cash -= destination.cost;
        gameState.mood = Math.min(100, gameState.mood + destination.moodGain);
        addToLog(`去了${destinationName}旅游，心情值提升${destination.moodGain}`);
       ain}`);
        travelModal.style.display travelModal.style.display = 'none';
        = 'none';
        updateUI();
 updateUI();
    } else {
        alert    } else {
        alert('现金不足('现金不足，无法旅游！');
    }
，无法旅游！');
    }
}

//}

// 捐献
function donate() {
    if 捐献
function donate() {
    if (game (gameState.wealthLevel < 5) {
State.wealthLevel < 5) {
        alert('需要达到        alert('需要达到财富等级5才能捐献！');
        return财富等级5才能捐献！');
        return;
    }
    
    const;
    }
    
    const amount = parseInt(prompt('请输入捐献金额:'));
    if amount = parseInt(prompt('请输入捐献金额:'));
    if (isNaN( (isNaN(amount) || amount <= amount) || amount <= 0) {
        alert('请输入0) {
        alert('请输入有效有效金额');
        return;
    }
    
    if金额');
        return;
    }
    
 (gameState    if.cash >= (gameState.cash >= amount amount) {
        gameState) {
        gameState.cash -= amount;
        gameState.cash -= amount;
        gameState.donated += amount.donated += amount;
        addTo;
        addToLog(`捐献Log(`捐献了${amount}元，了${amount}元，提高了赦免几率`);
        updateUI();
    } else {
        alert('现金不足！');
    }
}

// 结束回合
function endTurn() {
    gameState.turn++;
    
    // 更新利率
    updateInterestRates();
    
    // 计算所有存款的利息
    game提高了赦免几率`);
        updateUI();
    } else {
        alert('现金不足！');
    }
}

// 结束回合
function endTurn() {
    gameState.turn++;
    
    // 更新利率
    updateInterestRates();
    
    // 计算所有存款的利息
State.depos    gameState.deposits.forEachits.forEach(deposit =>(deposit => {
        {
        const interest = calculate const interest = calculateInterest(dInterest(deposit);
        if (eposit);
        if (interest >interest > 0) {
 0) {
            //            // 利息自动计入存款本金（复利）
 利息自动计入存款本金（复            deposit利）
            deposit.amount.amount += interest;
        }
    += interest;
        }
    });
    
    if (game });
    
    if (gameStateState.inJail) {
.inJail) {
        game        gameState.jailTurns--;
State.jailTurns--;
        add        addToLog(`你在监狱中ToLog(`你在监狱中，还有${game，还有${gameState.jState.jailTurns}回合`);
        
ailTurns}回合`);
        
        const pardonChance        const pardonChance =  = 0.3 +0.3 + gameState gameState.donated / 100.donated / 10000;
00;
        if (gameState.j        if (gameState.jailTurns <= 0ailTurns <= 0 || || secureRandomFloat secureRandomFloat(0,(0, 1) < pardonChance) {
            gameState.inJail = false;
            gameState.jailTurns = 0;
            addToLog('你被释放了！');
        }
    } else {
        updatePropertyPrices();
        triggerRandomEvent();
        
        gameState.mood = Math.max(0, game 1) < pardonChance) {
            gameState.inJail = false;
            gameState.jailTurns = 0;
            addToLog('你被释放了！');
        }
    } else {
        updatePropertyPrices();
        triggerRandomEvent();
        
        gameState.mood = Math.max(0, gameState.mood -State.mood - 5);
    }
    
 5);
    }
    
       addToLog(`第${ addToLog(`第${gamegameState.turn}回合开始State.turn}回合开始`);
    updateUI();
}

// 更新房地产价格
function updatePropertyPrices`);
    updateUI();
}

// 更新房地产价格
function updatePropertyPrices() {
    gameState.propertyMarket.forEach() {
    gameState.propertyMarket.forEach((prop => {
prop => {
        const change =        const change = secureRandomFloat(-0 secureRandomFloat(-0.1, 0..1, 0.1515);
        const old);
        const oldPrice =Price = prop.currentPrice;
        prop.current prop.currentPrice;
        prop.currentPrice = MathPrice = Math.round(.round(prop.currentPrice * (prop.currentPrice * (11 + change));
        + change));
        prop.trend = Math prop.trend = Math.round(((prop.currentPrice - oldPrice) / old.round(((prop.currentPrice - oldPrice) / oldPrice)Price) * 100);
    * 100);
    });
    
    gameState.properties.forEach(prop => {
        const marketProp = gameState.propertyMarket.find(p => p.id === prop.id);
        if (marketProp) {
            const oldPrice = prop.currentPrice;
            prop.currentPrice = marketProp.currentPrice;
            prop.trend = Math.round(((prop.currentPrice - oldPrice });
    
    gameState.properties.forEach(prop => {
        const marketProp = gameState.propertyMarket.find(p => p.id === prop.id);
        if (marketProp) {
            const oldPrice = prop.currentPrice;
            prop.currentPrice = marketProp.currentPrice;
            prop.trend = Math.round(((prop.currentPrice - oldPrice) /) / oldPrice) *  oldPrice) * 100);
        }
    });
}

100);
        }
    });
}

// 触发随机// 触发随机事件
事件
function triggerRandomEvent() {
function triggerRandomEvent() {
    const    const events = [
        { type events = [
        { type: 'priceChange', weight: 'priceChange', weight:: 4 },
        4 },
        { type: { type: 'earthquake', 'earthquake', weight: weight: 1 },
 1 },
        { type:        { type: 'bankJob', weight:  'bankJob', weight: 2 },
        {2 },
        { type: 'news', weight:  type: 'news', weight: 3 }
3 }
    ];
    
    const totalWeight    ];
    
    const totalWeight = = events.reduce((sum events.reduce((sum, event) => sum + event.weight, event) => sum + event.weight,, 0);
 0);
       let let random random = secureRandomFloat(0, totalWeight);
    let selected = secureRandomFloat(0, totalWeight);
    let selectedEvent = events[0];
    
    for (Event = events[0];
    
    for (const eventconst event of events) {
        random of events) {
        random -= event.weight;
        if (random <= 0) {
            selectedEvent = event;
            break;
        }
    }
    
    switch(selectedEvent.type) {
        case 'priceChange':
            const changeProp = secureRandomChoice(gameState.propertyMarket);
            const change = secureRandom -= event.weight;
        if (random <= 0) {
            selectedEvent = event;
            break;
        }
    }
    
    switch(selectedEvent.type) {
        case 'priceChange':
            const changeProp = secureRandomChoice(gameState.propertyMarket);
            const change = secureRandomFloat(-0.1,Float(-0.1,  0.20.2);
           );
            const old const oldPrice =Price = changeProp.currentPrice;
            changeProp.currentPrice;
            change changeProp.currentPrice = Math.round(changeProp.currentPrice = Math.round(changeProp.currentPriceProp.currentPrice * (1 + change));
            change * (1 + change));
            changeProp.trendProp.trend = Math.round(((changeProp.currentPrice = Math.round(((changeProp.currentPrice - oldPrice - oldPrice) / oldPrice) * 100);
            
) / oldPrice) * 100);
            
            addTo            addToLog(`突发新闻：${changeProp.nameLog(`突发新闻：${changeProp.name}价格${change}价格${change > 0 ? '上涨 > 0 ? '上涨'' : '下跌'}了 : '下跌'}了${Math${Math.abs(Math.round(.abs(Math.round(change * change * 100))}%`);
100))}%`);
                       break;
            
        case 'earth break;
            
        case 'earthquake':
            if (gamequake':
            if (gameState.propertiesState.properties.length > 0.length > 0) {
) {
                const quakeProp =                const quakeProp = secure secureRandomChoice(gameState.propertiesRandomChoice(gameState.properties);
               );
                if (secureRandomFloat(0 if (secureRandomFloat(0, 1) < 0.5) {
                    quakeProp.status = 'damaged';
                    addToLog(`地震！${quakeProp.name}损毁了，需要修复`);
                } else {
                    quakeProp.status = 'destroyed';
                    addToLog(`强烈, 1) < 0.5) {
                    quakeProp.status = 'damaged';
                    addToLog(`地震！${quakeProp.name}损毁了，需要修复`);
                } else {
                    quakeProp.status = 'destroyed';
地震！${quakeProp                    addToLog(`强烈地震.name！${quakeProp.name}永久}永久消失了`);
                }
            }
消失了`);
                }
            }
                       break;
            
        case break;
            
        case 'bank 'bankJob':
            startBankJobJob':
            startBankJob();
            break;
            
       ();
            break;
            
        case ' case 'news':
           news':
            const newsOptions const newsOptions = [
 = [
                               "政府推出购房补贴政策，房地产市场活跃！ "政府推出购房补贴政策，房地产市场活跃！",
",
                "经济形势不佳，房地产价格可能下跌                "经济形势不佳，房地产价格可能下跌。。",
                "新区开发计划公布，相关区域",
                "新区开发计划公布，相关区域房产看涨房产看涨。",
                "银行。",
                "银行利率调整，利率调整，存款收益存款收益增加。"
           增加。"
            ];
            gameState.news = ];
            gameState.news = secureRandomChoice secureRandomChoice(new(newsOptions);
            newssOptions);
            newsContentElContentEl.textContent = gameState..textContent = gameState.newsnews;
            addToLog(`新闻更新：${gameState.news}`);
            break;
;
    }
}

//            break;
    }
}

//  开始银行开始银行任务
function startBankJob() {
    gameState.bankJob.active = true;
    gameState.bankJob.problems = generateMathProblems(5);
    gameState.bankJob.currentProblem = 0;
    gameState.bankJob.salary = secureRandomInt(100,任务
function startBankJob() {
    gameState.bankJob.active = true;
    gameState.bankJob.problems = generateMathProblems(5);
    gameState.bankJob.currentProblem = 0;
    gameState.bankJob.salary = secureRandomInt(100, 300);
    
 300);
    
    show    showNextProblem();
   NextProblem();
    bankJob bankJobModal.style.display = 'flex';
}

Modal.style.display = 'flex';
}

// 生成数学问题
function generateMathProblems(countfunction generateMathProblems(count) {
   ) {
    const problems = [];
 const problems = [];
    for    for (let i =  (let i = 0;0; i < count; i++) {
 i < count; i++) {
        const a = secure        const a = secureRandomRandomInt(Int(1, 50);
       1, 50);
        const b = const b = secureRandomInt secureRandomInt(1, 50);
(1, 50);
        const op = secureRandomFloat(        const op = secureRandomFloat(0, 0, 1) > 0.1) > 0.5 ? '+' :5 ? '+' : '-';
        let answer;
        
        if (op '-';
        let answer;
        
        if (op === '+') {
            answer = a + b === '+') {
            answer = a + b;
        };
        } else {
            answer = a else {
            answer = a - b;
        }
        
 - b;
        }
        
        problems.push({
            question:        problems.push({
            question: `${a} ${op} `${a} ${op} ${b} = ?`,
            answer: answer
        });
    }
    return problems;
}

// 显示下一个问题
function showNextProblem() {
    if (gameState.bankJob.currentProblem < gameState.bankJob.problems.length) < gameState.bankJob.problems.length) {
 {
        const problem = gameState.b        const problem = gameState.bankJob.problemsankJob.problems[gameState.bankJob.currentProblem[gameState.bankJob.currentProblem];
       ];
        mathProblemEl.text mathProblemEl.textContent = problemContent = problem.question;
        answerInputEl.question;
        answerInputEl.value.value = '';
        answerInput = '';
        answerInputElEl.focus.focus();
   ();
    } else {
        game } else {
        gameStateState.cash += game.cash += gameState.bankState.bankJob.salary;
        addToLog(`完成Job.salary;
        addToLog(`完成银行任务，获得薪水${gameState.b银行任务，获得薪水${gameState.bankJob.salaryankJob.salary}元}元`);
        bankJob`);
        bankJobModal.style.displayModal.style.display = 'none';
        gameState = 'none';
        gameState.bankJob.active =.bankJob.active = false false;
        updateUI();
    }
}

;
        updateUI();
    }
}

// 检查答案
function checkAnswer() {
    const userAnswer = parseInt    const userAnswer = parseInt(answerInput(answerInputEl.value);
   El.value);
    const correct const correctAnswer = gameState.bankAnswer = gameState.bankJob.proJob.problems[gameState.bankJob.currentProblem].answer;
    
    if (userAnswer === correctAnswer) {
        gameState.bankJob.currentProblem++;
        showNextProblem();
    } else {
        alert('答案错误，请重新计算！');
        answerInputEl.value = '';
        answerInputEl.fblems[gameState.bankJob.currentProblem].answer;
    
    if (userAnswer === correctAnswer) {
        gameState.bankJob.currentProblem++;
        showNextProblem();
    } else {
        alert('答案错误，请重新计算！');
        answerInputEl.value = '';
        answerInputEl.focus();
    }
}

//ocus();
    }
}

// 添加日志
function add 添加日志
function addToLogToLog(message) {
   (message) {
    gameState.event gameState.eventLog.push(message);
   Log.push(message);
    if if (gameState.eventLog (gameState.eventLog.length > .length > 10) {
10) {
        gameState.event        gameState.eventLog.shift();
    }
Log.shift();
    }
}

// 存档功能

// 1. 创建存档按钮
function createSaveButton() {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';
    saveBtn.textContent = '💾 存档';
    saveBtn.onclick = showSaveModal;
    document.body.appendChild(saveBtn);
}

// 2. 显示存档模态框
function showSaveModal() {
    const modal = document.getElementById('save-modal');
    if (modal) {
        updateSaveSlots();
        modal.style.display = 'flex';
    }
}

// 3. 关闭存档模态框
function closeSaveModal() {
    const modal = document.getElementById('save-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 4. 更新存档槽位显示
function updateSaveSlots() {
    if (!window.saveManager) return;
    
    const saves = window.saveManager.getAllSaves();
    
    ['save1', 'save2', 'save3'].forEach(slot => {
        const save = saves[slot];
        
        // 更新保存标签页
        const statusEl = document.getElementById(`${slot}-status`);
        const infoEl = document.getElementById(`${slot}-info`);
        
        if (save && save.saveTime) {
            if (statusEl) {
                statusEl.textContent = '已保存';
                statusEl.setAttribute('data-status', 'saved');
            }
            if (infoEl) {
                const date = new Date(save.saveTime);
                infoEl.innerHTML = `
                    <strong>${save.gameName}</strong><br>
                    等级: ${save.level}<br>
                    现金: ${save.cash.toLocaleString()}<br>
                    保存时间: ${date.toLocaleDateString()}<br>
                    游戏时间: ${Math.floor(save.playTime / 60)}分钟
                `;
            }
        } else {
            if (statusEl) {
                statusEl.textContent = '空';
                statusEl.setAttribute('data-status', 'empty');
            }
            if (infoEl) {
                infoEl.textContent = '暂无存档';
            }
        }
        
        // 更新加载标签页
        const loadStatusEl = document.getElementById(`load-${slot}-status`);
        const loadInfoEl = document.getElementById(`load-${slot}-info`);
        
        if (loadStatusEl) loadStatusEl.textContent = statusEl.textContent;
        if (loadStatusEl) loadStatusEl.setAttribute('data-status', statusEl.getAttribute('data-status'));
        if (loadInfoEl) loadInfoEl.innerHTML = infoEl.innerHTML;
    });
}

// 5. 保存游戏到指定槽位
function saveGameToSlot(slot) {
    const gameName = prompt('请输入存档名称:', `存档_${slot}_回合${gameState.turn}`);
    if (gameName && window.saveManager) {
        const success = window.saveManager.save(slot, gameName);
        if (success) {
            updateSaveSlots();
        }
    }
}

// 6. 从槽位加载游戏
function loadGameFromSlot(slot) {
    if (window.saveManager) {
        const success = window.saveManager.load(slot);
        if (success) {
            closeSaveModal();
            updateUI();
        }
    }
}

// 7. 快速保存
function quickSaveGame() {
    if (window.saveManager) {
        const success = window.saveManager.save(window.saveManager.currentSlot, '快速保存');
        if (success) {
            updateSaveSlots();
            addToLog('✅ 游戏已快速保存');
        }
    }
}

// 8. 导出当前存档
function exportCurrentSave() {
    if (window.saveManager) {
        const exported = window.saveManager.exportSave(window.saveManager.currentSlot);
        if (exported) {
            addToLog('✅ 存档已导出');
        }
    }
}

// 9. 删除所有存档
function deleteAllSaves() {
    if (confirm('⚠️ 确定要删除所有存档吗？此操作不可恢复！')) {
        ['save1', 'save2', 'save3'].forEach(slot => {
            if (window.saveManager) {
                window.saveManager.deleteSave(slot);
            }
        });
        updateSaveSlots();
    }
}

// 10. 导入存档文件
function importSaveFile() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('请选择要导入的存档文件');
        return;
    }
    
    const slot = prompt('导入到哪个槽位？(save1, save2, save3)', 'save1');
    if (slot && window.saveManager) {
        window.saveManager.importSave(file, slot)
            .then(() => {
                updateSaveSlots();
                alert('存档导入成功！');
            })
            .catch(error => {
                alert('导入失败: ' + error);
            });
    }
}

// 11. 修复存档数据
function repairSaves() {
    if (window.saveManager) {
        // 这里可以添加存档修复逻辑
        alert('存档修复功能开发中...');
    }
}

// 12. 清除游戏数据
function clearGameData() {
    if (confirm('⚠️ 确定要清除所有游戏数据吗？包括存档和设置！')) {
        localStorage.clear();
        location.reload();
    }
}

// 13. 导出所有存档
function exportAllSaves() {
    if (window.saveManager) {
        // 这里可以实现批量导出功能
        alert('批量导出功能开发中...');
    }
}

// 14. 在游戏事件中添加自动保存点
function addToLog(message) {
    gameState.eventLog.push(message);
    if (gameState.eventLog.length > 10) {
        gameState.eventLog.shift();
    }
    
    // 重要事件触发自动保存
    if (message.includes('抢劫大成功') || 
        message.includes('获得赦免') || 
        message.includes('财富等级提升')) {
        setTimeout(quickSaveGame, 1000);
    }
}

// 15. 添加保存事件监听
window.addEventListener('saveManagerEvent', (event) => {
    const { type, slot, metadata } = event.detail;
    console.log(`存档事件: ${type}, 槽位: ${slot}`);
});

// 16. 在页面加载时自动加载最近存档
window.addEventListener('load', () => {
    setTimeout(() => {
        // 自动加载最近存档的逻辑
        const saves = window.saveManager ? window.saveManager.getAllSaves() : {};
        const recentSave = Object.values(saves).find(save => save.saveTime);
        
        if (recentSave && confirm('检测到最近存档，是否加载？')) {
            window.saveManager.load(recentSave.slotName);
        }
    }, 1000);
});
