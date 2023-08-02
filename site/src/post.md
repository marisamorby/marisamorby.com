---
layout: default
pagination:
  alias: post
  data: posts.all
  size: 1
permalink: /{{ post.slug.current }}/
---

# {{ post.title }}

{{ post.body }}

### Join the Design & Nature Reimagined Newsletter
<form
  method="POST"
  action="https://app.convertkit.com/forms/1961068/subscriptions" 
  class="opt-in"
>
  <div class="input-group">
    <label for="fname">First Name</label>
    <input
      id="fname"
      type="text"
      class="formkit-input"
      aria-label="First Name"
      name="fields[first_name]"
    />
  </div>

  <div class="input-group">
    <label for="email">Email Address</label>
    <input
      id="email"
      type="email"
      class="formkit-input"
      name="email_address"
      aria-label="Your email address"
      required
    />
  </div>
  <div class="submit-group">
    <button class="opt-in-submit">Subscribe to the newsletter</button>
  </div>
</form>
