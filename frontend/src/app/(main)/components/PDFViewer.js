"use client";

export function PDFViewer({ fileUrl }) {
  if (!fileUrl) return null;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <object
        data={fileUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        className="w-full h-full border-none"
      >
        <p>Your browser does not support viewing PDFs.</p>
      </object>
    </div>
  );
}