// 问题数据
const questions = [
    "头痛", "神经过敏，心中不踏实", "头脑中有不必要的想法或字句盘旋", "头晕或晕倒",
    "对异性的兴趣减退", "对旁人责备求全", "感到别人能控制您的思想", "责怪别人制造麻烦",
    "忘性大", "担心自己的衣饰整齐及仪态的端正", "容易烦恼和激动", "胸痛",
    "害怕空旷的场所或街道", "感到自己的精力下降，活动减慢", "想结束自己的生命", "听到旁人听不到的声音",
    "发抖", "感到大多数人都不可信任", "胃口不好", "容易哭泣",
    "同异性相处时感到害羞不自在", "感到受骗，中了圈套或有人想抓住您", "无缘无故地突然感到害怕", "自己不能控制地大发脾气",
    "怕单独出门", "经常责怪自己", "腰痛", "感到难以完成任务",
    "感到孤独", "感到苦闷", "过分担忧", "对事物不感兴趣",
    "感到害怕", "您的感情容易受到伤害", "旁人能知道您的私下想法", "感到别人不理解您、不同情您",
    "感到人们对您不友好，不喜欢您", "做事必须做得很慢以保证做得正确", "心跳得很厉害", "恶心或胃部不舒服",
    "感到比不上他人", "肌肉酸痛", "感到有人在监视您、谈论您", "难以入睡",
    "做事必须反复检查", "难以做出决定", "怕乘电车、公共汽车、地铁或火车", "呼吸有困难",
    "一阵阵发冷或发热", "因为感到害怕而避开某些东西、场合或活动", "脑子变空了", "身体发麻或刺痛",
    "喉咙有梗塞感", "感到前途没有希望", "不能集中注意力", "感到身体的某一部分软弱无力",
    "感到紧张或容易紧张", "感到手或脚发重", "想到死亡的事", "吃得太多",
    "当别人看着您或谈论您时感到不自在", "有一些不属于您自己的想法", "有想打人或伤害他人的冲动", "醒得太早",
    "必须反复洗手、点数", "睡得不稳不深", "有想摔坏或破坏东西的想法", "有一些别人没有的想法",
    "感到对别人神经过敏", "在商店或电影院等人多的地方感到不自在", "感到任何事情都很困难", "一阵阵恐惧或惊恐",
    "感到公共场合吃东西很不舒服", "经常与人争论", "单独一人时神经很紧张", "别人对您的成绩没有做出恰当的评价",
    "即使和别人在一起也感到孤单", "感到坐立不安心神不定", "感到自己没有什么价值", "感到熟悉的东西变成陌生或不像是真的",
    "大叫或摔东西", "害怕会在公共场合晕倒", "感到别人想占您的便宜", "为一些有关性的想法而很苦恼",
    "您认为应该因为自己的过错而受到惩罚", "感到要很快把事情做完", "感到自己的身体有严重问题", "从未感到和其他人很亲近",
    "感到自己有罪", "感到自己的脑子有毛病"
];

// 因子分类
const factors = {
    躯体化: [0, 3, 11, 26, 39, 41, 47, 48, 51, 52, 55, 57],
    强迫症状: [2, 8, 9, 27, 37, 44, 45, 50, 54, 64],
    人际关系敏感: [5, 20, 33, 35, 36, 40, 60, 68, 72],
    抑郁: [4, 13, 14, 19, 21, 25, 28, 29, 30, 31, 53, 70, 78],
    焦虑: [1, 16, 22, 32, 38, 56, 71, 77, 79, 85],
    敌对: [10, 23, 62, 66, 73, 80],
    恐怖: [12, 24, 46, 49, 69, 74, 81],
    偏执: [7, 17, 42, 67, 75, 82],
    精神病性: [6, 15, 34, 61, 76, 83, 84, 86, 87, 89],
    其他: [18, 43, 58, 59, 63, 65, 88]
};

// 用户答案数组
let userAnswers = new Array(90).fill(0);
let currentQuestion = 0;

