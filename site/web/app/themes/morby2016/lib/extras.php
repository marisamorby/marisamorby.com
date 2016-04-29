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

/**
 * Add custom field groups
 */
function add_acf_field_groups() {
  if (!function_exists('acf_add_local_field_group')) {
    return;
  }

  /*
   * Marisa Facts
   */
  acf_add_local_field_group(array (
    'key' => 'group_570fa5453fd35',
    'title' => 'Marisa Facts',
    'fields' => array (
      array (
        'key' => 'field_570fa54970b89',
        'label' => 'Fact Number',
        'name' => 'fact_number',
        'type' => 'number',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array (
          'width' => 15,
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'min' => '',
        'max' => '',
        'step' => 1,
        'readonly' => 0,
        'disabled' => 0,
      ),
      array (
        'key' => 'field_570fa56b70b8a',
        'label' => 'Fact',
        'name' => 'fact',
        'type' => 'text',
        'instructions' => '',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array (
          'width' => 85,
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'maxlength' => 75,
        'readonly' => 0,
        'disabled' => 0,
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'facts',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'acf_after_title',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
  ));

  /*
   * Flexible Content Blocks for the Home Page
   */
  acf_add_local_field_group(array (
    'key' => 'group_5722e270a892b',
    'title' => 'Home Page',
    'fields' => array (
      array (
        'key' => 'field_5722e289ad6ae',
        'label' => 'Sections',
        'name' => 'sections',
        'type' => 'flexible_content',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array (
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'button_label' => 'Add Section',
        'min' => '',
        'max' => '',
        'layouts' => array (
          array (
            'key' => '5722e2ac70270',
            'name' => 'text',
            'label' => 'Text Section',
            'display' => 'block',
            'sub_fields' => array (
              array (
                'key' => 'field_5722e2cbad6af',
                'label' => 'Heading',
                'name' => 'heading',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
                'readonly' => 0,
                'disabled' => 0,
              ),
              array (
                'key' => 'field_5722e2dbad6b0',
                'label' => 'Body Content',
                'name' => 'body_content',
                'type' => 'wysiwyg',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'default_value' => '',
                'tabs' => 'all',
                'toolbar' => 'basic',
                'media_upload' => 1,
              ),
            ),
            'min' => '',
            'max' => '',
          ),
          array (
            'key' => '5722e308ad6b1',
            'name' => 'company_logos',
            'label' => 'Company Logos',
            'display' => 'block',
            'sub_fields' => array (
              array (
                'key' => 'field_5722e322ad6b2',
                'label' => 'Heading',
                'name' => 'heading',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
                'readonly' => 0,
                'disabled' => 0,
              ),
              array (
                'key' => 'field_5722e32dad6b3',
                'label' => 'Companies',
                'name' => 'companies',
                'type' => 'repeater',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'collapsed' => '',
                'min' => '',
                'max' => '',
                'layout' => 'table',
                'button_label' => 'Add Company',
                'sub_fields' => array (
                  array (
                    'key' => 'field_5722e371ad6b5',
                    'label' => 'Company Logo',
                    'name' => 'logo',
                    'type' => 'image',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 25,
                      'class' => '',
                      'id' => '',
                    ),
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => '',
                  ),
                  array (
                    'key' => 'field_5722e33dad6b4',
                    'label' => 'Company Name',
                    'name' => 'name',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 55,
                      'class' => '',
                      'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                    'readonly' => 0,
                    'disabled' => 0,
                  ),
                  array (
                    'key' => 'field_5722e3c1ad6b6',
                    'label' => 'Relationship',
                    'name' => 'relationship',
                    'type' => 'select',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 20,
                      'class' => '',
                      'id' => '',
                    ),
                    'choices' => array (
                      'featured' => 'Featured In',
                      'client' => 'Worked With',
                    ),
                    'default_value' => array (
                      0 => 'featured',
                    ),
                    'allow_null' => 0,
                    'multiple' => 0,
                    'ui' => 0,
                    'ajax' => 0,
                    'placeholder' => '',
                    'disabled' => 0,
                    'readonly' => 0,
                  ),
                ),
              ),
            ),
            'min' => '',
            'max' => '',
          ),
          array (
            'key' => '5722e416ad6b7',
            'name' => 'client_testimonials',
            'label' => 'Client Testimonials',
            'display' => 'block',
            'sub_fields' => array (
              array (
                'key' => 'field_5722e427ad6b8',
                'label' => 'Heading',
                'name' => 'heading',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
                'readonly' => 0,
                'disabled' => 0,
              ),
              array (
                'key' => 'field_5722e42bad6b9',
                'label' => 'Testimonials',
                'name' => 'testimonials',
                'type' => 'repeater',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array (
                  'width' => '',
                  'class' => '',
                  'id' => '',
                ),
                'collapsed' => '',
                'min' => '',
                'max' => '',
                'layout' => 'block',
                'button_label' => 'Add Testimonial',
                'sub_fields' => array (
                  array (
                    'key' => 'field_5722e491ad6bb',
                    'label' => 'Photo',
                    'name' => 'photo',
                    'type' => 'image',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 30,
                      'class' => '',
                      'id' => '',
                    ),
                    'return_format' => 'array',
                    'preview_size' => 'thumbnail',
                    'library' => 'all',
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => '',
                  ),
                  array (
                    'key' => 'field_5722e4b6ad6bc',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 35,
                      'class' => '',
                      'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                    'readonly' => 0,
                    'disabled' => 0,
                  ),
                  array (
                    'key' => 'field_5722ea41ad6bd',
                    'label' => 'Company/Title',
                    'name' => 'title',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => 35,
                      'class' => '',
                      'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                    'readonly' => 0,
                    'disabled' => 0,
                  ),
                  array (
                    'key' => 'field_5722e442ad6ba',
                    'label' => 'Quote',
                    'name' => 'quote',
                    'type' => 'wysiwyg',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                      'width' => '',
                      'class' => '',
                      'id' => '',
                    ),
                    'default_value' => '',
                    'tabs' => 'all',
                    'toolbar' => 'basic',
                    'media_upload' => 1,
                  ),
                ),
              ),
            ),
            'min' => '',
            'max' => '',
          ),
        ),
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'page',
          'operator' => '==',
          'value' => '414',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'acf_after_title',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => array (
      0 => 'the_content',
      1 => 'excerpt',
      2 => 'custom_fields',
      3 => 'discussion',
      4 => 'comments',
      5 => 'revisions',
      6 => 'author',
      7 => 'format',
      8 => 'page_attributes',
      9 => 'categories',
      10 => 'tags',
      11 => 'send-trackbacks',
    ),
    'active' => 1,
    'description' => '',
  ));
}
add_action('after_setup_theme', __NAMESPACE__ . '\\add_acf_field_groups');
