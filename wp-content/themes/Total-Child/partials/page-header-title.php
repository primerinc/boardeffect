<?php
/**
 * Returns the post title
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.2.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define title args
$args = array();

// Single post markup
if ( ( is_singular( 'post' ) && 'custom_text' == wpex_get_mod( 'blog_single_header', 'custom_text' ) ) ) {
	$args['html_tag'] = 'span';
	$args['schema_markup'] = '';
}

// Singular CPT
elseif ( is_singular() && ( ! is_singular( 'page' ) && ! is_singular( 'attachment' ) ) ) {
	$args['html_tag'] = 'span';
	$args['schema_markup'] = '';
}

// Apply filters
$args = apply_filters( 'wpex_page_header_title_args', $args );

// Reworked this to display the correct category ID
$category = get_the_category($post->ID);

// Parse args to prevent empty attributes and extract
extract( wp_parse_args( $args, array(
	'html_tag'      => 'h1',
	'string'        => $category[0]->cat_name, //wpex_title(), Commented out wpex_title() and added in the cat_name info
	'schema_markup' => wpex_get_schema_markup( 'headline' )
) ) );

// Display title
if ( ! empty( $string ) ) {
	echo '<'. $html_tag .' class="page-header-title wpex-clr center-cat"'. $schema_markup .'>'. $string .'</'. $html_tag .'>';
}