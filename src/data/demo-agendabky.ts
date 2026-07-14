import type { AgendaDemoState, AgendaProfessional, AgendaService } from "@/types/demos";

export const AGENDABKY_STORAGE_KEY = "agendabky-demo-state";

export const agendaServices: AgendaService[] = [
  { id: "corte", name: "Corte tradicional", duration: "40 minutos", price: "R$ 45,00" },
  { id: "barba", name: "Barba", duration: "30 minutos", price: "R$ 35,00" },
  { id: "corte-barba", name: "Corte e barba", duration: "1 hora", price: "R$ 70,00" },
  { id: "infantil", name: "Corte infantil", duration: "35 minutos", price: "R$ 40,00" },
];

export const agendaProfessionals: AgendaProfessional[] = [
  { id: "lucas", name: "Lucas Martins", initials: "LM" },
  { id: "rafael", name: "Rafael Souza", initials: "RS" },
  { id: "bruno", name: "Bruno Costa", initials: "BC" },
];

export const agendaTimes = ["09:00", "09:40", "10:30", "11:20", "13:30", "14:20", "15:10", "16:00", "17:00"];

export const initialAgendaDemoState: AgendaDemoState = {
  appointments: [],
  services: agendaServices,
};

export function isTimeUnavailable(professionalId: string, date: string, time: string) {
  const seed = `${professionalId}-${date}-${time}`;
  return seed.includes("10:30") || seed.includes("14:20") || (professionalId === "bruno" && time === "09:40");
}
