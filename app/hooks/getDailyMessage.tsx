import { motivationMessages } from "../data/motivationMessages";

const getDailyMessage = (category: "high" | "medium" | "low") => {
  const today = new Date().toDateString();
  const saved = localStorage.getItem("motivationMessage");

  if (saved) {
    const { date, text } = JSON.parse(saved);
    if (date === today) return text;
  }

  const randomMessage =
    motivationMessages[category][
      Math.floor(Math.random() * motivationMessages[category].length)
    ];

  localStorage.setItem(
    "motivationMessage",
    JSON.stringify({ date: today, text: randomMessage })
  );

  return randomMessage;
};

export default getDailyMessage;
