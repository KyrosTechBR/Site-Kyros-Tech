import type { WorkDemoState, WorkRecordType } from "@/types/demos";

export const KYROS_WORK_STORAGE_KEY = "kyros-work-demo-state-v2";

export const demoEmployee = {
  name: "Teste",
  role: "Colaborador demonstrativo",
  company: "Empresa Demonstração Ltda.",
  admissionDate: "10/02/2025",
  schedule: "08:00 às 17:00",
  email: "joao.almeida@empresa-demonstracao.com.br",
};

export const workRecordSequence: WorkRecordType[] = ["Entrada", "Saída Almoço", "Volta Almoço", "Saída"];

export const initialWorkDemoState: WorkDemoState = {
  records: [],
  adjustments: [],
  selfieSelected: false,
};

export const workHistory = [
  { date: "08/07/2026", records: "08:01, 12:00, 13:00, 17:06", status: "Completo" },
  { date: "09/07/2026", records: "08:03, 12:02, 13:01, 17:10", status: "Completo" },
  { date: "10/07/2026", records: "08:00, 12:00, 13:00, 17:00", status: "Completo" },
  { date: "11/07/2026", records: "08:05, 12:00, 13:02, 17:08", status: "Completo" },
  { date: "12/07/2026", records: "Folga demonstrativa", status: "Folga" },
];
