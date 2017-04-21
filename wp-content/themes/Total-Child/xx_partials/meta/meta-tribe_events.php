<?php
/**
 * Post meta for the tribe events
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Default enabled meta sections
$meta_sections	= array( 'date', 'author', 'categories', 'comments' );

// Apply filters for easy modification
$meta_sections = apply_filters( 'wpex_meta_sections', $meta_sections );

// Convert meta sections into array if not array
if ( $meta_sections && ! is_array( $meta_sections ) ) {
	$meta_sections = explode( ',', $meta_sections );
}

// Return if sections are empty
if ( empty( $sections ) ) {
	return;
} ?>

<ul class="meta clr">

	<?php
	// Loop through meta sections
	foreach ( $meta_sections as $meta_section ) : ?>

		<?php
		// Date
		if ( 'date' == $meta_section && function_exists( 'tribe_get_start_date' ) ) { ?>
										
			<li class="meta-date"><span class="fa fa-clock-o"></span><?php echo tribe_get_start_date( get_the_ID(), false, get_option( 'date_format' ) ); ?></li>

		<?php } ?>

		<?php
		// Author
		if ( 'author' == $meta_section ) { ?>

			<li class="meta-author"><span class="fa fa-user"></span><?php if ( function_exists( 'coauthors_posts_links' ) ) { 
					coauthors_posts_links(); 
				} else {
					the_author_posts_link(); 
				} ?></li>

		<?php } ?>

		<?php
		// Comments
		if ( 'comments' == $meta_section && comments_open() && ! post_password_required() ) { ?>

			<li class="meta-comments comment-scroll"><span class="fa fa-comment-o"></span><?php comments_popup_link( __( '0 Comments', 'wpex' ), __( '1 Comment',  'wpex' ), __( '% Comments', 'wpex' ), 'comments-link' ); ?></li>

		<?php } ?>

	<?php endforeach; ?>

</ul><!-- .meta -->