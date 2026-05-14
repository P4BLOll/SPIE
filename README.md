# SPIE - Sistema de Pulseira Inteligente de Emergência


# Objetivo

O objetivo do SPIE — Sistema de Pulseira Inteligente de Emergência é desenvolver um sistema de apoio emergencial composto por um dispositivo físico com botão de acionamento e um aplicativo mobile. A proposta é permitir que mulheres em situação de risco possam solicitar ajuda de forma rápida, discreta e segura, enviando um alerta com localização para contatos previamente cadastrados.

O sistema busca reduzir a dificuldade no pedido de socorro em momentos críticos, evitando que a usuária precise desbloquear o celular, abrir aplicativos, fazer ligações ou digitar mensagens durante uma situação de ameaça. Dessa forma, o acionamento físico funciona como uma alternativa mais simples e imediata para iniciar o pedido de ajuda.

# Problemática

A violência contra a mulher é um problema social de grande relevância, pois compromete a segurança, a liberdade e a dignidade das vítimas. Ela não se limita à agressão física, podendo envolver também violência psicológica, sexual, moral e patrimonial.

Mesmo com a existência de canais oficiais de denúncia e medidas protetivas, muitas mulheres enfrentam barreiras para pedir ajuda. Entre essas dificuldades estão o medo do agressor, a dependência financeira, a vergonha, a falta de confiança nas instituições e a dificuldade de agir no momento da agressão.

Em muitos casos, a vítima está próxima do agressor e não consegue realizar uma ligação, enviar uma mensagem ou acessar um aplicativo de forma segura. Assim, o problema central do projeto está na ausência de um meio simples, discreto e rápido para solicitar socorro durante uma situação de risco.

# Fundamentação

A fundamentação do SPIE está relacionada aos temas de violência contra a mulher, subnotificação, barreiras de denúncia, dispositivos vestíveis e Internet das Coisas.

A Lei Maria da Penha reconhece diferentes formas de violência doméstica e familiar contra a mulher, como violência física, psicológica, sexual, patrimonial e moral. Essas formas de violência podem ocorrer de maneira combinada e, muitas vezes, envolvem controle, isolamento, vigilância e dependência econômica.

Outro ponto importante é a subnotificação. Muitos casos de violência não chegam aos canais oficiais, seja por medo, insegurança ou dificuldade de denúncia. Esse cenário reforça a importância de soluções complementares que possam auxiliar a vítima no momento crítico da ocorrência.

O SPIE também se apoia no conceito de dispositivos vestíveis e Internet das Coisas. Dispositivos vestíveis são equipamentos eletrônicos utilizados junto ao corpo, como pulseiras, relógios, colares ou chaveiros inteligentes. Quando conectados a aplicativos ou à internet, esses dispositivos passam a integrar um sistema capaz de coletar, enviar e processar informações.

No caso do SPIE, o dispositivo físico atua como um módulo de acionamento emergencial. Ao pressionar o botão, ele envia um sinal ao aplicativo mobile, que fica responsável por interpretar a emergência, obter a localização pelo smartphone e encaminhar o alerta aos contatos cadastrados.

# Funcionamento do sistema

O SPIE será construído a partir da integração entre um dispositivo físico e um aplicativo mobile.

O dispositivo físico será desenvolvido com um ESP32-C3 e um botão físico. O ESP32-C3 será responsável por identificar o acionamento do botão e enviar um sinal para o aplicativo. O botão funcionará como o meio principal de ativação do alerta de emergência.

O aplicativo mobile será desenvolvido em React Native, permitindo a criação de uma aplicação para smartphone. O aplicativo será responsável por receber o sinal enviado pelo dispositivo, capturar a localização da usuária pelo celular e enviar o alerta para os contatos previamente cadastrados.

A comunicação entre o dispositivo e o aplicativo será feita por Bluetooth Low Energy, tecnologia presente no ESP32-C3 e adequada para comunicação de baixo consumo entre dispositivos próximos.

Assim, a construção do sistema pode ser resumida da seguinte forma:

Dispositivo físico: ESP32-C3 + botão físico.
Aplicativo mobile: React Native.
Comunicação: Bluetooth Low Energy.
Localização: recursos nativos do smartphone.
