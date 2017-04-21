<?php
/**
 * Template Name: State Topic
 *
 * @package Total WordPress Theme
 * @subpackage Templates
 */

get_header(); ?>

	<div id="content-wrap" class="container clr">

		<?php wpex_hook_primary_before(); ?>

		<section id="primary" class="content-area clr">

			<?php wpex_hook_content_before(); ?>

			<div id="content" class="site-content clr" role="main">

				<?php wpex_hook_content_top(); ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<div class="entry-content entry clr">
						<?php the_content(); ?>
		
						<div id="question">VIEW THE STUDY.
					          <div id="dropdown">
					          <button class="dropbtn">STATE SUMMARIES</button>
					          <div id="dropdownContent" class="dropdown-content">
					            <a class="dropdownLink" href="#">STATE SUMMARIES</a>
					            <h2>Topic Areas</h2>
					            <a class="dropdownLink" href="#">ACTIONS</a>
					            <a class="dropdownLink" href="#">CONFLICT OF INTEREST</a>
   					            <a class="dropdownLink" href="#">ELECTION BY DIRECTORS</a>
					            <a class="dropdownLink" href="#">E-MEETINGS</a>
								<a class="dropdownLink" href="#">MEETING LOCATION</a>
								<a class="dropdownLink" href="#">NOTICE OF MEETING</a>
					            <a class="dropdownLink" href="#">QUORUM</a>
					            <a class="dropdownLink" href="#">REMOVAL OF ELECTED DIRECTORS</a>
					            <a class="dropdownLink" href="#">RESIDENCY</a>
					            <a class="dropdownLink" href="#">RESIGNATION OF ELECTED DIRECTORS</a>
					            <a class="dropdownLink" href="#">TERMS AND LIMITS</a>
					            <a class="dropdownLink" href="#">VACANCY OF ELECTED DIRECTORS</a>
			            		<a class="dropdownLink" href="#">WAIVER OF NOTICE</a>
					          </div>
				        	</div>
				        </div>

					    <div id="content_container" class="hide">
					    	<section id="loading"><i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i></section>
					    	<div class="on_print">
  								<img src="http://www.boardeffect.com/wp-content/uploads/2015/10/BE.png" alt="BoardEffect" data-no-retina="" style="height: 50px;">
  								<h3 class="nonprofit_title">NONPROFIT LAWS: BOARD RULES AND REGULATIONS</h3>
  							</div>
  							<section id="intro_content">
  								<h1>US LAWS GOVERNING: <span class="topic_title"></span></h1>
								<div id="intro_blurb"></div>
								<div id="intro_explanation"></div>
  							</section>
							<section id="map_container">
								<section id="pieChartSection">
									<div id="pietooltip"></div>
									<div class="container center-row clr">
										<div class="wpex-vc-columns-wrap clr">
											<div id="piechart_left" class="wpb_column vc_column_container vc_col-sm-6">
												<div id="piechart"></div>
												<div id="chartTitle"></div>
											</div>
											<div id="piechart_right" class="wpb_column vc_column_container vc_col-sm-6">
												<div id="pieLegend"></div>
											</div>
										</div>
									</div>
								</section>
								<section id="trend_section">
									<div id="trends" class="container center-row clr"></div>
								</section>
								<section id="map_content">
									<div id="tooltip"></div>
									<div id="map_title"></div>
									<div id="map_hover_instructions"></div>
									<section id="map_dropdown">
	  								<div>
	 									<h3>Please Select Your State</h3>
	  									<select id="state_dropdown">
											<option value="1">Alabama</option>
											<option value="2">Alaska</option>
											<option value="4">Arizona</option>
											<option value="5">Arkansas</option>
											<option value="6">California</option>
											<option value="8">Colorado</option>
											<option value="9">Connecticut</option>
											<option value="10">Delaware</option>
											<option value="11">District Of Columbia</option>
											<option value="12">Florida</option>
											<option value="13">Georgia</option>
											<option value="15">Hawaii</option>
											<option value="16">Idaho</option>
											<option value="17">Illinois</option>
											<option value="18">Indiana</option>
											<option value="19">Iowa</option>
											<option value="20">Kansas</option>
											<option value="21">Kentucky</option>
											<option value="22">Louisiana</option>
											<option value="23">Maine</option>
											<option value="24">Maryland</option>
											<option value="25">Massachusetts</option>
											<option value="26">Michigan</option>
											<option value="27">Minnesota</option>
											<option value="28">Mississippi</option>
											<option value="29">Missouri</option>
											<option value="30">Montana</option>
											<option value="31">Nebraska</option>
											<option value="32">Nevada</option>
											<option value="33">New Hampshire</option>
											<option value="34">New Jersey</option>
											<option value="35">New Mexico</option>
											<option value="36">New York</option>
											<option value="37">North Carolina</option>
											<option value="38">North Dakota</option>
											<option value="39">Ohio</option>
											<option value="40">Oklahoma</option>
											<option value="41">Oregon</option>
											<option value="42">Pennsylvania</option>
											<option value="44">Rhode Island</option>
											<option value="45">South Carolina</option>
											<option value="46">South Dakota</option>
											<option value="47">Tennessee</option>
											<option value="48">Texas</option>
											<option value="49">Utah</option>
											<option value="50">Vermont</option>
											<option value="51">Virginia</option>
											<option value="53">Washington</option>
											<option value="54">West Virginia</option>
											<option value="55">Wisconsin</option>
											<option value="56">Wyoming</option>
										</select>
	  								</div>
	  								<div id="state_details"></div>
	  								</section>
									<div id="map"></div>
								</section>
							</section>
							<section class="container center-row clr" id="rule">
								<hr>
							</section>
							<section id="bucket_section">
								<article class="clr"><div class="entry-content entry clr"><div class="wpex-vc-row-wrap clr wpex-vc-row-centered wpex-vc-has-custom-column-spacing wpex-vc-column-spacing-60 wpex-offset-vc-30"><div class="vc_row wpb_row vc_row-fluid vc_custom_1466641883002"><div class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-graduation-cap"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642489256">RESEARCH APPROACH</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712205740"><div class="wpb_wrapper"><p style="text-align: center;">Learn more about the making of the Nonprofit Laws: &nbsp;Board Rules and Regulations Study — background, research approach, definitions, and about the authors.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/research-approach/" class="vcex-button theme-button flat medium align-center animate-on-hover" title="LEARN MORE"> <span class="theme-button-inner">LEARN MORE</span> </a></div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-file-pdf-o"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642461664">STUDY BRIEF</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712193372"><div class="wpb_wrapper"><p style="text-align: center;">Download the Nonprofit Laws: Board Rules and Regulations <strong>Study Brief</strong> to share with anyone involved in supporting the work of nonprofit organizations.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/wp-content/uploads/2016/06/BoardEffect_Nonprofit_Laws-Board_Rules_and_Regulations.pdf" class="vcex-button theme-button flat medium align-center animate-on-hover" title="DOWNLOAD"> <span class="theme-button-inner">DOWNLOAD</span> </a></div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-print"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466719861604">PRINT THIS PAGE</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466720237686"><div class="wpb_wrapper"><p style="text-align: center;">If you need&nbsp;a print optimized version of the&nbsp;data on this page, please click the button below to access the&nbsp;file.&nbsp;To save as a PDF just select “<em>Save as a PDF”</em> in your print window.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="javascript:window.print()" class="vcex-button theme-button flat medium align-center animate-on-hover" title="PRINT TOPIC SUMMARY"> <span class="theme-button-inner">PRINT TOPIC SUMMARY</span> </a></div></div></div></div></div></div></div></div> </article>
							</section>
							<section class="container center-row clr" id="rule">
								<hr>
							</section>
							<section id="infobox" class="container center-row clr"></section>
					    </div>
					</div><!-- .entry-content -->

				<?php endwhile; ?>

				<?php wp_reset_postdata(); wp_reset_query(); ?>

				<?php wpex_hook_content_bottom(); ?>

			</div><!-- #content -->

			<?php wpex_hook_content_after(); ?>

		</section><!-- #primary -->

		<?php 
			// Check cookie
			$cookieID = get_the_ID()."board_effect_nonprofit_laws";
			if(!isset($_COOKIE['board_effect_nonprofit_laws'])) {
				if($_GET["access"] === '1') {
					setcookie("board_effect_nonprofit_laws", 1, time()+31556926, "/");
				} else {
		    		echo '<div id="email_form_popup" class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><h2 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1465245431772">SEE THE REPORT</h2><h3 style="text-align: center;">Please fill out the form below to access the Nonprofit Law Report Data</h3>';
		    		gravity_form( 59, false, false, false, '', false ); //margin-bottom: 10px;
		    		echo '</div></div></div></div>';
				}
				//echo 'no match'; 
	    		//setcookie('board_effect_nonprofit_laws', 'access');
	    		//$_COOKIE['board_effect_nonprofit_laws'] = 'access';
			} else { // Has the cookie
				/*echo '<div id="email_form_popup" class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-12 vc_hidden-sm vc_hidden-xs"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><h2 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1465245431772">SEE THE REPORT</h2>';
	    		gravity_form( 59, false, false, false, '', false ); //margin-bottom: 10px;
	    		echo '</div></div></div></div>';*/
			}
			//echo $_COOKIE[$cookieID]; 
		?>

		<?php wpex_hook_primary_after(); ?>

	</div><!-- #content-wrap -->

<?php get_footer(); ?>