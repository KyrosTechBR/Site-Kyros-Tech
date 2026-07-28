import type { Metadata } from "next";
import { KyrosClockDemo } from "@/components/demos/kyros-clock/KyrosClockDemo";

export const metadata: Metadata = {
  title: "Demonstração do Kyros Clock",
  description: "Experimente uma versão demonstrativa do sistema de jornada, ponto eletrônico e portal do colaborador da Kyros Tech.",
  robots: { index: false, follow: true },
};

export default function KyrosClockDemoPage() {
  return <KyrosClockDemo />;
}
