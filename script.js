// ====================
// 武器会心率
// ====================

// 入力された武器会心率を取得
const weaponCriticalRateInput =
  document.getElementById("weapon-critical-rate");

// ====================
// スキル会心率
// ====================

const skills = [
  // 武器スキル
  { name: "見切り", level: 0, category: "weapon" },
  { name: "抜刀術【技】", level: 0, category: "weapon" },
  { name: "フォースショット", level: 0, category: "weapon" },
  { name: "濡れ刃紋", level: 0, category: "weapon" },
  { name: "連携プログラム", level: 0, category: "weapon" },

  // 防具スキル
  { name: "攻勢", level: 0, category: "armor" },
  { name: "渾身", level: 0, category: "armor" },
  { name: "弱点特効", level: 0, category: "armor" },
  { name: "挑戦者", level: 0, category: "armor" },
  { name: "力の解放", level: 0, category: "armor" },
  { name: "無我の境地", level: 0, category: "armor" },

  // シリーズスキル
  { name: "海竜の渦雷", level: 0, category: "series" },

  // グループスキル
  { name: "革細工の滑性", level: 0, category: "group" }
];

// スキルレベル毎の会心率
const criticalRateByLevel = { 
  "見切り": [0, 4, 8, 12, 16, 20],
  "弱点特効": {
    normal: [0, 5, 10, 15, 20, 30],
    wound: [0, 3, 5, 10, 15, 20]
  },
  "濡れ刃紋": {
    water: [0, 3, 6, 9],
    bubble: [0, 7, 14, 21]
  },
  "連携プログラム": [0, 15],
  "攻勢": [0, 0, 5, 10, 15, 20],
  "渾身": [0, 10, 20, 30],
  "挑戦者": [0, 3, 5, 7, 10, 15],
  "力の解放": [0, 10, 20, 30, 40, 50],
  "無我の境地": [0, 3, 6, 10],
  "抜刀術【技】": [0, 50, 75, 100],
  "フォースショット": [0, 8, 10, 12],
  "革細工の滑性": [0, 30],
  "海竜の渦雷": [0, 15]
};

// 戦闘中の状態
let waterActive = false;
let bubbleActive = false;
let frenzyCured = false;
let resonance2Active = false;


// スキルの現在レベルから会心率を合計する
function calculateSkillRate() {

  let totalSkillRate = 0;

  // skillsから1つずつskillを取り出して処理
  for (const skill of skills) {

    let skillRate;

    if (skill.name == "弱点特効") {
      skillRate = 
        criticalRateByLevel[skill.name].normal[skill.level]    
    } else if (skill.name == "濡れ刃紋") {

  skillRate = 0;

  // 水濡れ・泡状態による会心率を加算
  if (waterActive) {
    skillRate =
      skillRate +
      criticalRateByLevel[skill.name].water[skill.level];
  }

  if (bubbleActive) {
    skillRate =
      skillRate +
      criticalRateByLevel[skill.name].bubble[skill.level];
  }

} else if (skill.name == "連携プログラム") {

  skillRate =
    criticalRateByLevel[skill.name][skill.level];

  if (resonance2Active && skill.level >= 1) {
    skillRate = 25;
  }

} else {
  skillRate =
    criticalRateByLevel[skill.name][skill.level];
}
    totalSkillRate += skillRate;
  }

  return totalSkillRate;
}

// 状態による会心率
function calculateBattleStateRate() {
  let totalBattleStateRate = 0;

  if (frenzyCured) {
    totalBattleStateRate += 15;
  }

  return totalBattleStateRate;
}

function calculateWoundSkillRate() {
  const skill = skills.find(function (skill) {
    return skill.name == "弱点特効";
  });

  return criticalRateByLevel[skill.name].wound[skill.level];
  
}


// ====================
// 合計会心率
// ====================

// 武器会心率とスキル会心率を足す
function calculateCriticalRate(weaponRate, skillRate) {
  return weaponRate + skillRate;
}

