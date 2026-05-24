"use client";

export default function DownloadPDF({ data, filename = "file.pdf" }) {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="px-3 py-2 rounded bg-black text-white hover:bg-black/90 text-sm">
      Download PDF
    </button>
  );
}
