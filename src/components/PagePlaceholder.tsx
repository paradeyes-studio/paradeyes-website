type PagePlaceholderProps = {
  name: string;
  path: string;
};

export function PagePlaceholder({ name, path }: PagePlaceholderProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-satoshi text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          {name}
        </h1>
        <p className="font-dm-sans text-sm text-white/40 sm:text-base">
          {path}
        </p>
      </div>
    </main>
  );
}
