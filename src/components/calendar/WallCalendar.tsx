import { useState } from "react";
import { useCalendarState } from "@/hooks/useCalendarState";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

export function WallCalendar() {
  const {
    year, month, rangeStart, rangeEnd, notes, flipDirection,
    goToMonth, handleDayClick, setNote, setEmoji, clearRange,
  } = useCalendarState();

  const [activeEmojiDay, setActiveEmojiDay] = useState<string | null>(null);

  const flipClass = flipDirection === "forward"
    ? "flipping-forward"
    : flipDirection === "backward"
    ? "flipping-backward"
    : "";

  return (
    <div
      data-month={month}
      className="w-full max-w-lg mx-auto transition-colors duration-500"
    >
      {/* Whole-page flip container */}
      <div className="calendar-flip-container">
        <div className={`calendar-flip ${flipClass}`}>
          <div
            className="bg-card rounded-2xl overflow-hidden"
            style={{ boxShadow: "var(--cal-shadow)" }}
          >
            <CalendarHeader
              month={month}
              year={year}
              onPrev={() => goToMonth(-1)}
              onNext={() => goToMonth(1)}
            />

            <CalendarGrid
              year={year}
              month={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              notes={notes}
              onDayClick={handleDayClick}
              onEmojiSelect={setEmoji}
              activeEmojiDay={activeEmojiDay}
              onToggleEmojiPicker={setActiveEmojiDay}
            />

            <NotesPanel
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              notes={notes}
              onSetNote={setNote}
              onClearRange={clearRange}
            />
          </div>
        </div>
      </div>

      {/* Spiral binding holes decoration */}
      <div className="flex justify-center gap-6 -mt-[1px] relative z-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full border-2 border-border bg-month-bg"
          />
        ))}
      </div>
    </div>
  );
}
