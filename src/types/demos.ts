export type WorkRecordType = "Entrada" | "Saída Almoço" | "Volta Almoço" | "Saída";

export type WorkRecord = {
  type: WorkRecordType;
  time: string;
  date: string;
};

export type WorkAdjustment = {
  id: string;
  date: string;
  type: WorkRecordType;
  time: string;
  reason: string;
  status: "Ajuste solicitado";
};

export type WorkDemoState = {
  records: WorkRecord[];
  adjustments: WorkAdjustment[];
  selfieSelected: boolean;
};

export type AgendaService = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

export type AgendaProfessional = {
  id: string;
  name: string;
  initials: string;
};

export type AgendaAppointment = {
  id: string;
  code: string;
  serviceId: string;
  professionalId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  status: "Demonstração";
};

export type AgendaDemoState = {
  appointments: AgendaAppointment[];
  services: AgendaService[];
};
