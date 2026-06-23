# Teach session state

## Meta
- date_started: 2026-06-13
- date_updated: 2026-06-23
- level: Beginner
- version: v0.4.0

## Project
- name: SIGIL
- description: Bot Discord RP multi-serveur — dés, fiches, inventaire, timers, PNJ IA, votes, dashboard MJ React
- configurability: personnalité bot + thème aventure par serveur, via commande MJ Discord (/sigil config) ET via panel web dashboard

## KANBAN
| Status | Task | Sub-steps |
|--------|------|-----------|
| ✅ Done | 1. Fondations — Monorepo, TypeScript, pnpm, Turborepo | 7 sub-steps |
| ✅ Done | 2a. Base de données — Prisma schema, migrations, relations | 7 sub-steps |
| ✅ Done | 2b. Base de données avancée — Seeds, transactions, optimisation, index | 3 sub-steps |
| ✅ Done | 3a. Architecture NestJS — Modules, services, DI, décorateurs | 4 sub-steps |
| ⬜ Todo | 3b. NestJS avancé — DTOs, validation, pipes, interceptors | — |
| ⬜ Todo | 3c. REST API design + documentation Swagger/OpenAPI | — |
| ⬜ Todo | 3d. Authentification JWT — sessions, refresh tokens, guards | — |
| ⬜ Todo | 3e. WebSockets — Gateway NestJS, temps réel back ↔ front | — |
| ⬜ Todo | 4. discord.js v14 — Client, événements, slash commands, multi-serveur | — |
| ⬜ Todo | 5. Module Dés — Algorithme, seuils, embeds, contexte | — |
| ⬜ Todo | 6. Module Permissions — Guards, rôles Discord, sync automatique | — |
| ⬜ Todo | 7. Module Fiches — CRUD, stats, XP, niveaux, courbe exponentielle | — |
| ⬜ Todo | 8. Module Inventaire — Poids, usure, échanges bilatéraux | — |
| ⬜ Todo | 9. Module Timers — Cron jobs, état, notifications, boutons | — |
| ⬜ Todo | 10. Module Historique — Event log, vues, export, résumé auto | — |
| ⬜ Todo | 11. Module Relations & PNJ IA — Anthropic API, contexte persistant | — |
| ⬜ Todo | 12. Module Vote — Temps réel, seuils adaptatifs, composants Discord | — |
| ⬜ Todo | 13. Configuration MJ — Personnalité + thème par serveur (Discord + Web) | — |
| ⬜ Todo | 14a. Dashboard React — Fondations (Vite, Tailwind, Shadcn/ui) | — |
| ⬜ Todo | 14b. Frontend — Routing (TanStack Router, pages, layouts, guards) | — |
| ⬜ Todo | 14c. Frontend — State management (Zustand) | — |
| ⬜ Todo | 14d. Frontend — Formulaires & validation (React Hook Form + Zod) | — |
| ⬜ Todo | 14e. Frontend — Intégration API (TanStack Query) | — |
| ⬜ Todo | 14f. Frontend — WebSockets côté client | — |
| ⬜ Todo | S1. Sécurité applicative — OWASP, rate limiting, CORS, sanitization | — |
| ⬜ Todo | 15a. Tests unitaires — Vitest, Jest, mocks | — |
| ⬜ Todo | 15b. Tests d'intégration — services NestJS + vraie DB | — |
| ⬜ Todo | 15c. Tests e2e — Supertest, scénarios complets API | — |
| ⬜ Todo | D1. DevOps — Variables d'environnement & gestion des secrets | — |
| ⬜ Todo | D2. DevOps — Docker & docker-compose | — |
| ⬜ Todo | D3. DevOps — CI/CD (GitHub Actions) | — |
| ⬜ Todo | D4. DevOps — Monitoring, logs structurés, health checks | — |
| ⬜ Todo | D5. DevOps — Error tracking (Sentry) | — |
| ⬜ Todo | 16a. Déploiement Railway — PostgreSQL, env vars, CI/CD | — |
| ⬜ Todo | 16b. Déploiement — Environnements dev / staging / prod | — |
| ⬜ Todo | 16c. Déploiement — Migrations en production + zero-downtime | — |

## Progress
- current_task: 3b. NestJS avancé — DTOs, validation, pipes, interceptors
- current_substep: 4 — Interceptors
- substep_index_in_task: 4
- attempt_count: 0
- qa_trigger_counter: 3

## QA History
| Date | Task | Code | Security | Best Practices |
|------|------|------|----------|----------------|
| 2026-06-22 | 1. Fondations | ⚠️ (6 fixes) | ✅ | ⚠️ (2 fixes) |
| 2026-06-23 | 2a. Base de données | ⚠️ (2 fixes) | ✅ | ⚠️ (1 fix) |
| 2026-06-23 | 2b. Seeds/Transactions/Index | ⚠️ (4 fixes) | ✅ | ⚠️ (2 fixes) |
| 2026-06-23 | 3a. Architecture NestJS | ⚠️ (5 fixes) | ✅ | ⚠️ (3 fixes) |

