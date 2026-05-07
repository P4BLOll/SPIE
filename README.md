# SPIE - Sistema de Pulseira Inteligente de Emergência

Bem-vindo ao repositório do SPIE.

O SPIE é um projeto acadêmico desenvolvido no contexto do Projeto Integrador I. A proposta consiste em uma pulseira inteligente de emergência integrada a uma aplicação mobile, com foco em mulheres em situação de risco.

O sistema busca oferecer uma forma rápida, discreta e segura de solicitar ajuda durante situações de ameaça. Para isso, combina um dispositivo vestível com botão físico, comunicação com aplicativo móvel e envio de alerta com localização para contatos previamente cadastrados pela usuária.

O SPIE não substitui canais oficiais de denúncia, medidas protetivas ou órgãos de segurança pública. A solução atua como ferramenta complementar de apoio emergencial.

## Problema

A violência contra a mulher é um problema social de grande relevância no Brasil, pois afeta a segurança, a liberdade e a dignidade de milhões de mulheres. Esse fenômeno não se limita à agressão física, pois também envolve violência psicológica, sexual, moral e patrimonial.

Embora existam canais oficiais de denúncia e medidas protetivas, muitas mulheres enfrentam dificuldades para pedir ajuda em situações de risco. Entre os obstáculos mais comuns estão o medo do agressor, a dependência financeira, a vergonha, a falta de confiança nas instituições e a dificuldade de acionar ajuda no momento da agressão.

Em muitos casos, a vítima está próxima do agressor e não consegue realizar uma ligação, escrever uma mensagem ou acessar um aplicativo de forma segura e discreta.

O problema central do projeto está na dificuldade de solicitar socorro de forma rápida, discreta e segura durante uma situação de ameaça. A ausência de um meio simples de acionamento pode aumentar o tempo de resposta e diminuir as chances de apoio imediato.

## Objetivo

O objetivo do SPIE é desenvolver um sistema composto por uma pulseira com botão físico e um aplicativo móvel capaz de enviar alerta e localização para contatos previamente cadastrados pela usuária.

O projeto tem como foco a redução da fricção no pedido de ajuda, permitindo que a usuária acione uma emergência sem precisar desbloquear o celular, navegar por menus ou digitar mensagens durante uma situação de risco.

## Fundamentação

A proposta do SPIE está relacionada à discussão sobre violência contra a mulher, subnotificação, barreiras de denúncia, dispositivos vestíveis e Internet das Coisas.

A Lei Maria da Penha reconhece diferentes formas de violência doméstica e familiar contra a mulher, como violência física, psicológica, sexual, patrimonial e moral. Essas formas de violência podem ocorrer de maneira combinada e, em muitos casos, envolvem isolamento, vigilância, controle emocional e dependência econômica.

A subnotificação também é um fator relevante, pois muitos casos de violência não chegam aos canais oficiais de denúncia. Esse contexto reforça a necessidade de estratégias complementares de proteção, especialmente para o momento crítico da ocorrência.

Dispositivos vestíveis são equipamentos eletrônicos projetados para serem utilizados junto ao corpo, como pulseiras, relógios, anéis ou colares inteligentes. Quando conectados a aplicativos móveis ou à internet, esses dispositivos passam a integrar o ecossistema da Internet das Coisas.

No SPIE, a pulseira atua como um dispositivo conectado que envia um sinal ao aplicativo móvel quando o botão de emergência é pressionado.

## Modelo Proposto

O SPIE é estruturado como uma solução integrada entre hardware embarcado, aplicação mobile e, quando necessário, serviços em nuvem.

A pulseira inteligente é responsável pelo acionamento físico da emergência. O aplicativo móvel recebe o sinal, coleta a localização pelo smartphone e envia o alerta aos contatos cadastrados. O backend ou serviço em nuvem pode ser utilizado para armazenar registros, apoiar notificações e sincronizar informações.

Essa arquitetura foi escolhida por ser viável para um protótipo acadêmico. A pulseira não precisa possuir GPS próprio nem conexão 4G, pois essas funções podem ser executadas pelo smartphone. Essa decisão reduz o custo do hardware e melhora a autonomia da bateria.

## Funcionamento

O funcionamento proposto do sistema começa quando a usuária pressiona o botão da pulseira por alguns segundos. Esse acionamento prolongado ajuda a evitar disparos acidentais.

