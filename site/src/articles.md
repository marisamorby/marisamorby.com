---
layout: default
title: Articles
pagination:
  alias: posts
  data: posts
  size: 500
---

# Articles

{% for post in posts %}

## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

{% endfor %}
