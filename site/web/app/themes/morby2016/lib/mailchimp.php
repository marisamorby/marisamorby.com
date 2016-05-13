<?php

namespace MarisaMorby\MailChimp;

/*
 * Define required constants from the env vars.
 */
define('MM_MC_API_URL', getenv('MM_MC_API_URL'));
define('MM_MC_API_KEY', getenv('MM_MC_API_KEY'));
define('MM_MC_LIST_ID', getenv('MM_MC_LIST_ID'));

/**
 * Updates a member, or creates a new member.
 *
 * See http://bit.ly/1TC2XzA for details about the MailChimp API.
 *
 * @param  array  $data Request body parameters for MailChimp
 * @return object       The JSON-encoded response from MailChimp
 */
function member_upsert($data) {

  // Fail if no email address was supplied.
  if (!array_key_exists('email_address', $data)) {
    trigger_error('Email address is required', E_USER_ERROR);
  }

  // MailChimp looks up users by a hash of the lowercase email address.
  $member_hash = md5(strtolower($data['email_address']));
  $endpoint = sprintf('/lists/%s/members/%s', MM_MC_LIST_ID, $member_hash);

  // Prep the data to be sent as JSON using PUT.
  $data_json = json_encode($data);
  $headers = array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_json),
  );

  // Open a connection to the MailChimp API.
  $ch = connection_create($endpoint);

  // Add the headers, request method, and data to be sent.
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);

  // Execute the cURL request and return the response.
  return connection_execute_and_close($ch);
}

/**
 * Opens a cURL connection to the MailChimp API.
 * @param  string   $endpoint The endpoint this request needs to hit
 * @return resource           A cURL handle
 */
function connection_create($endpoint) {

  // Build the full URI for the request.
  $uri = sprintf('%s%s', MM_MC_API_URL, $endpoint);

  // Create the cURL handle.
  $ch = curl_init($uri);

  // Pass in the credentials for MailChimp.
  curl_setopt($ch, CURLOPT_USERPWD, 'apikey:' . MM_MC_API_KEY);

  // For now, always return the response from a request.
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  // Return the (unexecuted) cURL handle for further options and execution.
  return $ch;
}

/**
 * Executes a cURL request and returns the response.
 * @param  resource $ch A cURL handle
 * @return object       The response from the cURL request
 */
function connection_execute_and_close($ch) {

  // Actually execute the response and store the response in a variable.
  $response = curl_exec($ch);

  // Close the cURL handle.
  curl_close($ch);

  // Convert the JSON response to an object and return it.
  return json_decode($response);
}
