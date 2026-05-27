export function generateMockContent(agentId: string, values: Record<string, unknown>): { content: string; personaName?: string } {
  switch (agentId) {
    case "user-personas":
      return generatePersona(values);
    case "journey-map":
      return generateJourneyMap(values);
    case "research-plan":
      return generateResearchPlan(values);
    case "research-synthesis":
      return generateSynthesis(values);
    case "design-brief":
      return generateDesignBrief(values);
    case "secondary-research":
      return generateSecondaryResearch(values);
    case "experience-ecosystem":
      return generateExperienceEcosystem(values);
    case "experience-roadmap":
      return generateExperienceRoadmap(values);
    case "ux-requirements":
      return generateUXRequirements(values);
    case "ux-engagement-assessment":
      return generateEngagementAssessment(values);
    case "research-discussion":
      return generateDiscussionGuide(values);
    case "research-note-taking":
      return generateNotes(values);
    case "research-intelligence":
      return generateSynthesis(values);
    case "research-narrative":
      return generateResearchNarrative(values);
    case "experience-vision":
      return generateExperienceVision(values);
    case "content-guidelines":
      return generateContentGuidelines(values);
    case "content-strategy-design-brief":
      return generateContentStrategyDesignBrief(values);
    case "wireframes-agent":
      return generateWireframes(values);
    // New / renamed agents — fall to generic with a label
    case "scenarios-agent":
    case "workflows-agent":
      return generateGeneric(agentId, values);
    default:
      return generateGeneric(agentId, values);
  }
}

function generatePersona(values: Record<string, unknown>): { content: string; personaName?: string } {
  const role = (values["persona_role"] as string) || "Healthcare Professional";
  const project = (values["project"] as string) || "Digital Health Platform";

  const name = getPersonaName(role);
  const age = 35 + Math.floor(Math.random() * 20);

  const content = `# User Persona: ${name}

A ${age}-year-old ${role} navigating the intersection of traditional practice and digital healthcare.

## Background

**Name:** ${name}
**Age:** ${age}
**Role:** ${role}
**Experience:** ${8 + Math.floor(Math.random() * 15)}+ years in practice
**Location:** ${getLocation()}
**Project:** ${project}

## Tech Proficiency

**Comfort Level:** ${getTechLevel()} user who has adapted by necessity rather than passion

${name} is proficient with essential software and systems required for their practice. They confidently use core digital tools but find themselves frustrated when systems update or new technologies are introduced without adequate training.

## Daily Tech Usage

- Morning: Reviews schedule and priority tasks on desktop
- Working hours: Uses primary workflow system for core activities
- Afternoon: Checks analytics and performance dashboards
- Evening: Responds to messages through secure communication tools

## Pain Points

- **Information overload:** Too many systems with duplicate or conflicting data
- **Slow workflows:** Multi-step processes that interrupt focus
- **Poor mobile experience:** Desktop-optimized tools that break on smaller screens
- **Training gaps:** New features rolled out without proper onboarding
- **Integration issues:** Tools that don't talk to each other effectively

## Goals & Motivations

- Reduce time spent on administrative tasks by at least 40%
- Have a single source of truth for all relevant information
- Be able to work efficiently from any device or location
- Feel confident using technology without needing constant IT support

## Frustrations

- "I just want things to work — I shouldn't need a manual for every update."
- "I waste so much time switching between apps just to complete one task."
- "The mobile version is almost unusable — I end up waiting until I'm at my desk."

## Key Insights

${name} represents a large segment of power users who are capable but time-constrained. They adopt technology pragmatically and become loyal advocates when tools genuinely solve their problems. They have low tolerance for friction and high expectations for reliability.

## Design Implications

- Prioritize speed and task completion over feature richness
- Ensure mobile-first design that matches desktop capabilities
- Provide contextual guidance and tooltips — not separate training
- Reduce the number of steps required for common tasks
- Build trust through consistent, predictable behavior`;

  return { content, personaName: name };
}

