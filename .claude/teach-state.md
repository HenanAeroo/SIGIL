# Teach session state

## Meta
- date_started: 2026-06-13
- date_updated: 2026-08-20
- level: Beginner
- version: v0.7.0

## Project
- name: SIGIL
- description: Bot Discord RP multi-serveur — dés, fiches, inventaire, timers, PNJ IA, votes, dashboard MJ React
- configurability: personnalité bot + thème aventure par serveur, via commande MJ Discord (/sigil config) ET via panel web dashboard
- formation_goal: projet fullstack pur — back, API, front, devops, infra — formation de A à Z, chaque couche est un objectif pédagogique à part entière

## KANBAN
| Status | Task | Sub-steps |
|--------|------|-----------|
| ✅ Done | 1. Fondations — Monorepo, TypeScript, pnpm, Turborepo | 7 sub-steps |
| ✅ Done | 2a. Base de données — Prisma schema, migrations, relations | 7 sub-steps |
| ✅ Done | 2b. Base de données avancée — Seeds, transactions, optimisation, index | 3 sub-steps |
| ✅ Done | 3a. Architecture NestJS — Modules, services, DI, décorateurs | 4 sub-steps |
| ✅ Done | 3b. NestJS avancé — DTOs, validation, pipes, interceptors | 4 sub-steps + closeout QA ✅ (tag v0.6.1) |
| ✅ Done | 3c. REST API design + documentation Swagger/OpenAPI | 3c.1 + 3c.2 ✅ (tag v0.7.0) |
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
- current_task: 3c. REST API design + documentation Swagger/OpenAPI
- current_task: 3d. Authentification JWT — sessions, refresh tokens, guards (prochaine)
- current_substep: (à démarrer) — 3c CLÔTURÉE : checklist §3.5 faite (revue + sécu + tag v0.7.0)
- attempt_count: 0
- pending_push: commit d'état + tag v0.7.0 à pousser par l'utilisateur via ! (git push origin main v0.7.0)
- next_action: démarrer 3d (auth JWT) — règlera aussi QA #3 (guards + IDOR). Rappels sécu S1 : rate limiting (throttler). Dette : #4 jest ESM, #6 .d.ts bundlés
- qa_trigger_counter: 0
- audit_3c1: routes existantes (POST/GET/GET :id) idiomatiques ✅ ; Swagger 3c.2 quasi bouclée (setup /api/docs + @ApiOperation/@ApiResponse/@ApiProperty) ; trou identifié = findOne ne renvoie jamais 404 (service en stub)
- decision: approche B (PrismaService @Injectable + PrismaModule exporté, DI) plutôt qu'import direct du singleton
- microsteps_3c1: [x] 1.dep workspace @sigil/database + install (mécanique, fait 2026-08-20) | [x] 2.PrismaService (expose singleton via `client: typeof prisma = prisma`, tsc OK) | [x] 3.PrismaModule provide+export (classe PrismaModule, tsc OK) | [x] 4.inject dans GuildService (imports:[PrismaModule] + constructeur DI) — DI PROUVÉE au runtime (boot OK, GuildModule initialized, routes mappées) | [x] 5.findOne async findUnique({where:{id}})→ !guild → NotFoundException, sinon return (tsc + runtime OK) | bonus [x] 6.findAll (findMany) + create (guild.create, data:{dto.discordId,dto.serverName}, return guild) réels — tsc OK [x] 7.@ApiResponse 404 Swagger sur findOne — tsc OK ✅ SOUS-ÉTAPE 3c.1 COMPLÈTE
- detour_ESM: alignement ESM du backend réalisé (blocage ERR_PACKAGE_PATH_NOT_EXPORTED). @sigil/database → build esbuild `dist/index.mjs` (--bundle --format=esm --packages=external) + exports {types:src/index.ts, import:dist/index.mjs}. apps/api → "type":"module" + tous les imports relatifs en `.js` + tsconfig.build.json (déjà présent). Boot vérifié avec DATABASE_URL factice sur port 3999. ⚠️ TODO devops: jest/ts-jest à reconfigurer pour ESM ; pipeline turbo dev doit builder @sigil/database avant l'API.
- qa_action_items: [x] (3b tous soldés) ; 3c.1 → [x] #1 409 ConflictException (garde `instanceof Error && 'code' in error && code==='P2002'`, + rethrow, + @ApiResponse 409) [x] #2 turbo: dev dependsOn ^build + script dev API (nest start --watch) — ordre prouvé (db#build avant api#dev) [ ] #3 guards+IDOR (3d) [ ] #4 jest ESM [x] #5 findOne cleanup (early-return + renommage guild) [ ] #6 devops: .d.ts bundlés pour @sigil/database (IDE/eslint résolvent les types Prisma → restaurer no-unsafe en error)

