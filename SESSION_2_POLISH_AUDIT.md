# Audit polish Hero + Footer Paradeyes

> Audit conduit après les batches 2.1 / 2.2 / 2.3 et le commit `f1ead73`.
> Skills mobilisés : frontend-design, refactoring-ui, top-design,
> ux-heuristics, web-typography, web-design-guidelines, brand-guidelines.
> Repère MCP : v0.session2-pre-polish (tag) + branche backup
> backup-pre-polish-2026-04-25.

---

## Note préalable — Phase 2 (réparation arrondi header)

Investigation de `reference/paradeyes-home-v5.1.html` : le header de la
ref n'a **aucune** `border-radius` ni `clip-path`. Seul le footer porte
un arrondi (`border-top-left/right-radius: 60px / 32px`).

L'instruction « réparer la forme arrondie du header non reproduite »
ne correspond à aucune règle CSS de la ref v5.1 livrée. Hypothèse de
réparation la plus design-cohérente, validée par les patterns de
sites Awwwards récents (Tundra Studio, Cosmos Company) : un cadrage
« cinéma » où le header miroite l'arrondi du footer. J'ai appliqué
ça sur le `::before` qui porte le glass (donc sans clipper les
enfants logo/nav/CTA) :

- desktop : `border-bottom-left-radius: 60px; border-bottom-right-radius: 60px;`
- mobile  : `32px / 32px`

Si l'intention initiale était autre (ex : version v5.2 pas livrée),
préciser et je rectifie.

---

## 1. Audit Hero (8 dimensions)

| # | Dimension | Note /5 | Constat | Leviers concrets |
|---|---|---|---|---|
| 1 | Hiérarchie visuelle | 3 | Le badge, H1, sous-titre, IRIS card et trust row se succèdent sans véritable point d'ancrage. La carte IRIS crème occupe 1080px : visuellement elle vole la vedette au H1 (effet "calculatrice de prix" dominant). | Réduire la card à 920px et augmenter sa transparence. Repondérer le H1 avec un poids ou un détail typo qui le ramène en pole. |
| 2 | Profondeur, matérialité | 2.5 | 3 halos verts centrés derrière le titre + grain à 6 % d'opacity = mieux que plat mais l'effet est statique : pas de parallaxe, pas de réaction au pointeur, pas de "vie". La card crème casse l'atmosphère dark : transition trop sèche. | Microparallaxe mouse-based sur les halos (translate ±8 px). Ajouter un glow vert sous la card IRIS (radial 200×400 px @ 30 % opacity). Léger noise animé sur la card crème pour casser le plat blanc. |
| 3 | Microinteractions | 2 | Hover scale sur le bouton submit IRIS + scale sur les chips (transition opacity). Aucun feedback de pointeur, aucun magnétisme, aucun lift sur la card. | Magnétisme léger sur le submit (±3 px vers le pointeur dans un rayon de 60 px). Lift card IRIS au hover (translateY -2 px + ombre +30 %). Cursor-aware glow sur le H1 italique. |
| 4 | Détail typographique | 3.5 | H1 split-lines + Gambarino italic vert sur "performe." → bonne signature. MAIS le mot italique manque de poids visuel (weight 400 face à un H1 medium 500), il flotte. Subtitle 0.9375 rem = lecture confortable. | Souligner discrètement "performe." avec un trait green-electric en `clip-path` qui dessine au scroll. OU augmenter le tracking de l'italique pour le poser comme un sceau. |
| 5 | Animation d'entrée | 3 | Cascade timing 0 / 150 / 400 / 650 / 850 / 1200 ms + fadeUp + blur(8 px → 0). Lisible et propre. Manque un effet signature qui dit "Paradeyes". | Reveal progressif word-by-word de "performe." (lettres qui s'allument une à une via opacity). OU effet « écriture » sur le placeholder IRIS (typewriter sur 600 ms). |
| 6 | Originalité | 2 | Très solide pour une agence générique mais zéro élément spécifique Paradeyes. Personne ne dirait au premier coup d'œil "c'est Paradeyes". | Détail signature « œil qui suit le curseur » sur le logo (subtil 2 px max). Glow violet-spark `#6549F6` sur les halos en mode reduced-motion (variation chromatique seul moment où le violet apparaît). |
| 7 | Mobile | 3.5 | La card IRIS scroll horizontal pour les chips → pattern mobile correct. La trust row stack en colonne. Le scroll indicator centré bottom-7 reste visible. | Réduire la hauteur du H1 mobile (`clamp(2.25, 4.2vw, 3.5)` rend déjà 2.25 rem en mobile = 36 px → OK). Vérifier que le scroll indicator ne colle pas le clavier au focus IRIS sur iOS. |
| 8 | Performance perçue | 4 | 3 halos motion + grain + card backdrop-filter = lourd mais GPU-friendly. Pas de jank observé en local. Le `pulse-green-dot` 2 s + le scroll-chevron-bounce 1.8 s tournent 24/7 → micro-coût. | `will-change: transform, opacity` sur les halos. `prefers-reduced-motion` déjà respecté. Lazy-skip les halos sous mobile cellulaire (network-information API si dispo). |

