import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { AgentForm } from "../components/AgentForm";
import { ResultsPanel } from "../components/ResultsPanel";
import { HomeView } from "../components/HomeView";
import { HistoryPanel, type ArtifactEntry } from "../components/HistoryPanel";
import { ProfileModal } from "../components/ProfileModal";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { getAgentById } from "../data/agents";
import { generateMockContent } from "../data/mockContent";
import { GlobalContextDrawer } from "../components/GlobalContextDrawer";
import { ProjectContextsPage } from "./ProjectContextsPage";

interface RefinementEntry {
  id: string;
  prompt: string;
  timestamp: Date;
}

export function MainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>("secondary-research");
  const [showHome, setShowHome] = useState(false);
  const [showProjectContexts, setShowProjectContexts] = useState(false);

  // Results state
  const [result, setResult] = useState<{
    content: string;
    personaName?: string;
    agentTitle: string;
    projectName: string;
    version: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinements, setRefinements] = useState<RefinementEntry[]>([]);

  // Artifact history
  const [artifacts, setArtifacts] = useState<ArtifactEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Profile modal
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  // Global context drawer
  const [globalContextOpen, setGlobalContextOpen] = useState(false);

  const selectedAgent = selectedAgentId ? getAgentById(selectedAgentId) : null;

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setShowHome(false);
    setShowProjectContexts(false);
    setHistoryOpen(false);
    // Reset results when switching agents
    setResult(null);
    setRefinements([]);
  };

  const handleHome = () => {
    setShowHome(true);
    setShowProjectContexts(false);
    setSelectedAgentId(null);
    setResult(null);
    setRefinements([]);
    setHistoryOpen(false);
  };

  const handleProjectContexts = () => {
    setShowProjectContexts(true);
    setShowHome(false);
    setSelectedAgentId(null);
    setResult(null);
    setRefinements([]);
    setHistoryOpen(false);
  };

  const handleGenerate = (values: Record<string, unknown>) => {
    if (!selectedAgent) return;
    setIsGenerating(true);
    setResult(null);
    setRefinements([]);

    setTimeout(() => {
      const { content, personaName } = generateMockContent(selectedAgent.id, values);
      const projectName = (values.projectContext as string) || "Cloudnine";

      // Calculate version: find existing artifacts for this project + agent combo and increment
      const existingVersions = artifacts
        .filter((a) => a.projectName === projectName && a.agentId === selectedAgent.id)
        .map((a) => a.version);
      const version = existingVersions.length > 0 ? Math.max(...existingVersions) + 1 : 1;

      const newResult = {
        content,
        personaName,
        agentTitle: selectedAgent.title,
        projectName,
        version,
      };
      setResult(newResult);
      setIsGenerating(false);

      // Save to artifact history
      const entry: ArtifactEntry = {
        id: Date.now().toString(),
        agentId: selectedAgent.id,
        agentTitle: selectedAgent.title,
        projectName,
        version,
        content,
        personaName,
        createdAt: new Date(),
      };
      setArtifacts((prev) => [entry, ...prev]);
    }, 1800 + Math.random() * 800);
  };

  const handleRefine = (prompt: string) => {
    if (!result) return;
    setIsRefining(true);

    const newRefinement: RefinementEntry = {
      id: Date.now().toString(),
      prompt,
      timestamp: new Date(),
    };

    setTimeout(() => {
      const refinedContent =
        result.content +
        `\n\n---\n\n## ✦ Refined: ${prompt}\n\n` +
        generateRefinementAddition(prompt);

      setResult((prev) => (prev ? { ...prev, content: refinedContent } : null));
      setRefinements((prev) => [...prev, newRefinement]);
      setIsRefining(false);

      // Update the most recent artifact for this agent with refined content
      setArtifacts((prev) => {
        const idx = prev.findIndex(
          (a) => a.agentId === selectedAgentId
        );
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], content: refinedContent };
        return updated;
      });
    }, 1200 + Math.random() * 600);
  };

  const handleCloseResults = () => {
    setResult(null);
    setRefinements([]);
  };

  const handleOpenArtifact = (artifact: ArtifactEntry) => {
    // Navigate to the agent and show the artifact
    setSelectedAgentId(artifact.agentId);
    setShowHome(false);
    setShowProjectContexts(false);
    setHistoryOpen(false);
    setResult({
      content: artifact.content,
      personaName: artifact.personaName,
      agentTitle: artifact.agentTitle,
      projectName: artifact.projectName,
      version: artifact.version,
    });
    setRefinements([]);
  };

  const handleDeleteArtifact = (artifactId: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== artifactId));
  };

  // Determine layout
  const hasResults = result !== null || isGenerating;

  // Auto-collapse sidebar when results panel opens, restore when closed
  useEffect(() => {
    if (hasResults) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [hasResults]);

  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F8F8]">
      {/* Sidebar – self-collapsing, no separate icon bar */}
      <Sidebar
        selectedAgentId={selectedAgentId}
        onSelectAgent={handleSelectAgent}
        onHome={handleHome}
        onProjectContexts={handleProjectContexts}
        onViewProfile={() => setProfileOpen(true)}
        onChangePassword={() => setPasswordOpen(true)}
        onLogout={() => navigate("/")}
        isCollapsed={!sidebarOpen}
        onToggleCollapse={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content area */}
      <div className="flex flex-1 min-w-0 overflow-hidden relative">
        {showProjectContexts ? (
          <ProjectContextsPage />
        ) : showHome || !selectedAgent ? (
          <HomeView onSelectAgent={handleSelectAgent} artifacts={artifacts} />
        ) : (
          <>
            {/* Form panel */}
            <div
              className="overflow-hidden flex flex-col shrink-0"
              style={{
                width: hasResults ? "420px" : "100%",
                maxWidth: hasResults ? "420px" : "680px",
                margin: hasResults ? "0" : "0 auto",
                transition: "width 0.3s ease, max-width 0.3s ease",
              }}
            >
              <AgentForm
                key={selectedAgent.id}
                agent={selectedAgent}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                onOpenHistory={() => setHistoryOpen(true)}
                onOpenGlobalContext={() => setGlobalContextOpen(true)}
                artifactCount={artifacts.filter((a) => a.agentId === selectedAgent.id).length}
              />
            </div>

            {/* Results panel */}
            {hasResults && (
              <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
                {isGenerating && !result ? (
                  <GeneratingState agentTitle={selectedAgent.title} />
                ) : result ? (
                  <ResultsPanel
                    agentTitle={result.agentTitle}
                    projectName={result.projectName}
                    version={result.version}
                    personaName={result.personaName}
                    content={result.content}
                    onRefine={handleRefine}
                    onClose={handleCloseResults}
                    isRefining={isRefining}
                    refinements={refinements}
                  />
                ) : null}
              </div>
            )}
          </>
        )}

        {/* History panel overlay */}
        <HistoryPanel
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          artifacts={artifacts}
          currentAgentId={selectedAgentId}
          onOpen={handleOpenArtifact}
          onDelete={handleDeleteArtifact}
        />

        {/* Global context drawer */}
        <GlobalContextDrawer
          isOpen={globalContextOpen}
          onClose={() => setGlobalContextOpen(false)}
        />
      </div>

      {/* Profile modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {/* Change password modal */}
      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
}

