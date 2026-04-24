import { Link } from "@/i18n/navigation";

interface FooterBottomProps {
  locale: "fr" | "en";
}

export function FooterBottom({ locale: _locale }: FooterBottomProps) {
  const year = new Date().getFullYear();

  return (
    <div className="relative mt-[var(--spacing-9)] lg:mt-[var(--spacing-10)] border-t border-[rgb(255_255_255/0.12)]">
      <div className="max-w-[var(--container-site)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)] py-[var(--spacing-5)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[var(--spacing-4)]">
          <p className="font-mono text-mono-xs tracking-wider text-[rgb(255_255_255/0.6)]">
            © {year} Paradeyes Agency. Tous droits réservés.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { label: "Mentions légales", href: "/mentions-legales" },
              { label: "Confidentialité", href: "/confidentialite" },
              { label: "CGV", href: "/cgv" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-caption text-[rgb(255_255_255/0.6)] hover:text-[var(--color-text-inverse)] transition-colors duration-base ease-out-quart focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-on-dark)] rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
