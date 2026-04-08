import { useMemo } from "react";
import {
  DAY_LABELS, getDaysInMonth, getFirstDayOfMonth,
  isSameDay, isInRange, dateKey, DateNote,
} from "@/lib/calendarData";
import { EmojiPicker } from "./EmojiPicker";

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: Record<string, DateNote>;
  onDayClick: (date: Date) => void;
  onEmojiSelect: (date: Date, emoji: string) => void;
  activeEmojiDay: string | null;
  onToggleEmojiPicker: (key: string | null) => void;
}

export function CalendarGrid({
  year, month, rangeStart, rangeEnd, notes,
  onDayClick, onEmojiSelect, activeEmojiDay, onToggleEmojiPicker,
}: CalendarGridProps) {
  const today = useMemo(() => new Date(), []);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = useMemo(() => {
    const result: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(new Date(year, month, d));
    return result;
  }, [year, month, daysInMonth, firstDay]);

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="aspect-square" />;

          const key = dateKey(date);
          const isToday = isSameDay(date, today);
          const isStart = rangeStart && isSameDay(date, rangeStart);
          const isEnd = rangeEnd && isSameDay(date, rangeEnd);
          const inRange = isInRange(date, rangeStart, rangeEnd);
          const note = notes[key];
          const hasEmoji = !!note?.emoji;
          const isSunday = date.getDay() === 0;

          let cellClass = "relative aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 group text-sm font-body ";

          if (isStart || isEnd) {
            cellClass += "bg-month-primary text-primary-foreground font-bold shadow-md scale-105 z-10 ";
          } else if (inRange) {
            cellClass += "bg-month-primary/15 text-foreground ";
          } else if (isToday) {
            cellClass += "ring-2 ring-cal-today text-foreground font-semibold ";
          } else {
            cellClass += "hover:bg-cal-hover text-foreground ";
          }

          if (isSunday && !isStart && !isEnd) {
            cellClass += "text-destructive/70 ";
          }

          return (
            <div key={key} className="relative">
              <div
                className={cellClass}
                onClick={() => onDayClick(date)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onToggleEmojiPicker(activeEmojiDay === key ? null : key);
                }}
              >
                <span className="text-xs sm:text-sm">{date.getDate()}</span>
                {hasEmoji && (
                  <span className="text-[10px] sm:text-xs leading-none mt-0.5">{note.emoji}</span>
                )}
                {note?.text && !hasEmoji && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-month-accent" />
                )}
                {/* Emoji button on hover */}
                <button
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card shadow border border-border text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleEmojiPicker(activeEmojiDay === key ? null : key);
                  }}
                  aria-label="Add emoji"
                >
                  😊
                </button>
              </div>
              {activeEmojiDay === key && (
                <EmojiPicker
                  onSelect={(emoji) => {
                    onEmojiSelect(date, emoji);
                    onToggleEmojiPicker(null);
                  }}
                  onClose={() => onToggleEmojiPicker(null)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
