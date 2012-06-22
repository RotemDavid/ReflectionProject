

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
                if (callback != undefined) {
                    callback();
                }   
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
    styleXML("/assets/static/xml/summary.xml", "/assets/static/sidebarstyle.xml", "#sidebar", collapseAll); 

    //Behavior on clicking a DIV
    $("li div.btn").live("click", divClick);

    //Load an XML file for a REST path into the main window
    $("span a").live("click", function(e) {
        e.preventDefault();
        styleXML($(this).attr("href"), "/assets/xml/xmltohtml.xml", "#tester1");
    });

    function jsonToHTML(json, div) {
        $jdiv = div;
        $jdiv.hide();
        $jdiv.empty();

        $jdiv.append("<table></table>")

        $table = $jdiv.find("table");
        $table.attr("cellpadding", 0);
        $table.attr("cellspacing", 0); 
        $table.attr("border", 0);
        $table.addClass("sm-table sm-table-border");   

        $table.append("<thead></thead><tbody></tbody>")
        $thead = $table.find("thead");
        $tbody = $table.find("tbody");

        $thead.append("<tr><th>Field</th><th>Type</th></tr>")
        $.each(json, function(key, val) {
            //Check for val being an object
            toDisplay = val;
            if (val.replace != undefined && val.name != undefined) {
                fullName = val.name;
                toLink = val.replace;
                linked = toJsonLink(toLink);
                toDisplay = fullName.replace(toLink, linked);
            }
            $tbody.append("<tr><td>" + key + "</td><td>" + toDisplay + "<div></div></td></tr>");        
        });

        $jdiv.slideDown();
    }

    function toJsonLink(classname) {
        path = "/assets/static/json/" + classname + ".json";
        linkText = "<a class = \"returnlink\" href = \"" + path + "\">" + classname + "</a>";
        return linkText;
    }

    $(".returnlink").live("click", function(e) {
        e.preventDefault();
        link = $(this).attr("href");
        $next = $(this).next();
        $.getJSON(link, function(data) {
            jsonToHTML(data, $next);
        });
        $(this).addClass("expanded");
        $(this).removeClass("returnlink");
    });

    $(".expanded").live("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle();
    });

});