**Synthèse Hero** : le hero est **propre et conforme**, mais il est
"propre". Il manque trois ingrédients pour passer en niveau Awwwards :
(a) une **réactivité au pointeur** (parallaxe, magnétisme, glow), (b)
une **signature originale** clairement Paradeyes (œil-curseur, sceau
italique, accent violet rare), (c) un **micro-détail de surprise**
(typewriter, dessin de soulignement).

---

## 2. Audit Footer (8 dimensions)

| # | Dimension | Note /5 | Constat | Leviers concrets |
|---|---|---|---|---|
| 1 | Hiérarchie visuelle | 3.5 | 4 colonnes équilibrées (5/2/3/2 sur 12). Logo officiel pleine largeur en col 1 → poids correct. Marquee headline domine bien. Bottom band copyright + legal en alignement classique. | Distinguer plus la col 1 (background subtil ou border-left) pour qu'elle se lise comme "identité" et pas comme une 4e colonne. |
| 2 | Profondeur, matérialité | 4 | 2 halos contre-phase (vert + violet à 8 s d'écart) + grain + arrondi 60 px = excellente atmosphère. Vrai effet cinéma. | Ajouter un troisième halo subtil rgba electric green à 5 % très flou en bas-droite pour équilibrer. |
| 3 | Microinteractions | 2.5 | Underline glissant sur les liens internes (300 ms). Hover green-electric. Apparition de `pdy-ext` au hover des liens externes. CTA outlined hover green-glow. | Magnétisme sur le CTA outlined (déjà 6 px de pulse-dot CSS, ajouter +translate sur le rayon). Cascade reveal des colonnes au scroll into view (stagger 120 ms via IntersectionObserver). |
| 4 | Détail typographique | 4 | DM Mono 11px tracking 0.16em uppercase sur les titres de colonne = très éditorial. Marquee Satoshi clamp(56, 7vw, 96) gros et confiant. `·` en green-electric = détail signature. | Augmenter le contraste line-height des `.pdy-foot-links a` (actuel 1.4, passer à 1.6 pour aérer). |
| 5 | Animation d'entrée | 3 | Halos en boucle. Marquee 50 s constant. Aucune animation d'entrée du contenu colonnes : tout est visible dès le mount. | Cascade reveal opacity + translateY 16 px au scroll into view (4 colonnes en stagger 120 ms). Marquee : ralentir au survol (déjà fait : 100 s) ; ajouter un `mask-image` left/right pour fade les bords. |
| 6 | Originalité | 3 | "On comprend. On conçoit. On construit." en marquee Satoshi 96px = signature forte. Mais le reste est très standard. | Effet "noise on hover" sur les liens externes (LinkedIn / Instagram) : grain qui s'intensifie 0.04 → 0.08 dans la zone du lien. Ou : gradient-plus orange→bleu rare qui apparaît seulement au hover du CTA outlined (1 % de surprise). |
| 7 | Mobile | 4 | Collapse 12 cols → 2 cols (1023 px) → 1 col (767 px) propre. Marquee garde sa puissance car clamp(). | Réduire l'espacement padding-top à 64 px (déjà fait), vérifier que le bottom-bar copyright + legal ne wrap pas mal sur 320 px. |
| 8 | Performance perçue | 4 | Marquee 50 s + 2 halos 16 s = compositing GPU correct. Aucun saccade observable. | `will-change: transform` sur `.pdy-footer-marquee-track`. |

**Synthèse Footer** : le footer est **plus abouti que le hero** sur la
matérialité (halos contre-phase, grain, arrondi). Mais il manque
d'animation **au scroll** : tout apparaît d'un coup. Le polish footer
est plus rapide à exécuter (3 quickwins) que le polish hero.

---

## 3. Top 5 propositions de polish — Hero

### H-P1. Microparallaxe mouse-based sur les 3 halos

- **Description** : à chaque mouvement de souris dans la zone Hero, les
  3 halos translatent légèrement en parallaxe (couche ambient ±4 px,
  core ±8 px, highlight ±12 px sur axes X et Y). Effet : volume
  cinématographique vivant. Implémentation via Framer Motion `useMotionValue`
  + `useTransform` sur l'event `mousemove` du conteneur, throttle à 16 ms.
- **Justification DA** : pattern signature de Lusion.co et Active Theory.
  Donne immédiatement une sensation de profondeur 3D sans moteur 3D.
  Cohérent avec l'identité Paradeyes "cinéma rencontre tableau de bord"
  (effet caméra lift). Désactivé sur `prefers-reduced-motion: reduce`.
- **Effort** : Moyen (2 h).
- **Risque** : Faible. Throttle 16 ms = 60 FPS garanti. Désactivable.
- **Impact visuel** : le hero respire au moindre mouvement, plus jamais figé.

### H-P2. Magnétisme + glow sur le bouton submit IRIS

- **Description** : dans un rayon de 100 px autour du bouton submit
  rond green-deep (40×40 px), le bouton se déplace de ±4 px vers le
  pointeur (translateX/Y), accompagné d'un glow vert (`box-shadow`
  qui passe de 4 px à 16 px de spread + opacity 0.3 → 0.6). Effet de
  gravitation. Implémentation Framer Motion `useMotionValue` +
  `mouseenter`/`mousemove` sur le wrapper de la card.
