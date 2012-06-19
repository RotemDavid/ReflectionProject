

$(document).ready(function() {


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

    function styleXML(xmlLoc, xslLoc, divID) {
        styledXML = ajax(xslLoc, function(xsl) {
            ajax(xmlLoc, function(xml) {
                $(divID).empty();
                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                styledXml = xsltProcessor.transformToFragment(xml, document);
                $(divID).append(styledXml);
            })
        });
    }

    styleXML("/assets/xml/POST.xml", "/assets/xml/xmltohtml.xml", "#tester1");
    styleXML("/assets/static/newxmlfiles/summary.xml", "/assets/static/sidebarstyle.xml", "#sidebar");

    $("li div").live("click",function() {
        if($(this).parent().next().is("ul")) {
            $picDiv = $(this);
            $nextList = $(this).parent().next();
            $nextList.slideToggle('fast', function() {
                $picDiv.toggleClass('collapsed');
                $picDiv.toggleClass('open');
            });
        }
    });

    $("span a").live("click", function(e) {
        e.preventDefault();
        styleXML($(this).attr("href"), "/assets/xml/xmltohtml.xml", "#tester1");
    });

});
