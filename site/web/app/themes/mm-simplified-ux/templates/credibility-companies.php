      <div class="credibility__section worked-with">
        <h2 class="credibility__heading"><?php the_sub_field('heading'); ?></h2>
        <ul class="worked-with__companies">

<?php

  if (have_rows('companies')):
    while (have_rows('companies')):
      the_row();

      $image = get_sub_field('logo');
      $imageSrc = $image['sizes']['as-seen-in'];
      $imageSrc2x = $image['sizes']['as-seen-in@2x'];
      $name = get_sub_field('name');
      $relationship = get_sub_field('relationship') === 'featured' ? 'Featured on' : 'Worked with';

?>
          <li class="worked-with__company">
            <img src="<?= $imageSrc ?>"
                 srcset="<?= $imageSrc ?> 1x, <?= $imageSrc2x ?> 2x"
                 alt="<?= $relationship ?> <?= $name ?>"
                 class="worked-with__company-logo">
          </li>
<?php

    endwhile;
  endif;

?>
        </ul>
      </div>
