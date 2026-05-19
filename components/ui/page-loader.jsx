"use client";

import { BarLoader } from "react-spinners";

export function PageLoader({ className = "mt-4" }) {
  return <BarLoader className={className} width="100%" color="gray" />;
}
