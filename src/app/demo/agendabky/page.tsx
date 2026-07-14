import type { Metadata } from "next";
import { AgendaBKyDemo } from "@/components/demos/agendabky/AgendaBKyDemo";

export const metadata: Metadata = {
  title: "Demonstração do AgendaBKy",
  description: "Simule um agendamento e conheça uma versão demonstrativa do AgendaBKy.",
  robots: { index: false, follow: true },
};

export default function AgendaBKyDemoPage() {
  return <AgendaBKyDemo />;
}