- **Justification DA** : pattern Cosmos Company / Studio Freight. Crée
  un sentiment de vie qui dit "ce bouton t'attend". Renforce l'idée
  que IRIS est un agent réactif, pas un placeholder. Détail
  Awwwards-tier qui passe inaperçu mais s'imprime.
- **Effort** : Faible (1 h).
- **Risque** : Faible. Désactivable en reduced-motion.
- **Impact visuel** : le bouton "vit", invite au clic, sans surcharge.

### H-P3. Soulignement dessiné sur "performe."

- **Description** : sous le mot italique Gambarino "performe." (vert
  electric), un trait de 1.5 px en `clip-path: inset(0 100% 0 0)` qui
  s'anime à `inset(0 0 0 0)` sur 600 ms à 1 s après le mount du H1.
  Trait green-electric `#57EEA1` qui se dessine de gauche à droite.
  Intersection observer pour redéclencher si scroll-back.
- **Justification DA** : signature éditoriale magazine luxe. Le mot
  italique est déjà un sceau, le trait qui se dessine derrière en fait
  un geste manuel. Awwwards 2024-2025 : Mazarine Paris, Vokode utilisent
  ce pattern. Cohérent avec l'identité "construit ce qui performe" :
  le trait est la promesse qui se concrétise.
- **Effort** : Faible (45 min).
- **Risque** : Faible.
- **Impact visuel** : le détail qui dit "ce site a été pensé".

