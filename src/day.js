const DAYS = [
  "周日：明天上班 🤷‍♂️",
  "第一工作日 👏",
  "周二😉",
  "周三，本周过半🎉",
  "周四，赶进度赶进度🐱‍🏍🐱‍💻",
  "😎 明天休息，嘿嘿",
  "星期六，诸事皆宜 ❤",
];

function getDay() {
  const day = new Date().getDay();

  return DAYS[day];
}

export default getDay;
