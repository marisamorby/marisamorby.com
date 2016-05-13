<?php
/**
 * Template Name: Website Self-Assessment
 */

// Kind of hacky, but should work as long as we're using roots.io/bedrock/.
require sprintf('%s/vendor/autoload.php', str_replace('/web', '', getcwd()));
use Mailgun\Mailgun;
use MarisaMorby\MailChimp;

/*
 * ## Has the form been submitted?
 * If the form has been submitted, process that sucker.
 */
if ($_POST):

  // If something goes wrong, we store it here.
  $errors = [];

  /*
   * ### Grab the submitted form data.
   * Start by grabbing the name and email fields.
   */
  $fname = $_POST['fname'] ?: false;
  $email = $_POST['email'] ?: false;
  $msgEncoded = $_POST['rmsg'] ?: false;

  /*
   * ### Subscribe the user to a MailChimp list.
   * We do this first, because if it fails we need to try again, and we don't
   * want to flood the person's inbox with duplicate messages.
   */
  $data = array(
    'email_address' => $email,
    'status' => 'subscribed',
    'merge_fields' => array(
      'FNAME' => $fname,
      'SIGNUPSRC' => 'website-assessment',
    ),
  );

  $mc_response = MailChimp\member_upsert($data);

  if (
    !is_object($mc_response)
    || !property_exists($mc_response, 'email_address')
    || $mc_response->email_address !== $email
  ) {
    $errors[] = 'There was a problem saving your email. Please try again.';
  } else {

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

    if ($response->http_response_code !== 200) {
      $errors[] = 'There was a problem sending your message. Please try again.';
    }
  }

  if (count($errors) === 0):
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

  else:

?>
  <article class="content-page">
    <div class="content-page__content content-page__content--no-header">
      <h1 class="content-page__page-heading">Hmmm... Something broke.</h1>
      <p><?= implode($errors, '<br>') ?></p>
    </div>
  </article>
<?php

  endif;
else:

?>
  <article class="content-page">
    <div class="content-page__content content-page__content--no-header">
      <div id="root" class="mm-assessment"></div>
    </div>
  </article>
<?php

endif;
