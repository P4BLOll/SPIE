# SPIE — Sistema Inteligente de Proteção Emergencial

<p align="center">
  Sistema embarcado e aplicação mobile voltados para acionamento emergencial, rastreamento e comunicação em tempo real.
</p>

---

# Visão Geral

O **SPIE (Sistema Inteligente de Proteção Emergencial)** consiste em uma solução integrada entre hardware embarcado e aplicação mobile para suporte a situações emergenciais.

A arquitetura do sistema foi desenvolvida com foco em:

* Baixa latência no envio de alertas
* Comunicação em tempo real
* Confiabilidade do acionamento
* Portabilidade
* Escalabilidade da infraestrutura
* Integração IoT

O projeto utiliza uma pulseira inteligente baseada em ESP32 integrada a uma aplicação mobile desenvolvida em React Native.

---

# Arquitetura do Sistema

## Componentes principais

### Aplicação Mobile

Responsável por:

* Interface do usuário
* Gerenciamento de contatos de emergência
* Exibição de alertas
* Comunicação com serviços em nuvem
* Exibição da localização em tempo real
* Persistência local de dados

### Dispositivo Embarcado

Pulseira inteligente responsável por:

* Captura do acionamento físico
* Comunicação sem fio
* Transmissão de eventos emergenciais
* Sincronização com o aplicativo

### Infraestrutura Cloud

Camada responsável por:

* Persistência de dados
* Autenticação de usuários
* Sincronização em tempo real
* Gerenciamento de eventos
* Escalabilidade dos serviços

---

# Fluxo Operacional

## Fluxo de emergência

```text
Usuário aciona botão físico
        ↓
ESP32 detecta evento
        ↓
Dispositivo envia requisição
        ↓
Firebase processa evento
        ↓
Aplicativo recebe atualização
        ↓
Contatos de emergência são notificados
        ↓
Localização do usuário é compartilhada
```

---

# Stack Tecnológica

## Aplicação Mobile

| Tecnologia       | Finalidade                             |
| ---------------- | -------------------------------------- |
| React Native     | Desenvolvimento mobile multiplataforma |
| Expo             | Ambiente de execução e build           |
| TypeScript       | Tipagem estática e escalabilidade      |
| React Navigation | Navegação entre telas                  |
| AsyncStorage     | Persistência local                     |

---

## Hardware Embarcado

| Tecnologia   | Finalidade                 |
| ------------ | -------------------------- |
| ESP32        | Microcontrolador principal |
| Wi‑Fi        | Comunicação em rede        |
| Bluetooth    | Comunicação local          |
| Botão físico | Acionamento emergencial    |

---

## Backend e Serviços Cloud

| Tecnologia              | Finalidade                   |
| ----------------------- | ---------------------------- |
| Firebase Authentication | Autenticação                 |
| Firestore               | Banco de dados NoSQL         |
| Firebase Realtime Sync  | Atualização em tempo real    |
| Cloud Infrastructure    | Persistência e sincronização |

---

# Estrutura Técnica do Projeto

```bash
src/
 ├─ components/
 │   ├─ AlertCard.tsx
 │   ├─ ContactCard.tsx
 │   └─ EmergencyButton.tsx
 │
 ├─ screens/
 │   ├─ HomeScreen.tsx
 │   ├─ EmergencyScreen.tsx
 │   ├─ ContactsScreen.tsx
 │   ├─ HistoryScreen.tsx
 │   └─ SettingsScreen.tsx
 │
 ├─ services/
 │   ├─ firebase.ts
 │   ├─ emergencyService.ts
 │   ├─ notificationService.ts
 │   └─ locationService.ts
 │
 ├─ storage/
 │   └─ localStorage.ts
 │
 ├─ hooks/
 │   └─ useEmergency.ts
 │
 ├─ utils/
 │   └─ emergencyHelpers.ts
 │
 ├─ types/
 │   └─ emergency.ts
 │
 └─ contexts/
     └─ AuthContext.tsx
```

---

# Comunicação do Sistema

## Comunicação embarcado → nuvem

A pulseira realiza comunicação via:

* Wi‑Fi
* HTTP Requests
* APIs REST

Os eventos são enviados ao Firebase em tempo real.

---

## Comunicação aplicativo → nuvem

O aplicativo utiliza:

* Firebase SDK
* Firestore listeners
* Autenticação JWT
* Sincronização em tempo real

---

# Segurança

## Mecanismos implementados

* Autenticação de usuários
* Controle de acesso via Firebase Rules
* Persistência segura de credenciais
* Comunicação autenticada
* Identificação única de dispositivos

---

# Funcionalidades Técnicas

## Sistema de Emergência

* Acionamento físico instantâneo
* Disparo de eventos críticos
* Atualização em tempo real
* Compartilhamento de localização

---

## Geolocalização

* Captura de coordenadas GPS
* Atualização periódica
* Compartilhamento em tempo real
* Rastreamento durante emergência

---

## Persistência de Dados

* Armazenamento local
* Sincronização cloud
* Histórico de eventos
* Recuperação de sessão

---

# Execução do Projeto

## Requisitos

* Node.js
* npm
* Expo CLI
* Android Studio ou dispositivo físico

---

## Instalação

### Clonar repositório

```bash
git clone https://github.com/seuusuario/spie.git
```

### Entrar na pasta

```bash
cd spie
```

### Instalar dependências

```bash
npm install
```

### Inicializar aplicação

```bash
npx expo start
```

---

# Escalabilidade

A arquitetura do SPIE foi projetada visando:

* Expansão para múltiplos dispositivos
* Integração com novos sensores
* Escalabilidade horizontal da infraestrutura
* Processamento de eventos em tempo real
* Evolução para monitoramento inteligente

---

# Possíveis Evoluções

## Funcionalidades futuras

* Detecção automática de quedas
* Monitoramento cardíaco
* Acionamento por comando de voz
* Integração com smartwatch
* Inteligência artificial para análise comportamental
* Integração com serviços públicos de emergência
* Criptografia ponta a ponta

---

## Áreas técnicas envolvidas

* Desenvolvimento Mobile
* Internet das Coisas (IoT)
* Sistemas Embarcados
* Computação em Nuvem
* Engenharia de Software
* Comunicação em Tempo Real

---
