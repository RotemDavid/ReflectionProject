/**
 * Created with IntelliJ IDEA.
 * User: rdavid
 * Date: 6/13/12
 * Time: 3:20 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: rdavid
 * Date: 6/13/12
 * Time: 2:59 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: rdavid
 * Date: 6/13/12
 * Time: 12:01 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","/assets/XML/GET.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    var apath="";
    var x=xmlDoc.getElementsByTagName("method");
    for(i=0;i< x.length;i++){
        apath += '<b>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</b>';
        apath += '<b>' + x[i].getElementsByTagName("mapping")[0].childNodes[0].nodeValue + '</b>';
    }


    $("#addpath").append(apath);
});