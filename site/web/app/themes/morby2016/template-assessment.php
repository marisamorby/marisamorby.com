<?php
/**
 * Template Name: Website Self-Assessment
 */

require 'vendor/autoload.php';
use Mailgun\Mailgun;

/*
 * ## Has the form been submitted?
 * If the form has been submitted, process that sucker.
 */
if ($_POST):

  /*
   * ### Grab the submitted form data.
   * Start by grabbing the name and email fields.
   */
  $fname = $_POST['fname'] ?: false;
  $email = $_POST['email'] ?: false;
  $msgEncoded = $_POST['rmsg'] ?: false;

  /*
   * ### Send the customized report using MailGun
   * The React app already built a custom message for us; we just have to
   * decode and send it.
   */

  // This reverses the Base64 + double URL encoding we do in the React app.
  $msg = urldecode(urldecode(base64_decode($msgEncoded)));

  /*
   * We need to create a new Mailgun instance to actually send the message.
   */
  $mg = new Mailgun(getenv('MM_MG_API_KEY'), new \Http\Adapter\Guzzle6\Client());
  $response = $mg->sendMessage(getenv('MM_MG_DOMAIN'), array(
    'from' => 'Marisa Morby <me@marisamorby.com>',
    'to' => "$fname <$email>",
    'subject' => 'Your Customized Website Report',
    'html' => preg_replace('/\*\|FNAME\|\*/', $fname, $msg),
  ));

  if ($response->http_response_code === 200):
?>
  <article class="content-page">
    <div class="content-page__content content-page__content--no-header">
      <h1 class="content-page__page-heading">Your Report Is On Its Way!</h1>
      <p>You know what's cool, <?= $fname ?>?</p>
      <p><strong>You.</strong></p>
      <p><em>You're</em> cool.</p>
    </div>
  </article>
<?php

    exit;
  else:

?>
  <article class="content-page">
    <div class="content-page__content content-page__content--no-header">
      <h1 class="content-page__page-heading">Hmmm... Something broke.</h1>
      <p>Something went wrong with your submission, and I'm sorry about that. Please try again.</p>
    </div>
  </article>
<?php

  endif;
endif;

?>
  <article class="content-page">
    <div class="content-page__content content-page__content--no-header">
      <div id="root" class="mm-assessment"></div>
    </div>
  </article>
