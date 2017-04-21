<?php
/**
 * Custom Post Type Entry Meta
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.2.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get blobal page meta template part
get_template_part( 'partials/meta/meta', get_post_type() );