// 合計会心率を画面に表示する
function displayTotalCriticalRate() {
  // 入力された武器会心率を取得
  const weaponRate =
    Number(weaponCriticalRateInput.value);
  // スキル会心
  const totalSkillRate = calculateSkillRate();
  // 状態による会心率
  const totalBattleStateRate = calculateBattleStateRate();
  // 傷口会心
    const woundSkillRate = calculateWoundSkillRate();

  // 合計会心率を計算
  const totalCriticalRate =
  calculateCriticalRate(
    weaponRate,
    totalSkillRate + totalBattleStateRate
  );

  const totalCriticalRateElement =
    document.getElementById("total-critical-rate");

  const woundCriticalRate =
    totalCriticalRate + woundSkillRate;

  // 合計会心率を表示
  if (woundSkillRate > 0) {
    totalCriticalRateElement.textContent =
      `合計会心率：${totalCriticalRate}% 傷口攻撃時：${woundCriticalRate}%`;
  } else {
    totalCriticalRateElement.textContent =
      `合計会心率：${totalCriticalRate}%`;
  }
}

// 武器会心率が入力されたときの処理
weaponCriticalRateInput.addEventListener("input", function () {

  // 合計会心率を更新
  displayTotalCriticalRate();
});


// ====================
// スキルUI生成
// ====================

// スキル、状態を表示するHTMLの入れ物を取得
const skillList =
  document.getElementById("skill-list");
const battleStateList =
  document.getElementById("battle-state-list");

// 狂竜症チェックボックス✅
const frenzyCuredCheckbox =
  document.createElement("input");

frenzyCuredCheckbox.type = "checkbox";

frenzyCuredCheckbox.addEventListener("change", function () {
  frenzyCured = frenzyCuredCheckbox.checked;

  if (frenzyCured) {
    frenzyCuredLabel.textContent = "狂竜症克服 +15%";
  } else {
    frenzyCuredLabel.textContent = "狂竜症克服";
  }

  displayTotalCriticalRate();
});

const frenzyCuredLabel =
  document.createElement("label");

frenzyCuredLabel.textContent = "狂竜症克服";

battleStateList.appendChild(frenzyCuredCheckbox);
battleStateList.appendChild(frenzyCuredLabel);

// リセットボタンを取得
const resetButton =
  document.getElementById("reset-button");
  resetButton.addEventListener("click", function () {

  // 武器会心率を0に戻す
  weaponCriticalRateInput.value = 0;

  // 全スキルのレベルを0に戻す
  for (const skill of skills) {
    skill.level = 0;
  }

  // 戦闘中の状態をリセット
  waterActive = false;
  bubbleActive = false;
  frenzyCured = false;
  resonance2Active = false;
  frenzyCuredLabel.textContent = "狂竜症克服";

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );

  for (const checkbox of checkboxes) {
    checkbox.checked = false;
  }

  // 画面上のスキル表示も0に戻す
  const skillLevels =
    document.querySelectorAll(".skill-level");

  const skillRates =
    document.querySelectorAll(".skill-rate");

  for (let i = 0; i < skills.length; i++) {
    skillLevels[i].textContent =
      `Lv${skills[i].level}`;

    skillRates[i].textContent = `+0%`;
  }

  // 合計会心率を更新
  displayTotalCriticalRate();
});

// スキルカテゴリーごとの入れ物を作成
const weaponSkillList = document.createElement("div");
const armorSkillList = document.createElement("div");
const seriesSkillList = document.createElement("div");
const groupSkillList = document.createElement("div");

skillList.appendChild(weaponSkillList);
skillList.appendChild(armorSkillList);
skillList.appendChild(seriesSkillList);
skillList.appendChild(groupSkillList);


// ====================
// カテゴリー名
// ====================

const weaponSkillTitle =
  document.createElement("h3");

weaponSkillTitle.textContent =
  "武器スキル";

weaponSkillList.appendChild(weaponSkillTitle);


const armorSkillTitle =
  document.createElement("h3");

armorSkillTitle.textContent =
  "防具スキル";

