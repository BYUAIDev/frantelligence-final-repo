# Systems design architecture

## 1. System context: the knowledge–answer loop

The platform serves franchise brands. Franchisees (location owners and staff) ask operational questions; the brand (franchisor) provides answers via documentation and support. The core “system” we care about is the knowledge–answer loop:

● Knowledge base (KB): Documents (manuals, SOPs, playbooks) that the brand uploads, stored and chunked for search.  
● Question channel: Franchisees ask questions through an AI chat assistant (and optionally through support tickets, team chat, etc.).  
● Answer mechanism: The AI uses a RAG pipeline (retrieve relevant chunks from the KB, then generate an answer with citations). If the KB has no or weak content on a topic, the AI cannot answer well.  
● Human support: When the AI can’t help, franchisees may open a support ticket or ask in team chat; franchisor staff answer manually.

So the system has two paths: self-serve (AI + KB) and human support. The quality and coverage of the KB directly determine how much load stays on self-serve versus support.

[CONTENT CONTINUES — FULL TEXT PRESERVED]

So the solution is targeted at three specific insertion points in an otherwise unchanged system:  
(1) post-answer gap capture,  
(2) gap-to-draft generation, and  
(3) draft-to-document handoff into the existing ingestion pipeline.  
That is the systems architecture of the Knowledge Builder Agent.