### H-P4. Reveal letter-by-letter du sous-titre (cinéma cadence)

- **Description** : le `<motion.p>` du sous-titre passe de
  `fadeSlideUp blur 8 → 0` global à un `splitText` letter-by-letter
  (mots ou caractères) avec stagger 25 ms (mots) ou 8 ms (lettres).
  Cadence cinéma. Apparition à t=400 ms après le mount du H1.
- **Justification DA** : pattern Tundra Studio / Vercel landing. Donne
  un sens de "lecture qui se révèle". Renforce le premium éditorial.
  Très Paradeyes ("On comprend"). Le scroll indicator s'active après
  la fin de l'animation.
- **Effort** : Moyen (1.5 h, choix entre word-stagger ou letter-stagger).
- **Risque** : Moyen — risque de "trop animé" si trop lent. À tester
  en mode mots-stagger d'abord.
- **Impact visuel** : le hero se découvre comme une scène d'ouverture.

### H-P5. Cursor signature green-electric (custom cursor zone Hero)

- **Description** : dans la zone Hero uniquement (pas le reste du
  site), le cursor par défaut disparaît et est remplacé par un anneau
  vert green-electric 32×32 px (border 1px alpha 0.6) qui suit le pointeur
  en lerp 0.15. Sur les éléments interactifs (CTA Header, IRIS submit,
  chips), l'anneau passe à 64×64 et se remplit à 8 % opacity. Réservé
  desktop, pas mobile/touch (`@media (pointer: coarse)`).
- **Justification DA** : pattern Awwwards roi (Lusion, Tundra, Active
  Theory). Effet immédiat de "site premium". Cohérent avec l'œil
  Paradeyes (le cursor devient un œil qui regarde). RÉSERVÉ
  uniquement à la zone Hero pour ne pas alourdir le reste du site.
- **Effort** : Moyen (2 h, attention à `mix-blend-mode` sur les zones
  light vs dark).
- **Risque** : Moyen — peut être trop agressif si mal réglé. Tester
  avec `mix-blend-mode: difference` d'abord.
- **Impact visuel** : signature instantanée Paradeyes-Awwwards.

---

## 4. Top 5 propositions de polish — Footer

### F-P1. Cascade reveal des 4 colonnes au scroll into view

- **Description** : IntersectionObserver sur `.pdy-footer-main`. Au
  premier intersect (threshold 0.1), les 4 colonnes apparaissent en
  cascade `opacity: 0 → 1 + translateY(24 px → 0)` avec stagger
  120 ms (s'aligne sur `tokens.stagger.cards`).
- **Justification DA** : aligne le footer sur l'orchestration animée
  du hero. Pattern de tous les sites premium (Linear, Vercel, Ramp).
  Apporte de la cinéma au footer.
- **Effort** : Faible (45 min).
- **Risque** : Faible.
- **Impact visuel** : le footer devient une "fin de séquence", pas un
  bloc statique.

### F-P2. Marquee fade-edges (mask-image bords)

- **Description** : ajouter `mask-image: linear-gradient(90deg,
  transparent 0, black 8%, black 92%, transparent 100%)` sur
  `.pdy-footer-marquee` pour que le texte "On comprend. On conçoit.
  On construit." entre/sorte en fondu sur les bords gauche/droite.
- **Justification DA** : détail typographique de niveau magazine
  papier. Les marquees aux bords coupés nets paraissent amateur.
  Avec fade-edges → cinéma. Cohérent avec le grain et les halos.
- **Effort** : Faible (10 min).
- **Risque** : Aucun.
- **Impact visuel** : le marquee se pose comme une bande son qui
  émerge et disparaît.

### F-P3. Glow gradient-plus rare sur le CTA hover

- **Description** : au hover du CTA outlined "Un appel gratuit de 30
  min", au lieu d'un simple shadow vert (actuel : `0 0 40px 4px
  rgba(87, 238, 161, 0.4)`), faire transitionner un gradient
  `--gradient-plus` (`#FF611D → #4A6CFF` orange → bleu) qui
  apparaît brièvement sur le `::before`. Effet de "moment rare".
  Animation 800 ms cinema, 1 fois au mouseenter.
- **Justification DA** : la palette Paradeyes contient
  `--orange-flame` et `--blue-steel` mais ils ne sont jamais utilisés.
  Le footer CTA est l'endroit idéal pour les libérer une fois (instant
  rare et dosé). Crée un easter-egg DA.
