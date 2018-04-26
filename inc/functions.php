<?php
/**
 * Encro v1.1
 * (C) Copyright 2018 - Johannes Bergé
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

function encodeStr($uncoded, $key) {
    $uncoded = trim(strtoupper($uncoded));
    $coded = "";
    $chr;
    for ($i = strlen($uncoded) - 1; $i >= 0; $i--) {
        $chr = ord($uncoded[$i]);
        $coded .= ($chr >= 65 && $chr <= 90) ? $key[$chr - 65 + 26*(mt_rand()%2)] : chr($chr); 
    }
    return urlencode($coded);   
}
function swap($string, $pos1, $pos2) {
    $pos1 = $pos1%strlen($string);
    $pos2 = $pos2%strlen($string);

    $temp = $string[$pos1];
    $string[$pos1] = $string[$pos2];
    $string[$pos2] = $temp;
    return $string;
}
function cipherShuffle($cipher) {
    $input = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $n = 0;
    for ($i = 10; $i > 0; $i--) {
        for ($j = 0; $j < strlen($input); $j++) {
            $input = swap($input, $j, $j+ord($cipher[$n%strlen($cipher)]));
            $n++;
        }
    }
    return $input;
}
function encodeEmail($email, $mailbody="") {
    $email = explode("@", $email);
    $f = $email[0];
    $l = $email[1] . "x";
    $cipher = bin2hex(random_bytes(6)); 
    $key = cipherShuffle($cipher);
    return "<a class='--crypto-link' data-c='" . str_rot13($cipher) . 
                           "' data-f='" . base64_encode(encodeStr($f, $key)) .
                           "' data-l='" . base64_encode(encodeStr($l, $key)) .
                           "' data-b='" . base64_encode(str_rot13(urldecode($mailbody))) .
                           "'></a>";
}