import { useState } from "react";
import {
  ChevronDown,
  Home,
  PanelLeft,
  Target,
  Microscope,
  Layers,
  MoreVertical,
  User,
  Lock,
  LogOut,
  FolderOpen,
} from "lucide-react";
import { agentGroups } from "../data/agents";
import UXStudioLogo from "../../imports/UX_Studio_LOGO.svg";

interface SidebarProps {
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  onHome: () => void;
  onProjectContexts: () => void;
  onViewProfile: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Map group id -> icon for expanded & collapsed views
const groupIconsExpanded: Record<string, React.ReactNode> = {
  strategy: <Target     size={18} strokeWidth={1.3} />,
  research: <Microscope size={18} strokeWidth={1.3} />,
  design:   <Layers     size={18} strokeWidth={1.3} />,
};

const groupIconsCollapsed: Record<string, React.ReactNode> = {
  strategy: <Target     size={20} strokeWidth={1.3} />,
  research: <Microscope size={20} strokeWidth={1.3} />,
  design:   <Layers     size={20} strokeWidth={1.3} />,
};

export function Sidebar({
  selectedAgentId,
  onSelectAgent,
  onHome,
  onProjectContexts,
  onViewProfile,
  onChangePassword,
  onLogout,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["research"])
  );
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleGroup = (groupId: string) => {
    if (isCollapsed) {
      // Expand sidebar first, then expand the group
      onToggleCollapse();
      setExpandedGroups(new Set([groupId]));
      return;
    }
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  // ─── Collapsed view ────────────────────────────────────────────────
  if (isCollapsed) {
    return (
      <div
        className="flex flex-col h-full bg-white items-center"
        style={{
          width: 56,
          borderRight: "1px solid #EAECEF",
          flexShrink: 0,
        }}
      >
        {/* Toggle button */}
        <div className="px-[12px] py-[24px] flex flex-col gap-[24px] items-center w-full">
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="flex items-center justify-center rounded-[4px] size-[24px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors shrink-0"
          >
            <PanelLeft size={20} strokeWidth={1.3} />
          </button>

          {/* Nav items */}
          <div className="flex flex-col gap-[10px] items-center w-full flex-1">
            {/* Home */}
            <button
              onClick={onHome}
              title="Home"
              className="flex items-center justify-center rounded-[4px] size-[24px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors"
            >
              <Home size={20} strokeWidth={1.3} />
            </button>

            {/* Project Contexts */}
            <button
              onClick={onProjectContexts}
              title="Project Contexts"
              className="flex items-center justify-center rounded-[4px] size-[24px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors"
            >
              <FolderOpen size={20} strokeWidth={1.3} />
            </button>

            {/* Divider */}
            <div className="w-full h-px bg-[#E9ECEF] shrink-0" />

            {/* Agent group icons */}
            {agentGroups.map((group) => {
              const hasActiveChild = group.children.some(
                (c) => c.id === selectedAgentId
              );
              return (
                <button
                  key={group.id}
                  onClick={() => toggleGroup(group.id)}
                  title={group.label}
                  className="flex items-center justify-center rounded-[4px] size-[24px] transition-colors"
                  style={{
                    color: hasActiveChild ? "#1F73CF" : "#6A757E",
                  }}
                >
                  <span className="hover:text-[#333A42] transition-colors">
                    {groupIconsCollapsed[group.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer – Avatar */}
        <div className="mt-auto w-full border-t border-[#CED4DA] px-[12px] py-[24px] flex items-center justify-center">
          <button
            onClick={() => {
              onToggleCollapse();
              setProfileMenuOpen(true);
            }}
            title="Profile"
            className="flex items-center justify-center rounded-[4px] size-[32px] shrink-0"
            style={{
              background: "#495059",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "white",
            }}
          >
            R
          </button>
        </div>
      </div>
    );
  }

  // ─── Expanded view ──────────────────────────────────────────────────
  return (
    <div
      className="flex flex-col h-full bg-white"
      style={{
        width: 300,
        borderRight: "1px solid #EAECEF",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div className="px-[12px] py-[24px] flex flex-col gap-[24px] flex-1 min-h-0 overflow-hidden">
        {/* Logo row */}
        <div className="flex items-center justify-between px-[4px]">
          <div className="flex items-center gap-0">
            {/* UXstudio SVG logo */}
            <img
              src={UXStudioLogo}
              alt="UXstudio"
              style={{ height: 19, width: "auto" }}
            />
          </div>
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="flex items-center justify-center rounded-[4px] size-[24px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors shrink-0"
          >
            <PanelLeft size={20} strokeWidth={1.3} />
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-[10px] min-h-0">
          {/* Home */}
          <div
            className="bg-white rounded-[8px] shrink-0 w-full"
          >
            <button
              onClick={onHome}
              className="flex items-center gap-[6px] w-full px-[8px] py-[8px] rounded-[8px] hover:bg-[#F0F1F2] transition-colors text-left"
            >
              <Home
                size={20}
                strokeWidth={1.3}
                className="shrink-0"
                style={{ color: "#6A757E" }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#3D3D3E",
                  lineHeight: "24px",
                }}
              >UXreactor Overview</span>
            </button>
          </div>

          {/* Project Contexts */}
          <div
            className="bg-white rounded-[8px] shrink-0 w-full"
          >
            <button
              onClick={onProjectContexts}
              className="flex items-center gap-[6px] w-full px-[8px] py-[8px] rounded-[8px] hover:bg-[#F0F1F2] transition-colors text-left"
            >
              <FolderOpen
                size={20}
                strokeWidth={1.3}
                className="shrink-0"
                style={{ color: "#6A757E" }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#3D3D3E",
                  lineHeight: "24px",
                }}
              >
                Project Contexts
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#EBEEF2] shrink-0" />

          {/* AGENTS label */}
          <div className="w-full">
            <div className="px-[8px]">
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#777B7F",
                  letterSpacing: "0.024px",
                  lineHeight: "16px",
                }}
              >
                AGENTS
              </p>
            </div>
          </div>

          {/* Agent groups */}
          {agentGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const hasActiveChild = group.children.some(
              (c) => c.id === selectedAgentId
            );

            return (
              <div key={group.id} className="flex flex-col gap-0 shrink-0">
                {/* Group header */}
                <div className="bg-white rounded-[8px]">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex items-center gap-[2px] w-full px-[8px] py-[8px] rounded-[8px] hover:bg-[#F0F1F2] transition-colors"
                  >
                    <div className="flex flex-1 items-center gap-[6px] min-w-0">
                      <span
                        style={{
                          color: hasActiveChild ? "#1F73CF" : "#6A757E",
                        }}
                        className="shrink-0"
                      >
                        {groupIconsExpanded[group.id]}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          color: hasActiveChild ? "#1F73CF" : "#3D3D3E",
                          lineHeight: "24px",
                        }}
                      >
                        {group.label}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      strokeWidth={1.3}
                      className="shrink-0 transition-transform"
                      style={{
                        color: "#ADB5BD",
                        transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                    />
                  </button>
                </div>

                {/* Children */}
                {isExpanded && (
                  <div className="ml-[28px] border-l border-[#E9ECEF] pl-2 mt-0.5">
                    {group.children.map((agent) => {
                      const isActive = agent.id === selectedAgentId;
                      return (
                        <button
                          key={agent.id}
                          onClick={() => onSelectAgent(agent.id)}
                          className="w-full text-left px-[8px] py-[5px] rounded-[6px] transition-colors hover:bg-[#EBF3FB] mb-0.5"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: isActive ? 600 : 400,
                            fontSize: 13,
                            color: isActive ? "#1F73CF" : "#495059",
                            background: isActive ? "#EBF3FB" : "transparent",
                          }}
                        >
                          {agent.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer – User profile */}
      <div className="shrink-0 border-t border-[#CED4DA] w-full">
        <div className="relative">
          <div className="flex items-center gap-[15px] px-[6px] py-[16px]">
            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-[4px] shrink-0 size-[32px]"
              style={{
                background: "#495059",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "white",
              }}
            >
              R
            </div>

            {/* Name + email */}
            <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
              <p
                className="truncate"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#333A42",
                  lineHeight: "20px",
                }}
              >
                Rimsha Humaira
              </p>
              <p
                className="truncate"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#495059",
                  letterSpacing: "0.024px",
                  lineHeight: "16px",
                }}
              >
                rhumaira@uxreactor.com
              </p>
            </div>

            {/* ⋮ menu button */}
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center justify-center rounded-[4px] size-[24px] text-[#6A757E] hover:text-[#333A42] hover:bg-[#F0F1F2] transition-colors shrink-0"
            >
              <MoreVertical size={20} strokeWidth={1.3} />
            </button>
          </div>

          {/* Profile mini-menu */}
          {profileMenuOpen && (
            <div
              className="absolute bottom-full right-2 mb-1 bg-white border border-[#E9ECEF] rounded-[8px] shadow-lg overflow-hidden"
              style={{ zIndex: 100, minWidth: 180 }}
            >
              <button
                onClick={() => { setProfileMenuOpen(false); onViewProfile(); }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left hover:bg-[#F0F1F2] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "#333A42" }}
              >
                <User size={14} strokeWidth={1.5} className="text-[#6A757E]" />
                View Profile
              </button>
              <button
                onClick={() => { setProfileMenuOpen(false); onChangePassword(); }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left hover:bg-[#F0F1F2] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "#333A42" }}
              >
                <Lock size={14} strokeWidth={1.5} className="text-[#6A757E]" />
                Change Password
              </button>
              <div className="h-px bg-[#E9ECEF] mx-2" />
              <button
                onClick={() => { setProfileMenuOpen(false); onLogout(); }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left hover:bg-[#FEF2F2] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "#DC2626" }}
              >
                <LogOut size={14} strokeWidth={1.5} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}