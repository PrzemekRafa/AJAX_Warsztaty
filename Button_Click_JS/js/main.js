'use strict';

document.getElementsByTagName('button').onclick = function (ev) {
    console.log('Naciśnięto przycisk!');
    ajax({
            type: 'GET',
            url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
            onError: function (msg) {
                console.log(msg);
            },
            onSuccess: function (reponse) {
            }
        });
}

function ajax (ajaxoOptions) {
     
    var options = {
        type: ajaxoOptions.type || 'POST',
        url: ajaxoOptions.url || '',
        onError: ajaxoOptions.onError || function() {},
        onSuccess: ajaxoOptions.onSuccess || function() {},
        dataType: ajaxoOptions.dataType || 'text',
    }
    
    function httpSuccess (httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch(err) {
            return false;
        }
    }
    
    var httpReq = new XMLHttpRequest();
    
    httpReq.open(options.type, options.url, true);
    
    httpReq.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (httpSuccess (this)) {
                
                var returnData = (options.dataType=='xml')? this.responseXML: this.responseText;
                
                console.log(returnData);
                
                options.onSuccess(returnData);
                
                httpReq = null;
            } else {
                options.onError(console.log('BŁĄD!'));
            }
        }
    }

    httpReq.send();
    
};
