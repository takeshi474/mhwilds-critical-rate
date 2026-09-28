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

const skillList =
  document.getElementById("skill-list");

  // スキルの数だけdivタグを繰り返し作る
for (const skill of skills) {
  const skillElement =
    document.createElement("div");

    // 上記で作ったdivタグにskillクラスを追加
    skillElement.classList.add("skill");

    // スキル名のspanタグ追加
  const skillName =
    document.createElement("span");
    // スキル名追加
    skillName.classList.add("skill-name");

    // スキル名表示
    skillName.textContent =
    skill.name;
    skillElement.appendChild(skillName);

  const skillLevel =
    document.createElement("span");

    // スキルレベル追加
    skillLevel.classList.add("skill-level");

    skillLevel.textContent =
      `Lv${skill.level}`;

    skillElement.appendChild(skillLevel);

  const levelDownButton =
    document.createElement("button");
    levelDownButton.classList.add("level-down-button");
    levelDownButton.textContent = "ー";
    skillElement.appendChild(levelDownButton);

    levelDownButton.addEventListener("click", function () {

      if (skill.level > 0) {
        skill.level =
          skill.level - 1;
      }

      skillLevel.textContent =
        `Lv${skill.level}`;

      skillRate.textContent =
        `+${criticalRateByLevel[skill.name][skill.level]}%`;

      displayTotalCriticalRate();

      console.log(skill);
    });

  const levelUpButton =
    document.createElement("button");
    levelUpButton.classList.add("level-up-button");
    levelUpButton.textContent = "＋";
    skillElement.appendChild(levelUpButton);

  levelUpButton.addEventListener("click", function () {

    const maxLevel =
      criticalRateByLevel[skill.name].length - 1;

      if (skill.level < maxLevel) {
        skill.level =
          skill.level + 1;
      }

      skillLevel.textContent =
        `Lv${skill.level}`;

      skillRate.textContent =
        `+${criticalRateByLevel[skill.name][skill.level]}%`;

      displayTotalCriticalRate();

      console.log(skill);
    });

        // 会心率表示
  const skillRate =
    document.createElement("span");
    skillRate.classList.add("skill-rate");

    skillRate.textContent =
      `+${criticalRateByLevel[skill.name][skill.level]}%`;

    skillElement.appendChild(skillRate);


    // 画面表示
    skillList.appendChild(skillElement);
}

