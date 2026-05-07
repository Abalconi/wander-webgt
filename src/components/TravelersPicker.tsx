import { useState, useRef, useEffect } from "react";
import { Users, Minus, Plus, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/lang";

export type RoomConfig = {
  adults: number;
  children: number;
  childrenAges: number[];
};

export type TravelersValue = {
  rooms: RoomConfig[];
};

const MAX_TOTAL = 9;

export function TravelersPicker({
  value,
  onChange,
}: {
  value: TravelersValue;
  onChange: (v: TravelersValue) => void;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const totalAdults = value.rooms.reduce((s, r) => s + r.adults, 0);
  const totalKids = value.rooms.reduce((s, r) => s + r.children, 0);
  const total = totalAdults + totalKids;

  const updateRoom = (i: number, patch: Partial<RoomConfig>) => {
    const rooms = value.rooms.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
    onChange({ rooms });
  };

  const inc = (i: number, key: "adults" | "children") => {
    if (total >= MAX_TOTAL) return;
    const room = value.rooms[i];
    if (key === "adults") updateRoom(i, { adults: Math.min(room.adults + 1, 9) });
    else updateRoom(i, { children: Math.min(room.children + 1, 9), childrenAges: [...room.childrenAges, 5] });
  };

  const dec = (i: number, key: "adults" | "children") => {
    const room = value.rooms[i];
    if (key === "adults") updateRoom(i, { adults: Math.max(room.adults - 1, 1) });
    else {
      const newCount = Math.max(room.children - 1, 0);
      updateRoom(i, { children: newCount, childrenAges: room.childrenAges.slice(0, newCount) });
    }
  };

  const setAge = (roomIdx: number, ageIdx: number, age: number) => {
    const room = value.rooms[roomIdx];
    const ages = [...room.childrenAges];
    ages[ageIdx] = age;
    updateRoom(roomIdx, { childrenAges: ages });
  };

  const addRoom = () => {
    if (total >= MAX_TOTAL) return;
    onChange({ rooms: [...value.rooms, { adults: 1, children: 0, childrenAges: [] }] });
  };

  const removeRoom = (i: number) => {
    if (value.rooms.length <= 1) return;
    onChange({ rooms: value.rooms.filter((_, idx) => idx !== i) });
  };

  const summary = `${totalAdults} ${t("adultos", "adults")}${
    totalKids ? `, ${totalKids} ${t("niños", "children")}` : ""
  } · ${value.rooms.length} ${t(value.rooms.length === 1 ? "hab." : "hab.", value.rooms.length === 1 ? "room" : "rooms")}`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2.5 text-left text-sm text-foreground"
      >
        <span className="flex items-center gap-2 truncate">
          <Users className="h-4 w-4 text-muted-foreground" />
          {summary}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-luxe md:left-auto md:right-0 md:w-[340px]">
          {value.rooms.map((room, i) => (
            <div key={i} className="mb-4 rounded-md border border-border bg-background p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">
                  {t("Habitación", "Room")} {i + 1}
                </span>
                {value.rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRoom(i)}
                    className="text-xs text-destructive hover:underline"
                  >
                    {t("Eliminar", "Remove")}
                  </button>
                )}
              </div>

              <Counter
                label={t("Adultos", "Adults")}
                hint={t("18+ años", "18+ years")}
                value={room.adults}
                onDec={() => dec(i, "adults")}
                onInc={() => inc(i, "adults")}
                disableInc={total >= MAX_TOTAL}
              />
              <Counter
                label={t("Niños", "Children")}
                hint={t("0-17 años", "0-17 years")}
                value={room.children}
                onDec={() => dec(i, "children")}
                onInc={() => inc(i, "children")}
                disableInc={total >= MAX_TOTAL}
              />

              {room.children > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {room.childrenAges.map((age, idx) => (
                    <label key={idx} className="text-xs text-muted-foreground">
                      {t(`Edad niño ${idx + 1}`, `Child ${idx + 1} age`)}
                      <select
                        value={age}
                        onChange={(e) => setAge(i, idx, Number(e.target.value))}
                        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground"
                      >
                        {Array.from({ length: 18 }, (_, n) => (
                          <option key={n} value={n}>
                            {n} {t("años", "yrs")}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={addRoom}
              disabled={total >= MAX_TOTAL}
              className="text-sm font-semibold text-primary hover:text-gold disabled:opacity-50"
            >
              + {t("Agregar habitación", "Add room")}
            </button>
            <span className="text-xs text-muted-foreground">
              {t("Máx.", "Max.")} {MAX_TOTAL} {t("personas", "people")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
          >
            {t("Listo", "Done")}
          </button>
        </div>
      )}
    </div>
  );
}

function Counter({
  label,
  hint,
  value,
  onDec,
  onInc,
  disableInc,
}: {
  label: string;
  hint: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  disableInc?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-primary hover:bg-secondary disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={onInc}
          disabled={disableInc}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-primary hover:bg-secondary disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
