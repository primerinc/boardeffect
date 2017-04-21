<?php
/**
 * Template Name: State Law
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

					    <div id="content_container">
  							<section id="intro_content">
  							<div class="on_print">
  								<img src="http://www.boardeffect.com/wp-content/uploads/2015/10/BE.png" alt="BoardEffect" data-no-retina="" style="height: 50px;">
  								<h3 class="nonprofit_title">NONPROFIT LAWS: BOARD RULES AND REGULATIONS</h3>
  							</div>
  								<h1>US LAWS GOVERNING NONPROFITS BY STATE</h1>
  								<p>To view a comprehensive state summary of related laws pertaining to the work of nonprofit boards, hover over the state you’re interested in viewing and click.</p>
  								<p class="strong">The answers to all topics surveyed will appear below the main map and are followed by their associated reference sources and topic definitions.</p>
  							</section>
							<section id="loading"><i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i></section>
							<section id="map_container">
								<section>
									<div id="tooltip"></div>
									<div id="map"></div>
								</section>
								<!--<section id="pieChartSection">
									<div id="pietooltip"></div>
									<div id="piechart"></div>
									<div id="chartTitle"></div>
									<div id="pieLegend"></div>
								</section>-->
							</section>
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
  							</section>
							<section id="information_container">
								<h2 id="state_name_title"></h2>
								<p id="state_blurb_info"></p>
								<div id="infobox"></div>
							</section>
							<section class="container center-row clr" id="rule">
								<br>
								<hr>
							</section>
							<section id="definition_section">
								<div class="wpex-vc-row-wrap clr wpex-vc-row-centered wpex-vc-has-custom-column-spacing wpex-vc-column-spacing-60"><div class="vc_row wpb_row vc_row-fluid vc_custom_1466641610276"><div class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-12"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><h2 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466521786268">DEFINITIONS OF TERMS USED IN THIS STUDY</h2><div class="wpb_text_column wpb_content_element  vc_custom_1466697869792"><div class="wpb_wrapper"><p style="text-align: center;">We chose the following 13 topic areas to survey in the Study because we believe these board activities are reasonably supported by the functions of board portal technology.  For a detailed look at how we define these terms, see below.</p></div></div><div class="vc_tta-container" data-vc-action="collapseAll"><div class="vc_general vc_tta vc_tta-accordion vc_tta-color-grey vc_tta-style-flat vc_tta-shape-square vc_tta-o-shape-group vc_tta-gap-10 vc_tta-controls-align-left vc_tta-o-no-fill vc_tta-o-all-clickable"><div class="vc_tta-panels-container"><div class="vc_tta-panels"><div class="vc_tta-panel" id="1465241058970-a54e3247-e9b1" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241058970-a54e3247-e9b1" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Actions</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Actions refer to votes or any decision that requires the input of the full board.</p></div></div></div></div><div class="vc_tta-panel" id="1465241225580-384e6ac3-469a" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241225580-384e6ac3-469a" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Conflict of Interest</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the actions of board members that have a material interest – whether direct or indirect – in an issue being decided by the board.&nbsp; An example of a conflict of interest might be a board member who is a senior officer of a company with which the nonprofit is considering doing business.</p></div></div></div></div><div class="vc_tta-panel" id="1465241201828-51e049af-5f91" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241201828-51e049af-5f91" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Election by Directors</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the way new board members are selected/approved to serve a term on the board.</p></div></div></div></div><div class="vc_tta-panel" id="1465241030874-6fdaeba9-a2bb" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241030874-6fdaeba9-a2bb" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">E-Meetings, including E-voting</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the use of technology other than hard-copy mail used in board communications, including meeting notice, voting, approvals, and other common board communications.</p></div></div></div></div><div class="vc_tta-panel" id="1465240924951-eba0b810-f629" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465240924951-eba0b810-f629" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Meeting Location</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the physical/virtual location where regular and special board meetings may occur.</p></div></div></div></div><div class="vc_tta-panel" id="1465240955291-253454f1-69aa" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465240955291-253454f1-69aa" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Notice of Meeting</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the requirement of organizations to alert board members in advance of the date, time, and location for a board meeting.&nbsp; The provisions in Notice of Meeting and Waiver of Notice also define what constitutes “notice.”</p></div></div></div></div><div class="vc_tta-panel" id="1465239086041-fd38aefd-d964" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465239086041-fd38aefd-d964" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Quorum</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Establishes the minimum number of voting members that must be present at a meeting in order for a vote to occur.</p></div></div></div></div><div class="vc_tta-panel" id="1465241180910-be66c168-60fd" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241180910-be66c168-60fd" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Removal</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the termination – by the organization – of a board member’s service on the board.</p></div></div></div></div><div class="vc_tta-panel" id="1465239085885-aecb761a-2b2b" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465239085885-aecb761a-2b2b" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Residency</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to legal provisions requiring nonprofit boards members to reside in the same state where the nonprofit is incorporated.</p></div></div></div></div><div class="vc_tta-panel" id="1465241198893-b383f799-50c0" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241198893-b383f799-50c0" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Resignation</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the termination – by the board member – of the board member’s service on the board.</p></div></div></div></div><div class="vc_tta-panel" id="1465240858853-71ab8644-1aad" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465240858853-71ab8644-1aad" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Terms &amp; Limits</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the number of years a board member serves in a single term, and any provisions in the state code to limit the number of terms (consecutive or non-consecutive) a member may serve.</p></div></div></div></div><div class="vc_tta-panel" id="1465241103374-7a189a8b-0a1d" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465241103374-7a189a8b-0a1d" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Vacancy</span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to a seat on the board – as outlined in the organization’s bylaws – that is not currently filled by a member.&nbsp; The vacancy could occur due to resignation, removal, or attrition.</p></div></div></div></div><div class="vc_tta-panel" id="1465240998384-6be55761-eccc" data-vc-content=".vc_tta-panel-body"><div class="vc_tta-panel-heading"><h4 class="vc_tta-panel-title vc_tta-controls-icon-position-right"><a href="#1465240998384-6be55761-eccc" data-vc-accordion="" data-vc-container=".vc_tta-container"><span class="vc_tta-title-text">Waiver of Notice </span><i class="vc_tta-controls-icon vc_tta-controls-icon-triangle"></i></a></h4></div><div class="vc_tta-panel-body"><div class="wpb_text_column wpb_content_element "><div class="wpb_wrapper"><p>Refers to the rights of board members to “waive” their right to be notified in advance of board meetings, and to the conditions under which an organization would not need to provide advance notice of a board meeting.</p></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
							</section>
							<section class="container center-row clr" id="rule">
								<hr>
							</section>
							<section id="bucket_section">
								<div id="two_col">
									<div class="wpex-vc-row-wrap clr wpex-vc-row-centered wpex-vc-has-custom-column-spacing wpex-vc-column-spacing-60 wpex-offset-vc-30"><div class="vc_row wpb_row vc_row-fluid vc_custom_1466641883002"><div class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-6"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-graduation-cap"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642489256">RESEARCH APPROACH</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712205740"><div class="wpb_wrapper"><p style="text-align: center;">Learn more about the making of the Nonprofit Laws: &nbsp;Board Rules and Regulations Study — background, research approach, definitions, and about the authors.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/research-approach/" class="vcex-button theme-button flat medium align-center animate-on-hover" title="LEARN MORE"> <span class="theme-button-inner">LEARN MORE</span> </a></div></div></div><div class="wpb_column vc_column_container vc_col-sm-6"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-file-pdf-o"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642461664">STUDY BRIEF</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712193372"><div class="wpb_wrapper"><p style="text-align: center;">Download the Nonprofit Laws: Board Rules and Regulations <strong>Study Brief</strong> to share with anyone involved in supporting the work of nonprofit organizations.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/wp-content/uploads/2016/06/BoardEffect_Nonprofit_Laws-Board_Rules_and_Regulations.pdf" class="vcex-button theme-button flat medium align-center animate-on-hover" title="DOWNLOAD"> <span class="theme-button-inner">DOWNLOAD</span> </a></div></div></div></div></div></div></div>
								</div>
								<div id="three_col" class="hide">
									<article class="clr"><div class="entry-content entry clr"><div class="wpex-vc-row-wrap clr wpex-vc-row-centered wpex-vc-has-custom-column-spacing wpex-vc-column-spacing-60 wpex-offset-vc-30"><div class="vc_row wpb_row vc_row-fluid vc_custom_1466641883002"><div class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-graduation-cap"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642489256">RESEARCH APPROACH</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712205740"><div class="wpb_wrapper"><p style="text-align: center;">Learn more about the making of the Nonprofit Laws: &nbsp;Board Rules and Regulations Study — background, research approach, definitions, and about the authors.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/research-approach/" class="vcex-button theme-button flat medium align-center animate-on-hover" title="LEARN MORE"> <span class="theme-button-inner">LEARN MORE</span> </a></div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-file-pdf-o"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466642461664">STUDY BRIEF</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466712193372"><div class="wpb_wrapper"><p style="text-align: center;">Download the Nonprofit Laws: Board Rules and Regulations <strong>Study Brief</strong> to share with anyone involved in supporting the work of nonprofit organizations.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="/wp-content/uploads/2016/06/BoardEffect_Nonprofit_Laws-Board_Rules_and_Regulations.pdf" class="vcex-button theme-button flat medium align-center animate-on-hover" title="DOWNLOAD"> <span class="theme-button-inner">DOWNLOAD</span> </a></div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><div class="vcex-icon clr vcex-icon-normal vcex-icon-float-center remove-dimensions"><div class="vcex-icon-wrap" style="color:#1a4e7d;"> <span class="fa fa-print"></span></div></div><h1 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1466719861604">PRINT THIS PAGE</h1><div class="wpb_text_column wpb_content_element  vc_custom_1466720237686"><div class="wpb_wrapper"><p style="text-align: center;">If you need&nbsp;a print optimized version of the&nbsp;data on this page, please click the button below to access the&nbsp;file.&nbsp;To save as a PDF just select “<em>Save as a PDF”</em> in your print window.</p></div></div><div class="textcenter theme-button-wrap clr"> <a href="javascript:window.print()" class="vcex-button theme-button flat medium align-center animate-on-hover" title="PRINT STATE SUMMARY"><span class="theme-button-inner">PRINT STATE SUMMARY</span> </a></div></div></div></div></div></div></div></div> </article>
								</div>
							</section>
							<section class="container center-row clr" id="rule">
								<hr>
							</section>
							<section id="disclaimer" class="container center-row clr"><h2>DISCLAIMER</h2>
        <p>This study represents a compilation to the best of our ability of the information available through public records on U.S. state laws concerning electronic voting and other areas of responsibility of nonprofit boards. The information contained in this study does not represent legal advice of any kind and should not be used in lieu of legal counsel. This study does not supersede any organization’s own bylaws; nor does it supersede any current local, state or federal laws in the U.S., nor laws of any countries outside the U.S. In addition, due to the constantly changing nature of online records, we cannot guarantee that the links to related websites listed are current.</p></section>
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
		    		echo '<div id="email_form_popup" class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container "><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><h2 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1465245431772">SEE THE REPORT</h2><h3 style="text-align: center;">Please fill out the form below to access the Nonprofit Law Report Data</h3>';
		    		gravity_form( 59, false, false, false, '', false ); //margin-bottom: 10px;
		    		echo '</div></div></div></div>';
				}
	    		//setcookie('board_effect_nonprofit_laws', 'access');
	    		//$_COOKIE['board_effect_nonprofit_laws'] = 'access';
	    		//echo 'no match'; 
			} else { // Has the cookie
				//echo 'no match'; 
				/*echo '<div id="email_form_popup" class="container center-row clr"><div class="wpex-vc-columns-wrap clr"><div class="wpb_column vc_column_container vc_col-sm-12 vc_hidden-sm vc_hidden-xs"><div class="wpb_wrapper wpex-vc-column-wrapper wpex-clr "><h2 style="font-size: 24px;color: #1a4e7d;text-align: center" class="vc_custom_heading vc_custom_1465245431772">SEE THE REPORT</h2>';
	    		gravity_form( 59, false, false, false, '', false ); //margin-bottom: 10px;
	    		echo '</div></div></div></div>';*/
			}
		?>

		<?php wpex_hook_primary_after(); ?>

	</div><!-- #content-wrap -->


<?php get_footer(); ?>