/**
 * Created with IntelliJ IDEA.
 * User: rdavid
 * Date: 6/13/12
 * Time: 12:01 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $("#addit").append("<p>Method:</p>");
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

    var methodinfo = "<table border='1'>";

    var x=xmlDoc.getElementsByTagName("method");
    for (i=0;i<x.length;i++)
    {
        methodinfo += '<tr>';
        methodinfo+= '<td>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +  '</td>';
        methodinfo+= '<td>' + x[i].getElementsByTagName("mapping")[0].childNodes[0].nodeValue +  '</td>';
        methodinfo+= '<td>' + x[i].getElementsByTagName("action")[0].childNodes[0].nodeValue +  '</td>';
        methodinfo+= '</tr>';

    }

    methodinfo+= '</table>';
    $("#addit").append(methodinfo);

    $("#addit").append('<p>' + "Parameters" + '</p>');
    var paraminfo = "<table border='1'>";

    var y=xmlDoc.getElementsByTagName("parameter");
    for (a=0;a<y.length;a++)
    {
        paraminfo += '<tr>';
        paraminfo+= '<td>' + y[a].getElementsByTagName("name")[0].childNodes[0].nodeValue +  '</td>';
        paraminfo+= '<td>' + y[a].getElementsByTagName("mapped")[0].childNodes[0].nodeValue +  '</td>';
        paraminfo+= '</tr>';
    }

    paraminfo+= '</table>';
    $("#addit").append(paraminfo);

});