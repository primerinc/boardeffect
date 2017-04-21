<?php
/**
 * Testimonials single post layout
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.2.0
 *
 * @todo Allow display of the title in the testimonial seperate from archive entry title setting
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<article class="clr">

	<div class="entry-content entry clr">

		<?php if ( 'blockquote' == wpex_get_mod( 'testimonial_post_style', 'blockquote' ) ) : ?>

			<?php get_template_part( 'partials/testimonials/testimonials-entry' ); ?>

		<?php else : ?>

			<?php the_content(); ?>

		<?php endif; ?>

	</div><!-- .entry-content -->

</article><!-- #post -->

<?php
// Displays comments if enabled
if ( wpex_get_mod( 'testimonials_comments' ) && comments_open() ) : ?>

	<section id="testimonials-post-comments" class="clr">
		<?php comments_template(); ?>
	</section><!-- #testimonials-post-comments -->

<?php endif; ?>