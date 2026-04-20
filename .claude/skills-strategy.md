# Stratégie d'activation des skills — Paradeyes Website

## Principe

Ne jamais activer tous les skills en même temps. Chaque étape du projet active un sous-ensemble ciblé pour optimiser la qualité sans surcharger le contexte.

## Étape 2 — Setup technique (ACTUEL)

Skills actifs :
- Context7 (MCP) : documentation à jour Next.js + Tailwind v4
- systematic-debugging (Obra) : résolution de problèmes d'installation
- verification-before-completion (Obra) : vérifier que le build passe

## Étape 3 — Design system + composants

Skills actifs :
- frontend-design (Anthropic) : direction esthétique bold, anti AI-slop
- ui-ux-pro-max (NextLevelBuilder) : palettes, fontes, guidelines complètes
- refactoring-ui (Wondelai) : hiérarchie visuelle, spacing, contraste
- web-typography (Wondelai) : pairing fontes, scale typographique
- web-design-guidelines (Vercel Labs) : 100+ règles accessibilité
- Context7 (MCP) : documentation composants
- shadcn-ui (MCP) : génération composants de base

## Étape 4 — Home complète

Skills actifs :
- frontend-design (Anthropic)
- ui-ux-pro-max (NextLevelBuilder)
- refactoring-ui (Wondelai)
- top-design (Wondelai) : benchmark agences premium
- web-typography (Wondelai)
- ios-hig-design (Wondelai) : safe areas, Dynamic Island
- canvas-design (Anthropic) : animations 3D si nécessaire
- writing-plans (Obra) : planification des blocs
- Context7 (MCP)

## Étape 5 — Pages intérieures

Skills actifs :
- frontend-design (Anthropic)
- ui-ux-pro-max (NextLevelBuilder)
- refactoring-ui (Wondelai)
- web-design-guidelines (Vercel Labs)
- wcag-accessibility-audit (Mastepanoski) : audit accessibilité
- Context7 (MCP)

## Étape 6 — Études de cas

Skills actifs :
- frontend-design (Anthropic)
- refactoring-ui (Wondelai)
- web-typography (Wondelai)
- Context7 (MCP)

## Étape 7 — Blog Sanity

Skills actifs :
- frontend-design (Anthropic)
- web-typography (Wondelai)
- Context7 (MCP)

## Étape 8 — Bilinguisme

Skills actifs :
- Context7 (MCP) : documentation next-intl
- verification-before-completion (Obra)

## Étape 9 — IRIS

Skills actifs :
- frontend-design (Anthropic)
- ui-ux-pro-max (NextLevelBuilder)
- using-superpowers (Obra)
- systematic-debugging (Obra)
- Context7 (MCP)

## Étape 10 — SEO, perf, dark mode, déploiement

Skills actifs :
- wcag-accessibility-audit (Mastepanoski) : audit final WCAG 2.1 AA
- webapp-testing (Anthropic) : Playwright validation visuelle
- web-design-guidelines (Vercel Labs) : vérification finale
- verification-before-completion (Obra)
- test-driven-development (Obra)

## Skills toujours disponibles (activer à la demande)

- claude-mem (MCP) : mémoire persistante entre sessions
- systematic-debugging (Obra) : quand un bug résiste
- using-superpowers (Obra) : quand une tâche complexe le justifie

## Comment activer les skills dans un prompt

Ajouter en début de prompt Claude Code :
"Active les skills suivants pour cette session : [liste]. Consulte ~/.claude/skills/ pour chaque skill listé et applique ses directives."

Pour les MCP servers, utiliser :
"use context7 for [librairie]" pour la documentation à jour.
