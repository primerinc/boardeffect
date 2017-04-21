<?php
/**
 * Navbar Style Mobile Menu Toggle
 *
 * @package Total WordPress Theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Menu Location
$menu_location = apply_filters( 'wpex_main_menu_location', 'main_menu' );

// Multisite global menu
$ms_global_menu = apply_filters( 'wpex_ms_global_menu', false );

// Display if menu is defined
if ( has_nav_menu( $menu_location ) || $ms_global_menu ) :

	// Get menu text
	$icon = apply_filters( 'wpex_mobile_menu_navbar_open_icon', '<span class="fa fa-navicon"></span>' );
	$text = apply_filters( 'wpex_mobile_menu_navbar_open_text', wpex_get_mod( 'mobile_menu_toggle_text', _x( 'Menu', 'Mobile Menu Toggle Button Text', 'wpex' ) ) ); ?>

	<?php
	// Closing toggle for the sidr mobile menu style
	if ( 'sidr' == wpex_global_obj( 'mobile_menu_style' ) ) : ?>

		<div id="sidr-close"><a href="#sidr-close" class="toggle-sidr-close"></a></div>

	<?php endif; ?>

	<div id="wpex-mobile-menu-navbar" class="clr wpex-hidden">
		<div class="container clr">
			<a href="#mobile-menu" class="mobile-menu-toggle" title="<?php echo $text; ?>"><?php echo $icon; ?><?php echo $text; ?></a>
		</div><!-- .container -->
	</div><!-- #wpex-mobile-menu-navbar -->

<?php endif; ?>