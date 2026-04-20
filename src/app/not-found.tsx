import { PagePlaceholder } from "@/components/PagePlaceholder";

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="antialiased">
        <PagePlaceholder name="Page introuvable" path="404" />
      </body>
    </html>
  );
}
