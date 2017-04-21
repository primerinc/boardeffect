jQuery( document ).ready(function($) {
  var activeDropDownValue,
      linkTxt,
      jumpURL,
      initialTxt = 'BOARD RULES AND REGULATIONS';

  $('#dropdownContent').find('br').remove();
  $(".dropbtn").html(initialTxt);

  $("#dropdown").click(function( event ) {
    event.stopPropagation();
    $("#dropdownContent").toggleClass("show");
    $("#dropdownContent").slideToggle();
  });

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdownLink')) {
      //console.log('out');
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          $("#dropdownContent").slideToggle();
          openDropdown.classList.remove('show');
        }
      }
      //location.hash = "wtf";
    }
  };

  $("a.dropdownLink").on('click', function(e){
      e.preventDefault();
      linkTxt = e.target.innerHTML;
      activeDropDownValue = linkTxt;
      if(linkTxt.length > 1) {
        $('.dropbtn').html(linkTxt);
        //$('.topic_title').html(linkTxt.toUpperCase());
      }
      var hashish = linkTxt.replace(/ /g,'_').toLowerCase();
      //console.log('hash = ' + hashish);
      if(hashish === "state_summaries") {
        jumpURL = 'http://www.boardeffect.com/nonprofit-state-laws/';
        window.location.href = jumpURL;
      } else {
        jumpURL = 'http://www.boardeffect.com/nonprofit-laws/#';
        window.location.href = (jumpURL + hashish.toLowerCase());
      }
      //checkHash();
      //getQuestionSpecificData
  });

  $("a.dd_anchor_link").on('click', function(e){
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
}); // End document.ready