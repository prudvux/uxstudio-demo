import { useEffect, useState } from "react";
import { X, FileText, Trash2, ExternalLink, History } from "lucide-react";

export interface ArtifactEntry {
  id: string;
  agentId: string;
  agentTitle: string;
  projectName: string;
  version: number;
  content: string;
  personaName?: string;
  createdAt: Date;
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artifacts: ArtifactEntry[];
  currentAgentId: string | null;
  onOpen: (artifact: ArtifactEntry) => void;
  onDelete: (artifactId: string) => void;
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function formatDate(date: Date): string {
  const datePart = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const timePart = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return `${datePart}, ${timePart}`;
}

function getPreview(content: string): string {
  // Strip markdown headings and return first meaningful text
  const lines = content.split("\n").filter((l) => l.trim());
  for (const line of lines) {
    const clean = line.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
    if (clean.length > 10) return clean;
  }
  return "Generated artifact";
}

export function HistoryPanel({
  isOpen,
  onClose,
  artifacts,
  currentAgentId,
  onOpen,
  onDelete,
}: HistoryPanelProps) {
  const filtered = currentAgentId
    ? artifacts.filter((a) => a.agentId === currentAgentId)
    : artifacts;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel */}
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
          <div className="flex items-center gap-2.5">
            
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
                Artifact History
              </p>
              {currentAgentId && filtered.length > 0 && (
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#6A757E",
                    lineHeight: "16px",
                  }}
                >
                  {filtered.length} artifact{filtered.length !== 1 ? "s" : ""} generated
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  background: "#EBF3FB",
                }}
              >
                <History size={24} className="text-[#1F73CF]" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#333A42",
                    marginBottom: 6,
                  }}
                >
                  No artifacts yet
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#6A757E",
                    lineHeight: "20px",
                  }}
                >
                  Generated artifacts for this agent will appear here so you can revisit and compare them.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered
                .slice()
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onOpen={() => onOpen(artifact)}
                    onDelete={() => onDelete(artifact.id)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ArtifactCard({
  artifact,
  onOpen,
  onDelete,
}: {
  artifact: ArtifactEntry;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const preview = getPreview(artifact.content);
  const displayTitle = `${artifact.projectName.replace(/\s+/g, '')}-${artifact.agentTitle.replace(/\s+/g, '')}-v${artifact.version}`;

  return (
    <div
      className="group flex flex-col gap-2 p-3.5 rounded-[10px] border border-[#E9ECEF] bg-[#FDFDFD] hover:border-[#A8D2F1] hover:bg-[#F7FBFF] transition-all"
    >
      {/* Top row */}
      <div className="flex items-start gap-2.5">
        <div
          className="flex items-center justify-center rounded-[6px] shrink-0 mt-0.5"
          style={{
            width: 32,
            height: 32,
            background: "#EBF3FB",
          }}
        >
          <FileText size={15} className="text-[#1F73CF]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#333A42",
              lineHeight: "18px",
            }}
          >
            {displayTitle}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#6A757E",
              lineHeight: "16px",
            }}
          >
            {timeAgo(artifact.createdAt)} · {formatDate(artifact.createdAt)}
          </p>
        </div>
      </div>

      {/* Preview text */}
      <p
        className="line-clamp-2"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 12,
          color: "#495059",
          lineHeight: "18px",
        }}
      >
        {preview}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-[#F0F1F2]">
        <button
          onClick={onOpen}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[#1F73CF] bg-[#EBF3FB] hover:bg-[#D6EAFB] transition-colors"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          <ExternalLink size={11} strokeWidth={2} />
          Open
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-2 py-1 rounded-[6px] text-[#6A757E] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
          }}
        >
          <Trash2 size={12} strokeWidth={1.5} />
          Delete
        </button>
      </div>
    </div>
  );
}