Após o acionamento, a pulseira envia um sinal ao aplicativo por Bluetooth Low Energy. O aplicativo interpreta o sinal como pedido de emergência, coleta a localização atual ou a última localização conhecida do smartphone e envia um alerta para os contatos cadastrados.

O alerta deverá conter, no mínimo:

* Mensagem de emergência
* Data
* Horário
* Localização aproximada

Em uma versão mais avançada, o sistema poderá registrar o evento em um banco de dados e permitir que a usuária consulte o histórico de acionamentos.

## Materiais e Tecnologias

O protótipo físico deverá utilizar um microcontrolador ESP32-C3, escolhido por seu baixo custo, suporte a Bluetooth Low Energy e compatibilidade com desenvolvimento em C/C++.

O dispositivo também deverá conter botão físico, bateria recarregável, módulo de carregamento e, se possível, um recurso discreto de feedback, como vibração curta ou LED de baixa intensidade.

O aplicativo móvel poderá ser desenvolvido em React Native, permitindo a criação de uma aplicação compatível com Android e, futuramente, iOS.

A localização será obtida pelo smartphone, utilizando os recursos nativos do aparelho. Essa decisão reduz custo, tamanho e consumo de energia do dispositivo vestível.

Para armazenamento e envio de alertas, poderão ser utilizados serviços como Firebase, Supabase ou uma API própria desenvolvida em Java com Spring Boot. A escolha final dependerá da complexidade do protótipo e do tempo disponível para desenvolvimento.

### Aplicação mobile

| Tecnologia                     | Finalidade                              |
| ------------------------------ | --------------------------------------- |
| React Native                   | Desenvolvimento da aplicação mobile     |
| Android                        | Plataforma inicial prevista             |
| iOS                            | Possibilidade futura de compatibilidade |
| Recursos nativos do smartphone | Obtenção da localização                 |

### Dispositivo físico

| Tecnologia             | Finalidade                              |
| ---------------------- | --------------------------------------- |
| ESP32-C3               | Microcontrolador da pulseira            |
| Bluetooth Low Energy   | Comunicação entre pulseira e aplicativo |
| C/C++                  | Desenvolvimento do firmware             |
| Botão físico           | Acionamento emergencial                 |
| Bateria recarregável   | Alimentação do dispositivo              |
| Módulo de carregamento | Recarga da bateria                      |

### Serviços possíveis

| Tecnologia           | Finalidade                                      |
| -------------------- | ----------------------------------------------- |
| Firebase             | Armazenamento, autenticação ou envio de alertas |
| Supabase             | Alternativa para backend e banco de dados       |
| Java com Spring Boot | Possível API própria                            |

## Casos de Uso Principais

Os principais casos de uso previstos para o sistema são:

* Cadastro de contatos de emergência
* Pareamento da pulseira com o aplicativo
* Acionamento do alerta
* Captura e envio de localização
* Visualização do histórico de acionamentos
* Cancelamento de alerta em caso de disparo acidental

## Telas Principais

As telas essenciais do aplicativo são:

### Painel inicial

Tela responsável por apresentar o status geral do sistema, incluindo informações sobre a pulseira e a disponibilidade da localização.

### Contatos de emergência

Tela para cadastro, edição e gerenciamento dos contatos que poderão receber alertas.

### Dispositivo

Tela destinada ao pareamento, teste e acompanhamento da pulseira inteligente.

### Alerta em andamento

Tela exibida durante um acionamento emergencial, permitindo acompanhar o status do envio e cancelar o alerta, se necessário.

### Histórico

Tela destinada à consulta dos acionamentos realizados anteriormente.

## Segurança e Privacidade

A segurança dos dados é um ponto essencial, pois o sistema trabalha com localização e situações de risco.

A localização não deve ser compartilhada continuamente. O envio deve ocorrer apenas após o acionamento do botão. Além disso, os contatos de emergência precisam ser cadastrados pela própria usuária.

Também é necessário prever formas de cancelamento de falso alerta e mecanismos de proteção contra uso indevido. O sistema deve deixar claro quem recebe as informações, por quanto tempo elas ficam disponíveis e como a usuária pode encerrar um alerta.

## Desenvolvimento do Projeto

