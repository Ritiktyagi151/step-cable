import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800">
      <SiteHeader />
      <main className="pt-[142px] sm:pt-[132px] lg:pt-[104px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
