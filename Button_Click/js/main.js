'use strict';

$(document).ready(function(){

$('button').click(function() {
    
        $.getJSON("http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl", function(data) {
        console.log(data);

        });
    
    });
})
