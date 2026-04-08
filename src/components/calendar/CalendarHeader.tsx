import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES, MONTH_IMAGES } from "@/lib/calendarData";

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export function CalendarHeader({ month, year, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl">
      <img
        src={MONTH_IMAGES[month]}
        alt={MONTH_NAMES[month]}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
        width={1024}
        height={640}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            className="p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="text-center">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground tracking-wide">
              {MONTH_NAMES[month]}
            </h1>
            <p className="text-primary-foreground/80 text-sm font-body">{year}</p>
          </div>
          <button
            onClick={onNext}
            className="p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
