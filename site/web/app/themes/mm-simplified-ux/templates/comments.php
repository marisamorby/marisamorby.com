<?php
if (post_password_required()) {
  return;
}
?>

<section id="comments" class="comments">
  <div id="disqus_thread"></div>
  <script>
    var disqus_config = function () {
      this.page.url = '<?= get_the_permalink(); ?>';
      this.page.identifier = '<?php the_ID(); ?>';
    };
    (function() {
      var d = document, s = d.createElement('script');

      s.src = '//marisamorby.disqus.com/embed.js';

      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  </script>
  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
</section>
