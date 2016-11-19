<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php get_template_part('templates/head', 'favicon'); ?>
  <?php wp_head(); ?>
  <?php if (is_admin_bar_showing()): ?>
  <style>#wpadminbar{margin-top:0;}</style>
  <?php endif; ?>
  <script src="https://use.typekit.net/mvn0eaw.js"></script>
  <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>