function generateJourneyMap(values: Record<string, unknown>): { content: string } {
  const persona = (values["persona"] as string) || "Primary User";
  const scenario = (values["scenario"] as string) || "completing a core workflow task";

  const content = `# Journey Map: ${persona}

**Scenario:** ${scenario}

## Phase 1: Awareness & Initiation

**What they do:** ${persona} recognizes a need or receives a trigger (notification, request, or deadline) that initiates the task.

**Thoughts:** "I need to get this done efficiently — let's see how long this takes today."

**Emotions:** 😐 Neutral → slightly anxious about time

**Touchpoints:** Mobile notification, email, primary platform dashboard

**Opportunities:** Reduce time-to-action by surfacing priority tasks on the home screen.

---

## Phase 2: Information Gathering

**What they do:** Searches for relevant information across multiple systems to prepare for the task.

**Thoughts:** "Why is this data in three different places? This is frustrating."

**Emotions:** 😕 Frustrated → overwhelmed

**Touchpoints:** Secondary system, documentation portal, colleague communication

**Pain Points:** Data scattered across systems; no unified view

**Opportunities:** Create a consolidated summary view that aggregates key information before task start.

---

## Phase 3: Core Task Execution

**What they do:** Begins the primary workflow — entering data, making decisions, or completing the core action.

**Thoughts:** "This part I know — as long as nothing breaks."

**Emotions:** 😊 Focused → confident when things work as expected

**Touchpoints:** Primary workflow interface, data entry forms, action buttons

**Opportunities:** Streamline the most common path. Surface smart defaults and pre-fill where possible.

---

## Phase 4: Review & Verification

**What they do:** Reviews outputs for accuracy, makes corrections if needed, and prepares to finalize.

**Thoughts:** "I always double-check — too many errors have slipped through before."

**Emotions:** 😐 Cautious → relieved when everything looks right

**Touchpoints:** Review screens, confirmation dialogs, print/export options

**Pain Points:** Lack of clear error states; confusing confirmation language

**Opportunities:** Add a clear summary view before final submission. Use plain-language confirmations.

---

## Phase 5: Completion & Follow-up

**What they do:** Completes the task and monitors for any downstream actions or notifications.

**Emotions:** 😊 Satisfied → looking for confirmation of completion

**Touchpoints:** Confirmation screen, email receipt, status dashboard

**Opportunities:** Provide a meaningful success state with clear next steps.

---

## Key Insights

- The biggest drop-off in satisfaction occurs in Phase 2 (Information Gathering)
- Users who have clear next steps at Phase 5 complete follow-up tasks 3x more often
- Mobile experience needs parity with desktop for Phases 3 and 4`;

  return { content };
}

function generateResearchPlan(values: Record<string, unknown>): { content: string } {
  const goal = (values["research_goal"] as string) || "Understand user needs and behaviors";
  const methods = (values["method"] as string[]) || ["User Interviews", "Usability Testing"];

  const content = `# Research Plan

**Research Goal:** ${goal}

**Methods:** ${methods.length > 0 ? methods.join(", ") : "User Interviews, Usability Testing"}

---

## Research Objectives

1. Understand current workflows and identify friction points
2. Identify unmet needs and opportunities for improvement
3. Validate key design assumptions with real users
4. Gather quantitative and qualitative insights to inform design decisions

## Research Questions

**Primary Questions:**
- How do users currently accomplish their goals within the existing system?
- What are the biggest pain points in the current experience?
- What workarounds have users created to solve problems the system doesn't address?

**Secondary Questions:**
- How tech-savvy are our primary users?
- What mental models do users bring to this experience?
- What would make this tool indispensable to them?

## Methodology

### ${methods[0] || "User Interviews"}
- **Duration:** 45–60 minutes per session
- **Format:** Remote via video call (recorded with consent)
- **Participants:** 6–8 representative users
- **Guide:** Semi-structured with open-ended questions

${methods[1] ? `### ${methods[1]}
- **Duration:** 30–45 minutes per session
- **Format:** Think-aloud protocol with task scenarios
- **Participants:** 5–6 users (can overlap with interview cohort)
- **Tasks:** 3–5 key tasks based on core workflows` : ""}

## Participant Criteria

**Primary segment:**
- Current users of the product/service (or comparable tool)
- Range of experience levels (novice to expert)
- Mix of demographics relevant to the target audience

**Recruitment approach:**
- Internal stakeholder referrals
- CRM outreach to existing customers
- Screener survey to ensure fit

## Timeline

| Week | Activity |
|------|----------|
| Week 1 | Finalize screener, recruit participants, prep discussion guide |
| Week 2 | Run sessions (Days 1–3), debrief and note-taking (Days 4–5) |
| Week 3 | Analysis and synthesis |
| Week 4 | Report writing and readout |

## Deliverables

- Research discussion guide
- Session recordings and transcripts
- Affinity diagram / thematic clustering
- Key insights report (with quotes and evidence)
- Design recommendations with prioritization`;

  return { content };
}

