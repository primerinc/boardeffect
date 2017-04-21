<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package Total WordPress Theme
 * @subpackage Templates
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?><?php wpex_schema_markup( 'html' ); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>

<script type='text/javascript' data-cfasync='false'>
  (function(doc, src, tagName){
    var t = doc.createElement(tagName);t.setAttribute("data-cfasync","false")
    t.src = src+"&r="+encodeURIComponent(doc.referrer);
    var h = doc.getElementsByTagName('head')[0];h.appendChild(t);
  })(document, '//p0.tribl.io/h.js?orgId=x57kQ8P39ztkD8BnXZKY', 'script');
</script>
<script type="text/javascript" src="//cdn.bizible.com/scripts/bizible.js" async=""></script>
</head>

<!-- Begin Body -->
<body <?php body_class(); ?><?php wpex_schema_markup( 'body' ); ?>>


<?php wpex_outer_wrap_before(); ?>

<div id="outer-wrap" class="clr">

	<?php wpex_hook_wrap_before(); ?>

	<div id="wrap" class="clr">

		<?php wpex_hook_wrap_top(); ?>

		<?php wpex_hook_main_before(); ?>

		<main id="main" class="site-main clr"<?php wpex_schema_markup( 'main' ); ?>>

			<?php wpex_hook_main_top(); ?>