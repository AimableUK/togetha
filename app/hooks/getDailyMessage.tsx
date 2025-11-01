import { motivationMessages } from "../data/motivationMessages";

const getDailyMessage = (
  category: "high" | "medium" | "low",
  today: string
) => {
  const saved = JSON.parse(localStorage.getItem("motivationMessage") || "{}");

  // Case 1: category changed
  if (saved?.category && saved.category !== category) {
    const randomMessage =
      motivationMessages[category][
        Math.floor(Math.random() * motivationMessages[category].length)
      ];

    localStorage.setItem(
      "motivationMessage",
      JSON.stringify({ category, text: randomMessage, date: today })
    );

    return randomMessage;
  }

  // Case 2: category same and same day
  if (saved?.category === category && saved?.date === today) {
    return saved.text;
  }

  // Case 3: category same but new day
  const randomMessage =
    motivationMessages[category][
      Math.floor(Math.random() * motivationMessages[category].length)
    ];

  localStorage.setItem(
    "motivationMessage",
    JSON.stringify({ category, text: randomMessage, date: today })
  );

  return randomMessage;
};

export default getDailyMessage;
