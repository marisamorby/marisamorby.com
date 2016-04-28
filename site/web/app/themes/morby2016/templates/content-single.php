<?php

  while (have_posts()):
    the_post();

    $featured_image_id = get_post_thumbnail_id();
    $featured_image_array = wp_get_attachment_image_src($featured_image_id, 'post_retina', true);
    $featured_image_url = $featured_image_array[0];

?>
  <article class="content-page content-page--post">
    <header class="content-page__header" style="background-image: url(<?= $featured_image_url ?>);">
      <h1 class="content-page__heading"><?php the_title(); ?></h1>
    </header>
    <div class="content-page__content">
      <?php the_content(); ?>
    </div>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php

  endwhile;
