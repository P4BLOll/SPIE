export interface SecurityVaultState {
  senhaSalva: string | null;
  acessoLiberado: boolean;
  carregando: boolean;
  rotaDestino: string | null;
  rotaAnterior: string | null;
}
