<?php
/**
 * Post meta (date, author, comments, etc) for custom post types.
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.2.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get meta blocks
 *
 * @see   framework/core.php
 * @link  http://wpexplorer-themes.com/total/snippets/alter-meta-sections/
 * @since 3.2.0
 */
$blocks = wpex_single_meta_blocks();

// Return if sections are empty
if ( ! empty( $blocks ) ) : ?>

	<ul class="meta clr">

		<?php
		// Loop through meta sections
		foreach ( $blocks as $block ) : ?>

			<?php if ( 'date' == $block ) : ?>
				<li class="meta-date"><span class="fa fa-clock-o"></span><time class="updated" datetime="<?php the_date('Y-m-d');?>"<?php wpex_schema_markup( 'publish_date' ); ?>><?php echo get_the_date(); ?></time></li>
			<?php endif; ?>

			<?php if ( 'author' == $block ) : ?>
				<li class="meta-author"><span class="fa fa-user"></span><span class="vcard author"<?php wpex_schema_markup( 'author_name' ); ?>><span class="fn"><?php if ( function_exists( 'coauthors_posts_links' ) ) { 
					coauthors_posts_links(); 
				} else {
					the_author_posts_link(); 
				} ?></span></span></li>
			<?php endif; ?>

			<?php if ( 'categories' == $block
					&& $categories = wpex_list_post_terms( wpex_get_post_type_cat_tax(), true, false ) ) : ?>
				<li class="meta-category"><span class="fa fa-folder-o"></span><?php echo $categories; ?></li>
			<?php endif; ?>

			<?php if ( 'comments' == $block && comments_open() && ! post_password_required() ): ?>
				<li class="meta-comments comment-scroll"><span class="fa fa-comment-o"></span><?php comments_popup_link( __( '0 Comments', 'wpex' ), __( '1 Comment',  'wpex' ), __( '% Comments', 'wpex' ), 'comments-link' ); ?></li>
			<?php endif; ?>

		<?php endforeach; ?>

	</ul><!-- .meta -->

<?php endif; ?>