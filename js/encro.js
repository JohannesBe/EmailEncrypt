/**
 * Encro v1.1
 * (C) Copyright 2018 - Johannes Bergé
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function() {
    //https://www.danstools.com/javascript-obfuscate/index.php
    /*function openShit(url) {
          url = url.split("").reverse().join("");
          var a = document.createElement("a");
          a.setAttribute("href","ma"+"il"+"t"+"o:"+url);
          window.location.href=a.href;
    }*/

    eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('9 6(0){0=0.7("").5().4("");2 a=3.8("a");a.e("1","b"+"h"+"g"+"f:"+0);c.d.1=a.1}',18,18,'url|href|var|document|join|reverse|openShit|split|createElement|function||ma|window|location|setAttribute|o|t|il'.split('|'),0,{}));

    function swap(string, pos1, pos2) {
        pos1 = pos1%string.length;
        pos2 = pos2%string.length;

        string = string.split("");

        var temp = string[pos1];
        string[pos1] = string[pos2]
        string[pos2] = temp;
        return string.join("");
    }
    function cipherShuffle(cipher) {
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var n = 0;
        for (var i = 10; i > 0; i--) {
            for (var j = 0, l = alphabet.length; j < l; j++) {
                alphabet = swap(alphabet, j, j+cipher.charCodeAt(n%cipher.length));
                n++;
            }
        }
        return alphabet;
    }
    function rot13(str) {
        var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
        var index     = function(x) { return input.indexOf(x); }
        var translate = function(x) {
            return index(x) > -1 ? output[index(x)] : x;
        }
        return str.split('').map(translate).join('');
    }
    function decodeStr(coded, key) {
        coded = decodeURIComponent(coded);  
        var uncoded = "";
        var chr;
        for (var i = coded.length - 1; i >= 0; i--) {
            chr = coded.charAt(i);
            uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
            String.fromCharCode(65 + key.indexOf(chr) % 26) :
            chr; 
        }
        return uncoded;   
    }
    function getSelectionText() {
        var text = "";
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if ((activeElTagName == "textarea") || (activeElTagName == "input" &&

            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")) {

            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);

        } else if (window.getSelection) {

            text = window.getSelection().toString();

        }

        return text;
    }
    document.addEventListener('DOMContentLoaded', function() {

        var els = document.querySelectorAll(".--crypto-link");
        for (var i = 0, N = els.length; i < N; i++) {
            var el = els[i];
            var c = rot13(el.dataset.c);
            var k = cipherShuffle(c);
            var f = decodeStr(atob(el.dataset.f), k).toLowerCase();
            var l = decodeStr(atob(el.dataset.l), k).toLowerCase();
            var x = rot13(f) + "@" + rot13(l);
            el.innerHTML = "<span>" + Math.random().toString(36).substring(3, 4) + "</span>";
            el.href="#";
            for (var j = 0, L = x.length; j < L; j++) {
                el.innerHTML = "<span>" + rot13(x.charAt(j)) + "</span><span>" + Math.random().toString(36).substring(3, 4) + "</span>" + el.innerHTML;
            }
            el.classList.add("--crypto-span");
            el.addEventListener("click", function() {
                var children = this.querySelectorAll("span");
                var str = "";
                for (var n = 0, N =children.length-1; n < N; n++) {
                    if (n%2 == 0) str += children[n].innerHTML;
                }
                var b = rot13(atob(this.dataset.b));
                if (b !== "") {
                    str = b.split("").reverse().join("") + "?" + str;
                }
                // console.log(str);
                // console.log(str);
                openShit(str);
                return false;
            });
            document.addEventListener('copy', function(e) {
                var children = this.querySelectorAll(".--crypto-span");
                var str = [];

                for (var n = 0, N = children.length; n < N; n++) {
                    str.push("");

                    var spans = children[n].querySelectorAll("span");
                    for (var m = 0, M = spans.length-1; m < M; m++) {
                        if (m%2 == 0) str[n] += spans[m].innerHTML;
                    }
                }                

                var newCopy = getSelectionText();
                for (var n = 0, N = str.length; n < N; n++) {
                    var strtemp = str[n].substring(1);
                    str[n] = new RegExp("x(.|\r|\n|\r\n)?" + strtemp, "g");
                    newCopy = newCopy.replace(str[n], " "+strtemp.split("").reverse().join("")+" ");
                }

                e.clipboardData.setData('text/plain', newCopy);
                e.preventDefault();
            });
        }
    }, false);
})();