---
layout: posts
title: Design & Research
pagination:
  alias: posts
  data: posts.design-and-research
  size: 500
---

# Design & Research

{% for post in posts %}
<div class="post">
  
## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

</div>

{% endfor %}
