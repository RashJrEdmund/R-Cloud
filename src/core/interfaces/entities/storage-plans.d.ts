type StorageUnit = "Bytes" | "Kb" | "Mb" | "Gb" | "Tb" | "Pb";

type StoragePlanLabels =
  | "SIGMA"
  | "OMEGA"
  | "ZETA"
  | "GAMMA"
  | "BETA"
  | "ALPHA";

type StoragePlanIds = "0" | "1" | "2" | "3" | "4" | "5";

interface StoragePlan {
  id?: string;
  label: StoragePlanLabels;
  icon_url: string;
  capacity: string; // e.g 1.5 GB
  bytes: number; // eg 1610612736 in bytes
  rate: string;
  is_free: boolean;
}

export type { StorageUnit, StoragePlanIds, StoragePlan, StoragePlanLabels };
