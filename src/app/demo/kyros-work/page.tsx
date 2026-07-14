import type { Metadata } from "next";
import { KyrosWorkDemo } from "@/components/demos/kyros-work/KyrosWorkDemo";

export const metadata: Metadata = {
  title: "Demonstração do Kyros Work",
  description: "Experimente uma versão demonstrativa do sistema de jornada, ponto eletrônico e portal do colaborador da Kyros Tech.",
  robots: { index: false, follow: true },
};

export default function KyrosWorkDemoPage() {
  return <KyrosWorkDemo />;
}
