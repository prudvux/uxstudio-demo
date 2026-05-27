import { useState } from "react";
import { FolderOpen, Edit2, Trash2, Plus } from "lucide-react";
import { ProjectContextModal } from "../components/ProjectContextModal";

interface ProjectContext {
  id: string;
  name: string;
  files: File[];
}

export function ProjectContextsPage() {
  const [contexts, setContexts] = useState<ProjectContext[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContext, setEditingContext] = useState<ProjectContext | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingContext(null);
    setModalOpen(true);
  };

  const handleEdit = (context: ProjectContext) => {
    setEditingContext(context);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setContexts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSave = (name: string, files: File[]) => {
    if (editingContext) {
      // Update existing
      setContexts((prev) =>
        prev.map((c) =>
          c.id === editingContext.id ? { ...c, name, files } : c
        )
      );
    } else {
      // Add new
      const newContext: ProjectContext = {
        id: Date.now().toString(),
        name,
        files,
      };
      setContexts((prev) => [...prev, newContext]);
    }
    setModalOpen(false);
    setEditingContext(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F8F8F8]">
      {/* Header */}
      <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 shrink-0 border-b border-[#E9ECEF] bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 28,
                color: "#333A42",
                lineHeight: "36px",
              }}
            >
              Project Contexts
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#495059",
                lineHeight: "20px",
              }}
            >
              Add context files to ground your agents in project-specific knowledge
            </p>
          </div>
          {contexts.length > 0 && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] transition-all hover:opacity-90 shrink-0"
              style={{
                background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#F8F9FA",
              }}
            >
              <Plus size={16} strokeWidth={2} />
              Add Context
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {contexts.length === 0 ? (
          // Empty state
          <div className="flex items-center justify-center h-full px-4">
            <div className="flex flex-col items-center gap-6 max-w-[400px] w-full text-center">
              <div
                className="flex items-center justify-center rounded-full bg-[#F0F1F2]"
                style={{ width: 80, height: 80 }}
              >
                <FolderOpen size={36} strokeWidth={1.5} className="text-[#9CA1AA]" />
              </div>
              <div className="flex flex-col gap-2">
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#333A42",
                    lineHeight: "28px",
                  }}
                >
                  No project contexts yet
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#495059",
                    lineHeight: "20px",
                  }}
                >
                  Add context files to ground your agents in project-specific knowledge
                </p>
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-5 py-3 rounded-[10px] transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#F8F9FA",
                }}
              >
                <Plus size={18} strokeWidth={2} />
                Add Context
              </button>
            </div>
          </div>
        ) : (
          // Grid of context cards
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {contexts.map((context) => (
              <div
                key={context.id}
                onMouseEnter={() => setHoveredCardId(context.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="relative bg-white rounded-[12px] border border-[#E9ECEF] p-5 flex flex-col gap-4 transition-all hover:shadow-md hover:border-[#CED4DA] group"
              >
                {/* Hover actions */}
                {hoveredCardId === context.id && (
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(context)}
                      className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white border border-[#CED4DA] text-[#6A757E] hover:text-[#1F73CF] hover:border-[#1F73CF] transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(context.id)}
                      className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white border border-[#CED4DA] text-[#6A757E] hover:text-[#DC2626] hover:border-[#DC2626] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                )}

                {/* Card content */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-[8px] bg-[#EBF3FB] shrink-0"
                    style={{ width: 40, height: 40 }}
                  >
                    <FolderOpen size={20} strokeWidth={1.5} className="text-[#1F73CF]" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <h3
                      className="truncate"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#333A42",
                        lineHeight: "22px",
                      }}
                    >
                      {context.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#6A757E",
                        lineHeight: "18px",
                      }}
                    >
                      {context.files.length} file{context.files.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ProjectContextModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingContext(null);
          }}
          onSave={handleSave}
          editingContext={editingContext}
        />
      )}
    </div>
  );
}