## QA History
| Date | Task | Code | Security | Best Practices |
|------|------|------|----------|----------------|
| 2026-06-22 | 1. Fondations | ⚠️ (6 fixes) | ✅ | ⚠️ (2 fixes) |
| 2026-06-23 | 2a. Base de données | ⚠️ (2 fixes) | ✅ | ⚠️ (1 fix) |
| 2026-06-23 | 2b. Seeds/Transactions/Index | ⚠️ (4 fixes) | ✅ | ⚠️ (2 fixes) |
| 2026-06-23 | 3a. Architecture NestJS | ⚠️ (5 fixes) | ✅ | ⚠️ (3 fixes) |
| 2026-08-19 | 3b. NestJS avancé (closeout) | ✅ (5 fixes) | ✅ | ✅ |
| 2026-08-20 | 3c.1 (Prisma DI + ESM + CRUD + 404) | ⚠️ (#1 409, #5 cleanup) | ⚠️ (#3 auth/IDOR à venir 3d) | ⚠️ (#2 turbo, #4 jest ESM) |

## Recap
### Concepts learned
- ESM vs CommonJS : deux systèmes de modules JS — `import`/`import.meta.url` = ESM, `require`/`module.exports` = CJS ; un module CJS ne peut pas `require()` un package ESM-only
- Client Prisma v7 (générateur `prisma-client`) = ESM-only (`import.meta.url`) → impose d'aligner tout le backend sur ESM
- ESM natif Node : les imports RELATIFS doivent porter l'extension `.js` (même dans du TS — on pointe le fichier compilé, pas la source)
- Bundler un package à imports sans extension : esbuild `--bundle --format=esm --packages=external` → un `.mjs` autonome chargeable par Node
- `"exports"` d'un package : conditions `types` (pour le typecheck, ici `src/index.ts`) vs `import` (pour le runtime, ici `dist/index.mjs`) — peuvent pointer des fichiers différents
- `tsconfig.build.json` (NestJS) : config de build qui exclut `test`/`**/*spec.ts` de la compilation de production
- Turborepo `dependsOn: ["^build"]` : le `^` = la tâche `build` des DÉPENDANCES (ordre topologique) ; `build` sans `^` = sa propre tâche. Faire dépendre `dev` de `^build` pour que les deps (bundle `@sigil/database`) soient prêtes avant de lancer l'API
- Turborepo `persistent: true` (serveur qui ne s'arrête pas) + `cache: false` pour la tâche `dev`
- Orchestrateur vs feuille : `turbo dev` à la racine = chef d'orchestre qui lance le script `dev` de chaque package ; mettre `turbo dev` DANS le script `dev` d'un package = récursion infinie
- Le format de module du fichier de TYPES compte : sans `"type":"module"` sur le package, `tsc` (nodenext) lit `src/index.ts` en CJS → l'import par défaut est relié à l'espace de noms (`typeof import(...)`) et non à l'instance → un membre comme `.guild` manque au type-check alors qu'il existe au runtime
- Pattern 404 appliqué : service `async`, `findUnique({ where: { <clé unique> } })`, `if (!row) throw new NotFoundException(...)`, sinon `return row` — le controller reste inchangé (NestJS attend la promesse)
- CRUD Prisma dans un service : `findMany()` (liste), `create({ data: { … } })` (insert, retourne la ligne créée avec les champs auto-générés id/createdAt) ; ne passer que les champs non auto-générés dans `data`
- 409 `ConflictException` : bon statut pour « existe déjà » (violation `@unique` / Prisma `P2002`) — try/catch autour du `create`, rethrow des erreurs non gérées (ne jamais avaler)
- Narrowing d'erreur SANS dépendre du type Prisma : `error instanceof Error && 'code' in error && error.code === 'P2002'` — `Error` est global (toujours résolu), `in` ajoute la prop, `.code` est `unknown` (sûr) ; plus portable que `Prisma.PrismaClientKnownRequestError`
- Désaccord `tsc` (build) vs serveur TS de l'IDE / typescript-eslint : le build `tsc -p` tire la source brute du package workspace dans son programme et résout ; le language server assigne cette source à SON projet (résolution différente) → types Prisma dégradés en any/error → faux positifs `no-unsafe` et « error is unknown ». Fix propre : livrer des `.d.ts` (idéalement bundlés) pour le package
- Triade d'un module NestJS : `providers` (ce que je fabrique) / `exports` (ce que je prête aux autres) / `imports` (ce que j'emprunte) — un provider non exporté reste privé à son module
- `PrismaService` : wrapper `@Injectable()` qui EXPOSE le singleton configuré — jamais `new PrismaClient()` (2e pool de connexions)
- Champ de classe avec initialiseur : `readonly x = valeur` dans le corps, sans constructeur (le constructeur ne sert que pour une valeur venant de l'extérieur / injection)
- `typeof` a deux vies : position VALEUR (à droite du `=`) = opérateur runtime → string ; position TYPE (après `:`) = extrait le type d'une valeur
- `TS2742` : un membre `public` dont le type inféré n'est pas nommable/portable (générique Prisma profond `GlobalOmitConfig`) → annotation de type explicite requise ; `typeof laValeur` fournit un type nommable
- Génériques TS + `NestInterceptor<T, R>` : typer l'enveloppe de réponse (`ResponseEnvelope<T>`) au lieu de `any`
- Paramètre d'un `map` rxjs = type d'ENTRÉE (brut `T`) ; le corps produit la SORTIE — ne pas confondre les deux
- `CallHandler.handle()` renvoie `Observable<any>` → `any` épinglé à `T` en annotant `(data: T)` dans le map
- ESLint `no-unsafe-assignment` plus strict que `tsc` : il traque les `any` que `tsc` laisse passer
- Controller mince : `findOne` doit DÉLÉGUER au service, la logique métier ne vit pas dans le controller
- `@Matches(/regex/)` (class-validator) : valider un FORMAT ; `\d` = un chiffre, `{17,19}` = quantifieur, `^…$` = ancres
- Regex littérale `/\d/` vs string `'\d'` : dans une string JS le `\` est avalé, utiliser `/ /`
- `@IsNotEmpty` devient redondant si la regex exige déjà ≥1 caractère
- `ValidationPipe { transform: true }` : instancie le DTO (vraie instance) + coercition de type (query/params)
- Promesse flottante (`no-floating-promises`) : `void fn()` (intention assumée) vs `fn().catch(...)` (gérer l'échec)
- `no-unused-expressions` : `err;` seul est un no-op → il faut un vrai appel (`console.error(err)`)
- Import mort (`no-unused-vars`) : un symbole importé mais non utilisé est refusé par le lint
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
- `ERR_PACKAGE_PATH_NOT_EXPORTED` : API compilée en CJS tentant de charger le package ESM-only `@sigil/database` → aligner l'API sur ESM (`"type":"module"`)
- Imports relatifs sans extension sous nodenext ESM (erreur TS2835 + échec de résolution Node au runtime) → ajout de `.js` partout
- Client Prisma généré (imports relatifs sans extension) non chargeable par Node natif → bundlé en `dist/index.mjs` via esbuild
- Désaccord type↔runtime `Property 'guild' does not exist` : `.guild` OK au runtime (dist `.mjs` ESM) mais absent au typecheck (`src/index.ts` vu en CJS) → `"type":"module"` sur `@sigil/database` + `.js` sur son import relatif de `client`
- Confusion paramètre de constructeur (= demande d'injection) vs champ de classe (= valeur déjà en main) → champ de classe pour ranger le singleton
- `typeof prisma` mis en position de VALEUR → rendait la string "object" ; déplacé en position de TYPE pour annoter
- `TS2742 GlobalOmitConfig ... not portable` sur un membre public → résolu par annotation `client: typeof prisma`
- ESLint `no-unsafe-assignment` sur l'interceptor typé → annoter `(data: T)` dans le `map`
- Inversion de type : param du `map` typé `ResponseEnvelope<T>` au lieu de `T` → double emballage `{ data: ResponseEnvelope<T> }`
- Regex à la main : confusion `\d` « numéroté » vs quantifieur `{17,19}`, et string vs regex littérale
- `no-unused-expressions` : `err;` inerte dans le `.catch` → remplacé par `console.error(err)`
- Prisma v7 — `url` supprimé de `schema.prisma` → déplacé dans `prisma.config.ts` avec `env()`
- Prisma v7 — `new PrismaClient()` exige un adapter (`PrismaPg`) → `@prisma/adapter-pg` requis
- Prisma v7 — seed configuré dans `prisma.config.ts` (`migrations.seed`), plus dans `package.json`
- Docker + Windows — `localhost:5432` inaccessible depuis Prisma CLI → basculé sur Neon.tech
- PowerShell — `$env:VAR` persiste dans la session et override le `.env` → ouvrir un nouveau terminal
- `error TS2584: Cannot find name 'console'` → `@types/node` manquant + `"types": ["node"]` dans tsconfig
- `error TS6046: Argument for '--target' option` → `ES2025` non supporté comme valeur de `target`, remplacé par `ESNext`
- `.gitignore` ne désindexe pas les fichiers déjà commités → `git rm -r --cached .turbo/`

### Good practices applied
- Corriger le lint proprement (annotation, vrai appel) plutôt que `// eslint-disable`
- Vérifier `tsc` + ESLint avant de valider chaque fix, pas seulement « ça a l'air bon »
- Gérer l'échec du point d'entrée (`bootstrap().catch` + `console.error` + `exit(1)`) au lieu d'une promesse muette
- `noEmit: false` explicite dans chaque app pour surcharger la base
- `include: ["src/**/*"]` déclaré explicitement dans chaque tsconfig
- `outputs: []` dans Turborepo pour les tâches sans fichiers de sortie
- `.turbo/` dans `.gitignore` dès le début
