<?php
/**
 * Child theme functions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development
 * and http://codex.wordpress.org/Child_Themes), you can override certain
 * functions (those wrapped in a function_exists() call) by defining them first
 * in your child theme's functions.php file. The child theme's functions.php
 * file is included before the parent theme's file, so the child theme
 * functions would be used.
 *
 * Text Domain: wpex
 * @link http://codex.wordpress.org/Plugin_API
 *
 */

add_filter( 'the_excerpt', 'shortcode_unautop');
add_filter( 'the_excerpt', 'do_shortcode');

function crunchify_print_scripts_styles() {
    // Print all loaded Scripts
    global $wp_scripts;
    foreach( $wp_scripts->queue as $script ) :
        echo $script . '  **  ';
    endforeach;
 
    // Print all loaded Styles (CSS)
    global $wp_styles;
    foreach( $wp_styles->queue as $style ) :
        echo $style . '  ||  ';
    endforeach;
}
 
//add_action( 'wp_print_scripts', 'crunchify_print_scripts_styles', 100);

function remove_default_stylesheets() {
    
    wp_dequeue_style( 'wpex-google-font-open-sans' );
    wp_deregister_style( 'wpex-google-font-open-sans' );

    wp_enqueue_style('theme_styles', get_stylesheet_directory_uri() . '/styles.css' );

    //wp_dequeue_style( 'wpex-google-font-roboto-slab' ); //wpex-google-font-roboto-slab
    //wp_deregister_style( 'wpex-google-font-roboto-slab' );

    //wp_register_style('robotoFont', '//fonts.googleapis.com/css?family=Roboto:fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic');
    //wp_enqueue_style( 'robotoFont');

    //wp_dequeue_style( 'wpex-visual-composer' );
    //wp_deregister_style( 'wpex-visual-composer' );

    //wp_dequeue_style( 'wpex-visual-composer-extend' );
    //wp_deregister_style( 'wpex-visual-composer-extend' );

    //wp_dequeue_style( 'wpex-responsive' );
    //wp_deregister_style( 'wpex-responsive' );

    //wp_dequeue_style( 'wpex-style' );
    //wp_deregister_style( 'wpex-style' );

    //wp_dequeue_style( 'rs-plugin-settings' );
    //wp_deregister_style( 'rs-plugin-settings' );

    //wp_dequeue_style( 'wpex-font-awesome' );
    //wp_deregister_style( 'wpex-font-awesome' );

    //wp_dequeue_style( 'wpex-responsive' );
    //wp_deregister_style( 'wpex-responsive' );

    //wp_dequeue_style( 'js_composer_front' );
    //wp_deregister_style( 'js_composer_front' );

    //wp_dequeue_style( 'total-min' );
    //wp_deregister_style( 'total-min' );
}

add_action( 'wp_enqueue_scripts', 'remove_default_stylesheets', 100 );

function remove_default_scripts() {

    wp_dequeue_script( 'jquery' );
    wp_deregister_script( 'jquery' );

    wp_dequeue_script( 'total-min' );
    wp_deregister_script( 'total-min' );

}

function state_law_styles() {
    //wp_register_style( 'styles', 'css/styles.css' );
    //wp_enqueue_script('styles');
    if ( is_page('nonprofit-state-laws') ) { //is_page('state-laws-stats') || is_page('8899') ) { 
        wp_enqueue_style('state_styles', get_stylesheet_directory_uri() . '/css/state_styles.css' );

        wp_register_script( 'd3-min', "http://d3js.org/d3.v3.min.js" );
        wp_register_script( 'topojson-min', "http://d3js.org/topojson.v1.min.js", array ( 'd3-min' ) );
        wp_register_script( 'd3-queue-min', "http://d3js.org/queue.v1.min.js", array ( 'd3-min' ));
        wp_register_script( 'd3-shape', 'https://d3js.org/d3-shape.v1.js', array ( 'd3-min' ) );
        wp_register_script( 'state-script', get_stylesheet_directory_uri() . '/js/script.js', array ( 'd3-min', 'topojson-min', 'd3-queue-min' ) );

        wp_enqueue_script('d3-min');
        wp_enqueue_script('topojson-min');
        wp_enqueue_script('d3-queue-min');
        wp_enqueue_script('d3-shape');
        wp_enqueue_script('state-script');
    }
}

