import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Wand2, Send } from "lucide-react";

interface RefinementEntry {
  id: string;
  prompt: string;
  timestamp: Date;
}

interface ResultsPanelProps {
  agentTitle: string;
  projectName: string;
  version: number;
  personaName?: string;
  content: string;
  onRefine: (prompt: string) => void;
  onClose: () => void;
  isRefining: boolean;
  refinements: RefinementEntry[];
}

export function ResultsPanel({
  agentTitle,
  projectName,
  version,
  personaName,
  content,
  onRefine,
  onClose,
  isRefining,
  refinements,
}: ResultsPanelProps) {
  const [refineInput, setRefineInput] = useState("");
  const [showRefineBar, setShowRefineBar] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInput.trim() || isRefining) return;
    onRefine(refineInput.trim());
    setRefineInput("");
    setShowRefineBar(false);
  };

  // Format timestamp
  const now = new Date();
  const timestamp = `${now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}, ${String(now.getHours() % 12 || 12).padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  const displayName = `${projectName.replace(/\s+/g, '')}-${agentTitle.replace(/\s+/g, '')}-v${version}`;

  return (
    <div className="flex flex-col h-full bg-[#F8F8F8] relative" style={{ borderLeft: "1px solid #CED4DA" }}>
      {/* Header */}
      <div
        className="shrink-0 bg-white border-b border-[#CED4DA] px-4 py-3 flex items-center justify-between gap-3"
        style={{ minHeight: 56 }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="truncate"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#333A42",
              lineHeight: "20px",
            }}
          >
            {displayName}
          </span>
          <span
            className="shrink-0"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#495059",
              lineHeight: "16px",
            }}
          >
            {`${now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}, ${String(now.getHours() % 12 || 12).padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Download */}
          <div className="relative">
            <button
              onClick={() => setDownloadOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CED4DA] rounded-[8px] transition-colors hover:bg-[#F0F1F2]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#333A42",
                lineHeight: "20px",
              }}
            >
              Download
              <ChevronDown
                size={16}
                className="text-[#495059] transition-transform"
                style={{ transform: downloadOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {downloadOpen && (
              <>
                {/* Click-outside overlay */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDownloadOpen(false)}
                />
                <div
                  className="absolute right-0 top-full mt-1.5 bg-white border border-[#E9ECEF] rounded-[8px] shadow-lg overflow-hidden z-20"
                  style={{ minWidth: 180 }}
                >
                  {[
                    { label: "Download as PDF", ext: "pdf" },
                    { label: "Download as DOCX", ext: "docx" },
                    { label: "Download as HTML", ext: "html" },
                  ].map(({ label, ext }) => (
                    <button
                      key={ext}
                      onClick={() => {
                        setDownloadOpen(false);
                        // Mock download
                        const blob = new Blob([content], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `output.${ext}`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-left hover:bg-[#F0F1F2] transition-colors"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#333A42",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-[8px] text-[#495059] transition-colors hover:bg-[#F0F1F2]"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Refinement history */}
      {refinements.length > 0 && (
        null
      )}

      {/* Content area */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-8 py-6">
        {isRefining ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#1F73CF] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#1F73CF] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#1F73CF] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6A757E" }}>
              Refining your results…
            </p>
          </div>
        ) : (
          <RenderedContent content={content} />
        )}
      </div>

      {/* Refine bar (shown when refine button clicked) */}
      {showRefineBar && (
        <div className="shrink-0 px-6 py-4 flex justify-center pointer-events-none">
          <form
            onSubmit={handleRefineSubmit}
            className="flex items-center gap-2 w-full max-w-2xl pointer-events-auto px-3 py-2 rounded-full shadow-lg border border-[#CED4DA] bg-white"
            style={{ boxShadow: "0 4px 24px 0 rgba(31,115,207,0.13), 0 1.5px 6px 0 rgba(0,0,0,0.07)" }}
          >
            <span
              className="shrink-0 pl-1"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#1F73CF",
                lineHeight: "20px",
              }}
            >
              Refine
            </span>
            <div className="w-px h-4 bg-[#CED4DA] shrink-0" />
            <input
              type="text"
              value={refineInput}
              onChange={(e) => setRefineInput(e.target.value)}
              placeholder="e.g. Make this persona more junior level..."
              autoFocus
              className="flex-1 bg-transparent outline-none px-2 py-1"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#333A42",
              }}
            />
            <button
              type="submit"
              disabled={!refineInput.trim() || isRefining}
              className="flex items-center justify-center size-8 rounded-full shrink-0 transition-colors disabled:opacity-40"
              style={{
                background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
              }}
            >
              <Send size={13} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => setShowRefineBar(false)}
              className="flex items-center justify-center size-8 rounded-full shrink-0 text-[#898E99] hover:text-[#495059] hover:bg-[#F0F1F2] transition-colors"
            >
              <X size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Refine button */}
      {!showRefineBar && (
        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => setShowRefineBar(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] shadow-lg transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
            }}
          >
            <Wand2 size={16} className="text-white" />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#F8F9FA",
              }}
            >
              Refine
            </span>
          </button>
        </div>
      )}

      {/* Right edge scroll indicator */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-[8px]"
        style={{
          width: 5,
          height: 120,
          background: "linear-gradient(180deg, #1F73CF 0%, #1A62B2 100%)",
        }}
      />
    </div>
  );
}

// Render content with basic markdown support
function RenderedContent({ content }: { content: string }) {
  const lines = content.split("\n");

  const rendered = lines.map((line, i) => {
    // H1
    if (line.startsWith("# ")) {
      return (
        <h1
          key={i}
          className="mb-4 mt-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 28,
            color: "#1A1A1A",
            lineHeight: "36px",
          }}
        >
          {line.slice(2)}
        </h1>
      );
    }
    // H2
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mb-3 mt-5"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#1A1A1A",
            lineHeight: "28px",
          }}
        >
          {line.slice(3)}
        </h2>
      );
    }
    // H3
    if (line.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mb-2 mt-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#333A42",
            lineHeight: "24px",
          }}
        >
          {line.slice(4)}
        </h3>
      );
    }
    // Bullet
    if (line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <li
          key={i}
          className="ml-4 mb-1"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#333A42",
            lineHeight: "24px",
            listStyleType: "disc",
          }}
        >
          <InlineContent text={line.slice(2)} />
        </li>
      );
    }
    // Bold key-value (e.g. "**Name:** Dr. Michael Chen")
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }
    // Regular paragraph
    return (
      <p
        key={i}
        className="mb-2"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#333A42",
          lineHeight: "24px",
        }}
      >
        <InlineContent text={line} />
      </p>
    );
  });

  return <div className="max-w-2xl">{rendered}</div>;
}

// Parse inline bold (**text**)
function InlineContent({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} style={{ fontWeight: 700, color: "#1A1A1A" }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}