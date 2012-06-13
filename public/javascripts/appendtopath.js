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
    var path="";
    var httpMethod="";
    var x=xmlDoc.getElementsByTagName("method");


    for(i=0;i< x.length;i++){
        path += x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        path += x[i].getElementsByTagName("mapping")[0].childNodes[0].nodeValue;
        httpMethod = '<p>' + x[i].getElementsByTagName("action")[0].childNodes[0].nodeValue + '</p>';
    }

    $("#addpath").append(path);
    $("#addhttpmethod").append(httpMethod);

    var pType="";
    var pRequired="";
    var pAnnotation="";
    var y=xmlDoc.getElementsByTagName("parameter");

    for (a=0;a<y.length;a++)
    {
        pType += '<tr>' + '<td>';
        pType+= y[a].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        pType += '</td>' + '</tr>';
        pRequired += '<tr>' + '<td>';
        pRequired+=y[a].getElementsByTagName("mapped")[0].childNodes[0].nodeValue;
        pRequired += '</td>' + '</tr>';

    }



    $("#pType").append(pType);
    $("#pRequired").append(pRequired);
    //$("#pAnnotation").append(pAnnotation);


});