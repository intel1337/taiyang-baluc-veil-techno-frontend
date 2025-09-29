# 🚀 NestJS Intro API

Une API REST moderne construite avec NestJS, Prisma, PostgreSQL et bcrypt pour la gestion des utilisateurs et des tâches.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Exemples d'utilisation](#-exemples-dutilisation)
- [Architecture](#-architecture)
- [Sécurité](#-sécurité)

## ✨ Fonctionnalités

- 👤 **Gestion des utilisateurs** : Inscription, connexion, profils
- 📝 **Gestion des tâches** : CRUD complet pour les tâches
- 🔐 **Authentification sécurisée** : Mots de passe hashés avec bcrypt
- 🛡️ **Sécurité** : Jamais d'exposition des mots de passe
- 🗄️ **Base de données** : Prisma ORM avec PostgreSQL
- 🏗️ **Architecture modulaire** : Modules NestJS découplés
- 📊 **Types TypeScript** : API entièrement typée

## 🛠 Technologies

- **Backend** : NestJS (Node.js)
- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Sécurité** : bcrypt pour le hashage des mots de passe
- **Langage** : TypeScript
- **Package Manager** : pnpm

## 🚀 Installation

### Prérequis

- Node.js (v18+)
- PostgreSQL
- pnpm

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd nest-app
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configuration de la base de données**
```bash
# Créer le fichier .env
cp .env.example .env

# Modifier DATABASE_URL dans .env
DATABASE_URL="postgresql://username:password@localhost:5432/nestjs_intro"
```

4. **Initialiser Prisma**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# (Optionnel) Voir la base de données
npx prisma studio
```

5. **Démarrer l'application**
```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

L'API sera disponible sur : `http://localhost:3000`

## ⚙️ Configuration

### Variables d'environnement (.env)

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/nestjs_intro"

# Port de l'application (optionnel)
PORT=3000
```

### Structure de la base de données

```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  email    String @unique
  password String
  name     String
  tasks    Task[]
}

model Task {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean @default(false)
  User        User?   @relation(fields: [userId], references: [id])
  userId      Int?
}
```

## 📡 API Endpoints

### 👤 Utilisateurs

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `POST` | `/api/user/register` | Inscription d'un utilisateur | `CreateUserDto` |
| `POST` | `/api/user/login` | Connexion | `{ email, password }` |
| `GET` | `/api/user/:id` | Profil public d'un utilisateur | - |

### 📝 Tâches

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `GET` | `/api/tasks` | Récupérer toutes les tâches | - |
| `POST` | `/api/tasks/create` | Créer une nouvelle tâche | `CreateTaskDto` |
| `GET` | `/api/tasks/mirror` | Endpoint de test | - |

## 💡 Exemples d'utilisation

### 📝 Inscription d'un utilisateur

```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "motdepasse123",
    "name": "John Doe"
  }'
```

**Réponse :**
```json
{
  "statusCode": 201,
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### 🔐 Connexion

```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "motdepasse123"
  }'
```

**Réponse :**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "message": "Connexion réussie"
}
```

### 📋 Créer une tâche

```bash
curl -X POST http://localhost:3000/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Ma première tâche",
    "description": "Description de la tâche",
    "completed": false
  }'
```

### 📋 Récupérer toutes les tâches

```bash
curl -X GET http://localhost:3000/api/tasks
```

## 🏗 Architecture

### Structure des modules

```
src/
├── app.module.ts           # Module principal
├── main.ts                 # Point d'entrée
├── prisma.service.ts       # Service Prisma
├── models/
│   ├── tasks.dto.ts        # DTOs pour les tâches
│   └── users.dto.ts        # DTOs pour les utilisateurs
├── tasks/
│   ├── tasks.module.ts     # Module des tâches
│   ├── tasks.controller.ts # Contrôleur des tâches
│   └── tasks.service.ts    # Service des tâches
└── user/
    ├── user.module.ts      # Module des utilisateurs
    ├── user.controller.ts  # Contrôleur des utilisateurs
    └── user.service.ts     # Service des utilisateurs
```

### Principes architecturaux

- **Modules découplés** : Chaque domaine (user, tasks) a son propre module
- **Separation of concerns** : Controllers, Services, DTOs séparés
- **Dependency Injection** : Services injectés via le système DI de NestJS
- **Type Safety** : DTOs typés pour toutes les entrées/sorties

## 🛡️ Sécurité

### Gestion des mots de passe

- **Hashage bcrypt** : Mots de passe hashés avec 12 rounds de salt
- **Jamais en clair** : Mots de passe jamais exposés dans les réponses API
- **Vérification sécurisée** : Comparaison bcrypt lors de la connexion

### DTOs de sécurité

- **UserResponseDto** : Profil utilisateur sans mot de passe (inscription)
- **UserPublicDto** : Profil public limité (consultation)
- **CreateUserDto** : Données d'entrée pour l'inscription

### Bonnes pratiques

- Messages d'erreur génériques (pas d'info sur l'existence des emails)
- Validation des entrées via les DTOs TypeScript
- Séparation des méthodes publiques/internes dans les services

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📚 Scripts disponibles

```bash
npm run start          # Démarrage en mode production
npm run start:dev      # Démarrage en mode développement
npm run start:debug    # Démarrage en mode debug
npm run build          # Build de production
npm run lint           # Linting du code
npm run test           # Tests unitaires
npm run test:e2e       # Tests end-to-end
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ en utilisant NestJS**