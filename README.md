# 🎨 Vue 3 SPA – To-Do List (Frontend)

Este é o frontend da aplicação To-Do List, desenvolvido como uma SPA (Single Page Application) usando **Vue.js 3**, **Pinia**, **Vue Router** e **Tailwind CSS**. Ele consome uma API REST feita em Laravel.

A aplicação permite que usuários vejam, concluam, atualizem ou excluam tarefas, enquanto **apenas administradores podem criar novas tarefas**.

---

## 📦 Requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js (versão 18 ou superior)
- npm (ou yarn)
- Um navegador (Chrome, Firefox, etc.)

---

## 🚀 Como rodar o projeto

Siga os passos abaixo para instalar e executar o projeto localmente.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/vue-todo-client.git
cd vue-todo-client


npm install

cp .env.example .env

VITE_API_URL=http://localhost:8000/api ou a porta em que aparecer no terminal apos dar php artisan serve

npm run dev

