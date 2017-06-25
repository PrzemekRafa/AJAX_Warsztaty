'use strict';

window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    console.log('Przescrollowaane do końca!');
        
    ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            onError: function (msg) {
                console.log(msg);
            },
            onSuccess: function (reponse) {
//                    MOJA METODA
//                var jsonObj = JSON.parse(reponse);
//                for (var i in jsonObj) {
//                    function dodawanieParagrafow() {
//                        var x = document.createElement("P");
//                        var parUserId = document.createTextNode("User ID: "+jsonObj[i].id);
//                        x.appendChild(parUserId);
//                        document.body.appendChild(x);
//                        
//                        var x = document.createElement("P");
//                        var parUserName = document.createTextNode("User Name: "+jsonObj[i].name);
//                        x.appendChild(parUserName);
//                        document.body.appendChild(x);
//                        
//                        var x = document.createElement("P");
//                        var parUserUrl = document.createTextNode("User URL: " + jsonObj[i].website);
//                        x.appendChild(parUserUrl);
//                        document.body.appendChild(x);
//                        x.appendChild(document.createElement("BR"));
//                        x.appendChild(document.createTextNode("--------"));
//                    };
//                    dodawanieParagrafow();
                    
//                    METODA MARCINA - START
                var jsonObjArray = JSON.parse(reponse);
                
                var beginOfData = document.createElement("P");
                var endOfData = document.createElement("P");
                
                beginOfData.innerHTML = '<br>---------begin-------------<br>';
                endOfData.innerHTML = '<br>---------end-------------<br>';
                
                document.body.appendChild(beginOfData);
                
                for (var i in jsonObjArray) {
                    var userId = document.createElement("P");
                    var userName = document.createElement("P");
                    var userUrl = document.createElement("P");
                    
                    userId.innerHTML = 'User Id: ' + jsonObjArray[i].id;
                    userName.innerHTML = 'User Id: ' + jsonObjArray[i].name;
                    userUrl.innerHTML = 'User Id: ' + jsonObjArray[i].website;
                    + '<br>--------';
                    
                    document.body.appendChild(userId);
                    document.body.appendChild(userName);
                    document.body.appendChild(userUrl);
                };
                
                document.body.appendChild(endOfData);
                
//                    METODA MARCINA - END
//                };
            }
        });
    };
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
//                console.log ('Połączenie działa');
//                console.log (this.readyState);
//                console.log (this.status);
                
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
