<?php

?>
<header class="banner<?php echo is_front_page() ? ' banner--home' : ''; ?>">
  <p class="banner__text-box">
    <em class="banner__text banner__text--script">
      <?php the_field('header_tagline_cursive', 'option'); ?>
    </em>
    <strong class="banner__text banner__text--bold">
      <?php the_field('header_tagline_bold', 'option'); ?>
    </strong>
    <a href="<?php the_field('header_button_link', 'option'); ?>"
       class="banner__link banner__link--button button">
      <?php the_field('header_button_text', 'option'); ?>
    </a>
  </p>
</header>