- **Effort** : Moyen (1 h).
- **Risque** : Moyen — risque de casser la cohérence vert si trop
  visible. À calibrer à 30 % d'opacity max.
- **Impact visuel** : un détail qui surprend, donne l'impression que
  le site cache d'autres tons à découvrir.

### F-P4. Halo green-electric bottom-right (3e couche)

- **Description** : 3e halo très flou (blur 80 px) en bas-droite
  (top: 60 %, right: 5 %, width: 40 %, height: 50 %), `rgba(87, 238,
  161, 0.05)`. Animation `pdy-halo-green-soft` 24 s ease-in-out infinite
  contre-phase aux deux autres. Pour rééquilibrer la composition.
- **Justification DA** : la composition actuelle = halo vert top-left +
  halo violet top-right. Vide en bas → bottom-right est mort visuellement.
  Le 3e halo discret en bas-droite ferme la composition en triangle.
- **Effort** : Faible (15 min).
- **Risque** : Faible.
- **Impact visuel** : le footer devient une scène complète,
  équilibrée.

### F-P5. Logo magnétique au survol (pointeur attiré)

- **Description** : le logo `<Logo />` dans la col 1 du footer
  réagit au pointeur dans un rayon de 80 px autour de lui : translation
  ±3 px vers le pointeur. Hover `opacity 0.8 → 1` déjà existant.
- **Justification DA** : signature qui dit "même le logo a une vie".
  Pattern récurrent de Awwwards 2024-2025. Cohérent avec H-P2 (même
  comportement de magnétisme côté footer).
- **Effort** : Faible (30 min, partage le hook avec H-P2).
- **Risque** : Faible.
- **Impact visuel** : interactivité subtile signature, le footer
  invite à explorer.

---

## 5. Bonus — 2 idées plus ambitieuses

### B1. Scène 3D légère du logo Paradeyes en arrière-plan du Hero

