---
layout: default
title: Articles
pagination:
  alias: notes
  data: notes
  size: 500
---

# My Notes

**These are works in progress and unpolished notes. Check out the notes to see what I'm thinking and learning about!"**

{% for note in notes %}

## [{{ note.title }}](/{{ note.slug.current }}/)

{% if note.description %}{{ note.description }}{% endif %}

[Read full note &rarr;](/{{ note.slug.current }}/)

{% endfor %}
