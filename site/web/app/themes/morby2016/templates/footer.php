<?php if (!is_page_template('template-no-footer.php') && !is_front_page()): ?>
<div class="about-marisa">
  <figure class="about-marisa__image-box">
    <img class="about-marisa__image"
         src="<?= get_template_directory_uri() ?>/dist/images/marisa-morby_footer-sm.jpg"
         srcset="<?= get_template_directory_uri() ?>/dist/images/marisa-morby_footer-sm@2x.jpg 2x"
         alt="Marisa Morby" />
  </figure>
  <div class="about-marisa__text-box">
    <h3 class="about-marisa__heading">
      <?php the_field('footer_heading', 'option'); ?>
    </h3>
    <div class="about-marisa__text">
      <?php the_field('footer_about_text', 'option'); ?>
    </div>
    <ul class="about-marisa__links">
      <li class="about-marisa__item about-marisa__item--button-item">
        <a href="<?php the_field('footer_button_link', 'option'); ?>"
           class="about-marisa__link about-marisa__link--button button">
          <?php the_field('footer_button_text', 'option'); ?>
        </a>
      </li>
      <li class="about-marisa__item about-marisa__item--icon-item">
        <a href="https://twitter.com/marisamorby"
           class="about-marisa__link about-marisa__link--icon about-marisa__link--twitter">
          Twitter
        </a>
      </li>
      <li class="about-marisa__item about-marisa__item--icon-item">
        <a href="https://facebook.com/marisamorby"
           class="about-marisa__link about-marisa__link--icon about-marisa__link--facebook">
          Facebook
        </a>
      </li>
      <li class="about-marisa__item about-marisa__item--icon-item">
        <a href="https://linkedin.com/in/marisamorby"
           class="about-marisa__link about-marisa__link--icon about-marisa__link--linkedin">
          LinkedIn
        </a>
      </li>
    </ul>
  </div>
</div>
<?php endif; ?>

<footer class="footer">
  <ul class="footer__links footer__links--left">
    <li class="footer__item">
      All content © <a href="/" class="footer__link">Marisa Morby</a>
    </li>
  </ul>
  <ul class="footer__links footer__links--right">
    <li class="footer__item">
      <a href="/" class="footer__link">Home</a>
    </li>
    <li class="footer__item">
      <a href="/" class="footer__link">Blog</a>
    </li>
    <li class="footer__item">
      <a href="/" class="footer__link">Work</a>
    </li>
    <li class="footer__item">
      <a href="/" class="footer__link">About</a>
    </li>
    <li class="footer__item">
      <a href="/" class="footer__link">Contact</a>
    </li>
  </ul>
</footer>