function GeneratingState({ agentTitle }: { agentTitle: string }) {
  return (
    <div
      className="flex flex-col h-full bg-[#F8F8F8]"
      style={{ borderLeft: "1px solid #CED4DA" }}
    >
      {/* Header placeholder */}
      <div
        className="shrink-0 bg-white border-b border-[#CED4DA] px-4 py-3"
        style={{ minHeight: 56 }}
      >
        <div className="h-5 w-48 bg-[#F0F1F2] rounded animate-pulse" />
      </div>

      {/* Loading content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Animated gradient orb */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(31,115,207,0.3) 0%, rgba(26,98,178,0.1) 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute w-12 h-12 rounded-full animate-spin"
            style={{
              background: "conic-gradient(from 0deg, #1F73CF, #A8D2F1, #1F73CF)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)",
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#333A42",
            }}
          >
            Generating {agentTitle}...
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#6A757E",
            }}
          >
            AI is crafting your document
          </p>
        </div>

        {/* Skeleton lines */}
        <div className="flex flex-col gap-3 w-64">
          {[80, 100, 60, 90, 70].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-[#E9ECEF] rounded animate-pulse"
              style={{ width: `${w}%`, animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function generateRefinementAddition(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("junior") || lowerPrompt.includes("entry")) {
    return `This persona has been updated to reflect a more junior profile. The experience level has been adjusted to 1–3 years, with a focus on learning and growing within their role. They rely more heavily on guidance from senior colleagues and are more open to new tools and workflows.

**Updated attributes:**
- **Experience:** 1–3 years in the field
- **Tech Comfort:** High — early adopters who embrace new technology
- **Key Motivation:** Building expertise and proving value to their team
- **Primary Frustration:** Lack of clear guidance and onboarding for new tools`;
  }

  if (lowerPrompt.includes("senior") || lowerPrompt.includes("expert")) {
    return `This persona has been refined to reflect a more senior, expert profile with deeper domain expertise and higher expectations for tool quality.

**Updated attributes:**
- **Experience:** 15+ years in the field
- **Tech Comfort:** Selective — prefers proven tools over novelty
- **Key Motivation:** Efficiency and reliability above all else
- **Primary Frustration:** Tools that change without notice or don't respect their workflow`;
  }

  if (lowerPrompt.includes("mobile") || lowerPrompt.includes("phone")) {
    return `Mobile usage patterns have been added to this persona's profile based on your refinement request.

**Mobile Behavior:**
- Uses mobile primarily for quick checks and communication, not deep work
- Frustrated by forms that don't work well on small screens
- Prefers native apps over mobile web experiences
- Key mobile use cases: status checks, notifications, quick approvals
- Carries both personal and work phones — prefers single-device solution`;
  }

  return `Based on your refinement ("${prompt}"), the following additions have been made to this document:

- The content has been adjusted to better reflect the specified context
- Key sections have been revised for improved accuracy and relevance
- Additional detail has been added based on the refinement prompt
- Recommendations have been updated to align with the new direction

This refined version incorporates your feedback and builds on the original output with greater specificity and depth.`;
}