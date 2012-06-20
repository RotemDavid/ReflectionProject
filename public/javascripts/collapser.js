

$(document).ready(function() {


    //Callback should take one argument
    function ajax(link, callback) {
        var xmlhttp = null;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",link,true);
        xmlhttp.send();
        xmlhttp.onreadystatechange=function() {
            if(xmlhttp.readyState == 4) {
                callback(xmlhttp.responseXML);
            }
        }
    }

    function styleXMLSpecial(xmlLoc, xslLoc, divID) {
        styledXML = ajax(xslLoc, function(xsl) {
            ajax(xmlLoc, function(xml) {
                //Clear the div
                $(divID).empty();
                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                styledXml = xsltProcessor.transformToFragment(xml, document);
                $(divID).append(styledXml);
                //Auto hide all
                $("li div.btn").each(divClick);    
            })
        });
    }

    function styleXML(xmlLoc, xslLoc, divID) {
        styledXML = ajax(xslLoc, function(xsl) {
            ajax(xmlLoc, function(xml) {
                //Clear the div
                $(divID).empty();
                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                styledXml = xsltProcessor.transformToFragment(xml, document);
                $(divID).append(styledXml);  
            })
        });
    }

    styleXMLSpecial("/assets/static/newxmlfiles/summary.xml", "/assets/static/sidebarstyle.xml", "#sidebar");

    function divClick() {
        $(this).parent().children(".folders").each(function() {
            $(this).slideToggle('fast');
        });
        $(this).parent().children(".files").each(function() {
            $(this).slideToggle('fast');
        });
        $(this).toggleClass('collapsed');
        $(this).toggleClass('open');
    }

    //Behavior on clicking a DIV
    $("li div.btn").live("click", divClick);

    $("span a").live("click", function(e) {
        e.preventDefault();
        styleXML($(this).attr("href"), "/assets/xml/xmltohtml.xml", "#tester1");
    });

});
