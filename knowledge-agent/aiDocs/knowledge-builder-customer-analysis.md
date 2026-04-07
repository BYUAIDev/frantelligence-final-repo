# Deep Customer Analysis: Knowledge Builder Agent

**Purpose:** This document describes the primary customer for the Knowledge Builder Agent — who they are, what job they are trying to do, how they work today, and what success and friction look like. It is written for readers who have no prior knowledge of the product or the platform it runs on.

**Related:** For product requirements and technical design, see [Knowledge Builder Agent PRD](./prd.md) and the [Feature Plan](../ai/roadmaps/2026-02-17-gap-auto-doc-feature-plan.md).

---

## What is the Knowledge Builder Agent?

The **Knowledge Builder Agent** is an AI system that helps organizations keep their internal knowledge base complete and accurate with minimal manual effort. It does three things:

1. **Detects gaps** — It monitors questions people ask (via chat or support) and identifies topics the organization’s existing documentation doesn’t cover well or at all.
2. **Drafts documentation** — For those gaps, it generates first-draft documentation using the style and voice of the organization’s existing content.
3. **Surfaces for human review** — It sends drafts to a designated reviewer, who can approve, edit, or reject before anything is published.

The goal is to turn “we don’t know what we’re missing” into “we see the gaps and get a draft to fix them,” so the knowledge base improves continuously without one person having to think of every topic and write from a blank page.

In our context, the **Knowledge Builder Agent** runs in a franchise setting: the brand (the **franchisor**) supports many independently owned locations (**franchisees**) with procedures and answers to operational questions. The agent gets its signal from questions franchisees ask (e.g. via a chat assistant or support) and from cases where the existing knowledge base doesn’t cover the topic well. It uses those signals to propose new or updated documentation for the brand’s team to review and publish.

This document focuses entirely on **the customer for that agent**: the person who decides whether to use it, reviews its output, and benefits (or not) from the results.

---

## Who is the customer?

### Primary customer: the knowledge-and-support owner

The customer is the person inside the franchise brand who is responsible for:

- The quality and completeness of the brand’s operational knowledge (manuals, SOPs, FAQs, playbooks).
- Supporting franchisees when they have questions — or for making sure they can find answers without always calling support.

**Typical job titles:**

- VP of Operations  
- Director of Franchise Support  
- Head of Operations  
- Sometimes: Founder/CEO or COO at a smaller brand  

**Where they sit:** At the **franchisor** (the brand). They work at headquarters or a central operations team. They do *not* run a single location; they support many locations (franchisees) and care that every location can operate consistently and get answers quickly.

**Company size we care about:** Brands with roughly **10–500 locations**. Small enough that they don’t have a huge content team or enterprise IT; large enough that support and documentation have become a real burden. For early pilots, the sweet spot is often **20–100 locations** — enough volume to feel the pain, not so big that buying and rollout are slow.

**Industries with the strongest fit:** Food & beverage (quick service, fast casual, coffee), personal services (fitness, salons, cleaning, home services), health & wellness (clinics, therapy, dental), and retail services (auto, pet, tutoring). What they have in common: lots of procedures, high question volume from the field, and a need for consistent answers.

### A concrete persona sketch

**“Jordan” — Director of Franchise Support**

- Manages support and knowledge for a 60-location brand in the personal services space.  
- Says: *“We hired two more people just to answer franchisee questions and we still can’t keep up. Half the time the answer is in a doc somewhere — we just didn’t know to point them there, or the doc is outdated.”*  
- Uses Google Drive for manuals, email and Slack for questions, maybe a simple LMS for training. No single “source of truth” that’s easy to search or that an AI can use reliably.  
- Wants franchisees to self-serve more and support to focus on the hard stuff. Interested in tools that use AI to reduce their documentation burden, but doesn’t have in-house engineers to build custom solutions.  
- Time-poor: documentation is one of many responsibilities. Cares about brand voice and accuracy; won’t publish something they haven’t seen.

Jordan is the person who would turn the Knowledge Builder Agent on, get weekly “here are the gaps we found” summaries, review AI-generated drafts, and approve or edit before they go live. Jordan is the **buyer** and **primary user** of the feature.

---

## What job are they trying to do?

### The job (jobs-to-be-done)

**When** support is scaling and franchisees keep asking the same things or not finding answers,  
**I want to** keep our knowledge base complete and up to date so franchisees can self-serve and we don’t drown in repeat questions,  
**So that** support can focus on complex issues, new locations get consistent information, and we look competent and caring as a brand.

### What “done” looks like for them

- **Fewer repeat questions** — Topics that used to generate tickets or repeated chat questions are now covered by clear, findable documentation (and the AI can answer from it).  
- **Less time writing from scratch** — They spend less time staring at a blank page; they spend time reviewing and refining, not inventing every topic.  
- **Confidence in answers** — They trust that what’s in the knowledge base (and what the AI says) is accurate and on-brand, because they had a hand in approving it.  
- **Visible impact** — They can see that gaps are being identified, drafts are being produced, and over time the number of “we don’t have this” topics goes down.

The Knowledge Builder Agent is built to support this job: it finds the gaps, proposes the content, and leaves the final say (approve / edit / reject) to the customer.

---

## How do they do this job today?

### Discovering gaps

Today, gaps are discovered **reactively**:

