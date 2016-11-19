<?php

  $featured_image_id = get_post_thumbnail_id();
  $featured_image_array = wp_get_attachment_image_src($featured_image_id, 'post_preview', true);
  $featured_image_url = $featured_image_array[0];

?>
      <article class="post-previews__preview preview columns__column">
        <header class="preview__header">
          <h2 class="preview__heading">
            <a href="<?php the_permalink(); ?>"
               class="preview__link">
              <?php the_title(); ?>
            </a>
          </h2>
        </header>
        <section class="preview__body">
          <p class="preview__excerpt">
            <?php the_excerpt(); ?>
          </p>
        </section>
        <a href="<?php the_permalink(); ?>"
           class="preview__button u-button u-button--block u-button--small">
          Read This Post
        </a>
      </article>