add_action( 'wp_enqueue_scripts', 'state_law_styles' );

function state_topic_styles() {
    //wp_register_style( 'styles', 'css/styles.css' );
    //wp_enqueue_script('styles');
    if ( is_page('nonprofit-laws') ) { //is_page('state-laws-stats') || is_page('8899') ) { 
        wp_enqueue_style('state_styles', get_stylesheet_directory_uri() . '/css/state_styles.css' );

        wp_register_script( 'd3-min', "http://d3js.org/d3.v3.min.js" );
        wp_register_script( 'topojson-min', "http://d3js.org/topojson.v1.min.js", array ( 'd3-min' ) );
        wp_register_script( 'd3-queue-min', "http://d3js.org/queue.v1.min.js", array ( 'd3-min' ));
        wp_register_script( 'd3-shape', 'https://d3js.org/d3-shape.v1.js', array ( 'd3-min' ) );
        wp_register_script( 'state-script', get_stylesheet_directory_uri() . '/js/script_topic.js', array ( 'd3-min', 'topojson-min', 'd3-queue-min' ) );

        wp_enqueue_script('d3-min');
        wp_enqueue_script('topojson-min');
        wp_enqueue_script('d3-queue-min');
        wp_enqueue_script('d3-shape');
        wp_enqueue_script('state-script');
    }
}

add_action( 'wp_enqueue_scripts', 'state_topic_styles' );

// Custom styles for the Nonprofit Laws Homepage
function nonprofit_dropdown_styles() {
    if ( is_page('nonprofits-laws-board-rules-and-regulations') || is_page('research-approach')) { //is_page('state-laws-stats') || is_page('8899') ) { 
        wp_enqueue_style('state_styles', get_stylesheet_directory_uri() . '/css/state_styles.css' );
        
        wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
        wp_register_script( 'dropdown-script', get_stylesheet_directory_uri() . '/js/dropdown.js', array ( 'jquery' ) );
        wp_enqueue_script('dropdown-script');
    }
}

add_action( 'wp_enqueue_scripts', 'nonprofit_dropdown_styles' );

function check_for_cookie() {
    $cookie_value = 'board_effect_nonprofit_laws';
    if( is_page(8947)) { // If on sign-up page redirect to NP Homepage
        if(isset($_COOKIE[$cookie_value])){
            //header( 'Location: http://www.boardeffect.com/nonprofits-laws-board-rules-and-regulations/' );
        }
        wp_register_script( 'redirect-script', get_stylesheet_directory_uri() . '/js/redirect_script.js' );
        wp_enqueue_script('redirect-script');
    }
}

add_action( 'wp_enqueue_scripts', 'check_for_cookie');

// Cookie for the Nonprofit Laws Report Pages (form 59)
function set_form_59_complete_cookie() {
    setcookie( 'board_effect_nonprofit_laws', 1, strtotime( '+1000 days' ), COOKIEPATH, COOKIE_DOMAIN, false, false );
    setcookie("board_effect_nonprofit_laws", 1, time()+31556926, "/");
}
add_action( 'gform_after_submission_59', 'set_form_59_complete_cookie' );

// Cookie for the Nonprofit Laws Report Pages (form 58)
function set_form_58_complete_cookie() {
    setcookie( 'board_effect_nonprofit_laws', 1, strtotime( '+1000 days' ), COOKIEPATH, COOKIE_DOMAIN, false, false );
    setcookie("board_effect_nonprofit_laws", 1, time()+31556926, "/");
}
add_action( 'gform_after_submission_58', 'set_form_58_complete_cookie' );

//add_action( 'wp_enqueue_scripts', 'remove_default_scripts', 20 );

function primer_custom_init() {
  remove_post_type_support( 'post', 'custom-fields' );
}
add_action( 'init', 'primer_custom_init' );

add_action('template_redirect', 'primer_remove_wp_archives');
 
function primer_remove_wp_archives(){
  if( is_tag() ) { //is_category() || is_tag() || is_date() || is_author()
    global $wp_query;
    $wp_query->set_404(); //set to 404 not found page
  }
}

