import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText, Trash2 } from "lucide-react";

interface GlobalContextDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalContextDrawer({ isOpen, onClose }: GlobalContextDrawerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [businessIdea, setBusinessIdea] = useState("");
  const [dragging, setDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Reset saved indicator when drawer closes
  useEffect(() => {
    if (!isOpen) setSaved(false);
  }, [isOpen]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      return [...prev, ...incoming.filter((f) => !existingNames.has(f.name))];
    });
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col bg-white"
        style={{
          width: 460,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          borderLeft: "1px solid #CED4DA",
          boxShadow: isOpen ? "-4px 0 24px rgba(0,0,0,0.10)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[#E9ECEF] shrink-0"
          style={{ minHeight: 64 }}
        >
          <div className="flex flex-col gap-0.5">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#333A42",
                lineHeight: "22px",
              }}
            >
              Global Context
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#6A757E",
                lineHeight: "18px",
              }}
            >
              Files uploaded here will be referenced by all agents automatically.
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-[6px] w-8 h-8 text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors shrink-0 ml-4"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

          {/* Upload Context Files */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#333A42",
                  lineHeight: "20px",
                }}
              >
                Upload Context Files
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#495059",
                  lineHeight: "16px",
                }}
              >
                Supports .pdf, .txt, .doc, .docx, .pptx, .xls, .xlsx
              </span>
            </div>

            {/* Drop zone */}
            <div
              className={`rounded-[12px] border-dashed border transition-colors ${
                dragging ? "border-[#1F73CF] bg-[#EBF3FB]" : "border-[#898E99] bg-[#FDFDFD]"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            >
              <div className="p-4 flex flex-col gap-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#333A42",
                    }}
                  >
                    Files ({files.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#1F73CF] text-[#1F73CF] transition-colors hover:bg-[#EBF3FB]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    <Upload size={11} />
                    Upload
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept=".pdf,.txt,.doc,.docx,.pptx,.ppt,.xls,.xlsx"
                    className="hidden"
                    onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#F0F1F2] via-[#9CA1AA] to-[#F0F1F2]" />

                {/* Drop hint when empty */}
                {files.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[80px] text-center">
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#616874",
                        lineHeight: "20px",
                      }}
                    >
                      Drag & drop files here
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        color: "#9CA1AA",
                        lineHeight: "18px",
                      }}
                    >
                      Supports .pdf, .txt, .doc, .docx, .pptx, .xls, .xlsx
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border border-[#E9ECEF] bg-white"
                  >
                    <FileText size={15} strokeWidth={1.5} className="text-[#6A757E] shrink-0" />
                    <span
                      className="flex-1 truncate"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#333A42",
                      }}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        color: "#9CA1AA",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.size < 1024
                        ? `${file.size} B`
                        : file.size < 1048576
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : `${(file.size / 1048576).toFixed(1)} MB`}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="flex items-center justify-center w-6 h-6 rounded-[4px] text-[#9CA1AA] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors shrink-0"
                    >
                      <Trash2 size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Business Idea */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#333A42",
                    lineHeight: "20px",
                  }}
                >
                  Business Idea
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#9CA1AA",
                    lineHeight: "20px",
                  }}
                >
                  (optional)
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#495059",
                  lineHeight: "16px",
                }}
              >
                Briefly describe your product or business
              </span>
            </div>
            <textarea
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              placeholder="e.g. A patient portal that helps clinicians manage appointments and share results securely with patients"
              rows={4}
              className="w-full px-4 py-3 rounded-[4px] border border-[#CED4DA] bg-[#FDFDFD] outline-none transition-colors focus:border-[#1F73CF] focus:ring-1 focus:ring-[#1F73CF]/20 resize-y"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#333A42",
                minHeight: 100,
              }}
            />
          </div>
        </div>

        {/* Footer – Save button */}
        <div className="shrink-0 px-6 py-4 border-t border-[#E9ECEF] bg-white">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-[48px] rounded-[12px] flex items-center justify-center transition-all"
            style={{
              background: saved
                ? "linear-gradient(156.703deg, #16A34A 4.5155%, #15803D 110.9%)"
                : "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#F8F9FA",
              }}
            >
              {saved ? "Saved!" : "Save"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
