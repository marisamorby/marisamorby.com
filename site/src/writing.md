---
layout: writing
title: Writing
pagination:
  alias: posts
  data: posts.all
  size: 500
---

{% for post in posts %}
<div class="post card">
  <div class="image">
    </div>
    <div class="text">
  
## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

  </div>
</div>

{% endfor %}
