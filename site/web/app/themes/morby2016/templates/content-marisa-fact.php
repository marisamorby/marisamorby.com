<?php

  $args = array(
    'post_type'   => 'facts',
    'post_status' => 'publish',
    'posts_per_page' => 100, // Setting to a number we probably won't ever hit.
  );
  $fact_query = new WP_Query( $args );

  $facts = $fact_query->get_posts();
  if (count($facts) > 0):
    $random = mt_rand(0, (count($facts) - 1));
    $fact = $facts[$random];
?>
      <article class="post-previews__preview post-previews__preview--fact marisa-fact"
               data-post-id="<?= $fact->ID ?>">
        <h2 class="marisa-fact__heading">
          Marisa Fact #<?php the_field('fact_number', $fact->ID); ?>
        </h2>
        <p class="marisa-fact__fact">
          <?php the_field('fact', $fact->ID); ?>
        </p>
        <a href="#post-url" class="marisa-fact__more-link">
          More Marisa Facts &rsaquo;
        </a>
      </article>
<?php

  endif;
