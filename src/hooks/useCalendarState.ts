import { useState, useCallback, useEffect, useRef } from "react";
import { DateNote, dateKey } from "@/lib/calendarData";

export function useCalendarState() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, DateNote>>(() => {
    try {
      const stored = localStorage.getItem("cal-notes");
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward" | null>(null);
  const isFlipping = useRef(false);

  useEffect(() => {
    localStorage.setItem("cal-notes", JSON.stringify(notes));
  }, [notes]);

  const goToMonth = useCallback((delta: number) => {
    if (isFlipping.current) return;
    isFlipping.current = true;
    setFlipDirection(delta > 0 ? "forward" : "backward");

    // Change content at the halfway point of the animation (400ms)
    setTimeout(() => {
      setMonth(prev => {
        let newMonth = prev + delta;
        let newYear = year;
        if (newMonth > 11) { newMonth = 0; newYear++; }
        if (newMonth < 0) { newMonth = 11; newYear--; }
        setYear(newYear);
        return newMonth;
      });
    }, 400);

    // Clear flip state after full animation
    setTimeout(() => {
      setFlipDirection(null);
      isFlipping.current = false;
    }, 850);
  }, [year]);

  const handleDayClick = useCallback((date: Date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      setRangeEnd(date);
    }
  }, [rangeStart, rangeEnd]);

  const setNote = useCallback((date: Date, text: string) => {
    const key = dateKey(date);
    setNotes(prev => ({
      ...prev,
      [key]: { ...prev[key], text },
    }));
  }, []);

  const setEmoji = useCallback((date: Date, emoji: string) => {
    const key = dateKey(date);
    setNotes(prev => {
      const existing = prev[key];
      const currentEmoji = existing?.emoji;
      if (currentEmoji === emoji) {
        const { emoji: _, ...rest } = existing;
        return { ...prev, [key]: rest };
      }
      return { ...prev, [key]: { ...prev[key], text: prev[key]?.text || "", emoji } };
    });
  }, []);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  return {
    year, month, rangeStart, rangeEnd, notes, flipDirection,
    goToMonth, handleDayClick, setNote, setEmoji, clearRange,
  };
}
