---
layout: writing
title: Fiction & Poetry
pagination:
  alias: posts
  data: posts.fiction
  size: 500
---

{% for post in posts %}

<div class="card">
  <div class="image">
    </div>
    <div class="text">
  
## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

</div>
</div>

{% endfor %}
