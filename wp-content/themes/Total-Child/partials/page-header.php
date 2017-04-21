<?php
/**
 * The page header displays at the top of all single pages, posts and archives.
 * See framework/page-header.php for all page header related functions.
 * See framework/hooks/actions.php for all functions attached to the header hooks.
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<?php wpex_hook_page_header_before(); ?>

<header class="<?php echo wpex_page_header_classes(); 
	
	foreach((get_the_category()) as $category) { echo ' category-head category-head-' . strtolower($category->cat_name); } 
	if(is_page('nonprofit-state-laws') || is_page('nonprofit-laws')) {
		echo ' hide';
	}
?> ">

	<?php wpex_hook_page_header_top(); ?>

	<div class="container clr page-header-inner">

		<?php wpex_hook_page_header_inner(); // All default content added via this hook ?>

		<?php 
			/*
			if(is_single( $post = '' )) { echo '<div class="signup-form"><h5>Please subscribe to our blog</h5>' . gravity_form( 4, false, false ) . '</div>'; }
			if(is_category( '' )) { echo '<div class="signup-form"><h5>Please subscribe to our blog</h5>' . gravity_form( 4, false, false ) . '</div>'; } 
			*/
			if(is_single( $post = '' )) { echo get_search_form() . '<div class="pad"></div>'; }
			if(is_category( '' )) { echo get_search_form() . '<div class="pad"></div>'; } 

		 ?>

		<!--<div class="signup-form"><h5>Please subscribe to our blog</h5><?php //gravity_form( 4, false, false ); ?></div> -->

	</div><!-- .page-header-inner -->

	<?php wpex_hook_page_header_bottom(); ?>


</header><!-- .page-header -->

<?php wpex_hook_page_header_after(); ?>