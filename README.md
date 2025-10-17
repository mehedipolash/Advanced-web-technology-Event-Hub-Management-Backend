
# 🏛️ EventHub

EventHub is a modular, scalable **backend system built with [NestJS](https://nestjs.com/)** that provides a structured foundation for managing events, administrators, and related entities. The project follows clean architecture principles with well-defined modules, DTOs, and services.

---

## 🚀 Features

- ⚙️ **NestJS Framework** — Modern, fast, and structured Node.js backend.
- 🧩 **Modular Architecture** — Organized by domain (`Admin`, `Common`, etc.) for scalability.
- 🔒 **Authentication & Guards** — Built-in session-based guard for secure endpoints.
- 📦 **DTO Validation** — Type-safe data transfer objects for request/response validation.
- 🧱 **Entity Layer** — Entities and pipes for clean data modeling.
- 🧹 **Linting & Formatting** — ESLint and Prettier integrated for code quality.

---

## 📁 Project Structure

```

EventHub/
├── src/
│   ├── Admin/                 # Admin module, controllers, services, DTOs, entities
│   ├── common/                # Shared guards, utilities, and pipes
│   ├── app.module.ts          # Root module
│   ├── main.ts                # Application entry point
│   └── ...
├── dist/                      # Compiled JavaScript output
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── nest-cli.json              # Nest CLI configuration
└── .prettierrc / eslint.config.mjs

````

---

## ⚙️ Installation

Make sure you have **Node.js (>=18.x)** and **npm** or **yarn** installed.

```bash
# Clone the repository
git clone https://github.com/<your-username>/EventHub.git

# Navigate to the project folder
cd EventHub

# Install dependencies
npm install
# or
yarn install
````

---

## 🧑‍💻 Running the Application

```bash
# Development
npm run start

# Watch mode (auto-reload)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🧰 Configuration

Environment variables can be configured in a `.env` file (create one if not present).
Typical configuration options may include:

```bash
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/eventhub
SESSION_SECRET=supersecretkey
```

---

## 🧱 Tech Stack

| Category  | Technology                                    |
| --------- | --------------------------------------------- |
| Framework | [NestJS](https://nestjs.com/)                 |
| Language  | TypeScript                                    |
| ORM       | TypeORM / Prisma *(depending on integration)* |
| Testing   | Jest                                          |
| Linting   | ESLint + Prettier                             |

---

## 🧑‍🏫 Folder Highlights

* **`Admin Module`** — Handles administrator authentication, CRUD, and status updates.
* **`DTOs`** — Define shape and validation of incoming requests.
* **`Guards`** — Protect sensitive routes via session-based authentication.
* **`Pipes`** — Custom logic for request validation and transformation.

---

## 📜 Scripts (package.json)

```bash
npm run start          # Run the app
npm run start:dev      # Run in development mode
npm run build          # Build for production
npm run lint           # Run ESLint
npm run test           # Run unit tests
```

---

## 🧑‍🤝‍🧑 Contributing

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 💬 Contact

For questions or feedback, feel free to reach out:

**Author:** [Your Name](https://github.com/<your-username>)
**Email:** [your.email@example.com](mailto:your.email@example.com)

---

> *Built with ❤️ using NestJS and TypeScript.*


