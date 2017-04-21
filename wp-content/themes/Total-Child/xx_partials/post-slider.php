<?php
/**
 * Post slider output
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get post id
$post_id = wpex_global_obj( 'post_id' );

// Get the Slider shortcode
$slider = wpex_global_obj( 'post_slider_shortcode' );

// Disable on Mobile?
$disable_on_mobile = get_post_meta( $post_id, 'wpex_disable_post_slider_mobile', true );

// Get slider alternative
$slider_alt = get_post_meta( $post_id, 'wpex_post_slider_mobile_alt', true );

// Check if alider alternative for mobile custom field has a value
if ( 'on' == $disable_on_mobile && $slider_alt ) {

// Sanitize slider mobile alt
if ( is_numeric( $slider_alt ) ) {
	$slider_alt = wp_get_attachment_image_src( $slider_alt, 'full' );
	$slider_alt = $slider_alt[0];
}

// Cleanup validation for old Redux system
if ( is_array( $slider_alt ) && ! empty( $slider_alt['url'] ) ) {
	$slider_alt = $slider_alt['url'];
}

// Mobile slider alternative link
$slider_alt_url = get_post_meta( $post_id, 'wpex_post_slider_mobile_alt_url', true );

// Mobile slider alternative link target
if ( $slider_alt_target = get_post_meta( $post_id, 'wpex_post_slider_mobile_alt_url_target', true ) ) {
	$slider_alt_target = 'target="_'. $slider_alt_target .'"';
}
}

// Otherwise set all vars to empty
else {
$slider_alt = $slider_alt_url = $slider_alt_target = NULL;;
}

// Slider classes
$classes = array( 'page-slider', 'clr' );
$classes = apply_filters( 'wpex_post_slider_classes', $classes );
$classes = implode( ' ', $classes ); ?>

<div class="<?php echo $classes; ?>">

	<?php
	// Mobile slider
	if ( $slider_alt ) : ?>

		<div class="page-slider-mobile hidden-desktop clr">
		
			<?php if ( $slider_alt_url ) : ?>

				<a href="<?php echo esc_url( $slider_alt_url ); ?>" title=""<?php echo $slider_alt_target; ?>>
					<img src="<?php echo $slider_alt; ?>" class="page-slider-mobile-alt" alt="<?php echo the_title(); ?>" />
				</a>

			<?php else : ?>

				<img src="<?php echo $slider_alt; ?>" class="page-slider-mobile-alt" alt="<?php echo the_title(); ?>" />

			<?php endif; ?>

		</div><!-- .page-slider-mobile -->

	<?php endif; ?>

	<?php
	// Disable slider on mobile
	if ( 'on' == $disable_on_mobile ) { ?>

		<div class="visible-desktop clr">
		
	<?php } ?>

		<?php echo do_shortcode( $slider ); ?>

	<?php if ( 'on' == $disable_on_mobile ) echo '</div>'; ?>

</div><!-- .page-slider -->

<?php if ( $margin = get_post_meta( $post_id, 'wpex_post_slider_bottom_margin', true ) ) : ?>

	<div style="height:<?php echo intval( $margin ); ?>px;"></div>

<?php endif; ?>