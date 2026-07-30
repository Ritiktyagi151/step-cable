import type { ContentBlock } from "@/lib/content";

type CleanContentProps = {
  blocks: ContentBlock[];
};

export function CleanContent({ blocks }: CleanContentProps) {
  return (
    <div className="clean-content min-w-0 space-y-5 sm:space-y-7">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 2 ? "h2" : "h3";
          return (
            <HeadingTag key={index} className="max-w-4xl break-words text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="max-w-5xl break-words text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="grid gap-3 pl-0">
              {block.items.map((item) => (
                <li key={item} className="break-words rounded-[20px] border border-brand-teal/15 border-l-4 border-l-brand-teal bg-white/78 px-4 py-3 text-sm leading-7 text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-lg sm:px-5 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return <img key={`${block.src}-${index}`} src={block.src} alt={block.alt} className="max-h-[340px] w-full rounded-[20px] border border-brand-teal/15 bg-white/78 object-contain p-2 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:max-h-[520px] sm:p-3" />;
        }

        if (block.type === "form") {
          return (
            <div key={index} className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {block.fields.map((field) => (
                  <div key={`${field.name}-${field.label}`} className="rounded-2xl border border-brand-teal/15 bg-white/70 p-4">
                    <p className="text-sm font-black uppercase tracking-wide text-slate-900">{field.label}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {field.type}
                      {field.required ? " / required" : ""}
                    </p>
                    {field.placeholder ? <p className="mt-1 text-xs text-slate-500">{field.placeholder}</p> : null}
                  </div>
                ))}
              </div>
              {block.buttons.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {block.buttons.map((button) => (
                    <span key={button} className="inline-block rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5">
                      {button}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <div key={index} className="overflow-x-auto rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg">
            <table className="w-full min-w-[640px] border-collapse text-xs sm:min-w-[720px] sm:text-sm">
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`${row.join("-")}-${rowIndex}`} className={rowIndex === 0 ? "bg-brand-teal text-white" : "border-t border-brand-teal/15"}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="border-r border-brand-teal/10 px-4 py-3 align-top text-slate-600 last:border-r-0">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
