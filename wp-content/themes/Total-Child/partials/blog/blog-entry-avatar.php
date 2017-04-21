<?php
/**
 * Blog entry avatar
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<div class="blog-entry-author-avatar">
	<a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>" title="<?php echo __( 'Visit Author Page', 'wpex' ); ?>">
		<?php echo get_avatar(
			get_the_author_meta( 'user_email' ),
			apply_filters( 'wpex_blog_entry_author_avatar_size', 74 )
		) ?>
	</a>
</div><!-- .blog-entry-author-avatar -->