/*-----------------------------------------------------------------------------------*/
/*	- SAMPLE SNIPPETS
/*	- Below are some useful snippets you can use to tweak the theme.
/*	- See the Total FAQ for more useful snippets or ask me :)
/*-----------------------------------------------------------------------------------*/


/**
 * Load translations from your child theme
 * Add your .po/.mo files into a "languages" folder in your child theme then uncomment this function
 *
 * @link http://codex.wordpress.org/Function_Reference/load_child_theme_textdomain
 * @return url
 */
/*
function my_child_theme_setup() {
    load_child_theme_textdomain( 'my_child_theme', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'my_child_theme_setup' );
*/



/**
 * Add page settings meta options to other post types
 *
 * @link Total/framework/redux/meta-config.php
 */
/*
function my_add_meta_to_post_types( $array ) {
    $array[] = 'gallery';
    return $array;
}
add_filter( 'wpex_main_metaboxes_post_types', 'my_add_meta_to_post_types' );
*/



/**
 * Alter the layout on any page, post, archive
 *
 * @link Total/framework/post-layout.php
 */
/*
function my_fullwidth_homepage( $class ) {
    // Make the front-page have a full-width layout
    if ( is_front_page() ) {
        return 'full-width';
    } else { 
        return $class;
    }
}
add_filter( 'wpex_post_layout_class', 'my_fullwidth_homepage' );
*/



/**
 * Disable the main header anywhere
 *
 * @link Total/framework/header/page-header.php
 */
/*
function my_disable_header( $return ) {
    // Disable header on the homepage
    if ( is_front_page() ) {
        return false;
    } else { 
        return $return;
    }
}
add_filter( 'wpex_display_header', 'my_disable_header' );
*/



/**
 * Customize the default logo URL
 *
 * @link Total/framework/header/header-logo.php
 * @return string
 */
/*
function my_custom_logo_url() {
    return 'wpexplorer.com';
}
add_filter( 'wpex_logo_url', 'my_custom_logo_url' );
*/



/**
 * Remove admin panel sections
 *
 * @link Total/framework/redux/admin-config.php
 * @return $sections
 */
/*
function my_override_redux_array( $sections ) {
    unset( $sections['5'] ); // Remove the 5th section
    return $sections;
}
add_filter( 'wpex_redux_sections', 'my_override_redux_array' );
*/



/**
 * Disable custom post types completely
 *
 * @link Total/framework/core-functions.php
 * @return $array
 */
/*
function my_disable_post_types( $array ) {
    unset( $array['portfolio'] ); // Remove portfolio
    unset( $array['staff'] ); // Remove staff
    unset( $array['testimonials'] ); // Remove testimonials.
    return $array; 
}
add_filter( 'wpex_theme_post_types', 'my_disable_post_types' );
*/



/**
 * Alter the header searchfield placeholder
 *
 * @link Total/framework/search/
 * @return $array
 */
/*
function my_search_placeholder() {
	return __( 'Your custom text', 'wpex' );
}
add_filter( 'wpex_search_placeholder_text', 'my_search_placeholder' );
*/



/**
 * Disable the page header/title
 *
 * @link Total/framework/page-header.php
 * @link http://codex.wordpress.org/Conditional_Tags
 * @return $array
 */
/*
function my_disable_title( $return ) {
	// Disable the title for singular products
    if ( is_singular( 'product' ) ) {
        return false;
    } else {
        return $return;
    }
}
add_filter( 'wpex_display_page_header', 'my_disable_title' );
*/



/**
 * Alter the mobile menu default "bars"
 *
 * @link Total/framework/header/menu/menu-mobile.php
 * @return $array
 */
/*
function my_alter_mobile_menu_toggle( $return ) {
   return 'Example';
}
add_filter( 'wpex_mobile_menu_open_button_text', 'my_alter_mobile_menu_toggle' );
*/



/**
 * Alter the default header <title> tag
 * This just overrides the theme function - no filter
 *
 * @link Total/framework/header/meta-tags.php
 */
/*
function wpex_meta_title() { ?>
     <title><?php wp_title('|'); ?></title>
<?php }
*/



/**
 * Display memory queries on the front-end
 *
 * @link Total/framework/core-functions.php
 */
