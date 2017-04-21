<?php
/**
 * Footer bottom content
 *
 * @package Total WordPress Theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get footer widgets columns
$columns    = wpex_get_mod( 'footer_widgets_columns', '4' );
$grid_class = wpex_grid_class( $columns );
$gap        = wpex_get_mod( 'footer_widgets_gap', '30' );

// Classes
$wrap_classes = array( 'clr' );
if ( '1' == $columns ) {
	$wrap_classes[] = 'single-col-footer';
} 
if ( $gap ) {
	$wrap_classes[] = 'gap-'. $gap;
}
$wrap_classes = implode( ' ', $wrap_classes ); ?>

<div id="footer-widgets" class="wpex-row <?php echo $wrap_classes; ?>">

	<?php
	// Footer box 1 ?>
	<div class="footer-box <?php echo $grid_class; ?> col col-1">
		<?php dynamic_sidebar( 'footer_one' ); ?>
	</div><!-- .footer-one-box -->

	<?php
	// Footer box 2
	if ( $columns > '1' ) : ?>
		<div class="footer-box <?php echo $grid_class; ?> col col-2">
			<?php dynamic_sidebar( 'footer_two' ); ?>
		</div><!-- .footer-one-box -->
	<?php endif; ?>
	
	<?php
	// Footer box 3
	if ( $columns > '2' ) : ?>
		<div class="footer-box <?php echo $grid_class; ?> col col-3 ">
			<div class="footer-widget widget_text clr">
				<div class="widget-title">DOWNLOAD</div>
				<div class="textwidget custom-widget invert">
					<div class="downloadBtn">
						<a href="https://itunes.apple.com/us/app/boardeffect/id415940983?mt=8" target="_blank"><img src="http://www.boardeffect.com/wp-content/uploads/2015/12/app-store-logo.png" alt="App Store" data-at2x="http://www.boardeffect.com/wp-content/uploads/2015/12/app-store-logo.png"></a>
					</div>
					<div class="downloadBtn">
						<a href="https://play.google.com/store/apps/details?id=com.boardeffect.BoardEffect&amp;hl=en" target="_blank"><img src="http://www.boardeffect.com/wp-content/uploads/2015/12/appstore_button_google.png" alt="Google Play" data-at2x="http://www.boardeffect.com/wp-content/uploads/2015/12/appstore_button_google.png"></a>
					</div>
					<div class="downloadBtn">
						<a href="http://www.amazon.com/BoardEffect/dp/B01DCK00KE?ie=UTF8&keywords=boardeffect&qid=1459954113&ref_=sr_1_1&s=mobile-apps&sr=1-1" target="_blank"><img src="http://www.boardeffect.com/wp-content/uploads/2016/04/Amazon_Kindle_logo.png" alt="Amazon Kindle" data-at2x="http://www.boardeffect.com/wp-content/uploads/2016/04/Amazon_Kindle_logo.png"></a>
					</div>
				</div>
			</div>
			<div class="footer-widget widget_text clr">
				<div class="widget-title">SECURITY CERTIFICATIONS</div>
				<div class="textwidget custom-widget">
					<div><a href="//privacy.truste.com/privacy-seal/validation?rid=53702ba0-ceac-4531-b2d8-ba76f4a4199d" target="_blank"><img style="border: none" src="//privacy-policy.truste.com/privacy-seal/seal?rid=53702ba0-ceac-4531-b2d8-ba76f4a4199d" alt="TRUSTe"/></a></div>
				</div>
			</div>
			<?php dynamic_sidebar( 'footer_three' ); ?>
		</div><!-- .footer-one-box -->
	<?php endif; ?>

	<?php
	// Footer box 4
	if ( $columns > '3' ) : ?>
		<div class="footer-box <?php echo $grid_class; ?> col col-4">
			<?php dynamic_sidebar( 'footer_four' ); ?>
		</div><!-- .footer-box -->
	<?php endif; ?>

	<?php
	// Footer box 5
	if ( $columns > '4' ) : ?>
		<div class="footer-box <?php echo $grid_class; ?> col col-4">
			<?php dynamic_sidebar( 'footer_five' ); ?>
		</div><!-- .footer-box -->
	<?php endif; ?>

</div><!-- #footer-widgets -->