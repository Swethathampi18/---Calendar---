import { useState } from "react";
import { format } from "date-fns";
import { FileText, X, Plus } from "lucide-react";
import { dateKey, DateNote, isSameDay, isInRange } from "@/lib/calendarData";

interface NotesPanelProps {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: Record<string, DateNote>;
  onSetNote: (date: Date, text: string) => void;
  onClearRange: () => void;
}

export function NotesPanel({ rangeStart, rangeEnd, notes, onSetNote, onClearRange }: NotesPanelProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  const selectedDates: Date[] = [];
  if (rangeStart && rangeEnd) {
    const start = new Date(Math.min(rangeStart.getTime(), rangeEnd.getTime()));
    const end = new Date(Math.max(rangeStart.getTime(), rangeEnd.getTime()));
    const d = new Date(start);
    while (d <= end) {
      selectedDates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
  } else if (rangeStart) {
    selectedDates.push(rangeStart);
  }

  const startEdit = (date: Date) => {
    const key = dateKey(date);
    setEditingKey(key);
    setDraftText(notes[key]?.text || "");
  };

  const saveEdit = (date: Date) => {
    onSetNote(date, draftText);
    setEditingKey(null);
    setDraftText("");
  };

  // Show all notes for dates that have them
  const allNoteDates = Object.entries(notes)
    .filter(([_, n]) => n.text || n.emoji)
    .map(([key]) => {
      const [y, m, d] = key.split("-").map(Number);
      return new Date(y, m, d);
    })
    .sort((a, b) => a.getTime() - b.getTime());

  return (
    <div className="border-t border-border bg-card/50 p-4 sm:p-6 rounded-b-2xl">
      {/* Range info */}
      {rangeStart && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>
              {rangeEnd
                ? `${format(Math.min(rangeStart.getTime(), rangeEnd.getTime()), "MMM d")} — ${format(Math.max(rangeStart.getTime(), rangeEnd.getTime()), "MMM d, yyyy")}`
                : format(rangeStart, "MMM d, yyyy")
              }
            </span>
            <span className="text-xs bg-month-primary/10 text-month-primary px-2 py-0.5 rounded-full">
              {selectedDates.length} day{selectedDates.length > 1 ? "s" : ""}
            </span>
          </div>
          <button onClick={onClearRange} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Notes for selected range */}
      {selectedDates.length > 0 && (
        <div className="space-y-2 mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selected dates</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {selectedDates.map(date => {
              const key = dateKey(date);
              const note = notes[key];
              const isEditing = editingKey === key;

              return (
                <div key={key} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-xs font-medium text-muted-foreground min-w-[40px] pt-1">
                    {format(date, "d")}
                  </span>
                  {note?.emoji && <span className="text-sm pt-0.5">{note.emoji}</span>}
                  {isEditing ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        autoFocus
                        className="flex-1 text-sm bg-background border border-input rounded px-2 py-1 outline-none focus:ring-1 focus:ring-ring"
                        value={draftText}
                        onChange={e => setDraftText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && saveEdit(date)}
                        onBlur={() => saveEdit(date)}
                        placeholder="Add note..."
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(date)}
                      className="flex-1 text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {note?.text || (
                        <span className="flex items-center gap-1 text-xs opacity-50">
                          <Plus className="w-3 h-3" /> Add note
                        </span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All notes summary */}
      {!rangeStart && allNoteDates.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Notes</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {allNoteDates.map(date => {
              const key = dateKey(date);
              const note = notes[key];
              return (
                <div key={key} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 text-sm">
                  <span className="text-xs font-medium text-muted-foreground">{format(date, "MMM d")}</span>
                  {note?.emoji && <span>{note.emoji}</span>}
                  <span className="text-foreground/80">{note?.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!rangeStart && allNoteDates.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Click a date to start selecting • Right-click or hover for emoji markers
        </p>
      )}
    </div>
  );
}
