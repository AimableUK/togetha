"use client";
import { useEffect, useState } from "react";
import getDailyMessage from "@/app/hooks/getDailyMessage";

interface Props {
  category: "high" | "medium" | "low";
  fileCount: number;
}

const MotivationBanner = ({ category, fileCount }: Props) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(getDailyMessage(category, fileCount));
  }, [category, fileCount]);

  return <p className="text-primary/60">{message}</p>;
};

export default MotivationBanner;
