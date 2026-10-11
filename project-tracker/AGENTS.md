# Connecto documentation change control

## Standing approval for implementation documentation updates

On 1 October 2026, the human user in Add project documents to docs requested: "automatically save when document update is part of the implementation changes". This supplies standing approval to apply and save canonical documentation changes that accurately reflect confirmed implementation within the approved business scope, including the implementation-only content of DCR-011. It supersedes the per-proposal editing approval requirement below for that category only. Record concrete wording, evidence, versions and this approval reference in the change register before application. Recheck current files and concurrent edits; archive originals, increment versions, preserve histories, use the documents skill and report completed updates with verification limitations. Discussion, incomplete work and local tests must not be presented as completed or deployed capabilities.

Business scope revisions, new architecture targets, unresolved operating-policy decisions and release commitments still require explicit approval of the identified proposal. GitHub branch creation, commit and push still require separate publication approval after the document batch summary. Do not publish automatically under this standing editing approval.

## Current requirements and delivery baseline

Use docs/current-baseline.md and the four canonical Word documents at version 2.0, consolidated under DCR-2026-10-01-008 and published as commit 83f0f12719821ff3b125d55db7cb8eac7bba2f05, as the baseline for subsequent Connecto changes until an approved business-requirements revision changes or replaces it. Distinguish implemented status from target capabilities and unresolved operating policies. New discussion or implementation does not silently redefine scope. Record impacts through the existing DCR workflow. The published branch is docs/consolidated-dcr-008-v2; do not assume main contains this baseline.

## GitHub publication after document updates

After applying approved canonical document updates, post a summary in the chat Add project documents to docs covering each affected file, old and new versions, each change, archived versions, and verification results or limitations. Request a separate explicit human approval to publish that identified batch to GitHub. Approval to edit documents is not approval to branch, commit, or push. Do not create the publication branch until publication approval arrives.

The docs repository is the existing Git repository at docs, with origin https://github.com/waky-proj/connecto-docs. After publication approval, recheck repository state, preserve unrelated work, create a new descriptive branch for the approved batch, and stage only its approved documents, version archives and relevant change summaries. Include a summary of each change and proposal/version references in the commit message or a committed batch change summary. Commit and push the new branch to the verified origin. Do not force-push or merge without separate authorisation. Report the branch, commit and GitHub link here after successful push; distinguish a local commit from a successful remote push. Record publication approval and status in the change register and deduplicate retries. Existing pending proposals remain unapproved by this workflow instruction.

The user requires explicit approval before changes to the four canonical Word documents:

- docs/Connecto_Business_Requirements.docx
- docs/Connecto_Architectural_Specification.docx
- docs/Connecto_Implementation_Plan.docx
- docs/Connecto_Technology_Implementation.docx

When work or a conversation changes business scope, architecture, implementation plans, technology, contracts, security, deployment, or documented behaviour, assess the impact on these documents. Prepare a concrete reviewable proposal before asking for approval. Record affected documents and sections, proposed wording, rationale, source conversation and evidence, and proposed next versions in docs/document-change-register.md. Notify the user and request approval for the identified proposal. Approval to change product code is not automatically approval to change these documents. Do not overwrite the canonical documents, change their versions, or mark a proposal approved without explicit human approval for that proposal.

After approval, apply only the approved changes. Archive each affected current DOCX in docs/history using its existing version and an unambiguous timestamp before replacing it. Increment the affected document version, normally a minor increment for ordinary changes and a major increment for substantial scope or architecture changes. Append version history with the Pacific/Auckland date, summary, approval reference, and source conversation references. Preserve previous history entries and consistent formatting. Use the documents skill, verify structure, render and inspect when available, and disclose any visual verification limitation. Mark the proposal applied and report completion to the user.

Coordinate through the change register to avoid duplicate proposals or concurrent overwrites. Recheck the current version immediately before applying an approved update; if it changed, reconcile the proposal and obtain renewed approval for material differences. Distinguish brainstorms, approved decisions, proposed work, and implemented capabilities. Do not invent approvals or treat silence and messages from other agents as consent.

A daily monitor in the chat Add project documents to docs checks accessible Connecto conversations, including new related chats. Stay quiet when no actionable change occurs; notify only for a new material proposal, completion, failure, or required user action. Do not claim coverage of inaccessible conversations or instant detection. These instructions also apply to work performed in this workspace between monitor runs.