function generateSynthesis(values: Record<string, unknown>): { content: string } {
  const summary = (values["research_summary"] as string) || "User research sessions completed";

  const content = `# Research Synthesis Report

**Source:** ${summary}

---

## Executive Summary

Across our research sessions, three dominant themes emerged that significantly impact user satisfaction and task efficiency. Users are highly capable but consistently encounter systemic barriers that slow them down, erode trust in the product, and lead to costly workarounds.

---

## Theme 1: Information Fragmentation

**Evidence:** 7 out of 8 participants mentioned needing to check multiple systems to complete a single task.

> "I have to log into at least three different places just to pull together what I need for a meeting." — P3

> "Sometimes the data doesn't match between systems and I don't know which one to trust." — P6

**Impact:** High. Increases task completion time by an estimated 30–40% and contributes to errors.

**Opportunity:** Unified information hub with cross-system data integration.

---

## Theme 2: Poor Discoverability of Features

**Evidence:** 5 participants were unaware of features that would directly address their stated frustrations.

> "Wait — you can do that? I've been doing it the hard way for two years." — P2

**Impact:** Medium-High. Feature adoption remains low not because of lack of value, but because of poor UX visibility.

**Opportunity:** Contextual feature suggestions, progressive disclosure, and in-context tooltips.

---

## Theme 3: Lack of Trust in the System

**Evidence:** 6 participants reported experiences where the system showed incorrect or outdated information.

> "I always double-check everything manually because I've been burned before." — P5

**Impact:** High. Even when the system is accurate, distrust leads to redundant manual verification that negates efficiency gains.

**Opportunity:** Add clear data provenance indicators, last-updated timestamps, and confidence signals.

---

## Key Metrics (Self-Reported)

- **Avg. time spent switching between tools per day:** 47 minutes
- **% who have created manual workarounds:** 87%
- **NPS score (current product):** +12
- **Top requested improvement:** "One place for everything" (6/8 participants)

---

## How Might We Statements

- HMW help users find the information they need without leaving their current context?
- HMW signal when data is reliable vs. potentially stale?
- HMW surface relevant features at the moment users need them?
- HMW reduce the number of steps required for the most frequent tasks?

---

## Recommended Next Steps

1. **Prioritize:** Run a design sprint focused on the unified information view concept
2. **Validate:** Prototype and test 2–3 approaches to in-context feature discovery
3. **Measure:** Establish a baseline task-completion time benchmark before next design iteration`;

  return { content };
}

function generateDesignBrief(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Design Initiative";
  const goal = (values["business_goal"] as string) || "Improve user experience and increase adoption";

  const content = `# Design Brief: ${project}

---

## Project Overview

**Project Name:** ${project}
**Date:** ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
**Status:** In Discovery

## Business Goal

${goal}

## Problem Statement

Users are experiencing friction in their current workflow that is leading to decreased satisfaction and productivity. This engagement aims to identify and solve the root causes of this friction through human-centered design.

## Target Users

**Primary:** Power users who interact with the product daily as part of their core job function

**Secondary:** Occasional users who access the product for specific, periodic tasks

**Tertiary:** Administrators and managers who use the product for oversight and reporting

## Scope of Work

### In Scope
- User research (interviews, usability testing)
- Information architecture review
- UX flows and wireframes for core workflows
- High-fidelity prototype for key screens
- Design system contributions

### Out of Scope
- Back-end architecture decisions
- Content strategy
- Marketing materials
- Third-party integrations (Phase 2)

## Design Principles

1. **Clarity over cleverness** — Every design decision should reduce cognitive load, not increase it
2. **Trust through consistency** — Predictable patterns build user confidence
3. **Progressive complexity** — Surface power features without overwhelming new users
4. **Mobile-first** — Design for constrained environments first, then enhance for desktop

## Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Task completion rate | 68% | 85%+ |
| Time on core task | 4.2 min | <2.5 min |
| User satisfaction (CSAT) | 3.4/5 | 4.2/5 |
| Feature adoption (new) | — | 40%+ |

## Timeline

- **Week 1–2:** Discovery and user research
- **Week 3:** Synthesis and opportunity definition
- **Week 4–6:** Concept development and wireframing
- **Week 7–8:** Prototype and usability testing
- **Week 9–10:** Iteration and handoff

## Team

- **Design Lead:** UX Studio
- **Stakeholder:** ${project} Product Team
- **Engineering Partner:** TBD
- **Research:** UX Reactor Research Practice`;

  return { content };
}

