import { storage } from "@/lib/utils";
import type { ResponseCheckUser } from "@/types/types";
import { atomWithStorage } from "jotai/utils";
import type { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";

const initialDataUser = {
  id: "",
  name: "",
  email: "",
  created_at: "",
  updated_at: "",
};

export const dataUserAtomWithStorage = atomWithStorage<ResponseCheckUser>(
  "data-user",
  initialDataUser,
  storage as SyncStorage<ResponseCheckUser>,
);
