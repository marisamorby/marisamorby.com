---
layout: default
title: Articles
pagination:
  alias: posts
  data: posts
  size: 500
---

# Articles
Hey there, happy you're here! I've got a few hobbies and interests that I'm really excited about, and I love sharing what I'm learning with people like you. You'll find articles about design systems, urban design, research, projects, and skills I’ve gained over the years. All in an effort to help teach others and spark conversations. There's a lot here already, with more to come! Feel free to follow me [@marisamorby](https://twitter.com/marisamorby), too, if you're into the whole Twitter thing.

{% for post in posts %}

## [{{ post.title }}](/{{ post.slug.current }}/)

{{ post.description }}

[Read full article &rarr;](/{{ post.slug.current }}/)

{% endfor %}
