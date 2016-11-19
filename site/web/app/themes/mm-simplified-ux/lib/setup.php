<?php

namespace Roots\Sage\Setup;

use Roots\Sage\Assets;

/**
 * Theme setup
 */
function setup() {
  // Enable features from Soil when plugin is activated
  // https://roots.io/plugins/soil/
  add_theme_support('soil-clean-up');
  add_theme_support('soil-nav-walker');
  add_theme_support('soil-nice-search');
  add_theme_support('soil-jquery-cdn');
  add_theme_support('soil-relative-urls');

  // Make theme available for translation
  // Community translations can be found at https://github.com/roots/sage-translations
  load_theme_textdomain('sage', get_template_directory() . '/lang');

  // Enable plugins to manage the document title
  // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
  add_theme_support('title-tag');

  // Register wp_nav_menu() menus
  // http://codex.wordpress.org/Function_Reference/register_nav_menus
  register_nav_menus([
    'primary_navigation' => __('Primary Navigation', 'sage')
  ]);

  // Enable post thumbnails
  // http://codex.wordpress.org/Post_Thumbnails
  // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
  // http://codex.wordpress.org/Function_Reference/add_image_size
  add_theme_support('post-thumbnails');
  add_image_size('post_retina', 2048, 1536, true);
  add_image_size('post_preview', 800, 800, true);
  add_image_size('testimonial', 80, 80, true);
  add_image_size('testimonial@2x', 160, 160, true);
  add_image_size('as-seen-in', 176, 75);
  add_image_size('as-seen-in@2x', 352, 150);

  // Enable post formats
  // http://codex.wordpress.org/Post_Formats
  // add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);

  // Enable HTML5 markup support
  // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
  add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

  // Use main stylesheet for visual editor
  // To add custom styles edit /assets/styles/layouts/_tinymce.scss
  add_editor_style(Assets\asset_path('styles/main.css'));
}
add_action('after_setup_theme', __NAMESPACE__ . '\\setup');

function remove_wp_open_sans() {
  wp_deregister_style( 'open-sans' );
  wp_register_style( 'open-sans', false );
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\remove_wp_open_sans');
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\remove_wp_open_sans');

/**
 * Determine which pages should NOT display the sidebar
 */
function display_sidebar() {
  static $display;

  isset($display) || $display = !in_array(true, [
    // The sidebar will NOT be displayed if ANY of the following return true.
    // @link https://codex.wordpress.org/Conditional_Tags
    is_404(),
    is_front_page(),
    is_page_template('template-custom.php'),
  ]);

  return apply_filters('sage/display_sidebar', $display);
}

/**
 * Theme assets
 */
function assets() {
  wp_enqueue_style('sage/css', Assets\asset_path('styles/main.css'), false, null);
  wp_enqueue_script('sage/js', Assets\asset_path('scripts/main.js'), [], null, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);

function mm_add_custom_post_types() {
    $args = array(
      'public' => true,
      'label'  => 'Case Studies',
      'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
      'show_in_rest' => true
    );
    register_post_type( 'case-studies', $args );
}
add_action( 'init', __NAMESPACE__ . '\\mm_add_custom_post_types' );

function mm_custom_facts_columns( $column, $post_id ) {
  switch ($column) {

    case 'fact_number':
      $fact_number = get_field('fact_number', $post_id);
      if ($fact_number) {
        echo 'Marisa Fact #' . $fact_number;
      } else {
        echo 'not working';
      }
      break;

    case 'fact':
      $fact = get_field('fact', $post_id);
      if ($fact) {
        echo $fact;
      } else {
        echo 'not working';
      }
      break;
  }
}
add_action('manage_facts_posts_custom_column', __NAMESPACE__ . '\\mm_custom_facts_columns', 10, 2);

function mm_filter_facts_columns( $columns ) {
  return array(
    'cb' => $columns['cb'],
    'fact' => 'Fact',
    'fact_number' => 'Fact Number'
  );
}
add_action('manage_facts_posts_columns', __NAMESPACE__ . '\\mm_filter_facts_columns');

function mm_limit_search_results_to_posts($query) {
  if ($query->is_search && !is_admin()) {
    $query->set('post_type', array('post'));
  }

  return $query;
}

add_filter('pre_get_posts', __NAMESPACE__ . '\\mm_limit_search_results_to_posts');