/*
function my_display_queries( $array ) {
    $array['helpers']['display_queries_memory'] = true;
    return $array;
}
add_filter( 'wpex_global_config', 'my_display_queries' );
*/



/**
 * Alter the default toggle bar button (plus icon)
 *
 * @link Total/framework/header/top-bar.php
 */
/*
function wpex_toggle_bar_btn() {
    if ( !wpex_toggle_bar_active() ) {
        return;
    }
    echo '<a href="#" class="toggle-bar-btn fade-toggle '. wpex_option( 'toggle_bar_visibility' ) .'"><span class="fa fa-plus" /></a>';
}
*/



/**
 * Alter the next/previous links
 *
 * @link Total/framework/header/next-prev.php
 */
/*
// Change previous post link text to 'Prev'
function my_custom_prev_post_link_title() {
    return __( 'Prev', 'wpex' );
}
add_filter( 'wpex_prev_post_link_title', 'my_custom_prev_post_link_title' );

// Change next post link text to 'next'
function my_custom_next_post_link_title() {
    return __( 'Next', 'wpex' );
}
add_filter( 'wpex_next_post_link_title', 'my_custom_next_post_link_title' );
*/



/**
 * Re-order the social sharing links
 *
 * @link Total/framework/social/social-share.php
 */
/*
function my_custom_social_sharing_sites( $array ) {
    return array(
        'twitter'        => 'Twitter',
        'facebook'       => 'Facebook',
        'google_plus'    => 'Google Plus',
        'pinterest'      => 'Pinterest',
        'linkedin'       => 'LinkedIn',
    );
}
add_filter( 'wpex_social_sharing_sites', 'my_custom_social_sharing_sites' );
*/



/**
 * Add a searchbar input into the navigation bar
 *
 * @link Total/framework/hooks/hooks.php
 */
/*
function add_search_to_header() { ?>
    <form role="search" method="get" class="my-custom-searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
        <input type="search" class="field" name="s" value="<?php _e( 'search', 'wpex' ); ?>" onfocus="if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;" />
    </form>
<?php }
add_filter( 'wpex_hook_main_menu_bottom', 'add_search_to_header' );
*/



/**
 * Custom meta viewport
 *
 * @link Total/framework/header/meta-tags.php
 */
/*
function my_custom_viewport() { ?>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
<?php }
add_filter( 'wpex_meta_viewport', 'my_custom_viewport' );
*/



/**
 * Add portfolio post type support for jetpack publicize
 * In otherwords, edit the portfolio supports array
 *
 * @link Total/framework/posttypes-taxonomies/register-portfolio.php
 */
/*
function my_portfolio_add_publicize() {
	$args['supports'] =  array( 'title', 'editor', 'excerpt', 'thumbnail', 'comments', 'custom-fields', 'revisions', 'publicize’ )
}
add_filter( 'wpex_portfolio_args', 'my_portfolio_add_publicize' );
*/



/**
 * Add more items to the sidr mobile menu
 *
 * @link Total/framework/core-functions.php
 */
/*
function my_add_to_mobile_menu( $array ) {
	$array['my-custom-id'] = '#my-custom-id';
	return $array;
}
add_filter( 'wpex_mobile_menu_source', 'my_add_to_mobile_menu' );
*/



/**
 * How can I open the sidr Mobile menu from the right instead of the left
 *
 * @link Total/framework/scripts.php
 */
/*
function my_edit_localize_array( $array ) {
    $array['sidrSide'] = 'right';
    return $array;
}
add_filter( 'wpex_localize_array', 'my_edit_localize_array' );
*/


/**
* Added custom cookie
***/

//Put this in your WordPress Theme functions.php file
//check all GET Params, save the ones identified in $toCatch w/ 'cs_ck_' prefix
add_action('send_headers', 'save_get_params');
function save_get_params() {
    // it's possible to use 'if( !empty( $_GET['affid']) )'
        $toCatch = array('utm_campaign','utm_content','utm_medium','utm_source','utm_term');
        $exp = time()+60*60*24*365*5;
        foreach($_GET as $k => $v){
               if(in_array($k,$toCatch) && !empty($v)){
                       $v = trim(stripslashes($v));
                       setcookie("cs_ck_{$k}",$v,$exp, '/','boardeffect.com');
               }
        }
}