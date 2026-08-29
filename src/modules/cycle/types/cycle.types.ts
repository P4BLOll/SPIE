export interface SintomaRegistro {
  id: string;
  intensidade: string | null;
}

export interface SecrecaoRegistro {
  tipo: string;
  observacao: string;
}

export interface RegistroDia {
  sintomas?: SintomaRegistro[];
  secrecao?: SecrecaoRegistro;
  humor?: string;
}

export interface DadosCalendario {
  ultimaMenstruacao: string | null;
  duracaoMenstruacao: number;
  duracaoCiclo: number;
  registros: Record<string, RegistroDia>;
}