- Franchisees submit support tickets or ask in chat; if the AI or the support team can’t answer well, someone may or may not log “we need a doc on this.”  
- The same question gets asked many times before anyone turns it into documentation.  
- There’s no systematic view of “what are we being asked that we don’t cover?” — it’s anecdotal or buried in ticket queues.

So the customer often **doesn’t know what they don’t know** until it’s already caused friction or repeated work.

### Creating and updating content

- Documentation is written **when someone has time** — usually when a pain point has already surfaced (e.g. after a bad audit or a franchisee complaint).  
- Different people write in different styles; some topics get detailed docs, others are neglected.  
- Keeping things up to date is an ongoing burden; many docs drift out of date and no one has a clear list of what to refresh.

So the customer is **reactive** and **time-constrained**; they rarely get to “proactively fill gaps before they become problems.”

### Why this matters for the product

The Knowledge Builder Agent is designed to invert that flow: **proactive gap detection** (from real questions and low-confidence AI answers) and **AI-generated first drafts** so the customer isn’t starting from a blank page. The value proposition is “we show you what’s missing and give you a draft; you review and publish.”

---

## Psychographics and context

### Time and priorities

- Documentation is **one of many responsibilities**. They are not full-time technical writers.  
- They will only adopt a tool that **saves time overall** — e.g. review and edit instead of research and write from scratch.  
- They will **tune out** if the system floods them with low-value drafts; they need prioritization (e.g. only high-severity or high-frequency gaps) and clear “why this matters” (e.g. “asked 12 times by 8 locations”).

### Control and quality

- They **must approve** before anything is public. Auto-publishing is a non-starter.  
- They care about **brand voice** and **accuracy**. They’re okay with AI doing a first pass, but they want to see it and fix it.  
- They are more likely to trust the system if it **learns from their edits** over time (e.g. style, tone, structure) so that later drafts need less fixing.

### Technical comfort

- They are **comfortable with SaaS** and everyday tools (Slack, email, spreadsheets, maybe a simple LMS).  
- They are **not** looking to become prompt engineers or ML experts. The product should “just work” and explain itself in plain language (e.g. “Here are 3 gaps we found; here’s a draft for the top one”).

### Objections and barriers

| Objection or barrier | How the product and positioning address it |
|----------------------|---------------------------------------------|
| “The AI will get it wrong.” | Every draft is human-reviewed before publish. No auto-publish. Messaging: “AI drafts, you approve.” |
| “I don’t have time to review a flood of drafts.” | Only surface high-severity or high-frequency gaps; use thresholds (e.g. “asked 3+ times”); show priority and evidence (who asked, how often). |
| “Our docs are a mess; the AI will make it worse.” | Position style learning: “We learn from your existing docs and your edits so new content matches your voice.” |
| “I don’t know if I can trust gap detection.” | Provide transparency: show the actual questions and confidence scores so they can judge whether a “gap” is real. |

Understanding these objections is critical for design: the workflow (review step, prioritization, evidence) and messaging (control, learning, transparency) should speak directly to them.

---

## Success criteria (what “winning” looks like)

From the customer’s perspective, the Knowledge Builder Agent is winning when:

1. **They see gaps they didn’t know about** — A clear, prioritized view of “what our people are asking that we don’t cover well” instead of learning from complaints.  
2. **They spend less time creating net-new content** — They spend time reviewing and editing, not researching and writing from scratch (targets in our planning: on the order of ~12 hours/month saved per customer).  
3. **Repeat questions and support load go down** — Fewer tickets and repeated chats on the same topics; measurable as gap closure over time and (where the brand uses chat) as better deflection on those topics.  
4. **They feel in control** — They approved every published piece; they can edit or reject; the system doesn’t surprise them.  
5. **Drafts are usable** — A meaningful share of AI drafts are approved with minimal or no edits (e.g. >50% acceptance with or without light edits); the rest are a good starting point so editing is still faster than writing from zero.

Success metrics we care about (gap detection accuracy, draft acceptance rate, gap closure rate, time-to-review) are chosen to align with these customer outcomes.

---

## Secondary stakeholders (brief)

- **Franchisees (location owners and staff):** They benefit from better, more complete answers and faster resolution. They don’t buy or configure the Knowledge Builder Agent; their behavior (what they ask, whether they get good answers) is the **signal** that drives gap detection and that the primary customer cares about.  
- **Other franchisor roles (e.g. training, finance):** They may care indirectly (e.g. “fewer support fires” or “better onboarding content”). The **primary buyer and user** of the Knowledge Builder Agent remains the person who owns knowledge and support — the VP/Director of Operations or Franchise Support.

---

## Summary

The customer for the Knowledge Builder Agent is the **franchisor executive or manager who owns knowledge and franchisee support** — typically VP/Director of Operations or Franchise Support at a brand with 10–500 (often 20–100) locations, in high-question-volume verticals like food & beverage and personal services. They are time-poor, want control over what gets published, and today discover documentation gaps only when franchisees complain or ask the same thing repeatedly. The agent is built to give them **proactive gap visibility** and **AI-drafted content to review**, so they can keep the knowledge base complete and accurate without doing all the work from a blank page. Success for them means fewer repeat questions, less time spent writing, and confidence that what’s published is accurate and on-brand — with human review as a non-negotiable part of the workflow.
