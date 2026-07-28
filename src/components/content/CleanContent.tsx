import type { ContentBlock } from "@/lib/content";

type CleanContentProps = {
  blocks: ContentBlock[];
};

export function CleanContent({ blocks }: CleanContentProps) {
  return (
    <div className="clean-content space-y-7">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 2 ? "h2" : "h3";
          return (
            <HeadingTag key={index} className="max-w-4xl text-3xl font-black leading-tight text-black">
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="max-w-5xl text-base leading-8 text-neutral-700">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="grid gap-3 pl-0">
              {block.items.map((item) => (
                <li key={item} className="border-l-4 border-black bg-white py-2 pl-4 text-base leading-7 text-neutral-800">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return <img key={`${block.src}-${index}`} src={block.src} alt={block.alt} className="max-h-[520px] w-full border border-neutral-300 object-contain grayscale" />;
        }

        if (block.type === "form") {
          return (
            <div key={index} className="border border-neutral-300 bg-white p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {block.fields.map((field) => (
                  <div key={`${field.name}-${field.label}`} className="border border-neutral-200 p-4">
                    <p className="text-sm font-black uppercase tracking-wide text-black">{field.label}</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      {field.type}
                      {field.required ? " / required" : ""}
                    </p>
                    {field.placeholder ? <p className="mt-1 text-xs text-neutral-500">{field.placeholder}</p> : null}
                  </div>
                ))}
              </div>
              {block.buttons.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {block.buttons.map((button) => (
                    <span key={button} className="inline-block bg-black px-5 py-3 text-sm font-black uppercase tracking-wide text-white">
                      {button}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <div key={index} className="overflow-x-auto border border-neutral-300 bg-white">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`${row.join("-")}-${rowIndex}`} className={rowIndex === 0 ? "bg-black text-white" : "border-t border-neutral-200"}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="border-r border-neutral-200 px-4 py-3 align-top last:border-r-0">
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
