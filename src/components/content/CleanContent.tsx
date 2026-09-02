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
            <form key={index} action="/api/contact" method="post" encType="multipart/form-data" className="rounded-[8px] border border-brand-teal/15 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {block.fields.map((field) => {
                  const commonClass = "mt-2 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-teal/10";
                  const inputType = ["f_name", "l_name", "input"].includes(field.type) ? "text" : field.type;

                  if (field.type === "checkbox") {
                    return (
                      <label key={`${field.name}-${field.label}`} className="flex min-h-[92px] items-start gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 lg:col-span-2">
                        <input name={field.name} type="checkbox" required={field.required} className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal" />
                        <span>{field.label}</span>
                      </label>
                    );
                  }

                  return (
                    <div key={`${field.name}-${field.label}`} className={field.type === "textarea" ? "sm:col-span-2 lg:col-span-3" : ""}>
                      <label htmlFor={field.name} className="text-xs font-black uppercase tracking-[0.14em] text-slate-900">
                        {field.label}
                        {field.required ? <span className="text-brand-teal"> *</span> : null}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea id={field.name} name={field.name} placeholder={field.placeholder} required={field.required} rows={5} className={commonClass} />
                      ) : field.type === "select" ? (
                        <select id={field.name} name={field.name} required={field.required} className={commonClass} defaultValue="">
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Sales">Sales</option>
                          <option value="Production">Production</option>
                          <option value="Quality">Quality</option>
                          <option value="Operations">Operations</option>
                        </select>
                      ) : (
                        <input id={field.name} name={field.name} type={inputType} placeholder={field.placeholder} required={field.required} className={commonClass} />
                      )}
                    </div>
                  );
                })}
              </div>
              {block.buttons.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {block.buttons.map((button) => (
                    <button key={button} type="submit" className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-brand-teal px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-teal/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark">
                      {button}
                    </button>
                  ))}
                </div>
              ) : null}
            </form>
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