A pesquisa caracteriza-se como aplicada, pois busca desenvolver uma solução tecnológica para um problema social concreto. Também possui caráter exploratório, pois envolve levantamento de dados, estudo de soluções semelhantes e definição de requisitos.

Quanto ao desenvolvimento do produto, o projeto seguirá uma abordagem incremental. Inicialmente será criado um protótipo mínimo capaz de validar o fluxo principal:

```text
Acionamento físico
        ↓
Comunicação com o aplicativo
        ↓
Captura de localização
        ↓
Envio de alerta
```

Posteriormente, poderão ser adicionadas melhorias, como histórico de acionamentos, feedback por vibração e integração com backend.

## Projeto

O desenvolvimento anual poderá ser organizado em etapas:

* Definição do problema, objetivo e justificativa
* Levantamento bibliográfico
* Benchmarking de soluções semelhantes
* Definição de requisitos
* Definição dos casos de uso
* Definição da arquitetura
* Desenvolvimento do firmware
* Desenvolvimento do aplicativo
* Testes e ajustes
* Documentação
* Preparação da apresentação final

## Resultados Esperados

Espera-se apresentar um protótipo funcional capaz de demonstrar o fluxo principal da solução:

```text
Acionamento do botão da pulseira
        ↓
Comunicação com o aplicativo
        ↓
Captura de localização
        ↓
Envio de alerta para contatos cadastrados
```

Também se espera entregar a modelagem do sistema, as telas principais do aplicativo, a análise de viabilidade e a documentação acadêmica do projeto.

O resultado final deverá demonstrar que a tecnologia pode atuar como apoio emergencial em situações de risco, desde que utilizada com responsabilidade, privacidade e clareza sobre suas limitações.

## Viabilidade Econômica

A viabilidade econômica do projeto está relacionada ao baixo custo dos componentes escolhidos. O ESP32-C3, o botão físico, a bateria recarregável e o módulo de carregamento possuem valores acessíveis para um protótipo.

O custo estimado do hardware inicial é baixo quando comparado a dispositivos vestíveis comerciais importados.

Em relação ao desenvolvimento, a maior parte do custo está nas horas de trabalho da equipe, envolvendo pesquisa, modelagem, programação, testes e documentação. Como se trata de um projeto acadêmico, a principal meta é validar a viabilidade técnica e social da solução, e não lançar imediatamente um produto comercial.

## Referências

BRASIL. Lei nº 11.340, de 7 de agosto de 2006. Cria mecanismos para coibir a violência doméstica e familiar contra a mulher. Brasília, DF: Presidência da República, 2006.

BRASIL. Ministério da Justiça e Segurança Pública. Mapa da Segurança Pública 2025. Brasília, DF: Ministério da Justiça e Segurança Pública, 2025.

FÓRUM BRASILEIRO DE SEGURANÇA PÚBLICA; DATAFOLHA. Visível e invisível: a vitimização de mulheres no Brasil. 5. ed. São Paulo: Fórum Brasileiro de Segurança Pública, 2025.

GIL, A. C. Como elaborar projetos de pesquisa. 6. ed. São Paulo: Atlas, 2017.

MAGRANI, E. A internet das coisas. Rio de Janeiro: FGV Editora, 2018.

ONU BRASIL. Objetivo de Desenvolvimento Sustentável 5: Igualdade de gênero. Brasília, DF: Nações Unidas Brasil, 2024.

PRODANOV, C. C.; FREITAS, E. C. Metodologia do trabalho científico: métodos e técnicas da pesquisa e do trabalho acadêmico. 2. ed. Novo Hamburgo: Feevale, 2013.

SANTOS, B. P.; SILVA, L. A. M.; CELES, C. S. F. S.; BORGES NETO, J. B.; PERES, B. S.; VIEIRA, M. A. M.; VIEIRA, L. F. M.; GOUSSEVSKAIA, O. N.; LOUREIRO, A. A. F. Internet das Coisas: da teoria à prática. In: SIMPÓSIO BRASILEIRO DE REDES DE COMPUTADORES E SISTEMAS DISTRIBUÍDOS, 34., 2016, Salvador. Minicursos do SBRC 2016. Porto Alegre: Sociedade Brasileira de Computação, 2016.

WAZLAWICK, R. S. Engenharia de software: conceitos e práticas. Rio de Janeiro: Elsevier, 2013.
