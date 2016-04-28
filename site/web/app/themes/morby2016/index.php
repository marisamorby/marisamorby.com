<?php

  if (!have_posts()):

?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'sage'); ?>
  </div>
  <?php get_search_form(); ?>
<?php else: ?>
    <section class="post-previews">
<?php

    $post_counter = 0;

    while (have_posts()):
      the_post();

      get_template_part('templates/content', get_post_type() != 'post' ? get_post_type() : get_post_format());

      if (++$post_counter === 3) {
        get_template_part('templates/content', 'marisa-fact');
      }
    endwhile;
?>
    </section>
<?php
  endif;

  the_posts_navigation([
    'prev_text' => '&lsaquo; older posts',
    'next_text' => 'newer posts &rsaquo;'
  ]);
