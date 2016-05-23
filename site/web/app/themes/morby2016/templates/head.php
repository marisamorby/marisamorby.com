<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php get_template_part('templates/head', 'favicon'); ?>
  <?php wp_head(); ?>
  <?php if (is_admin_bar_showing()): ?>
  <style>#wpadminbar{margin-top:0;}.floating-nav--fixed-top{top:46px}@media screen and (min-width: 783px){.floating-nav--fixed-top{top:32px}}</style>
  <?php endif; ?>
  <script>
    (function(d) {
      var config = {
        kitId: 'pxm2qtz',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  </script>
</head>
