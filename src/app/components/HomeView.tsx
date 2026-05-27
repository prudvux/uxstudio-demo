import UXreactorOverview from "../../imports/UXreactorOverview/UXreactorOverview";

interface ArtifactEntry {
  id: string;
  agentId: string;
  agentTitle: string;
  projectName: string;
  version: number;
  content: string;
  personaName?: string;
  createdAt: Date;
}

interface HomeViewProps {
  onSelectAgent: (agentId: string) => void;
  artifacts: ArtifactEntry[];
}

export function HomeView({ onSelectAgent, artifacts }: HomeViewProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F8F8]">
      <UXreactorOverview />
    </div>
  );
}
