/**
 * Sanity → Component shape mappers (Phase 5).
 *
 * Each mapper takes raw Sanity data (after the GROQ resolution in sanity.queries.ts)
 * and returns the shape expected by the corresponding Section component.
 *
 * Strategy: defensive nullish handling, graceful return of `undefined` if the array
 * is empty or all entries are unmappable. The page.tsx then falls back to the
 * static fallback in `src/content/home-fallback.ts`.
 *
 * All Item types are exported and consumed both by the Section components
 * (as `ReadonlyArray<Item>`) and by this file (as the mapper output type).
 */

// =============================================================================
// Localized field resolver (duplicated locally to keep sanity-mappers
// independent of page.tsx and reusable in future server components).
// =============================================================================

function resolveLocalized(field: unknown, locale: string): string | undefined {
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    const match = field.find(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        "language" in entry &&
        (entry as { language?: string }).language === locale,
    ) as { value?: unknown } | undefined;
    if (match && typeof match.value === "string") return match.value;
    const first = field[0] as { value?: unknown } | undefined;
    if (first && typeof first.value === "string") return first.value;
  }
  return undefined;
}

function resolveLocalizedStringArray(
  field: unknown,
  locale: string,
): string[] | undefined {
  if (!Array.isArray(field)) return undefined;
  const values = field
    .map((entry) => resolveLocalized(entry, locale))
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  return values.length > 0 ? values : undefined;
}

// =============================================================================
// Item types (exported, consumed by Section components)
// =============================================================================

export interface OffreCardItem {
  number: string;
  tag: string;
  title: string;
  titleItalic: string;
  promise: string;
  glyph: string;
  livrables: ReadonlyArray<string>;
  duration: string;
  href: string;
}

export interface MethodeStepLivrable {
  label: string;
  duration: string;
}

export interface MethodeStepItem {
  number: string;
  tag: string;
  title: string;
  titleItalic: string;
  headline: { before: string; italic: string; after: string };
  description: string;
  livrables: ReadonlyArray<MethodeStepLivrable>;
}

export interface MomentItemShape {
  number: string;
  title: string;
  description: string;
}

export interface ChiffreStatItem {
  number: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  caption: string;
}

export interface CaseMetricItem {
  value: string;
  label: string;
}

export interface CaseCardItem {
  number: string;
  total: string;
  tag: string;
  title: string;
  sub: string;
  metrics: ReadonlyArray<CaseMetricItem>;
  year: string;
  location: string;
  bgVariant: number;
  href: string;
}

export interface RawTestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface JournalArticleItem {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  href: string;
}

export interface FaqItemShape {
  q: string;
  a: string;
}

// =============================================================================
// Mappers — Offres
// =============================================================================

interface SanityOfferCard {
  number?: unknown;
  tag?: unknown;
  title?: unknown;
  titleItalic?: unknown;
  promesse?: unknown;
  glyph?: unknown;
  livrables?: unknown;
  duration?: unknown;
  size?: unknown;
  slug?: unknown;
}

