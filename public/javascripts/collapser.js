

$(document).ready(function() {


    //Link - the link from which to request XML
    //Callback - the function to handle the XML on return, should take
        //a single argument (an XML doc)
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

    //Style an XML file with XSL, append to a div
    //xmlLoc - link to the XML file
    //xslLoc - link to the XSLT sheet (should be *.xml file)
    //divID - the target div for the content (will be emptied before append)
    //callback - a zero argument function to be executed upon task completion
    function styleXML(xmlLoc, xslLoc, divID, callback) {
        styledXML = ajax(xslLoc, function(xsl) {
            ajax(xmlLoc, function(xml) {
                $(divID).empty();
                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                styledXml = xsltProcessor.transformToFragment(xml, document);
                $(divID).append(styledXml);
                callback();   
            })
        });
    }

    //Collapse a nested list when a button (represented by a <div> tag) is clicked
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

    //Collapses all of the paths
    function collapseAll() {
        $("li div.btn").each(divClick);
    }

    //Style the sidebar
    styleXML("/assets/static/newxmlfiles/summary.xml", "/assets/static/sidebarstyle.xml", "#sidebar", collapseAll); 

    //Behavior on clicking a DIV
    $("li div.btn").live("click", divClick);

    //Load an XML file for a REST path into the main window
    $("span a").live("click", function(e) {
        e.preventDefault();
        styleXML($(this).attr("href"), "/assets/xml/xmltohtml.xml", "#tester1");
    });

});
