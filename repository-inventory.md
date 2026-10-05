# Connecto local repository inventory

Verified 1 October 2026, Pacific/Auckland.

All 16 repositories below have a directory `.git`, a Git top-level matching their own folder, a nonempty README with balanced code fences, and resolvable sibling design links. Git diff whitespace checks passed. Verification used per-command safe.directory for exact inspected repositories because the sandbox identity differs from their owner; no global Git trust settings changed. Existing app/API working changes were preserved.

| Repository / README | Status |
|---|---|
| [connecto-app](../connecto-app/README.md) | Existing implementation; README corrected/expanded |
| [connecto-api](../connecto-api/README.md) | Existing implementation; README corrected/expanded |
| [connecto-app-api](../connecto-app-api/README.md) | Local documentation scaffold; implementation not established |
| [connecto-members-service](../connecto-members-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-listings-service](../connecto-listings-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-discovery-service](../connecto-discovery-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-connections-service](../connecto-connections-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-engagements-service](../connecto-engagements-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-conversations-service](../connecto-conversations-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-feedback-service](../connecto-feedback-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-media-service](../connecto-media-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-trust-safety-service](../connecto-trust-safety-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-measurement-service](../connecto-measurement-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-notifications-service](../connecto-notifications-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-listing-parser-service](../connecto-listing-parser-service/README.md) | Local documentation scaffold; implementation not established |
| [connecto-platform](../connecto-platform/README.md) | Local documentation scaffold; implementation not established |

Discovery and Connections were missing and initialised on branch main by this task. The other 14 repositories already had `.git` folders. No existing Git history was replaced; no commits, remote repositories or service code were created. No Terraform resource/state was moved. The optional connecto-docs and future connecto-admin-app repositories are outside the required inventory; canonical documents remain in docs.

READMEs cover domain ownership/exclusions, intended contracts/dependencies, human/workload identity, data ownership, authorisation, development structure, meaningful verification and migration gates. New READMEs do not claim working APIs. The app's obsolete frontend path and no-auth claim were corrected; API routes and parsing status were reconciled with source.

Product tests were not rerun for documentation-only changes. Canonical impact proposal DCR-2026-10-01-006 is pending approval in [the register](document-change-register.md).

