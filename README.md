# Provynx

**A Configurable Multi-Tenant Traceability Platform for Small and Medium-Scale Enterprises.**

Provynx is a configurable SaaS platform designed to help Small and Medium-Scale Enterprises (SMEs) manage and track their products throughout their supply chains. It allows businesses to customise industry-specific workflows, manage product batches, record traceability events and verify product information.

The platform combines a relational database with blockchain technology to provide structured data management and tamper-evident traceability records.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Database Setup (MySQL)](#4-database-setup-mysql)
  - [5. Running the Backend](#5-running-the-backend)
  - [6. Blockchain Development (Hardhat)](#6-blockchain-development-hardhat)
  - [7. Blockchain and Backend Integration](#7-blockchain-and-backend-integration)
- [Git Commit Convention](#git-commit-convention)
- [Development Status](#development-status)

---

## Key Features

- **Multi-tenancy:** each business (tenant) operates in its own isolated workspace.
- **Configurable workflows:** customise industry-specific traceability workflows using starter templates.
- **Product and batch management:** manage products, product variants and product batches.
- **Traceability events:** record events as products move through the supply chain.
- **Role-based access:** manage users, roles and permissions per tenant.
- **Tamper-evident records:** anchor traceability data on the blockchain for independent verification.
- **Product verification:** retrieve blockchain verification information to confirm product details.

## Tech Stack

| Component                  | Technology          |
| -------------------------- | ------------------- |
| Backend                    | Node.js, Express.js |
| Frontend                   | JavaScript / React  |
| Database                   | MySQL               |
| Blockchain Development     | Solidity, Hardhat 3 |
| Smart Contract Interaction | Ethers.js           |
| Smart Contract Testing     | Mocha               |
| Smart Contract Language    | Solidity            |
| Version Control            | Git and GitHub      |

## Project Structure

```text
provynxBackend/
│
├── blockchain/             # Blockchain integration services
├── contracts/              # Solidity smart contracts
├── ignition/               # Hardhat deployment modules
├── scripts/                # Blockchain scripts
├── test/                   # Smart contract tests
│
├── src/
│   ├── controllers/        # Request controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/             # API routes
│   └── services/           # Application services
│
├── server.js               # Backend entry point
├── hardhat.config.ts       # Hardhat configuration
├── package.json
├── tsconfig.json
├── .env                    # Environment variables
└── README.md
```

## Getting Started

### Prerequisites

Ensure the following are installed:

- [Node.js (LTS)](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- [Ubuntu on WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)
- MySQL Server
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd provynxBackend
```

### 2. Install Dependencies

Install the backend and Hardhat dependencies from the project root:

```bash
npm install
```

Both the Express backend and Hardhat share the project's `package.json` and `node_modules` directory.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
dbHost=127.0.0.1
dbPort=3306
dbUser=provynxUser
dbPassword=your_password
dbName=provynxDb

# Application Configuration
port=5000
nodeEnv=development

# Add other required application secrets here
```

Use your actual database credentials and application secrets. Never commit your `.env` file.

Ensure your `.gitignore` includes:

```gitignore
node_modules/
.env
.env.*
!.env.example
artifacts/
cache/
coverage/
```

### 4. Database Setup (MySQL)

Provynx uses MySQL running through Ubuntu (WSL 2).

Open your Ubuntu terminal and start MySQL:

```bash
sudo service mysql start
```

Connect to the database:

```bash
mysql -u provynxUser -p provynxDb
```

Enter your database password when prompted.

If the database has not been created, use:

```sql
CREATE DATABASE provynxDb;

CREATE USER 'provynxUser'@'localhost'
IDENTIFIED BY 'your_password';

GRANT ALL PRIVILEGES ON provynxDb.*
TO 'provynxUser'@'localhost';

FLUSH PRIVILEGES;
```

Database migrations and table creation should be performed using the project's database setup process.

### 5. Running the Backend

From the project root:

```bash
npm run dev
```

If a development script has not been configured, use:

```bash
node server.js
```

The backend will run on the configured application port.

For production execution:

```bash
npm start
```

Ensure the corresponding `dev` and `start` scripts are configured in `package.json`.

### 6. Blockchain Development (Hardhat)

Hardhat is used to develop, compile, test and deploy Provynx smart contracts.

All Hardhat commands should be executed from the project root.

**Compile Smart Contracts**

```bash
npx hardhat compile
```

**Run Smart Contract Tests**

Run all tests in the project:

```bash
npx hardhat test
```

You can also selectively run the Solidity or Mocha tests:

```bash
npx hardhat test solidity
npx hardhat test mocha
```

**Start a Local Blockchain Network**

```bash
npx hardhat node
```

**Deploy Smart Contracts**

Deployment is managed through Hardhat Ignition modules located in the `ignition/` directory. Modules can be deployed to a locally simulated chain or to the Sepolia testnet.

Deploy to a local chain:

```bash
npx hardhat ignition deploy ignition/modules/YourModule.ts
```

Or to a running local node:

```bash
npx hardhat ignition deploy ignition/modules/YourModule.ts --network localhost
```

Replace `YourModule.ts` with the actual deployment module.

**Deploy to Sepolia**

Deploying to Sepolia requires an account with funds to send the transaction. The Hardhat configuration uses a Configuration Variable called `SEPOLIA_PRIVATE_KEY` to hold the private key of the account you want to use.

You can set `SEPOLIA_PRIVATE_KEY` using the `hardhat-keystore` plugin (recommended) or as an environment variable.

To set it using `hardhat-keystore`:

```bash
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, deploy with the Sepolia network:

```bash
npx hardhat ignition deploy --network sepolia ignition/modules/YourModule.ts
```

> **Warning:** Use a dedicated test account for Sepolia and never commit private keys to version control.

For more on Hardhat 3, see the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3).

### 7. Blockchain and Backend Integration

The Express backend communicates with deployed smart contracts through the blockchain services in the `blockchain/` directory.

These services handle interactions such as:

- Registering product batches.
- Recording traceability events.
- Interacting with deployed smart contracts.
- Retrieving blockchain verification information.

Detailed contract and integration documentation will be added as development progresses.

---

## Git Commit Convention

Provynx follows the **Conventional Commits** naming convention to maintain a consistent, readable and organised commit history.

### Commit Message Format

```text
<type>(<scope>): <short description>
```

Example:

```text
feat(auth): implement JWT authentication
```

### Commit Types

| Type       | Purpose                                           |
| ---------- | ------------------------------------------------- |
| `feat`     | Adding a new feature                              |
| `fix`      | Fixing a bug                                      |
| `docs`     | Documentation changes                             |
| `style`    | Formatting changes without logic changes          |
| `refactor` | Restructuring code without changing functionality |
| `test`     | Adding or updating tests                          |
| `chore`    | Dependencies, configurations and maintenance      |
| `build`    | Build tools and compilation changes               |
| `perf`     | Performance improvements                          |
| `ci`       | CI/CD pipeline changes                            |

### Commit Scopes

Scopes identify the part of Provynx being modified.

| Scope          | Purpose                                |
| -------------- | -------------------------------------- |
| `auth`         | Authentication and registration        |
| `tenancy`      | Multi-tenancy                          |
| `users`        | User management                        |
| `roles`        | Roles and permissions                  |
| `templates`    | Industry starter templates             |
| `products`     | Product and product variant management |
| `traceability` | Traceability workflows and events      |
| `blockchain`   | Blockchain integration                 |
| `contracts`    | Solidity smart contracts               |
| `database`     | Database changes                       |
| `api`          | API endpoints and integrations         |
| `frontend`     | Frontend implementation                |
| `config`       | Environment and project configuration  |
| `docs`         | Project documentation                  |
| `deps`         | Dependency updates                     |

### Commit Message Examples

**Backend Development**

```bash
feat(auth): implement JWT authentication
feat(tenancy): add tenant registration
feat(roles): implement role-based permissions
fix(api): handle invalid product requests
refactor(database): optimise database queries
```

**Blockchain Development**

```bash
feat(contracts): add product traceability contract
feat(blockchain): integrate contract deployment
test(contracts): add batch verification tests
fix(blockchain): resolve transaction validation error
```

**Frontend Development**

```bash
feat(frontend): add tenant registration page
feat(frontend): implement product dashboard
style(frontend): improve dashboard responsiveness
fix(frontend): resolve navigation issue
```

**Project Maintenance**

```bash
chore(config): configure environment variables
chore(deps): install Hardhat dependencies
docs(readme): update project setup instructions
```

### Commit Guidelines

1. Use lowercase for commit types, scopes and descriptions.
2. Keep commit messages short, clear and descriptive.
3. Use the present tense (e.g. `add`, `implement`, `fix`).
4. Make one logical change per commit.
5. Avoid vague messages such as `updates`, `changes` or `final work`.
6. Never commit environment files, passwords, private keys or sensitive credentials.

### Making Commits

```bash
git status
git add .
git commit -m "feat(auth): implement user registration"
git push origin main
```

---

## Development Status

Provynx is currently under active development.

Features, documentation and implementation details will be updated as development progresses.
