import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
  external?: boolean;
  className?: string;
}

export function FooterColumn({
  title,
  links,
  external = false,
  className,
}: FooterColumnProps) {
  const baseLink = cn(
    "group inline-flex items-center gap-2",
    "font-body text-body-sm font-medium",
    "text-[var(--color-text-inverse)]",
    "transition-colors duration-base ease-out-quart",
    "hover:text-[var(--color-accent-on-dark)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-on-dark)] rounded-sm",
  );

  return (
    <div className={cn("flex flex-col gap-[var(--spacing-4)]", className)}>
      <h3 className="font-mono text-mono-sm uppercase tracking-[0.08em] font-medium text-[rgb(255_255_255/0.6)]">
        {title}
      </h3>

      <ul className="flex flex-col gap-[var(--spacing-2)]">
        {links.map((link) => (
          <li key={link.href}>
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseLink}
              >
                {link.icon && (
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                )}
                <span>{link.label}</span>
                <ExternalLink
                  className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <Link href={link.href} className={baseLink}>
                {link.icon && (
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                )}
                <span>{link.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