function generateSecondaryResearch(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Secondary Research: ${project}

---

## Research Overview

Secondary research to gather additional insights and validate primary research findings.

---

## Literature Review

- **Academic Papers:** Review of relevant studies on user behavior and digital health
- **Industry Reports:** Analysis of market trends and competitor strategies
- **Expert Interviews:** Insights from industry experts and thought leaders

---

## Market Analysis

- **Competitor Analysis:** Detailed comparison of key competitors
- **User Surveys:** Aggregated data from online surveys
- **Case Studies:** Examination of successful implementations

---

## Key Findings

- **User Behavior:** Common patterns and trends in user interactions
- **Market Trends:** Emerging technologies and shifts in user expectations
- **Competitive Landscape:** Strengths and weaknesses of key players

---

## Recommendations

- **Enhance User Experience:** Incorporate findings from literature and market analysis
- **Innovate Features:** Leverage emerging technologies to differentiate
- **Validate Assumptions:** Use secondary data to confirm primary research insights

---

## Next Steps

- **Refine Research Plan:** Incorporate secondary findings into primary research
- **Prototype Features:** Develop initial prototypes based on research insights
- **Stakeholder Review:** Present findings and recommendations to key stakeholders`;

  return { content };
}

function generateExperienceEcosystem(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Experience Ecosystem: ${project}

---

## Ecosystem Overview

A comprehensive view of the digital ecosystem that supports the ${project} experience.

---

## Core Components

- **User Interface:** The primary interaction layer for users
- **Backend Systems:** Data storage and processing infrastructure
- **Third-Party Integrations:** External tools and services
- **Analytics:** Data collection and analysis tools

---

## User Interaction Flow

1. **User Access:** Users log in through the primary interface
2. **Data Retrieval:** Backend systems fetch relevant data
3. **User Actions:** Users perform tasks and make decisions
4. **Data Update:** Changes are saved to backend systems
5. **Feedback Loop:** Analytics provide insights for continuous improvement

---

## Integration Points

- **Healthcare Systems:** Integration with electronic health records (EHRs)
- **Payment Gateways:** Secure payment processing
- **Communication Tools:** Email and messaging services
- **Data Sources:** External databases and APIs

---

## Key Metrics

- **User Engagement:** Time spent in the system, frequency of use
- **Data Accuracy:** Consistency and reliability of data
- **System Performance:** Response times, uptime
- **User Satisfaction:** CSAT scores, NPS

---

## Recommendations

- **Enhance Integrations:** Improve connectivity with third-party systems
- **Optimize Performance:** Reduce latency and improve system reliability
- **Improve Data Quality:** Ensure data accuracy and consistency
- **Boost User Engagement:** Design features that increase user interaction

---

## Next Steps

- **Refine Ecosystem Design:** Incorporate feedback and insights from stakeholders
- **Develop Integration Protocols:** Create standards for third-party integrations
- **Monitor Performance:** Set up continuous monitoring for key metrics
- **Iterate Based on Feedback:** Use data to inform future improvements`;

  return { content };
}

function generateExperienceRoadmap(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Experience Roadmap: ${project}

---

## Roadmap Overview

A strategic plan outlining the key milestones and phases for the ${project} experience.

---

## Phase 1: Discovery

- **Duration:** 2–4 weeks
- **Activities:** User research, stakeholder interviews, competitive analysis
- **Deliverables:** Research report, stakeholder feedback, competitive insights

---

## Phase 2: Design

- **Duration:** 4–6 weeks
- **Activities:** Concept development, wireframing, prototyping
- **Deliverables:** Design concepts, wireframes, high-fidelity prototypes

---

## Phase 3: Development

- **Duration:** 6–8 weeks
- **Activities:** Front-end and back-end development, integration testing
- **Deliverables:** Functional prototype, integration tests, codebase

---

## Phase 4: Testing

- **Duration:** 2–4 weeks
- **Activities:** Usability testing, performance testing, security testing
- **Deliverables:** Test reports, bug fixes, performance metrics

---

## Phase 5: Deployment

- **Duration:** 2–4 weeks
- **Activities:** System deployment, user training, go-to-market strategy
- **Deliverables:** Deployed system, training materials, marketing plan

---

## Phase 6: Maintenance

- **Duration:** Ongoing
- **Activities:** Bug fixes, feature enhancements, user support
- **Deliverables:** Regular updates, support tickets, user feedback

---

## Key Milestones

- **M1:** Research report completed
- **M2:** Design concepts finalized
- **M3:** Prototype developed
- **M4:** System deployed
- **M5:** User training completed

---

## Success Metrics

- **Task Completion Rate:** 85%+ for core workflows
- **User Satisfaction (CSAT):** 4.2/5
- **Feature Adoption:** 40%+ for new features
- **System Performance:** Response times <2.5 min

---

## Next Steps

- **Refine Roadmap:** Incorporate feedback and insights from stakeholders
- **Develop Prototypes:** Create initial prototypes for key features
- **Monitor Progress:** Set up regular check-ins to track progress
- **Iterate Based on Feedback:** Use data to inform future improvements`;

  return { content };
}

function generateUXRequirements(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# UX Requirements: ${project}

---

## Requirements Overview

A detailed list of user experience requirements for the ${project} experience.

---

## Core Requirements

- **User-Centric Design:** Focus on user needs and behaviors
- **Accessibility:** Ensure compliance with WCAG 2.1 AA
- **Performance:** Optimize for fast response times and low latency
- **Scalability:** Design for future growth and expansion
- **Security:** Implement robust security measures

---

## Functional Requirements

- **User Authentication:** Secure login and access control
- **Data Management:** Efficient data storage and retrieval
- **User Interface:** Intuitive and user-friendly design
- **Notifications:** Real-time alerts and updates
- **Analytics:** Data collection and analysis tools

---

## Non-Functional Requirements

- **Usability:** Easy to learn and use
- **Reliability:** High availability and fault tolerance
- **Maintainability:** Easy to update and modify
- **Compatibility:** Works across different devices and platforms
- **Security:** Protects user data and privacy

---

## Key Metrics

- **Task Completion Rate:** 85%+ for core workflows
- **User Satisfaction (CSAT):** 4.2/5
- **Feature Adoption:** 40%+ for new features
- **System Performance:** Response times <2.5 min

---

## Next Steps

- **Refine Requirements:** Incorporate feedback and insights from stakeholders
- **Develop Prototypes:** Create initial prototypes for key features
- **Monitor Progress:** Set up regular check-ins to track progress
- **Iterate Based on Feedback:** Use data to inform future improvements`;

  return { content };
}

