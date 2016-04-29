      <div class="credibility__section">
        <h2 class="credibility__heading"><?php the_sub_field('heading'); ?></h2>
        <div class="testimonials">
<?php

  if (have_rows('testimonials')):
    while (have_rows('testimonials')):
      the_row();

      $name = get_sub_field('name');
      $title = get_sub_field('title');
      $image = get_sub_field('photo');

?>
          <blockquote class="testimonials__testimonial">
            <div class="testimonials__quote">
              <?php the_sub_field('quote'); ?>

            </div>
            <figure class="testimonials__attribution">
              <img src="<?= $image['url'] ?>"
                   alt="<?= $name ?>, <?= $title ?>"
                   class="testimonials__attribution-photo">
              <figcaption class="testimonials__attribution-text">
                <strong class="testimonials__attribution-name"><?= $name ?></strong>
                <em class="testimonials__attribution-company"><?= $title ?></em>
              </figcaption>
            </figure>
          </blockquote>
<?php

    endwhile;
  endif;

?>
        </div>
      </div>
