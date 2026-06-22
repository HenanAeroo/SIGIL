# Teach session state

## Meta
- date_started: 2026-06-13
- date_updated: 2026-06-22
- level: Beginner
- version: v0.1.0

## Project
- name: SIGIL
- description: Bot Discord RP multi-serveur — dés, fiches, inventaire, timers, PNJ IA, votes, dashboard MJ React
- configurability: personnalité bot + thème aventure par serveur, via commande MJ Discord (/sigil config) ET via panel web dashboard

## KANBAN
| Status | Task | Sub-steps |
|--------|------|-----------|
| ✅ Done | 1. Fondations — Monorepo, TypeScript, pnpm, Turborepo | 7 sub-steps |
| ⬜ Todo | 2a. Base de données — Prisma schema, migrations, relations | — |
| ⬜ Todo | 2b. Base de données avancée — Seeds, transactions, optimisation, index | — |
| ⬜ Todo | 3a. Architecture NestJS — Modules, services, DI, décorateurs | — |
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
- current_task: 2a. Base de données — Prisma schema, migrations, relations
- current_substep: —
- substep_index_in_task: 0
- attempt_count: 0
- qa_trigger_counter: 0

## QA History
| Date | Task | Code | Security | Best Practices |
|------|------|------|----------|----------------|
| 2026-06-22 | 1. Fondations | ⚠️ (6 fixes) | ✅ | ⚠️ (2 fixes) |

## Recap
### Concepts learned
- Monorepo pnpm workspaces : plusieurs packages/apps dans un seul dépôt, dépendances partagées via `workspace:*`
- Turborepo : orchestration de tâches parallèles, cache basé sur le contenu, pipeline `dependsOn`
- TypeScript `lib` vs `types` vs `target` : trois curseurs indépendants pour l'environnement JS
- `@types/node` : les globals Node.js (console, process, Buffer) ne sont pas dans TypeScript par défaut
- `moduleResolution: bundler` : résolution conçue pour les bundlers, pas pour Node.js natif
- `noEmit: true` : mode vérification uniquement, ne produit aucun fichier JS
- `git rm --cached` : désindexer des fichiers déjà commités sans les supprimer du disque

### Blocking points overcome
- `error TS2584: Cannot find name 'console'` → `@types/node` manquant + `"types": ["node"]` dans tsconfig
- `error TS6046: Argument for '--target' option` → `ES2025` non supporté comme valeur de `target`, remplacé par `ESNext`
- `.gitignore` ne désindexe pas les fichiers déjà commités → `git rm -r --cached .turbo/`

### Good practices applied
- `noEmit: false` explicite dans chaque app pour surcharger la base
- `include: ["src/**/*"]` déclaré explicitement dans chaque tsconfig
- `outputs: []` dans Turborepo pour les tâches sans fichiers de sortie
- `.turbo/` dans `.gitignore` dès le début
