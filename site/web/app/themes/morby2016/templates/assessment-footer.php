<?php

  /*
   * To enable deploys, we're just hacking our way through here. By writing
   * this script directly, we get to use PHP's .env instead of dealing with a
   * cumbersome webpack `process.env` workaround.
   */
  if (is_page_template('template-assessment.php')):

?>
<script>window.MM_WP_API_URL = '<?= getenv('MM_WP_API_URL') ?>';</script>
<?php

  endif;
