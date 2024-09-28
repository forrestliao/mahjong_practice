// 定義麻將的牌 (只保留數字部分)
const tongTiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let hand = [];
let correctAnswers = new Set();
let playerSelections = new Set(); // 玩家選擇的聽牌

// 隨機生成 7 張或 10 張的手牌，允許重複，最多重複 4 次
function generateHand() {
    const handSize = Math.random() < 0.5 ? 7 : 10; // 隨機決定生成 7 張或 10 張牌
    const onlyTenpai = document.getElementById('onlyTenpai').checked; // 檢查選項

    do {
        hand = []; // 清空手牌
        while (hand.length < handSize) {
            // 從 1 到 9 隨機選擇一張牌
            const tile = tongTiles[Math.floor(Math.random() * tongTiles.length)];

            // 檢查該牌是否已經在手牌中出現了 4 次
            const tileCount = hand.filter(t => t === tile).length;
            if (tileCount < 4) {
                hand.push(tile);
            }
        }

        correctAnswers.clear();
        calculateCorrectAnswers(); // 計算正確的聽牌
    } while (onlyTenpai && correctAnswers.size === 0); // 如果選擇了「只出有聽牌」且沒有聽牌則重新生成

    playerSelections.clear();
    document.getElementById('result').textContent = ''; // 清空結果
    renderHand();  // 顯示題目
    renderChoices(); // 顯示玩家選擇聽牌的區域
    console.log("Generated hand:", hand);
}

// 計算正確的聽牌
function calculateCorrectAnswers() {
    for (let i = 1; i <= 9; i++) {
        const tile = `${i}`;  // 保留數字部分
        
        // 檢查該牌是否在手牌中已經有 4 張
        const tileCountInHand = hand.filter(t => t === tile).length;
        if (tileCountInHand >= 4) {
            continue; // 如果已經有 4 張，跳過這張牌
        }

        // 加入手牌並排序
        const tempHand = [...hand];
        tempHand.push(tile);
        tempHand.sort((a, b) => parseInt(a) - parseInt(b));

        // 檢查加入的牌是否形成完整的和牌
        if (canFormWinningHand(tempHand)) {
            correctAnswers.add(tile);
        }
    }
    console.log("Correct Answers Calculated:", correctAnswers);
}

// 判斷手牌是否可以組成和牌
function canFormWinningHand(hand) {
    const counts = {};
    hand.forEach(tile => {
        const num = parseInt(tile);
        counts[num] = (counts[num] || 0) + 1;
    });

    console.log("Checking hand for winning combination:", hand);

    // 嘗試每個可能的對子
    for (let num in counts) {
        if (counts[num] >= 2) {
            console.log(`Trying pair: ${num}`);
            counts[num] -= 2; // 暫時移除這對

            if (canFormTripletsAndSequences(counts)) {
                console.log(`Valid hand with pair ${num}:`, hand);
                return true;
            }

            counts[num] += 2; // 恢復這對
        }
    }
    console.log("No valid winning combination found for hand:", hand);
    return false;
}

// 判斷剩餘的牌是否可以組成順子或刻子
function canFormTripletsAndSequences(counts) {
    let remainingTiles = [];
    for (let num in counts) {
        for (let i = 0; i < counts[num]; i++) {
            remainingTiles.push(parseInt(num));
        }
    }

    remainingTiles.sort((a, b) => a - b);
    console.log("Checking remaining tiles for triplets and sequences:", remainingTiles);

    while (remainingTiles.length > 0) {
        const first = remainingTiles[0];

        // 嘗試移除一個刻子 (三個相同的牌)
        if (remainingTiles.filter(x => x === first).length >= 3) {
            console.log(`Removing triplet of: ${first}`);
            removeTiles(remainingTiles, first, 3);
            continue;
        }

        // 嘗試移除一個順子 (連續三個牌)
        if (remainingTiles.includes(first + 1) && remainingTiles.includes(first + 2)) {
            console.log(`Removing sequence: ${first}, ${first + 1}, ${first + 2}`);
            removeTiles(remainingTiles, first, 1);
            removeTiles(remainingTiles, first + 1, 1);
            removeTiles(remainingTiles, first + 2, 1);
            continue;
        }

        console.log("Failed to form triplet or sequence with:", remainingTiles);
        return false; // 如果無法組成刻子或順子，返回 false
    }

    console.log("Successfully formed all triplets and sequences with the remaining tiles.");
    return true;
}

// 移除指定數量的牌
function removeTiles(array, value, count) {
    for (let i = 0; i < count; i++) {
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

// 顯示題目，並對手牌排序
function renderHand() {
    hand.sort((a, b) => parseInt(a) - parseInt(b)); // 對手牌進行排序
    const handContainer = document.getElementById('hand');
    handContainer.innerHTML = ''; // 清空先前的手牌
    hand.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.textContent = tile;
        tileElement.style.pointerEvents = 'none'; // 禁止題目牌組的點選
        handContainer.appendChild(tileElement);
    });
}

// 顯示玩家可以選擇的聽牌區域
function renderChoices() {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; // 清空原有選項
    tongTiles.forEach(tile => {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'tile';
        choiceElement.textContent = tile;
        choiceElement.addEventListener('click', () => toggleChoice(tile, choiceElement));
        choicesContainer.appendChild(choiceElement);
    });
}

// 切換玩家的選擇
function toggleChoice(tile, element) {
    if (playerSelections.has(tile)) {
        playerSelections.delete(tile);
        element.classList.remove('selected');
    } else {
        playerSelections.add(tile);
        element.classList.add('selected');
    }
}

// 檢查玩家的選擇並顯示結果
function checkTenpai() {
    const result = document.getElementById('result');
    
    // 如果沒有正確的聽牌
    if (correctAnswers.size === 0) {
        result.textContent = "沒有聽牌。";
        console.log("No correct tenpai found.");
        return;
    }
    
    // 計算玩家選對的牌數
    let correctCount = 0;
    playerSelections.forEach(choice => {
        if (correctAnswers.has(choice)) {
            correctCount++;
        }
    });

    const totalCorrect = correctAnswers.size;
    result.textContent = `您選對了 ${correctCount} 張聽牌，共有 ${totalCorrect} 張正確聽牌。正確答案為: ${Array.from(correctAnswers).join(', ')}`;
    console.log("Player selections:", playerSelections);
    console.log("Displaying Correct Answers:", correctAnswers);
}

// 綁定按鈕事件
document.getElementById('generate').addEventListener('click', generateHand);
document.getElementById('check').addEventListener('click', checkTenpai);

// 初始化頁面
generateHand();
