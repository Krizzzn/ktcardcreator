    function remover(){

        $("#content style").remove();
        $("#outline").remove();

        $("#outline>div.battlescribe>div.summary").remove();
        $("#outline p").remove();
        $("#outline table").remove();
        //$("#outline li.rootselection>ul>li>ul").remove();
        $("#outline>div.battlescribe").removeClass("battlescribe");
        $("#outline li.rootselection").removeClass("rootselection");

        $(".battlescribe > p").remove();

        toKillTeamRoster()
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

    function getWounds(page){
        var table = getTable(page, "Model");

        if (!table)
            return null;

        var number = $(table).find("td")[6];
        if (!number)
            return null;

        return parseInt($(number).text());
    }

    function getTable(baseElement, find){
        var table = $(baseElement).find("table");

        for (var i = 0; i < table.length; i++) {
            if ($(table[i]).find("th:first").text() == find)
                return table[i];
        }
        return null;
    }

    function getPoints(baseElement) {
        var name = $(baseElement).find("h4").text();
        name = name.replace(/\[\d{1,3}pts\]$/, "");
        $(baseElement).find("h4").text(name);
        return (name.match(/\d{1,3}pts/) || [""])[0]
    }

    function readSpecialAbilities(baseElement)
    {    
        var abilities = $(baseElement).find(".profile-names:first").html();
        var item = $(baseElement).find(".profile-names:first").find("span");

        $(baseElement).find(".abilities tr").each(function(index, elem) {
            var ability = $(this).find(".profile-name").text();

            if (ability.length > 1 && abilities.indexOf(ability) < 1){
                $(item[1]).text( ability + ", " + $(item[1]).text()  )
            }
        });
    }

    function renderWoundTracker(baseElement)
    {
        var woundtracker = $("#templates .wounds");
        var wounds = getWounds(baseElement);

        if (wounds && !isNaN(wounds)){
            $(baseElement).append(woundtracker.clone());
            $(baseElement).find('.wound').slice(wounds).remove();

            var points = getPoints(baseElement);
            if (points) {
                $(baseElement).append('<div class="points">' + points.replace(/pts/, '<small> pts</small>') + '</div>'); 
            }
        }
    }

    function toKillTeamRoster(){

        $("#content>div.battlescribe li.rootselection").each(function(){
            var t = getTable(this, "Ability");
            $(t).addClass('abilities');
        });

        $("#content li.category").each(function(index, el) {
           var category = $(this).children('h3').text(); 
           $(this).find('ul li.rootselection h4').append(" - " + category);
           $(this).children('h3').remove();
        });

        var pages = [];
        var curr;

        $("li.rootselection").each(function(index, el) {
            if (index % 4 === 0){
                curr = [];
                pages.push(curr);
            }
            
            renderWoundTracker(this);
            readSpecialAbilities(this);
            
            curr.push($(this).clone());
            $(this).remove();
        });

        $(pages).each(function(index, el) {
            var page = $('<ul class="page"></ul>');
            page.append(el);
            $("#content>div.battlescribe").append(page);
        });

        $(".force").remove();

        var abilities = {};

        $(".abilities tr").each(function(index, elem) {
            var ability = $(this).find(".profile-name").text();
            abilities[ability] = $(this).clone();
        });

        var abTable = $('<ul><li><table class="abilities-table"><tbody></tbody></table></li></ul>');
        $("#content>div.battlescribe").append(abTable);
        $.each(abilities, function(key, el) {
            abTable.find('tbody').append($(el));             
        });

        var summary = $("div.summary").remove();

        var target = $(".rootselection:first");
        target.addClass('overview');
        target.detach();

        target.append(abTable);
        target.append(summary);

        var firstpage = $('<ul class="page"></ul>');
        firstpage.append(target);
        firstpage.insertBefore(".page:first");


        var head = $(".battlescribe h1").first().remove();

        $("ul.page h4").first().text(head.text())        
    }

 //   $(document).ready();