<?php

  $bg_image = get_field('blog_opt_in_image', 'option');
  if (array_key_exists('sizes', $bg_image)) {
    $image_url = $bg_image['sizes']['large'];
  } else {
    $image_url = '';
  }

?>
    <section class="call-to-action"
             style="background-image: url(<?= $image_url ?>);">
      <h2 class="call-to-action__heading">
        <?php the_field('blog_opt_in_heading', 'option'); ?>
      </h2>
      <div class="call-to-action__text">
        <?php the_field('blog_opt_in_text', 'option'); ?>
      </div>
      <form action="//marisamorby.us9.list-manage.com/subscribe/post?u=f919cd264e57829fe5bdda234&amp;id=413e764999&amp;SIGNUPSRC=blog-opt-in"
            method="post" class="call-to-action__form">
        <div class="call-to-action__input-group">
          <label for="fname" class="call-to-action__label">
            First Name
          </label>
          <input type="text" id="fname" placeholder="First Name..."
                 name="FNAME" class="call-to-action__input" />
        </div>
        <div class="call-to-action__input-group">
          <label for="fname" class="call-to-action__label">
            Email
          </label>
          <input type="email" id="email" placeholder="Email Address..."
                 name="EMAIL" class="call-to-action__input" />
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f919cd264e57829fe5bdda234_413e764999" tabindex="-1" value=""></div>
        <input type="submit" name="subscribe"
               class="call-to-action__button button"
               value="<?php the_field('blog_opt_in_button_text', 'option'); ?>" />
      </form>
    </section>
