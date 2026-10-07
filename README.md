#  FinOps Hub

> Aplicação Full Stack para gestão orçamental, acompanhamento de custos e controlo de limites financeiros por departamento.

---

##  Tecnologias Utilizadas

### Backend
* Java 21 & Spring Boot 3
* Spring Data JPA & Hibernate
* PostgreSQL (Containerizado via Docker)
* H2 Database (Desenvolvimento local / In-memory)
* Maven

### Frontend
* React (via Vite)
* Tailwind CSS v4 (`@tailwindcss/vite`)
* Axios (Integração HTTP)

---

##  Funcionalidades Concluídas

- [x] **Cadastro de Departamentos:** Formulario dinâmico com limites orçamentais definidos.
- [x] **Listagem em Tempo Real:** Atualização automática da interface após inclusão de novos registos.
- [x] **Formatação Financeira:** Exibição monetária formatada em Real (R$).
- [x] **Comunicação Segura:** Configuração de CORS para requisições cross-origin entre React e Spring Boot.
- [x] **Interface Responsiva:** Design em Dark Mode otimizado com Tailwind CSS v4.

---

##  Estrutura do Monorepo

```text
Finops.hub/
 ├── Finops Back/hub/    # Código fonte da API RESTful em Spring Boot
 └── Finops Front/       # Aplicação Single Page Application (SPA) em React
