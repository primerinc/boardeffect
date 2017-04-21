<?php
/**
 * Blog entry meta
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get meta sections
$sections = wpex_blog_entry_meta_sections();

// Return if sections are empty
if ( empty( $sections ) ) {
	return;
}

// Add class for meta with title
$classes = 'meta clr';
if ( 'custom_text' == wpex_get_mod( 'blog_single_header', 'custom_text' ) ) {
	$classes .= ' meta-with-title';
} ?>

<ul class="<?php echo $classes; ?>">

	<?php
	// Loop through meta sections
	foreach ( $sections as $section ) : ?>

		<!--<?php if ( 'date' == $section ) : ?>
			<li class="meta-date"><span class="fa fa-clock-o"></span><span class="updated"><?php echo get_the_date(); ?></span></li>
		<?php endif; ?>-->

		<?php if ( 'author' == $section ) : ?>
			<li class="meta-author"><!--<span class="fa fa-user"></span>--><span class="vcard author"><span class="fn">Written by <?php if ( function_exists( 'coauthors_posts_links' ) ) { 
					coauthors_posts_links(); 
				} else {
					the_author_posts_link(); 
				} ?></span></span></li>
		<?php endif; ?>

		<!--<?php if ( 'categories' == $section ) : ?>
			<li class="meta-category"><span class="fa fa-folder-o"></span><?php the_category( ', ', get_the_ID() ); ?></li>
		<?php endif; ?>

		<?php if ( 'comments' == $section && comments_open() && ! post_password_required() ): ?>
			<li class="meta-comments comment-scroll"><span class="fa fa-comment-o"></span><?php comments_popup_link( __( '0 Comments', 'wpex' ), __( '1 Comment',  'wpex' ), __( '% Comments', 'wpex' ), 'comments-link' ); ?></li>
		<?php endif; ?>-->

	<?php endforeach; ?>

</ul><!-- .meta -->