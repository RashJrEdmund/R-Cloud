import { create } from "zustand";
import type { DashboardStore } from "./dashboard-store.d";

const useDashboardStore = create<DashboardStore>((set) => ({
  sideBarOpen: false,
  setSideBarOpen: (sideBarOpen) => set({ sideBarOpen }),
}));

export { useDashboardStore };
