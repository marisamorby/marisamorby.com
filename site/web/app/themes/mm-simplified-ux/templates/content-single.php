<?php

  while (have_posts()):
    the_post();

?>
  <article class="content-page content-page--post">
    <header class="content-page__header">
      <h1 class="content-page__heading"><?php the_title(); ?></h1>
    </header>
    <div class="content-page__content">
      <?php the_content(); ?>
    </div>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php

  endwhile;
