"use client";

import { useTarget } from "@/lib/storage";

export function TargetValue() {
  return <>{useTarget()}</>;
}
