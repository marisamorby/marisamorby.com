---
layout: default
title: Articles
pagination:
  alias: posts
  data: posts.all
  size: 500
---

# All Articles
**Hey there, happy you're here! I've got a few hobbies and interests that I'm really excited about, and love sharing what I'm learning. You'll find articles about design, research, and climate. Enjoy!**

- [Nature & Climate Change](/nature-and-climate-change/)
- [Design & Research](/design-and-research/)
- [Mind & Body](/mind-and-body/)

{% for post in posts %}
<div class="post">
  
## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

</div>

{% endfor %}
