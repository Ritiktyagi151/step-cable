"use client";

import { FaDownload, FaPrint } from "react-icons/fa6";

type ProductPrintButtonProps = {
  productName: string;
  productCode?: string;
  productImage: string;
  productAlt: string;
  specs?: string[];
  printClassName?: string;
  downloadClassName?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProductSheetHtml({ productName, productCode, productImage, productAlt, specs = [] }: ProductPrintButtonProps) {
  const imageUrl = productImage.startsWith("http") ? productImage : `${window.location.origin}${productImage}`;
  const specsHtml = specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(productName)}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; color: #0f172a; font-family: Arial, sans-serif; background: #fff; }
    .sheet { width: min(780px, 100%); margin: 0 auto; padding: 32px; }
    .brand { color: #2aa8a3; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
    h1 { margin: 12px 0 0; font-size: 30px; line-height: 1.15; }
    .code { display: inline-block; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: #e7f7f6; color: #16837e; font-size: 13px; font-weight: 800; }
    .image { display: flex; align-items: center; justify-content: center; min-height: 360px; margin-top: 24px; padding: 24px; border: 1px solid #e2e8f0; background: #f8fafc; }
    img { max-width: 100%; max-height: 430px; object-fit: contain; }
    ul { margin: 24px 0 0; padding: 0; list-style: none; }
    li { margin-top: 10px; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-weight: 700; line-height: 1.45; }
    @media print {
      .sheet { padding: 18mm; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <div class="brand">STEP Product Detail</div>
    <h1>${escapeHtml(productName)}</h1>
    ${productCode ? `<div class="code">${escapeHtml(productCode)}</div>` : ""}
    <div class="image"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(productAlt)}" /></div>
    ${specsHtml ? `<ul>${specsHtml}</ul>` : ""}
  </main>
</body>
</html>`;
}

export function ProductPrintButton(props: ProductPrintButtonProps) {
  const printProduct = () => {
    const printWindow = window.open("", "_blank", "width=900,height=720");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(getProductSheetHtml(props));
    printWindow.document.close();
    printWindow.focus();
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  const downloadProduct = () => {
    const blob = new Blob([getProductSheetHtml(props)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${slugify(props.productCode || props.productName) || "product-detail"}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button type="button" onClick={printProduct} className={props.printClassName}>
        <FaPrint aria-hidden="true" className="text-sm" />
        Print this product
      </button>
      <button type="button" onClick={downloadProduct} className={props.downloadClassName}>
        <FaDownload aria-hidden="true" className="text-sm" />
        Download details
      </button>
    </>
  );
}
