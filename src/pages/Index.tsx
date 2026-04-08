import { useCalendarState } from "@/hooks/useCalendarState";
import { useState } from "react";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { NotesPanel } from "@/components/calendar/NotesPanel";
import { SpiralBinding } from "@/components/calendar/SpiralBinding";

const Index = () => {
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
    <div data-month={month} className="min-h-screen bg-background transition-colors duration-700 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Spiral binding at top */}
        <SpiralBinding count={13} />

        {/* Whole-page flip container */}
        <div className="calendar-flip-container -mt-4">
          <div className={`calendar-flip ${flipClass}`}>
            <div
              className="bg-card rounded-b-2xl overflow-hidden transition-colors duration-700"
              style={{ boxShadow: "var(--cal-shadow)" }}
            >
              {/* Punch holes row */}
              <div className="flex items-center justify-between px-[8%] py-2 bg-card">
                {[...Array(13)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-background border border-border/50 transition-colors duration-700"
                  />
                ))}
              </div>

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
      </div>
    </div>
  );
};

export default Index;
