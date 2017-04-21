<?php
/**
 * Blog entry audio format media
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Display if thumbnail is defined
if ( $thumbnail = wpex_get_blog_entry_thumbnail() ) :

	// Overlay style
	$overlay = wpex_get_mod( 'blog_entry_overlay' ); ?>

	<div class="blog-entry-media entry-media clr">
		<a href="<?php wpex_permalink(); ?>" title="<?php wpex_esc_title(); ?>" rel="bookmark" class="blog-entry-img-link<?php wpex_entry_image_animation_classes(); ?>">
			<?php echo $thumbnail; ?>
			<?php if ( $overlay ) { ?>
				<?php wpex_overlay( 'inside_link', $overlay ); ?>
			<?php } else { ?>
				<div class="blog-entry-music-icon-overlay"><span class="fa fa-music"></span></div>
			<?php } ?>
		</a><!-- .blog-entry-media-link -->
		<?php wpex_overlay( 'outside_link', $overlay ); ?>
	</div><!-- .blog-entry-media -->

<?php endif; ?>