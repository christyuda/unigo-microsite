// utils/steps.ts

import type { StepType  } from "@/atom/shipments-atom";

import {StepEnum  } from "@/atom/shipments-atom";


export const stepOrder: readonly StepType[] = [
  StepEnum.SENDER,
  StepEnum.RECEIVER,
  StepEnum.SHIPMENT,
];

export const getNextStep = (current: StepType): StepType | null => {
  const idx = stepOrder.indexOf(current);
  return idx >= 0 && idx < stepOrder.length - 1 ? stepOrder[idx + 1] : null;
};

export const getPreviousStep = (current: StepType): StepType | null => {
  const idx = stepOrder.indexOf(current);
  return idx > 0 ? stepOrder[idx - 1] : null;
};
