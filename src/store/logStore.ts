"use client";

// import { LOGS_DATA } from "@/data/LOGS_DATA";
import type { DB } from "@/types/Db.typ";
import type { Log } from "@/types/Log.type";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";

type LogState = {
  logs: Log[];
  add: (input: Omit<Log, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Log, keyof DB>>) => void;
};

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  add(input) {
    const newLog = { ...generateDbFields(), ...input } as Log;
    set((state) => ({
      logs: [...state.logs, newLog],
    }));
  },
  remove(id) {
    const updatedLogs = get().logs.filter((log) => log.id !== id);
    set((state) => ({ ...state, logs: updatedLogs }), true);
  },
  update(id, input) {
    const updatedLogs = get().logs.map((log) => {
      if (log.id === id) {
        return { ...log, ...input };
      }
      return log;
    }) as Log[];

    set((state) => ({ ...state, logs: updatedLogs }), true);
  },
}));
