<?php
/**
 * Title Category Hover Overlay
 *
 * @package Total WordPress Theme
 * @subpackage Partials
 * @version 3.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Only used for inside position
if ( 'inside_link' != $position ) {
    return;
}

// Get category taxonomy for current post type
$taxonomy = wpex_get_post_type_cat_tax();

// Get terms
if ( $taxonomy ) {
    $terms = wpex_list_post_terms( $taxonomy, $show_links = false, $echo = false );
} ?>

<div class="overlay-title-category-hover overlay-hide theme-overlay">
    <div class="overlay-title-category-hover-inner clr">
        <div class="overlay-title-category-hover-text clr">
            <div class="overlay-title-category-hover-title">
                <?php the_title(); ?>
            </div><!-- .overlay-title-category-hover-title -->
            <?php if ( ! empty( $terms ) ) : ?>
                <div class="overlay-title-category-hover-category">
                    <?php echo $terms; ?>
                </div><!-- .overlay-title-category-visible-category -->
            <?php endif ?>
        </div><!-- .overlay-title-category-hover-text -->
    </div><!-- .overlay-title-category-hover-inner -->
</div><!-- .overlay-title-category-hover -->