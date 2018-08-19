function remover(){
        $("#content style").remove();
        $("#outline style").remove();

        $("#outline>div.battlescribe>div.summary").remove();
        $("#outline p").remove();
        $("#outline table").remove();
        //$("#outline li.rootselection>ul>li>ul").remove();
        $("#outline>div.battlescribe").removeClass("battlescribe");
        $("#outline li.rootselection").addClass("gizmo");
        $("#outline li.rootselection").removeClass("rootselection");

        var extra = " <link rel=stylesheet href=gizmoscribe.css> ";

        $("#content").prepend(extra);

        cleanUp();
    }    
    function cleanUp(){

        $("li.rootselection>h4").css("background-color",$("#colorHeader").spectrum('get').toHexString());
        $("li.rootselection>ul>li>h4").css("background-color",$("#colorUnitHeader").spectrum('get').toHexString());
        $("table tr:first-of-type th").css("background-color",$("#colorTableHeader").spectrum('get').toHexString());
        $("div.summary>p>span.bold ").css("background-color",$("#colorSummaryNames").spectrum('get').toHexString());

        if($("#pageBreak").is(":checked")){
            $("#content>div.battlescribe").css( {"page-break-after":"always","break-after":"always"});
            $("li.rootselection").css( {"page-break-after":"always","break-after":"always"});
            $("#outline").css( {"page-break-after":"always","break-after":"always"});
            $("#outline").css( {"page-break-after":"always","break-after":"always"});
        } else {
            $("#content>div.battlescribe").css( {"page-break-after":"auto","break-after":"auto"});
            $("li.rootselection").css( {"page-break-after":"auto","break-after":"auto"});
            $("#outline").css( {"page-break-after":"auto","break-after":"auto"});
            $("#outline").css( {"page-break-after":"auto","break-after":"auto"});
        }

        if(!$("#armyName").is(":checked")){
            $("div.battlescribe h1").hide('slow');
        } else {
            $("div.battlescribe h1").show('slow');
        }

        if(!$("#forceType").is(":checked")){
            $("div.battlescribe>div.force>h2:first-of-type").hide('slow');
        }  else {
            $("div.battlescribe>div.force>h2:first-of-type").show('slow');
        }   


        if(!$("#battleRole").is(":checked")){
            $("div.battlescribe h3").hide('slow');
        }   else  {
            $("div.battlescribe h3").show('slow');
        }

        if(!$("#summary").is(":checked")){
            $("div.summary").hide('slow');
        }   else  {
            $("div.summary").show('slow');
        }

        if(!$("#outlinePage").is(":checked")){
            $("#outline").hide('slow');
        }   else  {
            $("#outline").show('slow');
        }


    }

    function getFile(){
        $("#content").html("");

        var reader = new FileReader();
        reader.onload = function(e){
            $("#content").html(e.target.result);
            $("#outline").html(e.target.result);


            //$("div.battlescribe h1").prepend("<img id=logo width=50>");
            $("#printButton").show();
            remover();
        }
        reader.readAsText($("#ul")[0].files[0]);
    }

    function changeLogo(){
        $('#logo').attr("src",$("#logoPicker").val());
    }

    $(document).ready(function(){

        $("#content>div.battlescribe li.rootselection").each(function(){
            $(this).children("table:first").addClass('abilities');
        });

        $("#content li.category").each(function(index, el) {
           var category = $(this).children('h3').text(); 
           console.log(category);
           $(this).find('ul li.rootselection h4').text(function() {return $(this).text() + " - " + category;});
           $(this).children('h3').remove();
        });

        $("li.rootselection").each(function(index, el) {
            if (index % 4 !== 3)
                return;

            $(this).addClass('paging');
            $('<li class="clear">-----</li>').insertAfter($(this));
        });

//        $("#colorHeader").spectrum({color: "#c4c4c4", change: cleanUp });
//        $("#colorUnitHeader").spectrum({color: "lightblue", change: cleanUp });
//        $("#colorTableHeader").spectrum({color: "lightgreen", change: cleanUp });
//        $("#colorSummaryNames").spectrum({color: "lightgreen", change: cleanUp });
//        $(".cb").checkboxradio({icon:false});
    });