- **Description** : derrière les 3 halos, un lockup 3D de l'œil
  Paradeyes (juste l'œil, pas le wordmark) en wireframe vert très
  subtil (alpha 5 %). Scale 600×600 px centré, blur 60 px. Rotation
  lente 60 s/cycle. Implémentation via Three.js (déjà compatible
  Next.js 16 / React 19) ou via SVG animé `<animateTransform>` pour
  rester léger.
- **Justification DA** : signature instantanée Paradeyes (l'œil est la
  marque). Pattern Lusion / Cosmos. Donne une dimension supplémentaire
  qui dépasse la 2D plate.
- **Effort** : Élevé (1 j si Three.js, 4 h si SVG animé).
- **Risque** : Moyen — risque de surcharge GPU si Three.js mal calibré.
  Version SVG animé recommandée pour rester safe.
- **Impact visuel** : le hero devient signature à un point où il est
  reconnaissable même sans logo.

### B2. Transition de page custom (cortex éditorial)

- **Description** : à la navigation entre pages (Header nav), au lieu
  d'un fade Next.js par défaut, déclencher un overlay green-deep qui
  monte du bas vers le haut en 600 ms, traverse l'écran avec le mot
  Gambarino italic du nom de la page suivante au centre, puis se
  retire vers le haut (effet de rideau de cinéma). 1.2 s total.
- **Justification DA** : transitions de page sont la signature des
  sites Awwwards 2025. Mazarine Paris, Vokode, Cosmos Company. Cohérent
  avec l'identité "cinéma rencontre tableau de bord". Travaille la
  perception qualité énormément (chaque clic = micro-spectacle).
- **Effort** : Élevé (1.5 j, refactor architecture pour tenir un
  loader inter-pages, attention au SSR).
- **Risque** : Élevé — peut casser la navigation si mal géré, surtout
  avec next-intl + App Router. Tester sur preview Vercel avant prod.
- **Impact visuel** : transformation totale de la perception
  premium du site. Niveau studio créatif.

---

## 6. Synthèse

### Top 3 quickwins (faible effort, fort impact)

1. **F-P2 Marquee fade-edges** — 10 min de CSS, gain immédiat de
   raffinement éditorial.
2. **H-P3 Soulignement dessiné sur "performe."** — 45 min, signature
   Awwwards classique, cohérent avec l'italic existant.
3. **F-P1 Cascade reveal 4 colonnes footer** — 45 min, aligne le
   footer sur le hero animé.

### Top 3 game-changers (effort élevé, impact transformatif)

1. **H-P5 Cursor signature green-electric (zone Hero)** — 2 h, donne
   instantanément la sensation Awwwards à l'arrivée sur le site.
2. **H-P1 Microparallaxe halos mouse-based** — 2 h, fait passer le
   hero de plat à cinématographique vivant.
3. **B2 Transition de page custom** — 1.5 j, transforme la perception
   du site entier (pas seulement le hero/footer).

### Mes recommandations en tant que DA senior

**Plan recommandé pour cette session de polish** :

- **Phase 4-A (rapide, ~3 h)** : exécuter les 3 quickwins (F-P2 + H-P3
  + F-P1) plus H-P2 (magnétisme submit IRIS, 1 h) et F-P5 (logo
  magnétique footer, 30 min, partage le hook). **Total : 5 corrections
  fortes en 3 h**, le site monte clairement d'un cran.

- **Phase 4-B (ambitieuse, à valider séparément, ~5 h)** : ajouter
  H-P1 microparallaxe + H-P5 cursor signature. Ce sont les deux
  interventions qui transforment vraiment le hero en signature
  Awwwards. À tester sur preview avant validation prod.

- **Phase 4-C (game-changer, hors session)** : B2 transition de page
  custom. À planifier pour une session dédiée car risque sur
  l'architecture next-intl. Ne pas mélanger avec le reste.

**Ce que je ne recommande PAS** :

- H-P4 reveal letter-by-letter du sous-titre → risque de "trop animé"
  si combiné avec H-P3 et le scroll indicator. Garder en réserve.
- B1 logo 3D Three.js → effort élevé pour un gain qui se confond
  avec les halos. Si on veut une signature 3D, autant attendre une
  session dédiée et le faire bien.

**Ordre d'exécution si vous validez Phase 4-A** :

1. F-P2 Marquee fade-edges (CSS pur, 10 min)
2. F-P1 Cascade reveal colonnes (45 min, IntersectionObserver)
3. H-P3 Soulignement "performe." (45 min, animation CSS+motion)
4. H-P2 Magnétisme submit IRIS (1 h, hook réutilisable)
5. F-P5 Logo magnétique footer (30 min, réutilise le hook de H-P2)

Total estimé Phase 4-A : ~3 h, 5 commits propres séparés, build/lint
vérifiés à chaque commit.

---

## Engagement

J'attends votre validation explicite des propositions à exécuter
avant de toucher au code de la Phase 4. Format souhaité :

```
Go avec : [H-P1, H-P2, H-P3, F-P1, F-P2, F-P5]
```

ou un sous-ensemble. Je peux aussi proposer des variantes si une
proposition semble trop risquée ou si vous voulez modifier les
paramètres (ex : "cursor en blanc au lieu de vert", "magnétisme à
+6 px au lieu de +4 px", etc.).

Toute proposition non explicitement validée n'est pas implémentée.
