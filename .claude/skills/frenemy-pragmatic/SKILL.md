---
name: frenemy-pragmatic
description: Critical frenemy analysis via sub-agent, followed by pragmatic recommendations on how to proceed.
argument-hint: [optional topic to analyze, or omit to analyze current conversation]
---

First, determine the analysis topic:
- If arguments are provided below, use them as the topic.
- If no arguments are provided, summarize the key points, discoveries, and decisions
  from our conversation so far as the topic.

Then, deploy a sub-agent with the "/frenemy" skill to critically analyze that topic —
including any relevant code, assumptions, and trade-offs.

Finally, as the pragmatic expert, synthesize the frenemy's critique with your own
assessment and recommend how we should proceed. Be direct and actionable.

$ARGUMENTS