function generateEngagementAssessment(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# UX Engagement Assessment: ${project}

---

## Assessment Overview

An evaluation of user engagement with the ${project} experience.

---

## Engagement Metrics

- **User Activity:** Time spent in the system, frequency of use
- **User Satisfaction:** CSAT scores, NPS
- **Feature Adoption:** Usage rates for key features
- **System Performance:** Response times, uptime

---

## Key Findings

- **User Activity:** High engagement levels for core workflows
- **User Satisfaction:** Positive feedback from users
- **Feature Adoption:** Strong adoption rates for new features
- **System Performance:** Reliable and fast response times

---

## Recommendations

- **Enhance User Experience:** Incorporate feedback from user engagement data
- **Innovate Features:** Leverage user engagement insights to develop new features
- **Validate Assumptions:** Use engagement data to confirm design assumptions

---

## Next Steps

- **Refine Research Plan:** Incorporate engagement data into primary research
- **Prototype Features:** Develop initial prototypes based on engagement insights
- **Stakeholder Review:** Present findings and recommendations to key stakeholders`;

  return { content };
}

function generateDiscussionGuide(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Research Discussion Guide: ${project}

---

## Guide Overview

A structured guide for conducting research discussions with stakeholders.

---

## Introduction

- **Welcome:** Briefly introduce the purpose of the discussion
- **Context:** Provide background on the project and research objectives

---

## Key Topics

1. **User Needs and Behaviors**
   - **Questions:** What are the key needs and behaviors of our users?
   - **Discussion:** Explore user pain points and opportunities for improvement

2. **Current Workflow**
   - **Questions:** How do users currently accomplish their goals?
   - **Discussion:** Identify friction points and areas for optimization

3. **Technology and Tools**
   - **Questions:** What tools and technologies do users currently use?
   - **Discussion:** Evaluate the effectiveness of current tools and identify gaps

4. **Design Assumptions**
   - **Questions:** What assumptions have we made about user behavior?
   - **Discussion:** Validate or challenge design assumptions with stakeholder insights

5. **Future Directions**
   - **Questions:** What are the future goals and priorities for the project?
   - **Discussion:** Align stakeholder expectations with project objectives

---

## Conclusion

- **Summary:** Recap key points from the discussion
- **Next Steps:** Outline the next steps in the research process
- **Thank You:** Express gratitude for the stakeholder's time and input

---

## Next Steps

- **Refine Research Plan:** Incorporate stakeholder feedback into primary research
- **Prototype Features:** Develop initial prototypes based on stakeholder insights
- **Stakeholder Review:** Present findings and recommendations to key stakeholders`;

  return { content };
}

