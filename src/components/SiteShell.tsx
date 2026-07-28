import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