armorSkillList.appendChild(armorSkillTitle);


const seriesSkillTitle =
  document.createElement("h3");

seriesSkillTitle.textContent =
  "シリーズスキル";

seriesSkillList.appendChild(seriesSkillTitle);


const groupSkillTitle =
  document.createElement("h3");

groupSkillTitle.textContent =
  "グループスキル";

groupSkillList.appendChild(groupSkillTitle);


// ====================
// スキルUI生成
// ====================

// skillsから1つずつskillを取り出し、スキルUIを生成
for (const skill of skills) {

  // スキル全体を入れるdivを作成
  const skillElement =
    document.createElement("div");

  skillElement.classList.add("skill");

    let skillOptions;

  const skillMain =
    document.createElement("div");

  skillMain.classList.add("skill-main");

  skillElement.appendChild(skillMain);


  // ====================
  // スキル名
  // ====================

  const skillName =
    document.createElement("span");

  skillName.classList.add("skill-name");

  skillName.textContent =
    skill.name;

  skillMain.appendChild(skillName);


  // ====================
  // スキルレベル
  // ====================

  const skillLevel =
    document.createElement("span");

  skillLevel.classList.add("skill-level");

  skillLevel.textContent =
    `Lv${skill.level}`;

  skillMain.appendChild(skillLevel);


  // ====================
  // スキル会心率
  // ====================

  const skillRate =
    document.createElement("span");

  skillRate.classList.add("skill-rate");

  let currentSkillRate;

  if (skill.name == "弱点特効") {
    currentSkillRate =
      criticalRateByLevel[skill.name].normal[skill.level];
  } else if (skill.name == "濡れ刃紋"){
    currentSkillRate = 0;
  } else {
    currentSkillRate =
      criticalRateByLevel[skill.name][skill.level];
  }

  skillRate.textContent = `+${currentSkillRate}%`;
  


  // スキル表示を更新する関数
 function updateSkillDisplay() {
  skillLevel.textContent = `Lv${skill.level}`;

  let currentSkillRate;

  if (skill.name == "弱点特効") {
    currentSkillRate =
      criticalRateByLevel[skill.name].normal[skill.level];
  } else if (skill.name == "濡れ刃紋") {
  currentSkillRate = 0;

  if (waterActive) {
    currentSkillRate +=
      criticalRateByLevel[skill.name].water[skill.level];
  }

  if (bubbleActive) {
    currentSkillRate +=
      criticalRateByLevel[skill.name].bubble[skill.level];
  }
} else if (skill.name == "連携プログラム") {

  currentSkillRate =
    criticalRateByLevel[skill.name][skill.level];

  if (resonance2Active && skill.level >= 1) {
    currentSkillRate = 25;
  }

} else {
  currentSkillRate =
    criticalRateByLevel[skill.name][skill.level];
}

  skillRate.textContent = `+${currentSkillRate}%`;
}


  // ====================
  // レベルダウンボタン
  // ====================

  const levelDownButton =
    document.createElement("button");

  levelDownButton.classList.add("level-down-button");
  levelDownButton.textContent = "ー";

  skillMain.appendChild(levelDownButton);

  // −ボタンが押されたときの処理
  levelDownButton.addEventListener("click", function () {

    // Lv0より大きければレベルを1下げる
    if (skill.level > 0) {
      skill.level =
        skill.level - 1;
    }

    updateSkillDisplay();

    // 合計会心率を更新
    displayTotalCriticalRate();

  });


  // ====================
  // レベルアップボタン
  // ====================

  const levelUpButton =
    document.createElement("button");

  levelUpButton.classList.add("level-up-button");
  levelUpButton.textContent = "＋";

  skillMain.appendChild(levelUpButton);

  // ＋ボタンが押されたときの処理
  levelUpButton.addEventListener("click", function () {

    // スキルの最大レベルを取得
    let maxLevel;

    if (skill.name == "弱点特効") {
      maxLevel =
        criticalRateByLevel[skill.name].normal.length - 1;

    } else if (skill.name == "濡れ刃紋") {
      maxLevel =
        criticalRateByLevel[skill.name].water.length - 1;

    } else {
      maxLevel =
        criticalRateByLevel[skill.name].length - 1;
    }

    // 最大レベル未満ならレベルを1上げる
    if (skill.level < maxLevel) {
      skill.level =
        skill.level + 1;

        // 無我の境地Lv1以上で狂竜症克服を自動発動
      if (skill.name == "無我の境地" && skill.level >= 1) {
        frenzyCured = true;
        frenzyCuredCheckbox.checked = true;
        frenzyCuredLabel.textContent = "狂竜症克服 +15%";
      }
    }

    updateSkillDisplay();

    // 合計会心率を更新
    displayTotalCriticalRate();

  });


// ====================
// スキル会心率
// ====================

// スキル会心率をスキルUIに追加
skillMain.appendChild(skillRate);


// ====================
// 特殊要素
// ====================

if (skill.name == "濡れ刃紋") {

  // 特殊要素を入れるdiv
  skillOptions =
    document.createElement("div");

  skillOptions.classList.add("skill-options");

  skillElement.appendChild(skillOptions);


  // 水濡れ
  const waterCheckbox =
    document.createElement("input");

  waterCheckbox.type = "checkbox";

  const waterLabel =
    document.createElement("label");

  waterLabel.textContent = "水濡れ";


  const waterOption =
    document.createElement("div");

  waterOption.classList.add("skill-option");

  waterOption.appendChild(waterCheckbox);
  waterOption.appendChild(waterLabel);

  skillOptions.appendChild(waterOption);


  // 泡状態
  const bubbleCheckbox =
    document.createElement("input");

  bubbleCheckbox.type = "checkbox";

  const bubbleLabel =
    document.createElement("label");

  bubbleLabel.textContent = "泡状態";


  const bubbleOption =
    document.createElement("div");

  bubbleOption.classList.add("skill-option");

  bubbleOption.appendChild(bubbleCheckbox);
  bubbleOption.appendChild(bubbleLabel);

  skillOptions.appendChild(bubbleOption);


  // イベント処理
  waterCheckbox.addEventListener("change", function () {
    waterActive = waterCheckbox.checked;

    updateSkillDisplay();
    displayTotalCriticalRate();
  });


  bubbleCheckbox.addEventListener("change", function () {
    bubbleActive = bubbleCheckbox.checked;

    updateSkillDisplay();
    displayTotalCriticalRate();
  });

}


// ====================
// 連携プログラム
// ====================

if (skill.name == "連携プログラム") {

  // 特殊要素を入れるdiv
  skillOptions =
    document.createElement("div");

  skillOptions.classList.add("skill-options");

  skillElement.appendChild(skillOptions);


  // レゾナンスⅡ
  const resonance2Checkbox =
    document.createElement("input");

  resonance2Checkbox.type = "checkbox";


  const resonance2Label =
    document.createElement("label");

  resonance2Label.textContent =
    "レゾナンスⅡ発動中";


  const resonance2Option =
    document.createElement("div");

  resonance2Option.classList.add("skill-option");

  resonance2Option.appendChild(resonance2Checkbox);
  resonance2Option.appendChild(resonance2Label);

  skillOptions.appendChild(resonance2Option);


  // イベント処理
  resonance2Checkbox.addEventListener("change", function () {

    resonance2Active =
      resonance2Checkbox.checked;

    updateSkillDisplay();
    displayTotalCriticalRate();
  });

}

  // ====================
  // 画面に追加
  // ====================

  // 完成したスキルUIをカテゴリーごとに追加
  if (skill.category === "weapon") {
    weaponSkillList.appendChild(skillElement);
  } else if (skill.category === "armor") {
    armorSkillList.appendChild(skillElement);
  } else if (skill.category === "series") {
    seriesSkillList.appendChild(skillElement);
  } else if (skill.category === "group") {
    groupSkillList.appendChild(skillElement);
  }
}