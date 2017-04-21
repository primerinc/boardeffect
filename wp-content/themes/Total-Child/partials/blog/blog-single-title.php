<?php
/**
 * Single blog post title
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<header class="single-blog-header clr">
	<ul>
		<li class="meta-date"><time class="updated" datetime="<?php the_date('Y-m-d');?>"<?php wpex_schema_markup( 'publish_date' ); ?>><?php echo get_the_date(); ?></time></li>
	</ul>
	<h1 class="single-post-title entry-title"<?php wpex_schema_markup( 'headline' ); ?>><?php the_title(); ?></h1><!-- .single-post-title -->
</header><!-- .blog-single-header -->