<?php
/**
 * Outputs the testimonial entry author
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Display author if defined
if ( $author = get_post_meta( get_the_ID(), 'wpex_testimonial_author', true ) ) : ?>
	<span class="testimonial-entry-author entry-title"><?php echo $author; ?></span>
<?php endif; ?>