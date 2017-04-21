<?php
/*
Title: Ad Banner Fields
Post Type: post
*/

piklist('field', array(
  'type' => 'text'
  ,'field' => 'field_one'
  ,'columns' => 5
  ,'label' => 'Banner Headline'
));

piklist('field', array(
  'type' => 'colorpicker'
  ,'field' => 'field_two'
  ,'value' => '#1a4e7d'
  ,'label' => 'Banner Headline Color'
));

piklist('field', array(
  'type' => 'text'
  ,'field' => 'field_three'
  ,'columns' => 5
  ,'label' => 'Banner Subhead'
));

piklist('field', array(
  'type' => 'colorpicker'
  ,'field' => 'field_four'
  ,'value' => '#1a4e7d'
  ,'label' => 'Banner Subhead Color'
));

piklist('field', array(
  'type' => 'textarea'
  ,'columns' => 5
  ,'field' => 'field_five'
  ,'label' => 'Banner Body Copy'
));

piklist('field', array(
  'type' => 'colorpicker'
  ,'field' => 'field_six'
  ,'value' => '#292929'
  ,'label' => 'Banner Body Copy Color'
));

piklist('field', array(
    'type' => 'group'
    //,'field' => 'member_phone_group'
    ,'label' => 'Banner Background'
    ,'list' => false
    // ,'description' => 'A grouped field. Data is not searchable, since it is saved in an array.'
    ,'fields' => array(

      array(
        'type' => 'colorpicker'
  		  ,'field' => 'field_nine'
  		  ,'label' => 'Color'
        ,'value' => '#dfe0e8'
  		  ,'columns' => 5
      )
      ,array(
        'type' => 'file'
		    ,'field' => 'upload_media'
		    ,'columns' => 5
		    ,'label' => 'Background Image'
    		,'options' => array(
    	  		'modal_title' => 'Add File'
    	  		,'button' => 'Add'
    		)
      )
    )
));

piklist('field', array(
  'type' => 'text'
  ,'field' => 'field_seven'
  ,'label' => 'Banner URL'
  ,'description' => 'E.g. "http://boardeffect.com"'
  ,'columns' => 5
  ,'attributes' => array( 'placeholder' => 'http://boardeffect.com' )
));

piklist('field', array(
  'type' => 'text'
  ,'field' => 'field_eight'
  ,'columns' => 5
  ,'label' => 'Banner Button Text'
));