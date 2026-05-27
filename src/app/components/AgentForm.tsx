import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Upload,
  X,
  Check,
  History,
  FileText,
  UserRound,
  Info,
} from "lucide-react";
import type { AgentConfig, FormField } from "../data/agents";
import { allAgentNames } from "../data/agents";

interface AgentFormProps {
  agent: AgentConfig;
  onGenerate: (values: Record<string, unknown>) => void;
  isGenerating: boolean;
  onOpenHistory: () => void;
  onOpenGlobalContext: () => void;
  artifactCount?: number;
}

// Single line text input
function TextInput({
  field,
  value,
  onChange,
  hasError,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 ${
        hasError
          ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20"
          : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
      }`}
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: "#333A42",
      }}
    />
  );
}

// Big textarea
function TextAreaInput({
  field,
  value,
  onChange,
  hasError,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={6}
      className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 resize-y ${
        hasError
          ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20"
          : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
      }`}
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: "#333A42",
        minHeight: 140,
      }}
    />
  );
}

// Single select dropdown
function SelectInput({
  field,
  value,
  onChange,
  hasError,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] flex items-center justify-between text-left transition-colors hover:border-[#9CA1AA] ${
          hasError ? "border-[#DC2626]" : "border-[#CED4DA]"
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: value ? "#333A42" : "#898E99",
        }}
      >
        <span>{value || "Select an option"}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#6A757E] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg overflow-hidden"
          style={{ maxHeight: 240, overflowY: "auto" }}
        >
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-[#EBF3FB] transition-colors flex items-center justify-between"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: value === opt ? 500 : 400,
                fontSize: 14,
                color: value === opt ? "#1F73CF" : "#333A42",
              }}
            >
              {opt}
              {value === opt && <Check size={14} className="text-[#1F73CF]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Multi select dropdown
function MultiSelectInput({
  field,
  value,
  onChange,
  hasError,
}: {
  field: FormField;
  value: string[];
  onChange: (v: string[]) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  const remove = (opt: string) => {
    onChange(value.filter((v) => v !== opt));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] flex items-center justify-between text-left transition-colors hover:border-[#9CA1AA] min-h-[46px] ${
          hasError ? "border-[#DC2626]" : "border-[#CED4DA]"
        }`}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: value.length > 0 ? "#333A42" : "#898E99",
          }}
        >
          {value.length === 0 ? "Select options" : `${value.length} selected`}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#6A757E] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((opt) => (
            <span
              key={opt}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#CED4DA] bg-[#F0F1F2]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: "#495059",
              }}
            >
              {opt}
              <button
                type="button"
                onClick={() => remove(opt)}
                className="text-[#898E99] hover:text-[#495059]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg overflow-hidden"
          style={{ maxHeight: 240, overflowY: "auto" }}
        >
          {field.options?.map((opt) => {
            const selected = value.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className="w-full text-left px-4 py-2.5 hover:bg-[#EBF3FB] transition-colors flex items-center gap-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: selected ? 500 : 400,
                  fontSize: 14,
                  color: selected ? "#1F73CF" : "#333A42",
                }}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    selected
                      ? "bg-[#1F73CF] border-[#1F73CF]"
                      : "border-[#CED4DA] bg-white"
                  }`}
                >
                  {selected && <Check size={10} className="text-white" />}
                </div>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Supporting agents multi-select
function SupportingAgentsSelect({
  value,
  onChange,
  currentAgentTitle,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  currentAgentTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const options = allAgentNames.filter((name) => name !== currentAgentTitle);

  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  const remove = (opt: string) => {
    onChange(value.filter((v) => v !== opt));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] flex items-center justify-between text-left transition-colors hover:border-[#9CA1AA] min-h-[46px] border-[#CED4DA]"
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: value.length > 0 ? "#333A42" : "#898E99",
          }}
        >
          {value.length === 0
            ? "Select agents"
            : `${value.length} agent${value.length > 1 ? "s" : ""} selected`}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#6A757E] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((opt) => (
            <span
              key={opt}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#CED4DA] bg-[#F0F1F2]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: "#495059",
              }}
            >
              {opt}
              <button
                type="button"
                onClick={() => remove(opt)}
                className="text-[#898E99] hover:text-[#495059] ml-0.5"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div
          className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg overflow-hidden"
          style={{ maxHeight: 260, overflowY: "auto" }}
        >
          {options.map((opt) => {
            const selected = value.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className="w-full text-left px-4 py-2.5 hover:bg-[#EBF3FB] transition-colors flex items-center gap-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: selected ? 500 : 400,
                  fontSize: 14,
                  color: selected ? "#1F73CF" : "#333A42",
                }}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    selected
                      ? "bg-[#1F73CF] border-[#1F73CF]"
                      : "border-[#CED4DA] bg-white"
                  }`}
                >
                  {selected && <Check size={10} className="text-white" />}
                </div>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// File upload area
function FileUploadInput({
  value,
  onChange,
}: {
  value: File[];
  onChange: (v: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    onChange([...value, ...arr]);
  };

  const remove = (name: string) => {
    onChange(value.filter((f) => f.name !== name));
  };

  return (
    <div
      className={`rounded-[12px] border-dashed border transition-colors ${
        dragging ? "border-[#1F73CF] bg-[#EBF3FB]" : "border-[#898E99] bg-[#FDFDFD]"
      }`}
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
            Files ({value.length})
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
            accept=".pdf,.txt,.doc,.docx,.pptx,.ppt,.html,.xls,.xlsx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#F0F1F2] via-[#9CA1AA] to-[#F0F1F2]" />

        {/* Drop zone / file list */}
        <div
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
          className="min-h-[80px]"
        >
          {value.length === 0 ? (
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
          ) : (
            <div className="flex flex-wrap gap-2">
              {value.map((file) => (
                <span
                  key={file.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#CED4DA] bg-[#F0F1F2]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#495059",
                  }}
                >
                  <FileText size={11} className="text-[#6A757E] shrink-0" />
                  <span className="max-w-[140px] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => remove(file.name)}
                    className="text-[#898E99] hover:text-[#495059] ml-0.5"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Artifact Selector with search
function ArtifactSelector({
  disabled,
  selectedArtifacts,
  onSelectArtifacts,
  artifacts,
  searchQuery,
  onSearchChange,
}: {
  disabled: boolean;
  selectedArtifacts: string[];
  onSelectArtifacts: (ids: string[]) => void;
  artifacts: Array<{ id: string; projectName: string; agentTitle: string; version: number }>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (id: string) => {
    if (selectedArtifacts.includes(id)) {
      onSelectArtifacts(selectedArtifacts.filter((v) => v !== id));
    } else {
      onSelectArtifacts([...selectedArtifacts, id]);
    }
  };

  const remove = (id: string) => {
    onSelectArtifacts(selectedArtifacts.filter((v) => v !== id));
  };

  const getArtifactName = (id: string) => {
    const artifact = artifacts.find((a) => a.id === id);
    if (!artifact) return "";
    return `${artifact.projectName.replace(/\s+/g, '')}-${artifact.agentTitle.replace(/\s+/g, '')}-v${artifact.version}`;
  };

  const searchedArtifacts = searchQuery
    ? artifacts.filter((a) =>
        `${a.projectName.replace(/\s+/g, '')}-${a.agentTitle.replace(/\s+/g, '')}-v${a.version}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : artifacts;

  return (
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
          Select from Artifacts
        </span>
      </div>

      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] flex items-center justify-between text-left transition-colors min-h-[46px] ${
            disabled
              ? "border-[#E9ECEF] cursor-not-allowed"
              : "border-[#CED4DA] hover:border-[#9CA1AA]"
          }`}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: disabled || selectedArtifacts.length === 0 ? "#898E99" : "#333A42",
            }}
          >
            {disabled
              ? "Select a project context first"
              : selectedArtifacts.length === 0
              ? "Select artifacts"
              : `${selectedArtifacts.length} artifact${selectedArtifacts.length > 1 ? "s" : ""} selected`}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={`text-[#6A757E] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Selected chips */}
        {selectedArtifacts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedArtifacts.map((id) => (
              <span
                key={id}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#CED4DA] bg-[#F0F1F2]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#495059",
                }}
              >
                {getArtifactName(id)}
                <button
                  type="button"
                  onClick={() => remove(id)}
                  className="text-[#898E99] hover:text-[#495059]"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {open && (
          <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg overflow-hidden">
            {/* Search field */}
            <div className="p-2 border-b border-[#E9ECEF]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search artifacts..."
                className="w-full px-3 py-2 text-sm border border-[#CED4DA] rounded-[4px] outline-none focus:border-[#1F73CF] focus:ring-1 focus:ring-[#1F73CF]/20"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#333A42",
                }}
              />
            </div>

            {/* Artifact list */}
            <div style={{ maxHeight: 240, overflowY: "auto" }}>
              {searchedArtifacts.length === 0 ? (
                <div className="px-4 py-6 text-center text-[#9CA1AA] text-sm">
                  No artifacts found
                </div>
              ) : (
                searchedArtifacts.map((artifact) => {
                  const selected = selectedArtifacts.includes(artifact.id);
                  const displayName = `${artifact.projectName.replace(/\s+/g, '')}-${artifact.agentTitle.replace(/\s+/g, '')}-v${artifact.version}`;
                  return (
                    <button
                      key={artifact.id}
                      type="button"
                      onClick={() => toggle(artifact.id)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#EBF3FB] transition-colors flex items-center gap-2"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: selected ? 500 : 400,
                        fontSize: 14,
                        color: selected ? "#1F73CF" : "#333A42",
                      }}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          selected
                            ? "bg-[#1F73CF] border-[#1F73CF]"
                            : "border-[#CED4DA] bg-white"
                        }`}
                      >
                        {selected && <Check size={10} className="text-white" />}
                      </div>
                      {displayName}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal file upload
function MinimalFileUpload({
  value,
  onChange,
}: {
  value: File[];
  onChange: (v: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    onChange([...value, ...arr]);
  };

  const remove = (name: string) => {
    onChange(value.filter((f) => f.name !== name));
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`rounded-[8px] border-2 border-dashed transition-colors p-4 ${
          dragging ? "border-[#1F73CF] bg-[#EBF3FB]" : "border-[#CED4DA] bg-[#FDFDFD]"
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
        <div className="flex flex-col items-center gap-2">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#616874",
              lineHeight: "18px",
            }}
          >
            Drag & drop or{" "}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-[#1F73CF] hover:underline"
              style={{ fontWeight: 500 }}
            >
              browse
            </button>
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#9CA1AA",
              lineHeight: "16px",
            }}
          >
            Supports .pdf, .txt, .doc, .docx, .pptx, .xls, .xlsx
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.doc,.docx,.pptx,.ppt,.html,.xls,.xlsx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* File chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((file) => (
            <span
              key={file.name}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#CED4DA] bg-[#F0F1F2]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: "#495059",
              }}
            >
              <FileText size={11} className="text-[#6A757E] shrink-0" />
              <span className="max-w-[140px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => remove(file.name)}
                className="text-[#898E99] hover:text-[#495059] ml-0.5"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Experiences field for User Scenarios agent
function ExperiencesField({
  value,
  onChange,
  input,
  onInputChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  input: string;
  onInputChange: (v: string) => void;
}) {
  const handleAdd = () => {
    if (!input.trim()) return;
    onChange([...value, input.trim()]);
    onInputChange("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
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
          Experiences
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#6A757E",
            lineHeight: "16px",
          }}
        >
          Paste experiences from the Roadmap Agent output
        </span>
      </div>

      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste experience text here..."
        rows={6}
        className="w-full px-4 py-3 rounded-[4px] border border-[#CED4DA] bg-[#FDFDFD] outline-none transition-colors focus:ring-1 focus:border-[#1F73CF] focus:ring-[#1F73CF]/20 resize-y"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#333A42",
          minHeight: 140,
        }}
      />

      <button
        type="button"
        onClick={handleAdd}
        disabled={!input.trim()}
        className="self-start px-4 py-2 rounded-[8px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: "#F8F9FA",
        }}
      >
        Add
      </button>

      {/* Experience chips */}
      {value.length > 0 && (
        <div className="flex flex-col gap-2">
          {value.map((exp, index) => (
            <div
              key={index}
              className="flex items-start gap-2 px-3 py-2.5 rounded-[8px] border border-[#CED4DA] bg-white"
            >
              <span
                className="flex-1 line-clamp-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#495059",
                  lineHeight: "18px",
                }}
              >
                {exp}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-[#898E99] hover:text-[#495059] shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Scenarios field for User Workflows agent
function ScenariosField({
  value,
  onChange,
  input,
  onInputChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  input: string;
  onInputChange: (v: string) => void;
}) {
  const exceedsLimit = value.length >= 3;

  const handleAdd = () => {
    if (!input.trim()) return;
    if (value.length >= 3) return;
    onChange([...value, input.trim()]);
    onInputChange("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
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
          Scenarios
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#6A757E",
            lineHeight: "16px",
          }}
        >
          Paste up to 3 scenarios from the User Scenario Agent output
        </span>
      </div>

      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste scenario text here..."
        rows={6}
        disabled={exceedsLimit}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 resize-y ${
          exceedsLimit
            ? "opacity-50 cursor-not-allowed border-[#E9ECEF]"
            : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#333A42",
          minHeight: 140,
        }}
      />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!input.trim() || exceedsLimit}
          className="px-4 py-2 rounded-[8px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#F8F9FA",
          }}
        >
          Add
        </button>
        {exceedsLimit && (
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#DC2626",
              lineHeight: "16px",
            }}
          >
            Maximum 3 scenarios allowed
          </span>
        )}
      </div>

      {/* Scenario chips */}
      {value.length > 0 && (
        <div className="flex flex-col gap-2">
          {value.map((scenario, index) => (
            <div
              key={index}
              className="flex items-start gap-2 px-3 py-2.5 rounded-[8px] border border-[#CED4DA] bg-white"
            >
              <span
                className="flex-1 line-clamp-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#495059",
                  lineHeight: "18px",
                }}
              >
                {scenario}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-[#898E99] hover:text-[#495059] shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Workflow Variations field for Consolidated Workflow agent
function WorkflowVariationsField({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
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
            Workflow Variation Names
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#DC2626",
            }}
          >
            *
          </span>
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="flex items-center justify-center text-[#6A757E] hover:text-[#333A42] transition-colors"
            >
              <Info size={14} strokeWidth={2} />
            </button>
            {showTooltip && (
              <div
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-2 rounded-[6px] bg-[#333A42] shadow-lg"
                style={{
                  minWidth: 280,
                  maxWidth: 320,
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#F8F9FA",
                    lineHeight: "16px",
                  }}
                >
                  List each scenario with its corresponding V1 workflow variation name. Follow the order: Scenario Name → Workflow Variation Name.
                </p>
                {/* Tooltip arrow */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-[#333A42] rotate-45"
                />
              </div>
            )}
          </div>
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#6A757E",
            lineHeight: "16px",
          }}
        >
          Paste the V1 workflow variation name for each scenario to generate the consolidated workflow
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Example structure:\nScenario 1 Name\nWorkflow Variation 1 Name\nScenario 2 Name\nWorkflow Variation 1 Name\nScenario 3 Name\nWorkflow Variation 1 Name`}
        rows={8}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 resize-y ${
          hasError
            ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20"
            : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#333A42",
          minHeight: 180,
        }}
      />

      {hasError && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#DC2626",
            lineHeight: "16px",
          }}
        >
          This field is required.
        </p>
      )}
    </div>
  );
}

// Scenario & Workflow field for Wireframe agent
function ScenarioWorkflowField({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
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
            Scenario & Workflow
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#DC2626",
            }}
          >
            *
          </span>
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#6A757E",
            lineHeight: "16px",
          }}
        >
          Paste the scenario name and workflow variation name to generate wireframes
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Scenario Name&#10;Workflow Variation Name"
        rows={6}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 resize-y ${
          hasError
            ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20"
            : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#333A42",
          minHeight: 140,
        }}
      />

      {hasError && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#DC2626",
            lineHeight: "16px",
          }}
        >
          This field is required.
        </p>
      )}
    </div>
  );
}

// Screen Prompts field for Content Design agent
function ScreenPromptsField({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
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
            Screen Prompts
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#DC2626",
            }}
          >
            *
          </span>
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#6A757E",
            lineHeight: "16px",
          }}
        >
          Paste the screen prompts for content generation
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste screen prompts here..."
        rows={6}
        className={`w-full px-4 py-3 rounded-[4px] border bg-[#FDFDFD] outline-none transition-colors focus:ring-1 resize-y ${
          hasError
            ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20"
            : "border-[#CED4DA] focus:border-[#1F73CF] focus:ring-[#1F73CF]/20"
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#333A42",
          minHeight: 140,
        }}
      />

      {hasError && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#DC2626",
            lineHeight: "16px",
          }}
        >
          This field is required.
        </p>
      )}
    </div>
  );
}

