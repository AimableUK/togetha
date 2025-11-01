import { motivationMessages } from "../data/motivationMessages";

interface SavedMessage {
  category: "high" | "medium" | "low";
  text: string;
  date: string;
  fileCount: number;
}

const getDailyMessage = (
  category: "high" | "medium" | "low",
  fileCount: number
) => {
  const today = new Date().toDateString();
  const saved: SavedMessage = JSON.parse(
    localStorage.getItem("motivationMessage") || "{}"
  );

  // Case 1: No category | No FileCount
  if (!saved || saved.category !== category || saved.fileCount !== fileCount) {
    const randomMessage =
      motivationMessages[category][
        Math.floor(Math.random() * motivationMessages[category].length)
      ];

    localStorage.setItem(
      "motivationMessage",
      JSON.stringify({ category, text: randomMessage, date: today, fileCount })
    );

    return randomMessage;
  }

  // Case 2: different Date
  if (saved.date !== today) {
    const randomMessage =
      motivationMessages[category][
        Math.floor(Math.random() * motivationMessages[category].length)
      ];

    localStorage.setItem(
      "motivationMessage",
      JSON.stringify({ ...saved, text: randomMessage, date: today })
    );

    return randomMessage;
  }

  // Case 3: same category, same file count, same day -> return saved
  return saved.text;
};

export default getDailyMessage;
