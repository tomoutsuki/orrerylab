# Orrery Lab — Website Content Models

## 1. Purpose

This document defines reusable content structures for the Orrery Lab website. These models can guide a CMS, structured data files, API schemas, or manually maintained Markdown content.

## 2. Project / Work

### Required fields

```yaml
title: string
slug: string
status: draft | published | archived
project_type: release | commission | rhythm-game | game | interactive-media | soundtrack | collaboration | experiment
short_description: string
emotional_centre: string
release_date: YYYY-MM-DD
artists: [artist_reference]
orrery_roles: [string]
credits: [credit]
cover_image: media_reference
featured: boolean
```

### Optional fields

```yaml
subtitle: string
client_or_event: string
genres: [string]
creative_elements: [creative_element]
long_description: rich_text
audio_preview: media_reference
full_audio_links: [external_link]
video: media_reference
visualiser: media_reference
gallery: [media_reference]
process_sections: [content_section]
related_projects: [project_reference]
related_notes: [note_reference]
related_instruments: [instrument_reference]
awards_or_placements: [string]
external_links: [external_link]
seo: seo_fields
```

### Creative element

```yaml
label: string
description: string
relationship_to_centre: string
```

### Credit

```yaml
name: string
role: string
url: string | null
```

## 3. Artist

### Required fields

```yaml
name: string
slug: string
short_identity: string
biography: rich_text
creative_focus: [string]
relationship_to_orrery: string
portrait_or_identity_visual: media_reference
status: active | inactive | archive
```

### Optional fields

```yaml
visual_character: string
sonic_character: string
selected_projects: [project_reference]
external_profiles: [external_link]
credits: [credit]
seo: seo_fields
```

## 4. Instrument

### Required fields

```yaml
name: string
slug: string
status: concept | experimental | alpha | beta | stable | archived
short_description: string
creative_problem: string
capabilities: [string]
intended_users: [string]
availability: private | demonstration | free | open-source | commercial
```

### Optional fields

```yaml
hero_media: media_reference
demo_url: string
repository_url: string
documentation_url: string
licence: string
version: string
platforms: [string]
used_in_projects: [project_reference]
related_notes: [note_reference]
technical_summary: rich_text
gallery: [media_reference]
seo: seo_fields
```

## 5. Note

### Required fields

```yaml
title: string
slug: string
status: draft | published | archived
category: composition | sound | technology | process | culture | field-notes
summary: string
body: rich_text
published_at: YYYY-MM-DD
author: author_reference
```

### Optional fields

```yaml
updated_at: YYYY-MM-DD
reading_time_minutes: number
hero_media: media_reference
related_projects: [project_reference]
related_instruments: [instrument_reference]
related_notes: [note_reference]
audio_examples: [media_reference]
references: [reference]
seo: seo_fields
```

## 6. Homepage Feature

```yaml
feature_type: project | artist | instrument | note | statement
reference: content_reference | null
title_override: string | null
description_override: string | null
media_override: media_reference | null
cta_label: string
cta_url: string
start_date: YYYY-MM-DD | null
end_date: YYYY-MM-DD | null
priority: number
```

The homepage should normally present one dominant featured item rather than a large set of equal cards.

## 7. Manifesto Fragment

```yaml
text: string
source_section: string | null
context: homepage | about | project | transition
active: boolean
```

Manifesto fragments should be short. The complete manifesto belongs on a dedicated page or expanded About section.

## 8. Contact Submission

```yaml
name: string
email: string
project_type: string
project_description: string
approximate_schedule: string | null
budget_range: string | null
relevant_links: [string]
consent: boolean
submitted_at: datetime
status: new | reviewing | replied | closed
```

Only collect information necessary to understand and respond to the enquiry.

## 9. Shared Media Reference

```yaml
id: string
type: image | audio | video | document | interactive
src: string
alt: string
caption: string | null
credit: string | null
transcript: string | null
poster: string | null
duration_seconds: number | null
width: number | null
height: number | null
```

Accessibility fields are required according to media type:

- images require meaningful alternative text or an explicit decorative state;
- audio requires a title and transcript or equivalent description when relevant;
- video requires captions and a text alternative;
- interactive media requires instructions and a non-interactive fallback.

## 10. External Link

```yaml
label: string
url: string
platform: string | null
link_type: listen | watch | download | repository | profile | reference | other
```

## 11. SEO Fields

```yaml
meta_title: string
meta_description: string
social_image: media_reference | null
canonical_url: string | null
noindex: boolean
```

SEO language should describe the work accurately and should not replace the artistic title or on-page copy.

## 12. Content Relationships

The content system should support explicit relationships:

```text
Artist → creates → Project
Project → uses or inspires → Instrument
Project → is explained by → Note
Instrument → emerges from → Project
Note → documents → Project or Instrument
Project → relates artistically to → Project
```

These relationships power:

- related-work recommendations;
- the visual project map;
- artist portfolios;
- process documentation;
- the orbital representation of the website.

## 13. Publication Checklist

Before publishing any content item, confirm:

- title and summary are clear;
- the emotional or practical purpose is stated;
- credits are complete;
- media has accessible alternatives;
- external links work;
- related content is intentional;
- publication status and date are correct;
- mobile presentation has been reviewed;
- no placeholder content remains;
- the content belongs to Orrery’s current scope.
