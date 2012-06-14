

$(document).ready(function() {


	function ajax(link, callback) {
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
     				xsltProcessor = new XSLTProcessor();
     				xsltProcessor.importStylesheet(xsl);
     				styledXml = xsltProcessor.transformToFragment(xml, document);
     				$(divID).append(styledXml);
     			})
     		});
     	}

	styleXML("./summary.xml", "./sidebarstyle.xml", "#sidebar");

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

});
