// ====================
// 武器会心率
// ====================

// 入力された武器会心率を取得
const weaponCriticalRateInput =
  document.getElementById("weapon-critical-rate");

console.log(weaponCriticalRateInput.value);


// ====================
// スキル会心率
// ====================

const skills = [
  // 武器スキル
  { name: "見切り", level: 0, category: "weapon" },
  { name: "弱点特効", level: 0, category: "weapon" },
  { name: "抜刀術【技】", level: 0, category: "weapon" },
  { name: "フォースショット", level: 0, category: "weapon" },

  // 防具スキル
  { name: "攻勢", level: 0, category: "armor" },
  { name: "渾身", level: 0, category: "armor" },
  { name: "挑戦者", level: 0, category: "armor" },
  { name: "力の解放", level: 0, category: "armor" },
  { name: "無我の境地", level: 0, category: "armor" },

  // シリーズスキル
  { name: "海竜の渦雷", level: 0, category: "series" },

  // グループスキル
  { name: "革細工の滑性", level: 0, category: "group" }
];

const criticalRateByLevel = { // スキルレベル毎の会心率
  "見切り": [0, 4, 8, 12, 16, 20],
  "弱点特効": [0, 5, 10, 15, 20, 30],
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


// スキルの現在レベルから会心率を合計する
function calculateSkillRate() {
  let totalSkillRate = 0;

  // skillsから1つずつskillを取り出して処理
  for (const skill of skills) {
    const skillRate =
      criticalRateByLevel[skill.name][skill.level];

    totalSkillRate += skillRate;
  }

  return totalSkillRate;
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
  const totalSkillRate = calculateSkillRate();

  // 入力された武器会心率を取得
  const weaponRate =
    Number(weaponCriticalRateInput.value);

  // 合計会心率を計算
  const totalCriticalRate =
    calculateCriticalRate(weaponRate, totalSkillRate);

  const totalCriticalRateElement =
    document.getElementById("total-critical-rate");

  // 合計会心率を表示
  totalCriticalRateElement.textContent =
    `会心率：${totalCriticalRate}%`;
}

// 武器会心率が入力されたときの処理
weaponCriticalRateInput.addEventListener("input", function () {

  // 合計会心率を更新
  displayTotalCriticalRate();
});


// ====================
// スキルUI生成
// ====================

// スキルを表示するHTMLの入れ物を取得
const skillList =
  document.getElementById("skill-list");

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

  // 画面上のスキル表示も0に戻す
  const skillLevels =
    document.querySelectorAll(".skill-level");

  const skillRates =
    document.querySelectorAll(".skill-rate");

  for (let i = 0; i < skills.length; i++) {
    skillLevels[i].textContent =
      `Lv${skills[i].level}`;

    skillRates[i].textContent =
      `+${criticalRateByLevel[skills[i].name][skills[i].level]}%`;
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


  // ====================
  // スキル名
  // ====================

  const skillName =
    document.createElement("span");

  skillName.classList.add("skill-name");

  skillName.textContent =
    skill.name;

  skillElement.appendChild(skillName);


  // ====================
  // スキルレベル
  // ====================

  const skillLevel =
    document.createElement("span");

  skillLevel.classList.add("skill-level");

  skillLevel.textContent =
    `Lv${skill.level}`;

  skillElement.appendChild(skillLevel);


  // ====================
  // スキル会心率
  // ====================

  const skillRate =
    document.createElement("span");

  skillRate.classList.add("skill-rate");

  skillRate.textContent =
    `+${criticalRateByLevel[skill.name][skill.level]}%`;


  // スキル表示を更新する関数
  function updateSkillDisplay() {

    skillLevel.textContent =
      `Lv${skill.level}`;

    // 画面のスキル会心率を更新
    skillRate.textContent =
      `+${criticalRateByLevel[skill.name][skill.level]}%`;
  }


  // ====================
  // レベルダウンボタン
  // ====================

  const levelDownButton =
    document.createElement("button");

  levelDownButton.classList.add("level-down-button");
  levelDownButton.textContent = "ー";

  skillElement.appendChild(levelDownButton);

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

    console.log(skill);
  });


  // ====================
  // レベルアップボタン
  // ====================

  const levelUpButton =
    document.createElement("button");

  levelUpButton.classList.add("level-up-button");
  levelUpButton.textContent = "＋";

  skillElement.appendChild(levelUpButton);

  // ＋ボタンが押されたときの処理
  levelUpButton.addEventListener("click", function () {

    // スキルの最大レベルを取得
    const maxLevel =
      criticalRateByLevel[skill.name].length - 1;

    // 最大レベル未満ならレベルを1上げる
    if (skill.level < maxLevel) {
      skill.level =
        skill.level + 1;
    }

    updateSkillDisplay();

    // 合計会心率を更新
    displayTotalCriticalRate();

    console.log(skill);
  });


  // ====================
  // スキル会心率
  // ====================

  // スキル会心率をスキルUIに追加
  skillElement.appendChild(skillRate);


  // ====================
  // 画面に追加
  // ====================

  // 完成したスキルUIをカテゴリーごとの入れ物に追加
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