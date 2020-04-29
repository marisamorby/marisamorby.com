---
layout: default
title: Articles
pagination:
  alias: notes
  data: notes
  size: 500
---

# Articles

{% for note in notes %}

## [{{ note.title }}](/{{ note.slug.current }}/)

{{ note.description }}

[Read full article &rarr;](/{{ note.slug.current }}/)

{% endfor %}
