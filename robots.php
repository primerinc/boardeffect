<?php
  header("Content-Type: text/plain; charset=utf-8");
   if ($_SERVER['SERVER_PORT'] == 443) {
   	echo "User-agent: *\n" ;
   	echo "Disallow: /\n" ;
   } else {
   	echo "User-agent: *\n" ;
   	echo "Disallow: \n" ;
  }
?>