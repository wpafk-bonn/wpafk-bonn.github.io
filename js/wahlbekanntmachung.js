function bekanntmachung_onload(){
    //alert(window.location)
    var url_string = window.location
    var url = new URL(url_string);
    var first_day = url.searchParams.get("start");
    var last_day = url.searchParams.get("end");
    
    first_day = new Date(first_day)
    $( "#datestart" ).datepicker( "setDate" ,first_day)
    
    last_day = new Date(last_day)
    $( "#dateend" ).datepicker( "setDate" ,last_day)
    
    //setze möglichen Zeitraum für Frist zum Einreichen der Wahlvorschläge
    var temp_day_1 = new Date(first_day)
    temp_day_1.setDate(temp_day_1.getDate() - 10);
    var temp_day_2 = new Date(first_day)
    temp_day_2.setDate(temp_day_2.getDate() - 13);
     $('#wv').datepicker('option',{
        minDate: temp_day_2,
        maxDate: temp_day_1 

        });

    

}

function update(){
  var first_day = $( "#datestart" ).datepicker( "getDate" );
  var last_day  = $( "#dateend" ).datepicker( "getDate" );
  if(first_day != null && last_day != null){
    //updateDates(first_day, last_day);
    //updateBekanntmachungLink(first_day, last_day);
  }
}

function update_button_clicked(){
    update_fsvfsr()
    update_fs_name()
    
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    
    var formatstring = "dd.mm.yy";
    update_wahlzeitraum($.datepicker.formatDate( formatstring, first_day),$.datepicker.formatDate( formatstring, last_day))
    
    var wahlvorschlaege = $( "#wv" ).datepicker( "getDate" );
    update_wahlfristen($.datepicker.formatDate( formatstring, wahlvorschlaege))
}

// updatet den Wochentag hinter den Eingabefeldern für erster und letzter Wahltag
// prüft außerdem ob die Tage legitim sind
function updateWochentag(first_day, last_day){
    var wochentag = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag' ]
  d_first = new Date(first_day)
  $('#wochentag_1').text( wochentag[d_first.getDay()])
  if (d_first.getDay() > 0 && d_first.getDay() < 4)
    $("#wochentag_1").css("color","green");
  else 
    $("#wochentag_1").css("color","red");
    
  d_last = new Date(last_day)
  $('#wochentag_2').text( wochentag[d_last.getDay()])
  if (d_last.getDay() > 0 && d_last.getDay() < 6 && (d_last - d_first)/1000/60/60/24 > 1 && (d_last - d_first)/1000/60/60/24 < 6)
    $("#wochentag_2").css("color","green");
  else 
    $("#wochentag_2").css("color","red");
}

//updatet das zu wählende Gremium
function update_fsvfsr(gremium)
{   
    var gremium = "Fachschaftsrat"
    var derdesfsvfsr = "des"
    var diederfsvfsr = "der"
    var diedenfsvfsr = "den"
    
    var zahl_sitze = 11
    if ($( "#anzwahlberechtigte" ).val() > 500)
    {
        gremium = "Fachschaftsvertretung"
        derdesfsvfsr = "der"
        diederfsvfsr = "die"
        diedenfsvfsr = "die"
        
        if($( "#anzwahlberechtigte" ).val() > 2000)
            zahl_sitze = 19
        else if($( "#anzwahlberechtigte" ).val() > 1000)
            zahl_sitze = 15
    }
    if ($( "#fsvsatzung" ).is(":checked"))
    
    {
        gremium = "Fachschaftsvertretung"
        derdesfsvfsr = "der"
        diederfsvfsr = "die"
        diedenfsvfsr = "die"
    }
    for (const element of document.getElementsByClassName('fsvfsr')){
        element.innerHTML = gremium
    }
    for (const element of document.getElementsByClassName('derdesfsvfsr')){
        element.innerHTML = derdesfsvfsr
    }
    for (const element of document.getElementsByClassName('diederfsvfsr')){
        element.innerHTML = diederfsvfsr
    }
    for (const element of document.getElementsByClassName('diedenfsvfsr')){
        element.innerHTML = diedenfsvfsr
    }
    for (const element of document.getElementsByClassName('zahl_sitze')){
        element.innerHTML = zahl_sitze
    }
    
}

// updatet den Name der Fachschaft
function update_fs_name()
{
    for (const element of document.getElementsByClassName('fachschaft')){
        element.innerHTML = $( "#fsname" ).val()
    }
}

function update_wahlfristen(wahlvorschlaege)
{
    for (const element of document.getElementsByClassName('frist_einreichung_wahlvorschlaege')){
        element.innerHTML = wahlvorschlaege
    }
}

//updatet den Wahlzeitraum
function update_wahlzeitraum(first_day,last_day)
{
    var zeitraum = "von "+ first_day + " bis " + last_day
   
    for (const element of document.getElementsByClassName('wahlzeitraum')){
        element.innerHTML = zeitraum
    }
}
