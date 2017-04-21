<?php
/**
 * Single blog post content
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<div class="entry clr"<?php wpex_schema_markup( 'entry_content' ); ?>>
	<?php the_content(); ?>

	<?php 

	$headline = get_post_meta( get_the_ID(), 'field_one', true );
	$headlineColor = get_post_meta( get_the_ID(), 'field_two', true );
	$bgColor = get_post_meta( get_the_ID(), 'field_nine', true );
	$subHeadline = get_post_meta( get_the_ID(), 'field_three', true );
	$subHeadlineColor = get_post_meta( get_the_ID(), 'field_four', true );
	$bodyCopy = get_post_meta( get_the_ID(), 'field_five', true );
	$bodyCopyColor = get_post_meta( get_the_ID(), 'field_six', true );
	$link = get_post_meta( get_the_ID(), 'field_seven', true );
	$btnTxt = get_post_meta( get_the_ID(), 'field_eight', true );
	$imgBG = get_post_meta( get_the_ID(), 'upload_media', true );

	if( ! empty( $headline ) ) {
		if( ! empty( $imgBG ) ) {
			echo '<div id="ad_section" style="background-image:url(' . wp_get_attachment_url($imgBG) . ');background-position:center center;background-repeat:no-repeat;background-color:' . $bgColor . ';cursor:pointer;padding:20px;min-height:200px;border-radius:5px;">';
		} else {
			echo '<div id="ad_section" style="background-color:' . $bgColor . ';cursor:pointer;padding:20px;min-height:200px;border-radius:5px;">';
		}
		if( ! empty( $link ) ) {
			echo '<a style="text-decoration:none;" href="' . $link . '" target="_blank">';
		}
		if( ! empty( $headline ) ) {
			echo '<h3 style="padding:10px 0;margin:0;color:' . $headlineColor . ';">' . $headline . '</h3>';
		}
		if( ! empty( $subHeadline ) ) {
			echo '<h4 style="padding:0;margin:0;color:' . $subHeadlineColor . ';">' . $subHeadline . '</h4>';
		}
		if( ! empty( $bodyCopy ) ) {
			echo '<p style="padding:10px 0;margin:0;color:' . $bodyCopyColor . ';">' . $bodyCopy . '</p>';
		}
		if( ! empty( $btnTxt ) ) {
			echo '<input style="margin:10px 0" type="submit" id="gform_submit_button_4" class="gform_button button" value="' . $btnTxt . '">';
		}
		if( ! empty( $link ) ) {
			echo '</a>';
		}
		echo '</div>';
	} 
 	?>
</div><!-- .entry -->

<?php get_template_part( 'partials/link-pages' ); ?>