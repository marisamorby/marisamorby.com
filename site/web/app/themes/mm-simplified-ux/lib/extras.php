<?php

namespace Roots\Sage\Extras;

use Roots\Sage\Setup;

/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }

  // Add class if sidebar is active
  if (Setup\display_sidebar()) {
    $classes[] = 'sidebar-primary';
  }

  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\body_class');

/**
 * Clean up the_excerpt()
 */
function excerpt_more() {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'sage') . '</a>';
}
add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');

/**
 * Enable SVG uploads
 */
function enable_svg_uploads( $mimes ) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', __NAMESPACE__ . '\\enable_svg_uploads');


/*
 * Shortcode to create buttons.
 */
function mm_shortcode_button( $atts, $content ) {
  if (!isset($atts['href'])) {
    return '';
  }

  return sprintf('<a href="%s" class="button button--dark">%s</a>', $atts['href'], $content);
}
add_shortcode('button', __NAMESPACE__ . '\\mm_shortcode_button');

/*
 * Shortcode to enable a collapsible transcript box.
 */
function mm_shortcode_transcript( $atts, $content ) {
  return sprintf('<div class="transcript transcript--collapsible">%s</div>', do_shortcode($content));
}
add_shortcode('transcript', __NAMESPACE__ . '\\mm_shortcode_transcript');

/*
 * Responsive embed wrapper for WP's OEmbed handler
 */
function mm_responsive_embed($html, $url, $attr) {
    return $html!='' ? '<div class="embed-container">'.$html.'</div>' : '';
}
add_filter('embed_oembed_html', __NAMESPACE__ . '\\mm_responsive_embed', 10, 3);

/*
 * Add custom options pages
 */
function add_acf_options_pages() {
  if (!function_exists('acf_add_options_page')) {
    return;
  }
}

/**
 * Add custom field groups
 */
function add_acf_field_groups() {
  if (!function_exists('acf_add_local_field_group')) {
    return;
  }
}
add_action('after_setup_theme', __NAMESPACE__ . '\\add_acf_field_groups');
