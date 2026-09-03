import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { FieldValue } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

initializeApp();

setGlobalOptions({
  maxInstances: 10,
  region: "southamerica-east1",
});

// =====================================================
// PROCESSAMENTO DO ALERTA DE EMERGÊNCIA (AUDITORIA NO CLOUD)
// O envio de SMS e ligação é realizado de forma 100% nativa pelo app.
// =====================================================

export const processarAlertaEmergencia = onDocumentCreated(
  "users/{userId}/alert_history/{alertId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("Documento do alerta não encontrado.");
      return;
    }

    const alerta = snapshot.data();
    const { userId, alertId } = event.params;

    logger.info("🚨 [SPIE ALERTA] Registro de socorro auditado no Cloud Firestore.", {
      userId,
      alertId,
      tipo: alerta.tipo || "SOS",
    });

    try {
      await snapshot.ref.update({
        statusAuditado: "Processado com sucesso",
        atualizadoEm: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      logger.warn("Erro ao atualizar metadados de auditoria:", err);
    }
  }
);

// =====================================================
// CAMADA DE INTELIGÊNCIA ARTIFICIAL E INSIGHTS DO CICLO
// Executa cálculos determinísticos, validação e IA segura
// =====================================================

export { getSmartInsights } from "./modules/insights";

