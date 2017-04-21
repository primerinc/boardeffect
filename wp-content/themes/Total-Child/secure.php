<?php
/*
Template Name: Secure Token Page
*/

/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 * @package	Total
 * @author Alexander Clarke
 * @author Bala Peterson - add secure token element
 * @copyright Copyright (c) 2014, Symple Workz LLC
 * @link http://www.wpexplorer.com
 * @since Total 1.0
 */

// Get site header
get_header(); 


//$token_host = "https://pug1.boardeffect.com";
$token_query = $_SERVER['QUERY_STRING'];
parse_str($token_query, $tokenarr);
$token_host = $tokenarr['ref']; //will be the full hostname, so if the client is abc.boardeffect.com it’ll be ref=abs.boardeffect.com. The reason for this is some of our clients are in the uk so we have a .co.uk url, as well as a .com.au url
$token_response_code = 400;
$token_value = $tokenarr['token'];



if($token_value && $token_host){

	//echo('token value = ' . $token_value . ' token host = ' . $token_host);

	//if($_SERVER['HTTP_REFERER']){
		//$token_host = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);
	//$token_host = $_SERVER['HTTP_REFERER'];
	//}
	
	$token_response = wp_remote_get('https://'.$token_host . '/api/token_verify?token='.$token_value);
	$token_response_code = wp_remote_retrieve_response_code( $token_response );
} else {

	// Redirect to 404 page
	//echo('token value = ' . $token_value . ' token host = ' . $token_host);
	//header('Location: index.html');
	//exit;
}

?>
<span style="display:none">$qstr: <?php echo ($tokenarr); ?></span>
<span style="display:none">$token_value: <?php echo ($token_value); ?></span>
<span style="display:none">$token_host: <?php echo ($token_host); ?></span>
<span style="display:none">$token_response: <?php echo (json_encode($token_response)); ?></span>
<span style="display:none">$token_response_code: <?php echo ($token_response_code); ?></span>

	<div id="content-wrap" class="container clr <?php echo wpex_get_post_layout(); // used to be wpex_get_post_layout_class(); ?> securetokenpage">
		<section id="primary" class="content-area clr">
			<div id="content" class="clr site-content" role="main">
				<?php while ( have_posts() ) : the_post(); ?>
					<article class="clr">
						<?php
						// Display featured image if one has been set
						if ( has_post_thumbnail() && wpex_option( 'page_featured_image' ) ) { ?>
							<div id="page-featured-img" class="clr">
								<?php the_post_thumbnail(); ?>
							</div><!-- #page-featured-img -->
						<?php } ?>
						<div class="entry-content entry clr">
							
							<?php 
								
								if(current_user_can( 'manage_options' )){
									the_content(); 
									//the_excerpt();
								}else if ($token_response_code === 200 ){
									the_content(); 
									//echo('200');
								}else{
									the_excerpt();
								}

							?>

							<?php wp_link_pages( array(
								'before'		=> '<div class="page-links clr">',
								'after'			=> '</div>',
								'link_before'	=> '<span>',
								'link_after'	=> '</span>'
							) ); ?>
						</div><!-- .entry-content -->
						<?php
						// Display social sharing links
						// See functions/social-share.php
						//wpex_social_share(); 

						?>
					</article><!-- #post -->
					<?php
					// Display comments template if enabled in the admin
					if ( wpex_option( 'page_comments', '0' ) == '1' ) {
						comments_template();
					} ?>
				<?php endwhile; ?>
			</div><!-- #content -->
		</section><!-- #primary -->
		<?php
		// Get sidebar if needed
		//get_sidebar(); ?>
	</div><!-- #content-wrap -->

<?php
// Get site footer
get_footer(); ?>