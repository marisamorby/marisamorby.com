<?php

  if (!have_posts()):

?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'sage'); ?>
  </div>
  <?php get_search_form(); ?>
<?php else: ?>
    <section class="post-previews">
      <div class="post-previews__search">
        <div class="post-previews__search-term">
          <?php if (is_search()): ?>
            <p>Showing search results for &ldquo;<?= get_search_query(); ?>&rdquo;.</p>
          <?php endif; ?>
        </div>
        <?php get_search_form(); ?>
      </div>
      <div class="columns columns--2 columns--left-aligned">
<?php

    $post_counter = 0;

    while (have_posts()):
      the_post();

      get_template_part('templates/content', get_post_type() != 'post' ? get_post_type() : get_post_format());
    endwhile;
?>
      </div>
    </section>
<?php
  endif;

  the_posts_navigation([
    'prev_text' => '&lsaquo; older posts',
    'next_text' => 'newer posts &rsaquo;'
  ]);
