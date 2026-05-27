export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect" | "toggle" | "file";
  placeholder?: string;
  required?: boolean;   // key field — shown prominently above Additional Information
  optional?: boolean;   // additional field — shown inside collapsible section
  hint?: string;
  options?: string[];
}

export interface AgentConfig {
  id: string;
  title: string;
  description: string;
  addContextHint?: string;
  fields: FormField[];
}

export interface AgentGroup {
  id: string;
  label: string;
  icon: string;
  children: AgentConfig[];
}

// ─── Helper ────────────────────────────────────────────────────────────────
export function getAgentById(id: string): AgentConfig | undefined {
  for (const group of agentGroups) {
    const found = group.children.find((a) => a.id === id);
    if (found) return found;
  }
  return undefined;
}

// ─── All agent names in display order (used for Run Supporting Agents) ─────
export const allAgentNames: string[] = [
  "Secondary Research",
  "Research Plan",
  "Discussion Guide",
  "Research Narrative",
  "Research Note Taking",
  "Research Intelligence",
  "UX Engagement Assessment",
  "UX Requirements",
  "User Persona",
  "Experience Ecosystem",
  "User Journey Map",
  "Experience Vision",
  "Experience Roadmap",
  "User Scenarios",
  "Design Brief",
  "User Workflows",
  "Consolidated Workflow",
  "Content Guidelines",
  "Content Design",
  "Experience Wireframing",
];

// ─── Agent groups ──────────────────────────────────────────────────────────
export const agentGroups: AgentGroup[] = [

  // ══════════════════════════════════════════════
  //  RESEARCH
  // ══════════════════════════════════════════════
  {
    id: "research",
    label: "Research",
    icon: "microscope",
    children: [
      {
        id: "secondary-research",
        title: "Secondary Research",
        description:
          "Synthesize domain knowledge, competitive benchmarks, and market trends into a cited landscape.",
        addContextHint: "Upload your Business Idea document for best results",
        fields: [],
      },
      {
        id: "research-plan",
        title: "Research Plan",
        description:
          "Structure a study design with methods, participants, screeners, and timelines.",
        addContextHint: "Upload Secondary Research and Experience Ecosystem outputs for best results",
        fields: [],
      },
      {
        id: "research-discussion",
        title: "Discussion Guide",
        description:
          "Generate an interview script with probing prompts structured for your research intent.",
        addContextHint: "Upload Research Plan and Secondary Research outputs for best results",
        fields: [],
      },
      {
        id: "research-narrative",
        title: "Research Narrative",
        description:
          "Transform raw research findings into a compelling, stakeholder-ready narrative that drives decisions.",
        addContextHint: "Upload Discussion Guide, Secondary Research, and Research Intelligence outputs for best results",
        fields: [],
      },
      {
        id: "research-note-taking",
        title: "Research Note Taking",
        description:
          "Produce structured notes and observations from session transcripts.",
        addContextHint: "Upload session transcript, Secondary Research, Research Plan, and Discussion Guide for best results",
        fields: [],
      },
      {
        id: "research-intelligence",
        title: "Research Intelligence",
        description:
          "Synthesize research findings into insights with evidence chains and opportunity areas.",
        addContextHint: "Upload Research Notes, Discussion Guide, Research Plan, and Secondary Research for best results",
        fields: [],
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  STRATEGY
  // ══════════════════════════════════════════════
  {
    id: "strategy",
    label: "Strategy",
    icon: "target",
    children: [
      {
        id: "ux-engagement-assessment",
        title: "UX Engagement Assessment",
        description:
          "Evaluate engagement readiness, identify risks, and set expectations before work begins.",
        addContextHint: "Upload your Business Idea document or PRD for best results",
        fields: [],
      },
      {
        id: "ux-requirements",
        title: "UX Requirements",
        description:
          "Extract and enrich UX requirements from source documents to align teams before design begins.",
        addContextHint: "Upload UX Engagement Assessment, Experience Ecosystem, and Research Intelligence outputs for best results",
        fields: [],
      },
      {
        id: "user-personas",
        title: "User Persona",
        description:
          "Generate user archetypes with behavioural depth to guide design decisions.",
        addContextHint: "Upload Research Intelligence and Experience Ecosystem outputs for best results",
        fields: [],
      },
      {
        id: "experience-ecosystem",
        title: "Experience Ecosystem",
        description:
          "Map all users, objects, and relationships surrounding a product or service.",
        addContextHint: "Upload your Secondary Research output for best results",
        fields: [],
      },
      {
        id: "journey-map",
        title: "User Journey Map",
        description:
          "Document the end-to-end user journey across touchpoints, emotions, and pain points.",
        addContextHint: "Upload Research Intelligence, Secondary Research, and User Persona for best results",
        fields: [],
      },
      {
        id: "experience-vision",
        title: "Experience Vision",
        description:
          "Define a north star experience vision that aligns teams around a shared future state.",
        addContextHint: "Upload Secondary Research, User Persona, and User Journey Map for best results",
        fields: [],
      },
      {
        id: "experience-roadmap",
        title: "Experience Roadmap",
        description:
          "Build a prioritized roadmap of experience improvements aligned to business and user goals.",
        addContextHint: "Upload Experience Ecosystem, Research Intelligence, User Persona, and Experience Vision for best results",
        fields: [],
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DESIGN
  // ══════════════════════════════════════════════
  {
    id: "design",
    label: "Design",
    icon: "layout",
    children: [
      {
        id: "scenarios-agent",
        title: "User Scenarios",
        description:
          "Create detailed narrative scenarios that describe how users attempt to achieve goals.",
        addContextHint: "Upload Experience Roadmap and Experience Vision for best results",
        fields: [],
      },
      {
        id: "design-brief",
        title: "Design Brief",
        description:
          "Create a stakeholder alignment document that defines goals, scope, and design direction.",
        addContextHint: "Upload User Persona, User Scenarios, Experience Roadmap, and UX Requirements for best results",
        fields: [],
      },
      {
        id: "workflows-agent",
        title: "User Workflows",
        description:
          "Map screen-level flows with 2–4 variations for key user experiences.",
        addContextHint: "Upload Experience Roadmap, Design Brief, and User Scenarios for best results",
        fields: [],
      },
      {
        id: "consolidated-workflows",
        title: "Consolidated Workflow",
        description:
          "Merge multiple user workflows into a system-level unified view.",
        addContextHint: "Upload User Persona and User Workflows output for best results",
        fields: [],
      },
      {
        id: "content-guidelines",
        title: "Content Guidelines",
        description:
          "Define the voice, tone, and writing rules that govern content across the product experience.",
        addContextHint: "Upload Secondary Research, User Persona, and Wireframe for best results",
        fields: [],
      },
      {
        id: "content-strategy-design-brief",
        title: "Content Design",
        description:
          "Produce a combined content strategy and design brief to align teams on copy, structure, and intent.",
        addContextHint: "Upload Consolidated Workflow, Wireframe, and Content Guidelines for best results",
        fields: [],
      },
      {
        id: "wireframes-agent",
        title: "Experience Wireframing",
        description:
          "Generate screen prompts and wireframe descriptions ready for prototyping tools.",
        addContextHint: "Upload Consolidated Workflow, Content Design, and Content Guidelines for best results",
        fields: [
          { id: "device_type", label: "Device Type", type: "select",
            required: true,
            hint: "Select the device type for your wireframe.",
            options: ["Mobile", "Web", "Both"] },
        ],
      },
    ],
  },
];
