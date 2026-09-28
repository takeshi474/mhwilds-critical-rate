// ====================
// 武器会心率
// ====================

const weaponRate = 30; // 武器会心30%


// ====================
// スキル会心率
// ====================

const skills = [
  { name: "見切り", level: 4 },
  { name: "弱点特効", level: 3 }
];

const criticalRateByLevel = { // スキルレベル毎の会心率
  "見切り": [0, 4, 8, 12, 16, 20],
  "弱点特効": [0, 5, 10, 15, 20, 30]
};

// スキル名、レベルから会心率を取得する関数
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

// 武器会心率とスキル会心率を足す関数
function calculateCriticalRate(weaponRate, skillRate) {
  return weaponRate + skillRate;
}

// 合計会心率を表示する関数
function displayTotalCriticalRate() {
  const totalSkillRate = calculateSkillRate();

  // 合計会心率を計算
  const totalCriticalRate =
    calculateCriticalRate(weaponRate, totalSkillRate);

  const totalCriticalRateElement =
    document.getElementById("total-critical-rate");

  // 合計会心率を表示
  totalCriticalRateElement.textContent =
    `会心率：${totalCriticalRate}%`;
}

displayTotalCriticalRate();


// ====================
// スキルレベル変更
// ====================

// スキル要素をすべて取得
const skillElements =
  document.querySelectorAll(".skill");

// スキルのレベルと会心率を画面に表示する関数
function displaySkill(skillLevel, skillRate, targetSkill) {
  skillLevel.textContent =
    `Lv${targetSkill.level}`;

  skillRate.textContent =
    `+${criticalRateByLevel[targetSkill.name][targetSkill.level]}%`;

  // 合計会心率を表示
  displayTotalCriticalRate();
}

// スキルを1つずつ処理
for (const skillElement of skillElements) {

  // スキル名を取得
  const skillName =
    skillElement.querySelector(".skill-name");

  // スキルレベルを表示する場所を取得
  const skillLevel =
    skillElement.querySelector(".skill-level");

  // スキル会心率を表示する場所を取得
  const skillRate =
    skillElement.querySelector(".skill-rate");

  // レベルダウンボタン
  const levelDownButton =
    skillElement.querySelector(".level-down-button");

  // レベルアップボタン
  const levelUpButton =
    skillElement.querySelector(".level-up-button");

  // JavaScript側のスキルデータを取得
  const targetSkill =
    skills.find(function (skill) {
      return skill.name === skillName.textContent;
    });

  // レベルダウン処理
  levelDownButton.addEventListener("click", function () {

    // Lv0より大きければレベルを1下げる
    if (targetSkill.level > 0) {
      targetSkill.level = targetSkill.level - 1;
    }

    // 画面を更新
    displaySkill(skillLevel, skillRate, targetSkill);
  });

  // レベルアップ処理
  levelUpButton.addEventListener("click", function () {

    // スキルの最大レベルを取得
    const maxLevel =
      criticalRateByLevel[targetSkill.name].length - 1;

    // 最大レベル未満ならレベルを1上げる
    if (targetSkill.level < maxLevel) {
      targetSkill.level = targetSkill.level + 1;
    }

    // 画面を更新
    displaySkill(skillLevel, skillRate, targetSkill);
  });

}