function generateNotes(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Research Notes: ${project}

---

## Notes Overview

A collection of notes from research sessions and stakeholder discussions.

---

## Session 1: User Interviews

- **Date:** [Insert Date]
- **Participants:** [Insert Participant Names]
- **Key Insights:**
  - [Insert Insight 1]
  - [Insert Insight 2]
  - [Insert Insight 3]

---

## Session 2: Usability Testing

- **Date:** [Insert Date]
- **Participants:** [Insert Participant Names]
- **Key Insights:**
  - [Insert Insight 1]
  - [Insert Insight 2]
  - [Insert Insight 3]

---

## Stakeholder Discussion

- **Date:** [Insert Date]
- **Participants:** [Insert Participant Names]
- **Key Insights:**
  - [Insert Insight 1]
  - [Insert Insight 2]
  - [Insert Insight 3]

---

## Next Steps

- **Refine Research Plan:** Incorporate stakeholder feedback into primary research
- **Prototype Features:** Develop initial prototypes based on stakeholder insights
- **Stakeholder Review:** Present findings and recommendations to key stakeholders`;

  return { content };
}

function generateWireframes(values: Record<string, unknown>): { content: string } {
  const project = (values["project_name"] as string) || "Digital Initiative";

  const content = `# Wireframes: ${project}

---

## Wireframes Overview

A collection of wireframes for key screens in the ${project} experience.

---

## Screen 1: Dashboard

- **Purpose:** Primary interface for users to access and manage their core information and tasks
- **Key Features:**
  - Status summary
  - Primary action CTA
  - Navigation
  - Search

---

## Screen 2: Task Details

- **Purpose:** Detailed view of a specific task
- **Key Features:**
  - Task information
  - Action buttons
  - Related items

---

## Screen 3: Settings

- **Purpose:** Configuration options for user preferences and system settings
- **Key Features:**
  - User preferences
  - System settings
  - Notifications

---

## Next Steps

- **Refine Wireframes:** Incorporate feedback and insights from stakeholders
- **Develop Prototypes:** Create initial prototypes based on wireframes
- **Stakeholder Review:** Present findings and recommendations to key stakeholders`;

  return { content };
}

function generateResearchNarrative(values: Record<string, unknown>): { content: string } {
  const client = (values["client"] as string) || "the client";
  const audience = (values["audience"] as string) || "stakeholders";

  const content = `# Research Narrative

**Prepared for:** ${audience}
**Client:** ${client}
**Date:** ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

---

## The Story So Far

Over the course of this engagement, we set out to understand what real users experience — not what stakeholders assumed they experienced. What we found was more nuanced, more human, and ultimately more actionable than any analytics dashboard could reveal.

---

## What We Heard

Users aren't struggling because they lack the skills or motivation. They are struggling because the systems around them were designed without them in mind. The recurring theme across every session was a sense of resigned adaptation — people had built elaborate workarounds not because they wanted to, but because they had no other choice.

> "I've just learned to work around it. I don't even notice anymore." — Research participant

This kind of invisible friction is the most dangerous kind. It doesn't show up in support tickets. It doesn't trigger alerts. It simply accumulates, quietly eroding efficiency, satisfaction, and trust.

---

## Three Truths We Uncovered

**Truth 1: The gap between expectation and reality is where trust breaks down.**

Users arrive with reasonable expectations — that information will be accurate, that actions will be reversible, that the system will behave predictably. When those expectations are violated, even once, it takes many successful interactions to rebuild confidence.

**Truth 2: People are solving problems the product team doesn't know exist.**

The most revealing moments in our sessions came when participants showed us how they actually work — spreadsheets running alongside the platform, Post-it notes capturing steps the system skips, group chats sharing workarounds that should be features.

**Truth 3: The path forward is about reduction, not addition.**

Every participant we spoke with described a system that asks too much of them. The opportunity is not to add more features — it is to remove the decisions, steps, and cognitive overhead that shouldn't exist in the first place.

---

## What This Means for ${client}

The findings point to a clear strategic direction: invest in simplification. This means rethinking the core task flows to reduce steps, unifying fragmented information surfaces, and introducing trust signals that make users feel confident acting on what they see.

This is not a small undertaking — but it is a focused one. The highest-impact improvements are concentrated in a handful of key workflows that affect the majority of users on a daily basis.

---

## The Opportunity Ahead

What we are describing is not a redesign. It is a recalibration — a shift from a system built around data and process toward one built around people and outcomes. Done well, this will not only improve satisfaction scores. It will change how users feel about showing up to work.

That is the opportunity. And based on everything we heard, users are ready for it.`;

  return { content };
}

function generateExperienceVision(values: Record<string, unknown>): { content: string } {
  const client = (values["client"] as string) || "the organisation";
  const horizon = (values["horizon"] as string) || "2–3 years";

  const content = `# Experience Vision

**Client:** ${client}
**Time Horizon:** ${horizon}
**Date:** ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

---

## North Star Statement

_In ${horizon}, ${client} delivers an experience so fluent and anticipatory that users accomplish their most important work without friction, distraction, or doubt — and leave every interaction feeling more capable, not less._

---

## The Experience We Are Moving Toward

### From → To

| Current State | Future State |
|---------------|--------------|
| Fragmented information across systems | Single, unified context for every task |
| Manual verification and double-checking | Confident actions backed by trusted data |
| Feature discovery by accident | Contextual guidance at the right moment |
| Mobile as an afterthought | Mobile-first parity across all devices |
| Reactive error handling | Proactive guidance that prevents mistakes |

---

## Core Experience Principles

### 1. Anticipate, Don't Wait
The system should understand where users are in their workflow and surface what they need before they have to look for it. Proactive context beats reactive retrieval.

### 2. Trust is Earned Through Consistency
Every interaction should behave exactly as users expect. No surprises, no exceptions, no silent failures. Predictability is the foundation of confidence.

### 3. Reduce to Essentials
The best interaction is often the one that doesn't exist. Every step, field, and decision should justify its presence. Ruthlessly eliminate what doesn't serve the user.

### 4. Design for the Difficult Moments
The experience should be at its best precisely when users are under pressure — during high-stakes decisions, time-critical tasks, and unfamiliar scenarios.

---

## Vision Scenarios

### Scenario A: The Effortless Morning
A user opens the platform and immediately sees a prioritised view of what matters today — not a dump of everything that happened, but a curated, actionable summary that respects their time and attention.

### Scenario B: The Confident Decision
A user needs to act on time-sensitive information. The system shows them exactly what they need, with clear provenance and freshness indicators. They act without hesitation — and the system confirms completion clearly.

### Scenario C: The Seamless Handoff
A task started on mobile is picked up on desktop without loss of context. A colleague's contribution is visible in real time. Nothing is lost, duplicated, or out of sync.

---

## What Success Looks Like

- Users describe the product as "it just works"
- Task completion times are reduced by 40%+
- NPS increases from current baseline to 60+
- Support tickets related to confusion and errors drop by 50%
- New users reach proficiency in their first session, not their fifth

---

## How We Get There

The vision is not achieved in one release. It is built incrementally, validated continuously, and anchored at every stage to real user outcomes. The roadmap that follows from this vision should be judged not by features shipped, but by friction removed.`;

  return { content };
}

function generateContentGuidelines(values: Record<string, unknown>): { content: string } {
  const client = (values["client"] as string) || "the product";
  const tone = (values["tone_target"] as string) || "Clear & instructional";

  const content = `# Content Guidelines

**Client:** ${client}
**Tone Target:** ${tone}
**Date:** ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

---

## Voice & Tone

### Our Voice
The voice of ${client} is consistent — it is who we are regardless of context. Our voice is:

- **Clear** — we say what we mean, without jargon or ambiguity
- **Respectful** — we treat users as capable adults who don't need to be patronised
- **Direct** — we get to the point; users are here to accomplish something, not to read

### Our Tone
Tone adapts to context. Voice stays constant.

| Situation | Tone |
|-----------|------|
| Onboarding | Warm, encouraging, patient |
| Core task flows | Efficient, neutral, precise |
| Errors & warnings | Calm, non-blaming, action-oriented |
| Success states | Brief, positive, forward-looking |
| Empty states | Helpful, motivating, clear |

---

## Writing Principles

### 1. Lead with Action
Start labels, buttons, and instructions with verbs. Tell users what to do, not what exists.

- ✅ "Save changes"
- ❌ "Changes"

### 2. Use Plain Language
Write at a Grade 8 reading level. Avoid technical terms unless they are domain-standard and users will recognise them.

- ✅ "We couldn't find your file. Try uploading it again."
- ❌ "An error occurred during the file ingestion pipeline."

### 3. Be Specific, Not Vague
Vague copy forces users to guess. Specific copy removes doubt.

- ✅ "Your changes will be visible to all team members immediately."
- ❌ "This may affect other users."

### 4. Avoid Passive Voice
Passive voice obscures who is doing what and slows comprehension.

- ✅ "We deleted your file."
- ❌ "Your file has been deleted."

### 5. Write for Scan, Not Read
Use short sentences, bulleted lists, and bold for key terms. Users rarely read every word.

---

## UI Copy Standards

### Buttons & CTAs
- Use sentence case, not title case
- Maximum 3 words for primary actions
- Destructive actions must be clearly labelled (e.g. "Delete", not "Remove")

### Error Messages
- Say what happened, why it happened (if helpful), and what to do next
- Never blame the user
- Always offer a path forward

### Empty States
- Acknowledge the empty state clearly
- Explain why it is empty (if non-obvious)
- Provide a single, clear next action

### Tooltips & Help Text
- Triggered by user action (hover or focus), never auto-displayed
- Maximum 2 sentences
- Answer "what does this do?" or "why does this matter?"

---

## Terminology

Maintain consistent terminology across the product. When in doubt, use the term users already know from their domain.

| Use | Avoid |
|-----|-------|
| Dashboard | Home screen, Landing page |
| Save | Submit, Commit, Apply |
| Delete | Remove, Discard (for permanent actions) |
| Archive | Hide, Deactivate |
| Settings | Preferences, Configuration |`;

  return { content };
}

function generateContentStrategyDesignBrief(values: Record<string, unknown>): { content: string } {
  const experiences = (values["key_experiences"] as string) || "core product experiences";
  const client = (values["client"] as string) || "the client";

  const content = `# Content Strategy & Design Brief

**Client:** ${client}
**Experience Areas:** ${experiences}
**Date:** ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

---

## Overview

This brief defines the content strategy and design intent for the following experience areas: **${experiences}**. It is intended to align content, design, and product teams before detailed design and copy work begins.

---

## Content Strategy

### Strategic Intent

Content in this product must do more than inform — it must guide. Every piece of copy, every label, every message is part of the experience. Content strategy here is inseparable from interaction design.

### Content Goals

1. **Reduce cognitive load** — Surface the right information at the right moment, and nothing more
2. **Build trust** — Use clear, consistent language that matches user expectations and domain conventions
3. **Enable action** — Every content decision should make the next user action clearer and easier
4. **Support inclusivity** — Plain language, accessible reading levels, and culturally neutral phrasing

### Content Hierarchy

For each experience area, content is structured as:

- **Primary:** The single most important piece of information or action on the screen
- **Secondary:** Supporting context that helps users make a decision or understand their situation
- **Tertiary:** Optional detail, accessible on demand (tooltips, help text, expanded views)

---

## Design Brief

### Experience Areas

${experiences.split(",").map((exp, i) => `
#### ${i + 1}. ${exp.trim()}

**Purpose:** Help users accomplish [core task] efficiently and with confidence.

**Primary content need:** Clear status, next action, and relevant context — in that order.

**Design intent:** Reduce visible complexity. Prioritise the active task over passive information. Use progressive disclosure for secondary detail.

**Key content decisions:**
- Headings should state the user's current state or goal, not the system's label
- Action labels must be specific (avoid "Submit" in favour of task-specific verbs)
- Errors must be adjacent to the point of failure, not in a banner at the top
`).join("")}

---

## Alignment Requirements

### Before Design Starts
- [ ] Agree on terminology for key objects and actions in each experience area
- [ ] Confirm reading level and tone target with stakeholders
- [ ] Identify any compliance or regulatory language constraints

### During Design
- [ ] Content and design reviewed together — no Lorem Ipsum in reviewed comps
- [ ] Error states and empty states included in every screen spec
- [ ] Tooltip and help text copy reviewed for clarity before handoff

### Before Handoff
- [ ] All UI copy reviewed against content guidelines
- [ ] Accessibility check: labels, alt text, and ARIA descriptions complete
- [ ] Localisation considerations flagged for any region-specific content

---

## Success Criteria

- Users can identify the primary action on any screen within 3 seconds
- Error recovery rate increases by 30%+ (users who encounter an error complete the task)
- Content review cycles reduce from 3+ rounds to 1–2 rounds per screen`;

  return { content };
}

function generateGeneric(agentId: string, values: Record<string, unknown>): { content: string } {
  const firstField = Object.values(values).find((v) => typeof v === "string" && v.trim()) as string || "your input";

  const content = `# Generated Output

**Based on:** ${firstField}

---

## Overview

This document was generated based on your input parameters. The AI has analyzed the provided context and generated a structured output to help you move forward with your design work.

## Key Findings

- Initial analysis complete based on provided context
- Three primary areas identified for immediate attention
- Recommendations are prioritized by impact and effort

## Recommendations

1. **High Priority:** Address the core user pain points identified in the input context
2. **Medium Priority:** Establish consistent patterns and documentation
3. **Lower Priority:** Explore edge cases and advanced functionality

## Next Steps

- Review this output with your team and stakeholders
- Use the Refine button to iterate on specific sections
- Export as PDF or copy for use in your documentation

---

*Generated by UX Studio AI — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}*`;

  return { content };
}

// Helpers
function getPersonaName(role: string): string {
  const roleMap: Record<string, string[]> = {
    doctor: ["Dr. Michael Chen", "Dr. Sarah Kim", "Dr. James Okafor"],
    patient: ["Maria Santos", "Robert Thompson", "Aisha Patel"],
    nurse: ["Jennifer Walsh", "Carlos Rivera", "Priya Sharma"],
    designer: ["Alex Morgan", "Jamie Liu", "Sam Okonkwo"],
    manager: ["David Park", "Emma Wilson", "Raj Mehta"],
    developer: ["Chris Nakamura", "Taylor Brooks", "Dev Patel"],
  };

  const lowerRole = role.toLowerCase();
  for (const [key, names] of Object.entries(roleMap)) {
    if (lowerRole.includes(key)) {
      return names[Math.floor(Math.random() * names.length)];
    }
  }

  // Default names
  const defaults = ["Alex Johnson", "Jordan Kim", "Morgan Davis", "Casey Liu"];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function getLocation(): string {
  const locations = [
    "Suburban medical center",
    "Urban teaching hospital",
    "Rural community clinic",
    "Downtown office complex",
    "Healthcare network HQ",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getTechLevel(): string {
  const levels = ["Intermediate", "Proficient", "Advanced beginner", "Competent"];
  return levels[Math.floor(Math.random() * levels.length)];
}