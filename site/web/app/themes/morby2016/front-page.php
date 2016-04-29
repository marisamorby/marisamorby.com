<?php

while (have_posts()):
  the_post();

  if (have_rows('sections')):

?>
    <section class="credibility">
<?php

      while (have_rows('sections')) {
        the_row();

        if (get_row_layout() === 'text') {
          get_template_part('templates/credibility', 'text');
        }

        if (get_row_layout() === 'company_logos') {
          get_template_part('templates/credibility', 'companies');
        }

        if (get_row_layout() === 'client_testimonials') {
          get_template_part('templates/credibility', 'testimonials');
        }
      }

?>
    </section>
<?php

  endif;
endwhile;