// DOM 元素
const homePage = document.getElementById('homepage');
const testPage = document.getElementById('testpage');
const resultPage = document.getElementById('resultpage');
const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const questionText = document.getElementById('questionText');
const currentQuestionSpan = document.getElementById('currentQuestion');
const questionNumSpan = document.getElementById('questionNum');
const progressFill = document.getElementById('progressFill');
const restartBtn = document.getElementById('restartBtn');
const timeLimit = document.getElementById('timeLimit');

// 24小时访问限制功能（暂时注释）
function checkTimeLimit() {
    // const lastVisit = localStorage.getItem('lastVisit');
    // const now = new Date().getTime();

    // if (lastVisit) {
    //     const timeDiff = now - parseInt(lastVisit);
    //     const hoursDiff = timeDiff / (1000 * 60 * 60);

    //     if (hoursDiff < 24) {
    //         return false; // 24小时内不允许访问
    //     }
    // }

    // localStorage.setItem('lastVisit', now.toString());
    return true; // 暂时始终允许访问
}

// 页面切换功能
function showPage(pageId) {
    // 先滚动到顶部
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // 隐藏所有页面
    homePage.classList.remove('active');
    resultPage.classList.remove('active');
    
    // 如果切换到首页
    if (pageId === 'homepage') {
        // 重置页面状态
        document.body.style.overflow = 'auto';
        resultPage.style.display = 'none';
        
        // 重置首页显示
        homePage.style.display = 'flex';
        homePage.classList.add('active');
        
        // 重置首页内容
        const header = document.querySelector('.header');
        const description = document.querySelector('.description');
        const startSection = document.querySelector('.start-section');
        const questionSection = document.getElementById('questionSection');

        if (header) header.style.display = 'block';
        if (description) description.style.display = 'block';
        if (startSection) startSection.style.display = 'block';
        if (questionSection) questionSection.style.display = 'none';
        
        // 重置滚动位置
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // 如果切换到结果页面
    else if (pageId === 'resultpage') {
        // 隐藏首页所有内容
        homePage.style.display = 'none';
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.description').style.display = 'none';
        document.querySelector('.start-section').style.display = 'none';
        document.getElementById('questionSection').style.display = 'none';
        // 显示结果页面
        resultPage.classList.add('active');
        document.body.style.overflow = 'auto';
    }
}

// 更新问题显示
function updateQuestion() {
    questionText.textContent = questions[currentQuestion];
    currentQuestionSpan.textContent = (currentQuestion + 1).toString();
    questionNumSpan.textContent = (currentQuestion + 1).toString();
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    // 更新按钮状态
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
    submitBtn.style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
    
    // 清除所有选项的选中状态
    const options = document.getElementsByName('answer');
    options.forEach(option => {
        option.checked = false;
    });

    // 恢复之前的选择（如果有）
    if (userAnswers[currentQuestion] !== 0) {
        const selectedOption = document.querySelector(`input[name="answer"][value="${userAnswers[currentQuestion]}"]`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }

    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 计算因子分数
function calculateFactorScores() {
    const scores = {};
    let totalScore = 0;
    let totalItems = 0;
    
    // 计算阳性和阴性项目数
    const positiveItems = userAnswers.filter(score => score > 1).length;
    const negativeItems = userAnswers.filter(score => score <= 1).length;
    
    // 计算各因子分数
    for (const [factor, items] of Object.entries(factors)) {
        const sum = items.reduce((acc, index) => acc + userAnswers[index], 0);
        const average = sum / items.length;
        scores[factor] = {
            sum,
            average,
            count: items.length,
            positiveCount: items.filter(index => userAnswers[index] > 1).length
        };
        totalScore += sum;
        totalItems += items.length;
    }
    
    // 计算总分和平均分
    const overallAverage = totalScore / questions.length;
    
    return {
        factorScores: scores,
        totalScore,
        overallAverage,
        positiveItems,
        negativeItems,
        positiveSymptomsScore: totalScore / positiveItems || 0 // 阳性症状均分
    };
}

// 生成评估建议
function generateRecommendations(scores) {
    let recommendations = [];
    const { overallAverage, factorScores } = scores;

    // 总体评估建议
    if (overallAverage <= 1.5) {
        recommendations.push("您的整体心理健康状况良好，请继续保持积极乐观的生活态度。");
    } else if (overallAverage <= 2.5) {
        recommendations.push("您可能存在轻微的心理健康问题，建议：");
        recommendations.push("• 适当进行心理调节和自我关注");
        recommendations.push("• 保持规律的作息和健康的生活方式");
        recommendations.push("• 如有需要可以寻求专业的心理咨询支持");
    } else if (overallAverage <= 3.5) {
        recommendations.push("您的心理健康状况需要关注，强烈建议：");
        recommendations.push("• 及时寻求专业的心理咨询或医疗帮助");
        recommendations.push("• 与家人朋友多交流，获取社会支持");
        recommendations.push("• 调整生活方式，增加运动和放松活动");
    } else {
        recommendations.push("您的心理健康状况可能较为严重，请务必：");
        recommendations.push("• 立即寻求专业的心理医生或精神科医生的帮助");
        recommendations.push("• 告知家人或信任的朋友，获取必要的支持和帮助");
        recommendations.push("• 保持规律的生活作息，避免过度劳累");
    }

    // 针对各因子的具体建议
    recommendations.push("\n各维度具体建议：");

    // 检查是否有任何因子需要关注
    let hasSpecificRecommendations = false;

    if (factorScores.躯体化.average > 2) {
        recommendations.push("\n躯体化方面：");
        recommendations.push("• 规律作息，保持充足睡眠");
        recommendations.push("• 适量运动，增强体质");
        recommendations.push("• 进行放松训练，如深呼吸、冥想等");
        hasSpecificRecommendations = true;
    }

    if (factorScores.强迫症状.average > 2) {
        recommendations.push("\n强迫症状方面：");
        recommendations.push("• 学习接纳和放松技巧");
        recommendations.push("• 尝试渐进式暴露训练");
        recommendations.push("• 建立合理的行为目标");
        hasSpecificRecommendations = true;
    }

    if (factorScores.人际关系敏感.average > 2) {
        recommendations.push("\n人际关系方面：");
        recommendations.push("• 培养自信心和自我接纳");
        recommendations.push("• 参加社交活动，扩大社交圈");
        recommendations.push("• 学习沟通技巧");
        hasSpecificRecommendations = true;
    }

    if (factorScores.抑郁.average > 2) {
        recommendations.push("\n抑郁情绪方面：");
        recommendations.push("• 保持规律的作息和生活节奏");
        recommendations.push("• 培养兴趣爱好，增加正向体验");
        recommendations.push("• 寻求专业心理咨询的帮助");
        hasSpecificRecommendations = true;
    }

    if (factorScores.焦虑.average > 2) {
        recommendations.push("\n焦虑情绪方面：");
        recommendations.push("• 学习放松技巧和呼吸法");
        recommendations.push("• 适度运动，释放压力");
        recommendations.push("• 避免咖啡因等刺激性物质");
        hasSpecificRecommendations = true;
    }

    if (factorScores.敌对.average > 2) {
        recommendations.push("\n情绪控制方面：");
        recommendations.push("• 学习情绪管理技巧");
        recommendations.push("• 培养同理心");
        recommendations.push("• 寻找适当的压力释放方式");
        hasSpecificRecommendations = true;
    }

    if (factorScores.恐怖.average > 2) {
        recommendations.push("\n恐惧情绪方面：");
        recommendations.push("• 采用渐进式暴露训练");
        recommendations.push("• 学习应对技巧");
        recommendations.push("• 建立安全感支持系统");
        hasSpecificRecommendations = true;
    }

    if (factorScores.偏执.average > 2) {
        recommendations.push("\n思维方式方面：");
        recommendations.push("• 培养开放和包容的心态");
        recommendations.push("• 增加社会支持网络");
        recommendations.push("• 学习理性思维方式");
        hasSpecificRecommendations = true;
    }

    if (factorScores.精神病性.average > 2) {
        recommendations.push("\n特别注意：");
        recommendations.push("• 建议及时就医检查");
        recommendations.push("• 保持良好的作息规律");
        recommendations.push("• 加强与亲友的沟通和联系");
        hasSpecificRecommendations = true;
    }

    // 如果没有特定的维度建议，提供通用的健康维护建议
    if (!hasSpecificRecommendations) {
        recommendations.push("\n恭喜您！各维度得分都在正常范围内。为了继续保持良好的心理健康状态，建议：");
        recommendations.push("• 保持规律的作息时间，确保充足的睡眠");
        recommendations.push("• 坚持适度的体育锻炼，增强身心健康");
        recommendations.push("• 培养积极的兴趣爱好，丰富精神生活");
        recommendations.push("• 维护良好的人际关系，多与亲友交流");
        recommendations.push("• 学会合理安排工作和休息，避免过度压力");
        recommendations.push("• 定期进行自我反思，关注内心感受");
        recommendations.push("• 遇到困难时，及时寻求帮助和支持");
    }

    return recommendations;
}

// 显示测试结果
function showResults() {
    const scores = calculateFactorScores();

    // 更新总分显示
    const totalScoreDisplay = document.getElementById('totalScoreDisplay');
    const averageScoreDisplay = document.getElementById('averageScoreDisplay');
    totalScoreDisplay.textContent = Math.round(scores.totalScore);
    averageScoreDisplay.textContent = scores.overallAverage.toFixed(2);

    // 更新因子得分表格
    const factorTableBody = document.getElementById('factorTableBody');
    factorTableBody.innerHTML = '';

    for (const [factor, data] of Object.entries(scores.factorScores)) {
        const statusClass = getStatusClass(data.average);
        const statusText = getStatusText(data.average);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="factor-name">${factor}</td>
            <td>${Math.round(data.sum)}</td>
            <td>${data.average.toFixed(2)}</td>
            <td><span class="status-tag ${statusClass}">${statusText}</span></td>
        `;
        factorTableBody.appendChild(row);
    }

    // 生成因子解释说明
    generateFactorExplanations(scores.factorScores);
}

// 生成因子解释说明
function generateFactorExplanations(factorScores) {
    const factorExplanations = document.getElementById('factorExplanations');
    factorExplanations.innerHTML = '';

    // 因子解释文本
    const factorDescriptions = {
        '躯体化': '主要反映身体不适感，包括心血管、胃肠道、呼吸和其他系统的主诉不适，以及头痛、背痛、肌肉酸痛、焦虑等躯体不适表现。',
        '强迫症状': '主要指那些明知没有必要，但又无法摆脱的无意义的思想、冲动、行为等表现，还有一些比较一般的认知障碍的行为征象也在这一因子中反映。',
        '人际关系敏感': '主要是指某些个人不自在感和自卑感，特别是与其他人相比较时更突出。在人际交往中的自卑感、心神不安、明显不自在，以及人际关系中的不良自我暗示，消极的期待等是这方面症状的典型原因。',
        '抑郁': '反映抑郁苦闷的感情与心境，还以对生活的兴趣减退，动力缺乏，活力丧失等为代表的一些症状，还反映失望、悲观以及与抑郁相联系的认知和躯体方面的感受，另外，还包括死亡的思想和自杀观念。',
        '焦虑': '一般指那些烦躁、坐立不安、神经过敏、紧张以及由此产生的躯体征象，如震颤等。',
        '敌对': '主要从思想、感情及行为三方面来反映病人的敌对表现。其项目包括厌烦的感觉、摔物、争论、不可控制的脾气暴发，以及仇恨他人的冲动等。',
        '恐怖': '恐怖的定义与传统的恐怖状态或广场恐怖所反映的内容是一致的，包括对出行、空旷场所、人群或公共场所和交通工具的恐怖。除此之外，还有社交恐怖。',
        '偏执': '主要指投射性思维、敌对、猜疑、关系观念、被动体验、妄想等。',
        '精神病性': '反映各式各样的精神病性行为，项目包括幻听、思维播散、被控制感、思维被插入等明显的精神病性症状的项目，也包括一些反映精神分裂样行为的项目。该因子提供了一个连续性水平的精神病性行为的测定。',
        '其他': '包括睡眠及饮食障碍等。'
    };

    for (const [factor, data] of Object.entries(factorScores)) {
        if (data.average > 1.5) { // 只显示需要关注的因子
            const explanationDiv = document.createElement('div');
            const riskClass = getRiskClass(data.average);
            explanationDiv.className = `factor-explanation ${riskClass}`;

            const statusTag = `<span class="status-tag ${getStatusClass(data.average)}">${getStatusText(data.average)}</span>`;

            explanationDiv.innerHTML = `
                <div class="factor-title">
                    ${factor} ${statusTag}
                </div>
                <div class="factor-description">
                    ${factorDescriptions[factor] || '该因子的详细说明暂未提供。'}
                </div>
            `;

            factorExplanations.appendChild(explanationDiv);
        }
    }

    // 如果没有需要关注的因子，显示正常状态说明
    if (factorExplanations.children.length === 0) {
        const normalDiv = document.createElement('div');
        normalDiv.className = 'factor-explanation';
        normalDiv.innerHTML = `
            <div class="factor-title">
                整体状况 <span class="status-tag status-normal">正常</span>
            </div>
            <div class="factor-description">
                恭喜您！您的各项心理健康指标都在正常范围内。请继续保持良好的生活习惯和积极的心态，定期关注自己的心理健康状况。
            </div>
        `;
        factorExplanations.appendChild(normalDiv);
    }
}

// 获取评估级别
function getAssessmentLevel(score) {
    if (score <= 1.5) return "正常";
    if (score <= 2.5) return "轻度";
    if (score <= 3.5) return "中度";
    return "重度";
}

// 获取分数对应的CSS类
function getScoreClass(score) {
    if (score <= 1.5) return "score-normal";
    if (score <= 2.5) return "score-mild";
    if (score <= 3.5) return "score-moderate";
    return "score-severe";
}

// 获取状态标签的CSS类
function getStatusClass(score) {
    if (score <= 1.5) return "status-normal";
    if (score <= 2.5) return "status-mild";
    if (score <= 3.5) return "status-moderate";
    return "status-severe";
}

// 获取状态文本
function getStatusText(score) {
    if (score <= 1.5) return "正常";
    if (score <= 2.5) return "轻度";
    if (score <= 3.5) return "中度";
    return "重度";
}

// 获取风险等级CSS类
function getRiskClass(score) {
    if (score <= 1.5) return "";
    if (score <= 2.5) return "needs-attention";
    if (score <= 3.5) return "moderate-risk";
    return "high-risk";
}

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {    
    // 开始测试
    startBtn.addEventListener('click', () => {
        // 隐藏所有初始内容
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.description').style.display = 'none';
        document.querySelector('.start-section').style.display = 'none';

        // 显示题目部分
        document.getElementById('questionSection').style.display = 'block';
        updateQuestion();
    });
    
    // 选项选择
    const options = document.getElementsByName('answer');
    options.forEach(option => {
        option.addEventListener('change', () => {
            userAnswers[currentQuestion] = parseInt(option.value);
            
            // 当不是最后一题时，自动跳转到下一题
            if (currentQuestion < questions.length - 1) {
                setTimeout(() => {
                    currentQuestion++;
                    updateQuestion();
                }, 300); // 短暂延迟，让用户看到选择效果
            } else {
                // 是最后一题，显示提交按钮
                submitBtn.style.display = 'block';
                nextBtn.style.display = 'none';
            }
        });
    });
    
    // 上一题
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestion();
        }
    });
    
    // 下一题（保留但隐藏按钮，用于特殊情况）
    nextBtn.style.display = 'none';
    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            updateQuestion();
        }
    });
    
    // 提交测试
    submitBtn.addEventListener('click', () => {
        // 检查是否所有问题都已回答
        if (userAnswers.some(answer => answer === 0)) {
            alert('请回答所有问题后再提交！');
            return;
        }
        
        // 先生成结果
        showResults();
        // 然后切换页面（这会同时隐藏题目部分）
        showPage('resultpage');
    });
    
    // 重新测试
    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        userAnswers = new Array(90).fill(0);
        showPage('homepage');
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
});