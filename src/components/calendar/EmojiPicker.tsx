import { useEffect, useRef } from "react";
import { EMOJI_OPTIONS } from "@/lib/calendarData";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="emoji-picker-enter absolute z-50 top-full mt-1 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-lg p-2 w-48"
    >
      <div className="grid grid-cols-5 gap-1">
        {EMOJI_OPTIONS.map(emoji => (
          <button
            key={emoji}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-base"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
