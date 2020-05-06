---
layout: default
title: Articles
pagination:
  alias: posts
  data: posts
  size: 500
---

# Articles
**Hey there, happy you're here! I've got a few hobbies and interests that I'm really excited about, and love sharing what I'm learning. You'll find articles about design systems, urban design, research, projects, and skills I’ve gained over the years. Enjoy!**

{% for post in posts %}

## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

{% endfor %}
