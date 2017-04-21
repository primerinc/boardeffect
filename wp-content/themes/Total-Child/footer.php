<?php
/**
 * The template for displaying the footer.
 *
 * @package Total WordPress Theme
 * @subpackage Templates
 */ ?>

            <?php wpex_hook_main_bottom(); ?>

        </main><!-- #main-content --><?php // main-content opens in header.php ?>
                
        <?php wpex_hook_main_after(); ?>

        <?php wpex_hook_wrap_bottom(); ?>

    </div><!-- #wrap -->

    <?php wpex_hook_wrap_after(); ?>

</div><!-- .outer-wrap -->

<?php wpex_outer_wrap_after(); ?>

<?php wp_footer(); ?>

<?php if(is_category())  {
		echo '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55db70b5a4546849" async="async"></script>';
	} 

	if (is_single()) {
		echo '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55db70b5a4546849" async="async"></script>';
	}
?>

<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-N6VBGX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N6VBGX');</script>
<!-- End Google Tag Manager -->

</body>
</html>