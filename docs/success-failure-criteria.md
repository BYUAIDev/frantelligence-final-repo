# Success and failure criteria

> **Sources:** [docs/mvp.md](./mvp.md) (exit criteria, metrics, pilot thresholds), [aidocs/frantelligence-prd.md §16](../aidocs/frantelligence-prd.md#16-success-metrics), [aidocs/is590r-rubric-evidence.md — Success / failure metrics](../aidocs/is590r-rubric-evidence.md).

---

## Commercial MVP success (platform)

From **MVP §9–12** and **PRD success metrics** — selected gates:

| Criterion | Target / gate | Status in docs |
|-----------|----------------|----------------|
| Franchisor self-serve “docs → working chat” | &lt; 1 hour for naive users (MVP exit gate) | Checklist item — requires pilot evidence |
| Deflection rate | 40%+ (pilot) | Directional / cited qualitatively in rubric narrative (~90% in some cohorts — **ranges**, not single guarantee) |
| Slack/Teams E2E | Works on fresh workspaces | QA / polish items in MVP |
| Billing lifecycle | Stripe test / prod-like | Listed as must-pass gate |

**Artifact limitation:** This repo does **not** contain live pilot dashboards; status is **as described in written docs**, not independently verifiable here.

---

## Knowledge Builder (IS 590r anchor)

| Metric | Definition | Where we stand (per existing narrative) |
|--------|------------|----------------------------------------|
| Draft creation → publish | % of AI-generated drafts reaching **ready** via Save & Re-index | **Tracked in product usage** in full app; not exported in this pack |
| Time to close a gap | Signal → published doc | **Improving** with per-gap generation; **brand-dependent** |
| Draft publish rate | Feature plan target **>50%** | Baseline **TBD** in feature plan table |

---

## Failure / pivot signals (documented)

- **Email-primary workflow** — **de-emphasized** after falsification-style interviews (see [problem-statement.md](./problem-statement.md)).
- **Instrumentation gaps** — rubric narrative notes need to keep **company-scoped** analytics and name a **metric owner** on franchisor side for pilots.

---

## Honest gaps

- **No** consolidated spreadsheet in this repo with **monthly** deflection %, **NPS**, or **draft publish %** by brand.
- **Recommendation:** Add a one-page **“metrics snapshot”** PDF or markdown table **April 7** with whatever numbers the team can share publicly (even ranges).
