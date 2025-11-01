"use client";
import { useEffect, useState } from "react";
import getDailyMessage from "@/app/hooks/getDailyMessage";
import { FILE } from "@/lib/utils";

interface Props {
  category: "high" | "medium" | "low";
  files_: FILE[];
}

const MotivationBanner = ({ category, files_ }: Props) => {
  const [message, setMessage] = useState<string>("");
  const today = new Date().toDateString();
  useEffect(() => {
    if (files_ === null) return;

    const newMessage = getDailyMessage(category, today);
    setMessage(newMessage);
  }, [category, files_]);

  return <p className="text-primary/60">{message}</p>;
};

export default MotivationBanner;
