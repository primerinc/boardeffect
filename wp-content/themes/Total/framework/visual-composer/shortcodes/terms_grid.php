<?php
/**
 * Visual Composer Terms Grid
 *
 * @package Total WordPress Theme
 * @subpackage VC Functions
 * @version 3.5.3
 */

if ( ! class_exists( 'VCEX_Terms_Grid_Shortcode' ) ) {

	class VCEX_Terms_Grid_Shortcode {

		/**
		 * Main constructor
		 *
		 * @since 3.5.0
		 */
		public function __construct() {
			
			// Add shortcode
			add_shortcode( 'vcex_terms_grid', array( 'VCEX_Terms_Grid_Shortcode', 'output' ) );

			// Map to VC
			if ( function_exists( 'vc_lean_map' ) ) {
				vc_lean_map( 'vcex_terms_grid', array( 'VCEX_Terms_Grid_Shortcode', 'map' ) );
			}

			// Admin filters
			if ( is_admin() ) {

				// Edit forms on open
				add_filter( 'vc_edit_form_fields_attributes_vcex_terms_grid', array( 'VCEX_Terms_Grid_Shortcode', 'edit_form_fields' ) );

				// Suggest tax
				add_filter( 'vc_autocomplete_vcex_terms_grid_taxonomy_callback', 'vcex_suggest_taxonomies', 10, 1 );
				add_filter( 'vc_autocomplete_vcex_terms_grid_taxonomy_render', 'vcex_render_taxonomies', 10, 1 );

				// Suggest terms
				add_filter( 'vc_autocomplete_vcex_terms_grid_exclude_terms_callback', 'vcex_suggest_terms', 10, 1 );
				add_filter( 'vc_autocomplete_vcex_terms_grid_exclude_terms_render', 'vcex_render_terms', 10, 1 );
				add_filter( 'vc_autocomplete_vcex_terms_grid_child_of_callback', 'vcex_suggest_terms', 10, 1 );
				add_filter( 'vc_autocomplete_vcex_terms_grid_child_of_render', 'vcex_render_terms', 10, 1 );

			}

		}

		/**
		 * Edit form fields
		 *
		 * @since 3.5.0
		 */
		public static function edit_form_fields( $atts ) {
			$title_typo = ! empty( $atts['title_typo'] ) ? vcex_parse_typography_param( $atts['title_typo'] ) : '';
			if ( $title_typo && ! empty( $title_typo['font_family'] ) ) {
				$atts['title_font_family'] = $title_typo['font_family'];
			}
			$description_typo = ! empty( $atts['description_typo'] ) ? vcex_parse_typography_param( $atts['description_typo'] ) : '';
			if ( $description_typo && ! empty( $description_typo['font_family'] ) ) {
				$atts['description_font_family'] = $description_typo['font_family'];
			}
			return $atts;
		}

		/**
		 * Shortcode output => Get template file and display shortcode
		 *
		 * @since 3.5.0
		 */
		public static function output( $atts, $content = null ) {
			ob_start();
			include( locate_template( 'vcex_templates/vcex_terms_grid.php' ) );
			return ob_get_clean();
		}

		/**
		 * Map shortcode to VC
		 *
		 * @since 3.5.0
		 */
		public static function map() {
			// Strings
			$s_enable = esc_html__( 'Enable', 'total' );
			$s_yes    = esc_html__( 'Yes', 'total' );
			$s_no     = esc_html__( 'No', 'total' );
			// Return array
			return array(
				'name' => esc_html__( 'Categories Grid', 'total' ),
				'description' => esc_html__( 'Displays a grid of terms', 'total' ),
				'base' => 'vcex_terms_grid',
				'category' => wpex_get_theme_branding(),
				'icon' => 'vcex-terms-grid vcex-icon fa fa-th-large',
				'params' => array(
					// General
					array(
						'type' => 'autocomplete',
						'heading' => esc_html__( 'Taxonomy', 'total' ),
						'param_name' => 'taxonomy',
						'admin_label' => true,
						'std' => 'category',
						'settings' => array(
							'multiple' => false,
							'min_length' => 1,
							'groups' => false,
							'unique_values' => true,
							'display_inline' => true,
							'delay' => 0,
							'auto_focus' => true,
						),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Parent Terms Only', 'total' ),
						'param_name' => 'parent_terms',
						'value' => array(
							$s_no => false,
							$s_yes => true,
						),
					),
					array(
						'type' => 'autocomplete',
						'heading' => esc_html__( 'Child Of', 'total' ),
						'param_name' => 'child_of',
						'settings' => array(
							'multiple' => true,
							'min_length' => 1,
							'groups' => true,
							'display_inline' => true,
							'delay' => 0,
							'auto_focus' => true,
						),
					),
					array(
						'type' => 'autocomplete',
						'heading' => esc_html__( 'Exclude terms', 'total' ),
						'param_name' => 'exclude_terms',
						'settings' => array(
							'multiple' => true,
							'min_length' => 1,
							'groups' => true,
							'display_inline' => true,
							'delay' => 0,
							'auto_focus' => true,
						),
					),
					array(
						'type' => 'textfield',
						'heading' => esc_html__( 'Unique Id', 'total' ),
						'param_name' => 'unique_id',
						'admin_label' => true,
					),
					array(
						'type' => 'textfield',
						'heading' => esc_html__( 'Custom Classes', 'total' ),
						'param_name' => 'classes',
						'admin_label' => true,
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'CSS Animation', 'total' ),
						'param_name' => 'css_animation',
						'value' => array_flip( wpex_css_animations() ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Visibility', 'total' ),
						'param_name' => 'visibility',
						'value' => array_flip( wpex_visibility() ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Grid Style', 'total' ),
						'param_name' => 'grid_style',
						'value' => array(
							__( 'Fit Columns', 'total' ) => 'fit_columns',
							__( 'Masonry', 'total' ) => 'masonry',
						),
						'edit_field_class' => 'vc_col-sm-3 vc_column clear',
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Columns', 'total' ),
						'param_name' => 'columns',
						'value' => array_flip( wpex_grid_columns() ),
						'std' => '3',
						'edit_field_class' => 'vc_col-sm-3 vc_column',
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Gap', 'total' ),
						'param_name' => 'columns_gap',
						'value' => array_flip( wpex_column_gaps() ),
						'edit_field_class' => 'vc_col-sm-3 vc_column',
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Responsive', 'total' ),
						'param_name' => 'columns_responsive',
						'value' => array(
							$s_yes => '',
							$s_no => 'false',
						),
						'std' => '',
						'edit_field_class' => 'vc_col-sm-3 vc_column',
					),
					// Image
					array(
						'type' => 'dropdown',
						'heading' => $s_enable,
						'param_name' => 'img',
						'value' => array(
							$s_yes => 'true',
							$s_no => 'false',
						),
						'group' => esc_html__( 'Image', 'total' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Image Size', 'total' ),
						'param_name' => 'img_size',
						'std' => 'full',
						'value' => vcex_image_sizes(),
						'group' => esc_html__( 'Image', 'total' ),
						'dependency' => array( 'element' => 'img', 'value' => 'true' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Image Crop Location', 'total' ),
						'param_name' => 'img_crop',
						'std' => 'center-center',
						'value' => array_flip( wpex_image_crop_locations() ),
						'dependency' => array( 'element' => 'img_size', 'value' => 'wpex_custom' ),
						'group' => esc_html__( 'Image', 'total' ),
					),
					array(
						'type' => 'textfield',
						'heading' => esc_html__( 'Image Crop Width', 'total' ),
						'param_name' => 'img_width',
						'dependency' => array( 'element' => 'img_size', 'value' => 'wpex_custom' ),
						'description' => esc_html__( 'Enter a width in pixels.', 'total' ),
						'group' => esc_html__( 'Image', 'total' ),
					),
					array(
						'type' => 'textfield',
						'heading' => esc_html__( 'Image Crop Height', 'total' ),
						'param_name' => 'img_height',
						'description' => esc_html__( 'Enter a height in pixels. Leave empty to disable vertical cropping and keep image proportions.', 'total' ),
						'group' => esc_html__( 'Image', 'total' ),
						'dependency' => array( 'element' => 'img_size', 'value' => 'wpex_custom' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Image Hover', 'total' ),
						'param_name' => 'img_hover_style',
						'value' => array_flip( wpex_image_hovers() ),
						'group' => esc_html__( 'Image', 'total' ),
						'dependency' => array( 'element' => 'img', 'value' => 'true' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Image Filter', 'total' ),
						'param_name' => 'img_filter',
						'value' => array_flip( wpex_image_filters() ),
						'group' => esc_html__( 'Image', 'total' ),
						'dependency' => array( 'element' => 'img', 'value' => 'true' ),
					),
					// Title
					array(
						'type' => 'dropdown',
						'heading' => $s_enable,
						'param_name' => 'title',
						'std' => 'true',
						'value' => array(
							$s_yes => 'true',
							__( 'No', 'total') => 'false',
						),
						'group' => esc_html__( 'Title', 'total' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Overlay Title', 'total' ),
						'param_name' => 'title_overlay',
						'std' => 'false',
						'value' => array(
							__( 'No', 'total') => 'false',
							$s_yes => 'true',
						),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
						'group' => esc_html__( 'Title', 'total' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Display Term Count', 'total' ),
						'param_name' => 'term_count',
						'std' => 'false',
						'value' => array(
							__( 'No', 'total') => 'false',
							$s_yes => 'true',
						),
						'group' => esc_html__( 'Title', 'total' ),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
					),
					array(
						'type'  => 'vcex_font_family_select',
						'heading' => esc_html__( 'Font Family', 'total' ),
						'param_name' => 'title_font_family',
						'group' => esc_html__( 'Title', 'total' ),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
					),
					array(
						'type' => 'dropdown',
						'heading' => esc_html__( 'Font Weight', 'total' ),
						'param_name' => 'title_font_weight',
						'group' => esc_html__( 'Title', 'total' ),
						'std' => '',
						'value' => array_flip( wpex_font_weights() ),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
					),
					array(
						'type' => 'font_container',
						'param_name' => 'title_typo',
						'group' => esc_html__( 'Title', 'total' ),
						'settings' => array(
							'fields' => array(
								'tag' => 'span',
								'text_align',
								'font_size',
								'line_height',
								'color',
								'font_style_italic',
								'font_style_bold',
								//'font_family',
							),
						),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
					),
					array(
						'type'  => 'textfield',
						'heading' => esc_html__( 'Bottom Margin', 'total' ),
						'param_name' => 'title_bottom_margin',
						'group' => esc_html__( 'Title', 'total' ),
						'dependency' => array( 'element' => 'title', 'value' => 'true' ),
					),
					// Description
					array(
						'type' => 'dropdown',
						'heading' => $s_enable,
						'param_name' => 'description',
						'std' => 'true',
						'value' => array(
							$s_yes => 'true',
							__( 'No', 'total') => 'false',
						),
						'group' => esc_html__( 'Description', 'total' ),
						'dependency' => array( 'element' => 'title_overlay', 'value' => 'false' ),
					),
					array(
						'type'  => 'vcex_font_family_select',
						'heading' => esc_html__( 'Font Family', 'total' ),
						'param_name' => 'description_font_family',
						'group' => esc_html__( 'Description', 'total' ),
						'dependency' => array( 'element' => 'description', 'value' => 'true' ),
					),
					array(
						'type' => 'font_container',
						'param_name' => 'description_typo',
						'group' => esc_html__( 'Description', 'total' ),
						'settings' => array(
							'fields' => array(
								'font_size',
								'text_align',
								'line_height',
								'color',
								'font_style_italic',
								'font_style_bold',
								//'font_family',
							),
						),
						'dependency' => array( 'element' => 'description', 'value' => 'true' ),
					),
					array(
						'type' => 'css_editor',
						'heading' => esc_html__( 'CSS', 'total' ),
						'param_name' => 'entry_css',
						'group' => esc_html__( 'Entry CSS', 'total' ),
					),
				)
			);
		}

	}
}
new VCEX_Terms_Grid_Shortcode;