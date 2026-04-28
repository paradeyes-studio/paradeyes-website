# Paradeyes DA patterns

Référentiel des règles de direction artistique du site Paradeyes. À appliquer systématiquement dans toutes les sessions.

## Règle DA universelle, eyebrows et accents par fond

**Règle absolue à respecter à chaque session, sans exception.**

| Fond de section | Couleur eyebrow et accents signature | Token CSS |
|---|---|---|
| `#F8F6F0` white warm (light) | `#4A6CFF` blue steel violet | `--color-eyebrow-light` |
| `#003135` green deep (dark) | `#57EEA1` green electric | `--color-eyebrow-dark` |

### Détails contraignants

- Sur fond light, le green electric `#57EEA1` n'a aucun usage fonctionnel, il est remplacé par le blue steel `#4A6CFF` (couleur froide du gradient Spectral, lisible sur clair, signature)
- Sur fond dark, le green electric `#57EEA1` est la couleur signature absolue
- Le blue steel `#4A6CFF` ne s'affiche jamais sur fond dark
- Le green electric `#57EEA1` ne s'affiche jamais comme élément fonctionnel (trait, bordure, séparateur, eyebrow) sur fond light. Autorisé uniquement comme accent ultra ponctuel signature à doses très réduites (par exemple un module pictural micro signature)

### Implémentation

Chaque section pose `data-section-theme="light"` ou `data-section-theme="dark"` sur son wrapper racine selon son fond.

```tsx
<section data-section-theme="light" className="pdy-section ...">
  <p className="pdy-eyebrow">Nos offres</p>
</section>

<section data-section-theme="dark" className="pdy-section ...">
  <p className="pdy-eyebrow">Quatre moments de croissance</p>
</section>
```

Sélecteurs CSS dans `src/app/globals.css` :

```css
.pdy-eyebrow {
  color: var(--color-eyebrow-light);
}
[data-section-theme="dark"] .pdy-eyebrow {
  color: var(--color-eyebrow-dark);
}
```

La convention `data-section-theme` (par section) est utilisée à dessein. `data-theme` est réservé au toggle global du site (light/dark mode user toggle ThemeSwitch). Les deux ne se confondent pas.

### Tokens CSS associés (déjà présents dans @theme)

```css
--color-blue-steel: #4A6CFF;
--color-green-electric: #57EEA1;

/* Indirections DA */
--color-eyebrow-light: var(--color-blue-steel);
--color-eyebrow-dark: var(--color-green-electric);
--color-accent-signature-light: var(--color-blue-steel);
--color-accent-signature-dark: var(--color-green-electric);
```

### Référence Notion

https://www.notion.so/3509ea1e2812813290d5e00d2fbcecc1

## Règles gradient

- **Gradient Spectral** `linear-gradient(135deg, #4A6CFF 0%, #FF611D 100%)` : autorisé sur fond light uniquement, INTERDIT sur fond dark
- **Gradient Vital** `linear-gradient(135deg, #003135 0%, #57EEA1 100%)` : autorisé sur fond dark, fallback obligatoire si gradient nécessaire en zone dark

## Easings signatures

- `--ease-cinema-out` : `cubic-bezier(0.16, 1, 0.3, 1)` premium signature
- `--ease-breathing` : `cubic-bezier(0.4, 0, 0.6, 1)` cycles 8s+

## Conventions éditoriales

- Vouvoiement strict sur tous les textes site
- Aucun tiret cadratin (em-dash, en-dash) dans les wordings ou commits, utiliser virgule, point, deux points ou middle dot
- Aucun emoji dans le code, le wording, les commits
