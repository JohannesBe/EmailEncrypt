<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("inc/functions.php");
?>

<h1>General test</h1>
This is an email <?php print(encodeEmail("john.doe@example.com", "subject=Example+mail")); ?> address.<br />

<h1>Wrap test</h1>
<div style="width:50px; border-right: 1px solid grey">
    This is an email <?php print(encodeEmail("doe.john@example.com", "subject=Example+mail")); ?> address.
</div><br />

<script src="js/encro.js"></script>
<link href="css/encro.css" rel="stylesheet" />