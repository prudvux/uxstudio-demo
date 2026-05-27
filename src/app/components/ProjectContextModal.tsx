import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText } from "lucide-react";

interface ProjectContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, files: File[]) => void;
  editingContext: { name: string; files: File[] } | null;
}

export function ProjectContextModal({
  isOpen,
  onClose,
  onSave,
  editingContext,
}: ProjectContextModalProps) {
  const [name, setName] = useState(editingContext?.name || "");
  const [files, setFiles] = useState<File[]>(editingContext?.files || []);
  const [dragging, setDragging] = useState(false);
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

  useEffect(() => {
    if (editingContext) {
      setName(editingContext.name);
      setFiles(editingContext.files);
    } else {
      setName("");
      setFiles([]);
    }
  }, [editingContext]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    setFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), files);
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
        className="fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-2xl"
        style={{
          width: 360,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          borderLeft: "1px solid #CED4DA",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-[#E9ECEF] shrink-0"
          style={{ minHeight: 60 }}
        >
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#333A42",
                lineHeight: "20px",
              }}
            >
              {editingContext ? "Edit Project Context" : "Project Context"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          {/* Project Name */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#333A42",
                lineHeight: "20px",
              }}
            >
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-4 py-3 rounded-[8px] border border-[#CED4DA] bg-[#FDFDFD] outline-none transition-colors focus:border-[#1F73CF] focus:ring-1 focus:ring-[#1F73CF]/20"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#333A42",
              }}
            />
          </div>

          {/* Upload Files */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#333A42",
                lineHeight: "20px",
              }}
            >
              Upload Files
            </label>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: "#6A757E",
                lineHeight: "16px",
              }}
            >
              Upload as many files as needed
            </p>

            <div
              className={`rounded-[12px] border-2 border-dashed transition-colors ${
                dragging
                  ? "border-[#1F73CF] bg-[#EBF3FB]"
                  : "border-[#CED4DA] bg-[#FDFDFD]"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
            >
              <div className="p-6 flex flex-col items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full bg-[#F0F1F2]"
                  style={{ width: 48, height: 48 }}
                >
                  <Upload size={20} strokeWidth={1.5} className="text-[#6A757E]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "#333A42",
                      lineHeight: "20px",
                    }}
                  >
                    Drag & drop files here
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#9CA1AA",
                      lineHeight: "16px",
                    }}
                  >
                    or
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 rounded-[8px] border border-[#1F73CF] text-[#1F73CF] hover:bg-[#EBF3FB] transition-colors"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  Browse files
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.txt,.doc,.docx,.pptx,.ppt,.html,.xls,.xlsx"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            </div>

            {/* File chips */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file) => (
                  <span
                    key={file.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#CED4DA] bg-[#F0F1F2] max-w-full"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#495059",
                    }}
                  >
                    <FileText size={12} className="text-[#6A757E] shrink-0" />
                    <span className="truncate max-w-[140px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="text-[#898E99] hover:text-[#495059] transition-colors ml-0.5 shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 px-5 py-4 border-t border-[#E9ECEF] shrink-0">
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full h-[44px] rounded-[10px] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#F8F9FA",
            }}
          >
            {editingContext ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
