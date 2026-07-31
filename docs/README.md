# Orrery Lab documentation

This directory has two complementary documentation sets:

- **Concepts** describe the intended brand, experience, information architecture, and future content system.
- **Implementation** documents the code that exists in this repository today. It is the source of truth for maintenance and launch-readiness work.

The distinction matters: the concept documents include future routes and capabilities (such as Instruments and Notes), while the current application only implements Works, Artists, About, and Contact.

## Current implementation

1. [Architecture and modules](./implementation/01-architecture-and-modules.md) — application structure, routes, rendering boundaries, component responsibilities, and current limitations.
2. [Content and data model](./implementation/02-content-and-data.md) — the typed local-content layer, relationships, placeholders, and the replacement workflow.
3. [Audio architecture](./implementation/03-audio-architecture.md) — consent, persistence, player paths, current behaviour, and the work required before release audio is added.
4. [Asset control](./implementation/04-asset-control.md) — current asset inventory, public-path conventions, CSS artwork, licensing, and delivery guidance.
5. [Development and quality](./implementation/05-development-and-quality.md) — stack, commands, configuration, static generation, accessibility measures, and launch gaps.

## Product concepts

1. [Project Context](./concepts/01-project-context.md)
2. [Website Content Strategy](./concepts/02-website-content-strategy.md)
3. [Information Architecture](./concepts/03-information-architecture.md)
4. [Design and Experience Principles](./concepts/04-design-and-experience-principles.md)
5. [Content Models](./concepts/05-content-models.md)

## How to use this documentation

Use the implementation set when changing this codebase or preparing a release. Use the concept set to decide what should be built next and how it should fit the Orrery Lab world. When they conflict, document the difference and treat the implementation docs as the accurate description of the shipped application.