export function mapSanityOfferCards(
  cards: unknown,
  locale: string,
): ReadonlyArray<OffreCardItem> | undefined {
  if (!Array.isArray(cards) || cards.length === 0) return undefined;
  const mapped: OffreCardItem[] = [];
  for (let i = 0; i < cards.length; i++) {
    const c = cards[i] as SanityOfferCard | null | undefined;
    if (!c || typeof c !== "object") continue;
    const title = resolveLocalized(c.title, locale);
    const promise = resolveLocalized(c.promesse, locale);
    if (!title || !promise) continue;
    const slugCurrent = typeof c.slug === "string" ? c.slug : undefined;
    mapped.push({
      number: typeof c.number === "string" ? c.number : String(i + 1).padStart(2, "0"),
      tag: resolveLocalized(c.tag, locale) ?? "",
      title,
      titleItalic: resolveLocalized(c.titleItalic, locale) ?? "",
      promise,
      glyph: typeof c.glyph === "string" ? c.glyph : "",
      livrables: resolveLocalizedStringArray(c.livrables, locale) ?? [],
      duration: resolveLocalized(c.duration, locale) ?? "",
      href: slugCurrent ? `/offres/${slugCurrent}` : "#",
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Methode
// =============================================================================

interface SanityMethodeStepLivrable {
  label?: unknown;
  duration?: unknown;
}

interface SanityMethodeStep {
  number?: unknown;
  title?: unknown;
  titleItalic?: unknown;
  paragraph?: unknown;
  tag?: unknown;
  headlineBefore?: unknown;
  headlineItalic?: unknown;
  headlineAfter?: unknown;
  livrablesItems?: unknown;
}

export function mapSanityMethodeSteps(
  steps: unknown,
  locale: string,
): ReadonlyArray<MethodeStepItem> | undefined {
  if (!Array.isArray(steps) || steps.length === 0) return undefined;
  const mapped: MethodeStepItem[] = [];
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i] as SanityMethodeStep | null | undefined;
    if (!s || typeof s !== "object") continue;
    const title = resolveLocalized(s.title, locale);
    const description = resolveLocalized(s.paragraph, locale);
    if (!title || !description) continue;
    const before = resolveLocalized(s.headlineBefore, locale);
    const italic = resolveLocalized(s.headlineItalic, locale);
    const after = resolveLocalized(s.headlineAfter, locale);
    const headline =
      before && italic && after
        ? { before, italic, after }
        : { before: "", italic: title, after: "." };
    const rawLivrables = Array.isArray(s.livrablesItems) ? s.livrablesItems : [];
    const livrables: MethodeStepLivrable[] = [];
    for (const l of rawLivrables) {
      const li = l as SanityMethodeStepLivrable | null | undefined;
      if (!li || typeof li !== "object") continue;
      const label = resolveLocalized(li.label, locale);
      if (!label) continue;
      livrables.push({
        label,
        duration: resolveLocalized(li.duration, locale) ?? "",
      });
    }
    mapped.push({
      number: typeof s.number === "string" ? s.number : String(i + 1).padStart(2, "0"),
      tag: resolveLocalized(s.tag, locale) ?? `Étape ${String(i + 1).padStart(2, "0")}`,
      title,
      titleItalic: resolveLocalized(s.titleItalic, locale) ?? title,
      headline,
      description,
      livrables,
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Moments
// =============================================================================

interface SanityMomentRef {
  _id?: unknown;
  title?: unknown;
  description?: unknown;
  order?: unknown;
  slug?: unknown;
}

export function mapSanityMoments(
  items: unknown,
  locale: string,
): ReadonlyArray<MomentItemShape> | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;
  const mapped: MomentItemShape[] = [];
  for (let i = 0; i < items.length; i++) {
    const m = items[i] as SanityMomentRef | null | undefined;
    if (!m || typeof m !== "object") continue;
    const title = resolveLocalized(m.title, locale);
    const description = resolveLocalized(m.description, locale);
    if (!title || !description) continue;
    const orderNum = typeof m.order === "number" ? m.order : i + 1;
    mapped.push({
      number: String(orderNum).padStart(2, "0"),
      title,
      description,
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Chiffres
// =============================================================================

interface SanityStatItem {
  value?: unknown;
  suffix?: unknown;
  label?: unknown;
  caption?: unknown;
  order?: unknown;
}

export function mapSanityStats(
  items: unknown,
  locale: string,
): ReadonlyArray<ChiffreStatItem> | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;
  const mapped: ChiffreStatItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const s = items[i] as SanityStatItem | null | undefined;
    if (!s || typeof s !== "object") continue;
    const label = resolveLocalized(s.label, locale);
    const valueRaw = typeof s.value === "string" ? s.value : "";
    if (!label || !valueRaw) continue;
    const cleaned = valueRaw.replace(",", ".").replace(/[^\d.\-]/g, "");
    const valueNum = parseFloat(cleaned);
    if (Number.isNaN(valueNum)) continue;
    const decimals = cleaned.includes(".")
      ? Math.max(0, cleaned.split(".")[1]?.length ?? 0)
      : 0;
    const orderNum = typeof s.order === "number" ? s.order : i + 1;
    mapped.push({
      number: String(orderNum).padStart(2, "0"),
      label,
      value: valueNum,
      suffix: typeof s.suffix === "string" ? s.suffix : undefined,
      decimals: decimals > 0 ? decimals : undefined,
      caption: resolveLocalized(s.caption, locale) ?? "",
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Cases (etudes featured refs caseStudy)
// =============================================================================

interface SanityCaseStudyRef {
  _id?: unknown;
  slug?: unknown;
  title?: unknown;
  shortTag?: unknown;
  shortSubtitle?: unknown;
  homeMetrics?: unknown;
  homeLocation?: unknown;
  homeBgVariant?: unknown;
  year?: unknown;
}

interface SanityHomeMetric {
  value?: unknown;
  label?: unknown;
}

export function mapSanityCaseStudies(
  refs: unknown,
  locale: string,
): ReadonlyArray<CaseCardItem> | undefined {
  if (!Array.isArray(refs) || refs.length === 0) return undefined;
  const total = String(refs.length).padStart(2, "0");
  const mapped: CaseCardItem[] = [];
  for (let i = 0; i < refs.length; i++) {
    const r = refs[i] as SanityCaseStudyRef | null | undefined;
    if (!r || typeof r !== "object") continue;
    const title = resolveLocalized(r.title, locale);
    const slugCurrent = typeof r.slug === "string" ? r.slug : undefined;
    if (!title || !slugCurrent) continue;
    const rawMetrics = Array.isArray(r.homeMetrics) ? r.homeMetrics : [];
    const metrics: CaseMetricItem[] = [];
    for (const m of rawMetrics) {
      const mi = m as SanityHomeMetric | null | undefined;
      if (!mi || typeof mi !== "object") continue;
      const value = typeof mi.value === "string" ? mi.value : "";
      const label = resolveLocalized(mi.label, locale);
      if (!value || !label) continue;
      metrics.push({ value, label });
    }
    mapped.push({
      number: String(i + 1).padStart(2, "0"),
      total,
      tag: resolveLocalized(r.shortTag, locale) ?? "",
      title,
      sub: resolveLocalized(r.shortSubtitle, locale) ?? "",
      metrics,
      year: typeof r.year === "number" ? String(r.year) : "",
      location: resolveLocalized(r.homeLocation, locale) ?? "",
      bgVariant:
        typeof r.homeBgVariant === "number" && r.homeBgVariant >= 1 && r.homeBgVariant <= 4
          ? r.homeBgVariant
          : ((i % 4) + 1),
      href: `/realisations/${slugCurrent}`,
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Testimonials (refs testimonial)
// =============================================================================

interface SanityTestimonialRef {
  _id?: unknown;
  quote?: unknown;
  quoteLong?: unknown;
  authorName?: unknown;
  authorRole?: unknown;
  companyName?: unknown;
  featured?: unknown;
}

export function mapSanityTestimonials(
  refs: unknown,
  locale: string,
): ReadonlyArray<RawTestimonialItem> | undefined {
  if (!Array.isArray(refs) || refs.length === 0) return undefined;
  const mapped: RawTestimonialItem[] = [];
  for (const r of refs) {
    const t = r as SanityTestimonialRef | null | undefined;
    if (!t || typeof t !== "object") continue;
    const quote = resolveLocalized(t.quote, locale);
    const authorName = typeof t.authorName === "string" ? t.authorName : undefined;
    const authorRole = resolveLocalized(t.authorRole, locale);
    if (!quote || !authorName || !authorRole) continue;
    const company = typeof t.companyName === "string" ? t.companyName : undefined;
    const role = company ? `${authorRole}, ${company}` : authorRole;
    mapped.push({ quote, author: authorName, role });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — Journal articles (refs article)
// =============================================================================

interface SanityArticleRef {
  _id?: unknown;
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  category?: unknown;
  readingTime?: unknown;
  publishedAt?: unknown;
}

const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  methode: "Méthode",
  conviction: "Conviction",
  analyse: "Analyse",
  conseilBusiness: "Conseil business",
  tendances: "Tendance",
  casConcret: "Cas concret",
};

const FR_MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function formatPublishedAtFr(value: unknown): string {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${FR_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function mapSanityJournalArticles(
  refs: unknown,
  locale: string,
): ReadonlyArray<JournalArticleItem> | undefined {
  if (!Array.isArray(refs) || refs.length === 0) return undefined;
  const mapped: JournalArticleItem[] = [];
  for (const r of refs) {
    const a = r as SanityArticleRef | null | undefined;
    if (!a || typeof a !== "object") continue;
    const title = resolveLocalized(a.title, locale);
    const excerpt = resolveLocalized(a.excerpt, locale);
    const slug = typeof a.slug === "string" ? a.slug : undefined;
    if (!title || !excerpt || !slug) continue;
    const categoryKey = typeof a.category === "string" ? a.category : "";
    const category = ARTICLE_CATEGORY_LABELS[categoryKey] ?? "Article";
    const readingTime = typeof a.readingTime === "number" ? `${a.readingTime} min` : "";
    mapped.push({
      category,
      title,
      excerpt,
      readTime: readingTime,
      date: formatPublishedAtFr(a.publishedAt),
      href: `/journal/${slug}`,
    });
  }
  return mapped.length > 0 ? mapped : undefined;
}

// =============================================================================
// Mappers — FAQ items (refs faqItem)
// =============================================================================

interface SanityFaqItemRef {
  _id?: unknown;
  question?: unknown;
  answer?: unknown;
  category?: unknown;
  order?: unknown;
}

export function mapSanityFaqItems(
  refs: unknown,
  locale: string,
): ReadonlyArray<FaqItemShape> | undefined {
  if (!Array.isArray(refs) || refs.length === 0) return undefined;
  const mapped: FaqItemShape[] = [];
  for (const r of refs) {
    const f = r as SanityFaqItemRef | null | undefined;
    if (!f || typeof f !== "object") continue;
    const q = resolveLocalized(f.question, locale);
    const a = resolveLocalized(f.answer, locale);
    if (!q || !a) continue;
    mapped.push({ q, a });
  }
  return mapped.length > 0 ? mapped : undefined;
}