// Field label
function FieldLabel({ field }: { field: FormField }) {
  return (
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
          {field.label}
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
      {field.hint && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#495059",
            lineHeight: "16px",
          }}
        >
          {field.hint}
        </p>
      )}
    </div>
  );
}

// Toggle (yes / no switch)
function ToggleInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#333A42",
            lineHeight: "20px",
          }}
        >
          {field.label}
        </span>
        {field.hint && (
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#495059",
              lineHeight: "16px",
            }}
          >
            {field.hint}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative shrink-0 transition-colors"
        style={{
          width: 40,
          height: 22,
          borderRadius: 999,
          background: value ? "#1F73CF" : "#CED4DA",
        }}
      >
        <span
          className="absolute top-[3px] transition-all"
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#fff",
            left: value ? 21 : 3,
          }}
        />
      </button>
    </div>
  );
}

// ─── Persona artifact mini-upload (tertiary, for user_role fields) ──────────
function PersonaArtifactUpload({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {value ? (
        // File attached state
        <div className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-[#CED4DA] bg-[#F8F8F8]">
          <UserRound size={13} strokeWidth={1.5} className="text-[#1F73CF] shrink-0" />
          <span
            className="flex-1 truncate"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#333A42",
            }}
          >
            {value.name}
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[#898E99] hover:text-[#495059] transition-colors shrink-0"
            title="Remove persona artifact"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        // Upload trigger
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-[#6A757E] hover:text-[#1F73CF] transition-colors group"
        >
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full border border-dashed border-[#CED4DA] group-hover:border-[#1F73CF] transition-colors"
          >
            <Upload size={9} strokeWidth={2} />
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            Upload persona artifact
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#9CA1AA",
              lineHeight: "16px",
            }}
          >
            (optional)
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.doc,.docx,.md,.html"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function AgentForm({ agent, onGenerate, isGenerating, onOpenHistory, onOpenGlobalContext, artifactCount }: AgentFormProps) {
  const [submitted, setSubmitted] = useState(false);

  // New top-level fields
  const [projectContext, setProjectContext] = useState("");
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [artifactSearchQuery, setArtifactSearchQuery] = useState("");
  const [experiences, setExperiences] = useState<string[]>([]);
  const [experienceInput, setExperienceInput] = useState("");
  const [scenarios, setScenarios] = useState<string[]>([]);
  const [scenarioInput, setScenarioInput] = useState("");
  const [workflowVariations, setWorkflowVariations] = useState("");
  const [scenarioWorkflow, setScenarioWorkflow] = useState("");
  const [screenPrompts, setScreenPrompts] = useState("");

  // Mock data - replace with real data from context
  const projectContexts = ["Cloudnine", "Healthcare Portal", "E-commerce Platform"];
  const mockArtifacts = [
    { id: "1", projectName: "Cloudnine", agentTitle: "User Persona", version: 2 },
    { id: "2", projectName: "Cloudnine", agentTitle: "Journey Map", version: 1 },
    { id: "3", projectName: "Healthcare Portal", agentTitle: "Research Plan", version: 3 },
  ];

  // Reset form when agent changes
  const [agentId, setAgentId] = useState(agent.id);
  if (agent.id !== agentId) {
    setAgentId(agent.id);
    setProjectContext("");
    setSelectedArtifacts([]);
    setUploadedFiles([]);
    setAdditionalDetails("");
    setArtifactSearchQuery("");
    setExperiences([]);
    setExperienceInput("");
    setScenarios([]);
    setScenarioInput("");
    setWorkflowVariations("");
    setScenarioWorkflow("");
    setScreenPrompts("");
    setSubmitted(false);
  }

  // Validation: Project Context always required, plus agent-specific required fields
  const isFormValid = () => {
    if (!projectContext.trim()) return false;
    if (agent.id === "consolidated-workflows" && !workflowVariations.trim()) return false;
    if (agent.id === "wireframes-agent" && !scenarioWorkflow.trim()) return false;
    if (agent.id === "content-strategy-design-brief" && (!screenPrompts.trim() || uploadedFiles.length === 0)) return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid() || isGenerating) return;
    onGenerate({
      projectContext,
      selectedArtifacts,
      uploadedFiles,
      additionalDetails,
      experiences,
      scenarios,
      workflowVariations,
      scenarioWorkflow,
      screenPrompts,
    });
  };

  // Filter artifacts by selected project context
  const filteredArtifacts = projectContext
    ? mockArtifacts.filter((a) => a.projectName === projectContext)
    : [];

  return (
    <div className="flex flex-col h-full bg-[#F8F8F8]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 24,
                color: "#333A42",
                lineHeight: "32px",
              }}
            >
              {agent.title}
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
              {agent.description}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-1 shrink-0">
            {/* History button */}
            <button
              type="button"
              onClick={onOpenHistory}
              title="View artifact history"
              className="flex items-center gap-1 p-2 rounded-[8px] text-[#8F949C] hover:text-[#1F73CF] hover:bg-[#EBF3FB] transition-colors"
            >
            {artifactCount != null && artifactCount > 0 && (
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  minWidth: 18,
                  height: 18,
                  padding: "0 5px",
                  background: "#1F73CF",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#fff",
                  lineHeight: "18px",
                }}
              >
                {artifactCount}
              </span>
            )}
            <History size={18} strokeWidth={1.5} />
          </button>
          </div>
        </div>
      </div>

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <form id="agent-form" onSubmit={handleSubmit}>
          <div className="bg-white rounded-[12px] border border-[#E9ECEF] overflow-hidden">
            <div className="p-6 flex flex-col gap-6">

              {/* 1. Project Context - Required */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#333A42",
                        lineHeight: "20px",
                      }}
                    >
                      Project Context
                    </span>
                    <span style={{ color: "#DC2626", fontSize: 14 }}>*</span>
                  </div>
                </div>
                {projectContexts.length === 0 ? (
                  <div
                    className="w-full px-4 py-3 rounded-[4px] border border-[#CED4DA] bg-[#F8F8F8]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#9CA1AA",
                      lineHeight: "20px",
                    }}
                  >
                    No context added yet. Go to Project Contexts and add one.
                  </div>
                ) : (
                  <SelectInput
                    field={{
                      id: "project_context",
                      label: "Project Context",
                      type: "select",
                      options: projectContexts,
                    }}
                    value={projectContext}
                    onChange={setProjectContext}
                    hasError={submitted && !projectContext}
                  />
                )}
                {submitted && !projectContext && projectContexts.length > 0 && (
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#DC2626",
                      lineHeight: "16px",
                    }}
                  >
                    This field is required.
                  </p>
                )}
              </div>

              {/* 2. Select from Artifacts OR Experiences (for User Scenarios) OR Scenarios (for User Workflows) */}
              {agent.id === "scenarios-agent" ? (
                <ExperiencesField
                  value={experiences}
                  onChange={setExperiences}
                  input={experienceInput}
                  onInputChange={setExperienceInput}
                />
              ) : agent.id === "workflows-agent" ? (
                <ScenariosField
                  value={scenarios}
                  onChange={setScenarios}
                  input={scenarioInput}
                  onInputChange={setScenarioInput}
                />
              ) : (
                <ArtifactSelector
                  disabled={!projectContext}
                  selectedArtifacts={selectedArtifacts}
                  onSelectArtifacts={setSelectedArtifacts}
                  artifacts={filteredArtifacts}
                  searchQuery={artifactSearchQuery}
                  onSearchChange={setArtifactSearchQuery}
                />
              )}

              {/* 2b. Workflow Variations - Required for Consolidated Workflow agent */}
              {agent.id === "consolidated-workflows" && (
                <WorkflowVariationsField
                  value={workflowVariations}
                  onChange={setWorkflowVariations}
                  hasError={submitted && !workflowVariations.trim()}
                />
              )}

              {/* 2c. Scenario & Workflow - Required for Wireframe agent */}
              {agent.id === "wireframes-agent" && (
                <ScenarioWorkflowField
                  value={scenarioWorkflow}
                  onChange={setScenarioWorkflow}
                  hasError={submitted && !scenarioWorkflow.trim()}
                />
              )}

              {/* 2d. Screen Prompts - Required for Content Design agent */}
              {agent.id === "content-strategy-design-brief" && (
                <ScreenPromptsField
                  value={screenPrompts}
                  onChange={setScreenPrompts}
                  hasError={submitted && !screenPrompts.trim()}
                />
              )}

              {/* 3. Upload Files - Minimal (Mandatory for Content Design agent) */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
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
                    {agent.id === "content-strategy-design-brief" && (
                      <span style={{ color: "#DC2626", fontSize: 14 }}>*</span>
                    )}
                  </div>
                  {agent.id === "content-strategy-design-brief" && (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 12,
                        color: "#6A757E",
                        lineHeight: "16px",
                      }}
                    >
                      Wireframe screens must be uploaded in PDF or PNG/JPG format (mandatory)
                    </span>
                  )}
                </div>
                <MinimalFileUpload value={uploadedFiles} onChange={setUploadedFiles} />
                {agent.id === "content-strategy-design-brief" && submitted && uploadedFiles.length === 0 && (
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#DC2626",
                      lineHeight: "16px",
                    }}
                  >
                    This field is required.
                  </p>
                )}
              </div>

              {/* 4. Additional Details - Optional */}
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
                      Additional Details
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
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#495059",
                      lineHeight: "16px",
                    }}
                  >
                    Describe your ask or add any specific instructions
                  </p>
                </div>
                <textarea
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder={`e.g. ${agent.description}`}
                  rows={5}
                  className="w-full px-4 py-3 rounded-[4px] border border-[#CED4DA] bg-[#FDFDFD] outline-none transition-colors focus:ring-1 focus:border-[#1F73CF] focus:ring-[#1F73CF]/20 resize-y"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#333A42",
                    minHeight: 120,
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 px-6 py-4 border-t border-[#E9ECEF] bg-[#F8F8F8]">
        <button
          type="submit"
          form="agent-form"
          disabled={isGenerating}
          className="w-full h-[48px] rounded-[12px] flex items-center justify-center gap-2 transition-all cursor-pointer"
          style={{
            background:
              isFormValid() && !isGenerating
                ? "linear-gradient(156.703deg, #1F73CF 4.5155%, #1A62B2 110.9%)"
                : "linear-gradient(156.703deg, #9CA1AA 4.5155%, #898E99 110.9%)",
          }}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#F8F9FA",
                }}
              >
                Generating...
              </span>
            </>
          ) : (
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#F8F9FA",
              }}
            >
              Generate
            </span>
          )}
        </button>
      </div>
    </div>
  );
}