## Recap
### Concepts learned
- Transaction Prisma (`$transaction`) : atomicité — tout réussit ou tout est annulé, `tx` remplace `prisma` à l'intérieur
- `await` sur une promesse async : sans `await`, la transaction est lancée mais pas attendue — exécution désordonnée
- Index Prisma (`@@index`) : uniquement sur colonnes scalaires, pas sur champs `@relation` (virtuels)
- `@@unique` composite crée implicitement un index — les index manuels sur les mêmes colonnes sont redondants
- Seed idempotent avec `upsert` : `where` (clé unique), `create` (si absent), `update: {}` (ignorer si présent)
- Nom de contrainte composite Prisma : `@@unique([a, b])` → clé `a_b` dans le `where` de l'upsert
- `process.exit(1)` : code de sortie non-zéro pour signaler un échec au shell et à la CI
- Guard `NODE_ENV` : bloquer l'exécution d'un script dangereux en production au niveau du module
- Module NestJS (`@Module`) : conteneur déclaratif — `imports`, `controllers`, `providers`, `exports`
- `@Injectable()` : déclare un service injectable dans le conteneur NestJS
- `@Controller('prefix')` : groupe de routes HTTP, le préfixe définit le chemin de base
- Injection de dépendances NestJS : déclarer le type dans le constructeur suffit, NestJS instancie et injecte
- `app.listen()` doit être le dernier appel dans `bootstrap()` — la config (prefix, pipes, CORS) s'applique avant
- `ValidationPipe` global : active la validation automatique des DTOs sur toutes les routes
- `setGlobalPrefix('api')` : préfixe toutes les routes sans modifier chaque controller
- `enableCors()` : restreindre les origines autorisées, utiliser une variable d'environnement
- `ConfigModule.forRoot({ isGlobal: true })` : rend les variables d'env accessibles partout via DI
- DTO (Data Transfer Object) : classe TypeScript qui décrit les données attendues en entrée d'une route
- `@IsString()` / `@IsNotEmpty()` : décorateurs class-validator, actifs grâce au ValidationPipe global
- `!` (definite assignment) sur les propriétés DTO : évite l'erreur TypeScript "not initialized"
- ParseUUIDPipe : valide qu'un paramètre de route est un UUID, retourne 400 sinon
- `@Param('id')` sans les deux-points : le `:` appartient à la déclaration de route, pas au nom du param
- Route finale = préfixe global + controller + décorateur (ex: /api + /guilds + @Post() = POST /api/guilds)
- Prisma schema DSL : `model`, `datasource`, `generator` — trois blocs distincts, un seul fichier de vérité
- Prisma v7 driver adapter : `PrismaClient` exige un adapter (`PrismaPg`) pour se connecter à PostgreSQL
- Relations Prisma : `@relation(fields, references)` déclaré des deux côtés, clé étrangère explicite
- `@@map` : nom SQL de la table indépendant du nom Prisma (convention pluriel minuscule)
- `@@unique([a, b])` : contrainte d'unicité composite sur plusieurs colonnes
- `onDelete: Cascade` : suppression automatique des enfants quand le parent est supprimé
- Migration Prisma : `prisma migrate dev` génère + applique le SQL, crée un fichier versionné
- Singleton pattern : une seule instance `PrismaClient` partagée pour éviter les connexions multiples
- `prisma.config.ts` (v7) : remplace `url = env()` dans schema.prisma pour la configuration de connexion
- Monorepo pnpm workspaces : plusieurs packages/apps dans un seul dépôt, dépendances partagées via `workspace:*`
- Turborepo : orchestration de tâches parallèles, cache basé sur le contenu, pipeline `dependsOn`
- TypeScript `lib` vs `types` vs `target` : trois curseurs indépendants pour l'environnement JS
- `@types/node` : les globals Node.js (console, process, Buffer) ne sont pas dans TypeScript par défaut
- `moduleResolution: bundler` : résolution conçue pour les bundlers, pas pour Node.js natif
- `noEmit: true` : mode vérification uniquement, ne produit aucun fichier JS
- `git rm --cached` : désindexer des fichiers déjà commités sans les supprimer du disque

### Blocking points overcome
- Prisma v7 — `url` supprimé de `schema.prisma` → déplacé dans `prisma.config.ts` avec `env()`
- Prisma v7 — `new PrismaClient()` exige un adapter (`PrismaPg`) → `@prisma/adapter-pg` requis
- Prisma v7 — seed configuré dans `prisma.config.ts` (`migrations.seed`), plus dans `package.json`
- Docker + Windows — `localhost:5432` inaccessible depuis Prisma CLI → basculé sur Neon.tech
- PowerShell — `$env:VAR` persiste dans la session et override le `.env` → ouvrir un nouveau terminal
- `error TS2584: Cannot find name 'console'` → `@types/node` manquant + `"types": ["node"]` dans tsconfig
- `error TS6046: Argument for '--target' option` → `ES2025` non supporté comme valeur de `target`, remplacé par `ESNext`
- `.gitignore` ne désindexe pas les fichiers déjà commités → `git rm -r --cached .turbo/`

### Good practices applied
- `noEmit: false` explicite dans chaque app pour surcharger la base
- `include: ["src/**/*"]` déclaré explicitement dans chaque tsconfig
- `outputs: []` dans Turborepo pour les tâches sans fichiers de sortie
- `.turbo/` dans `.gitignore` dès le début
