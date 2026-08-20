import {setGlobalOptions} from "firebase-functions";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

initializeApp();

const db = getFirestore();

setGlobalOptions({
  maxInstances: 10,
});


// =====================================================
// NOVO ALERTA DE EMERGÊNCIA
// =====================================================

export const processarAlertaEmergencia =
  onDocumentCreated(
    "users/{userId}/alert_history/{alertId}",

    async (event) => {
      // =================================================
      // DADOS DO DOCUMENTO
      // =================================================

      const snapshot = event.data;

      if (!snapshot) {
        logger.error(
          "Documento do alerta não encontrado."
        );

        return;
      }


      const alerta =
        snapshot.data();


      const userId =
        event.params.userId;


      const alertId =
        event.params.alertId;


      logger.info(
        "Novo alerta de emergência recebido.",
        {
          userId,
          alertId,
        }
      );


      // =================================================
      // BUSCAR CONTATOS
      // =================================================

      const contactsSnapshot =
        await db
          .collection(
            "users"
          )
          .doc(
            userId
          )
          .collection(
            "emergency_contacts"
          )
          .get();


      if (
        contactsSnapshot.empty
      ) {
        logger.warn(
          "Nenhum contato de emergência cadastrado.",
          {
            userId,
            alertId,
          }
        );


        await snapshot.ref.update({

          status:
            "Sem contatos",

          atualizadoEm:
            FieldValue.serverTimestamp(),

        });


        return;
      }


      // =================================================
      // MONTAR CONTATOS
      // =================================================

      const contatos =
        contactsSnapshot.docs.map(
          (contactDoc) => {
            const data =
              contactDoc.data();


            return {

              id:
                contactDoc.id,

              name:
                typeof data.name === "string" ?
                  data.name :
                  "Contato",

              phone:
                typeof data.phone === "string" ?
                  data.phone :
                  "",

            };
          }
        );


      logger.info(
        "Contatos encontrados para o alerta.",
        {
          userId,
          alertId,
          quantidade:
            contatos.length,
        }
      );


      // =================================================
      // MENSAGEM
      // =================================================

      const mensagem =
        "ALERTA DE EMERGÊNCIA SPIE: " +
        "Uma pessoa acionou um pedido de ajuda. " +
        "Verifique a situação e entre em contato com ela.";


      // =================================================
      // REGISTRAR PROCESSAMENTO
      // =================================================

      await snapshot.ref.update({

        status:
          "Processando envio",

        mensagem:

          mensagem,

        contatosNotificados:
          contatos.map(
            (contato) => ({
              id:
                contato.id,

              name:
                contato.name,

              phone:
                contato.phone,

            })
          ),

        quantidadeContatos:
          contatos.length,

        atualizadoEm:
          FieldValue.serverTimestamp(),

      });


      // =================================================
      // LOG DOS CONTATOS
      // =================================================

      contatos.forEach(
        (contato) => {
          logger.info(
            "Contato preparado para receber alerta.",
            {
              alertId,
              nome:
                contato.name,

              telefone:
                contato.phone,
            }
          );
        }
      );


      logger.info(
        "Alerta processado com sucesso.",
        {
          userId,
          alertId,
          quantidade:
            contatos.length,
          tipo:
            alerta.tipo,
        }
      );
    }
  );
