var wahlbekanntmachung_link = ""

//beim aufruf der Seite
function index_onload(){
    // link zur Wahlbekanntmachung speichern
    wahlbekanntmachung_link = document.getElementById("wahlbekanntmachung_link").href
    update()
}

//update Link und Fristen
function update(){
  var first_day = $( "#datestart" ).datepicker( "getDate" );
  var last_day  = $( "#dateend" ).datepicker( "getDate" );
  if(first_day != null && last_day != null){
    updateDates(first_day, last_day);
    updateBekanntmachungLink(first_day, last_day);
  }
}

// fügt parameter in die URL für den Aufruf zur Wahlbekanntmachung ein
function updateBekanntmachungLink(first_day, last_day){
    var formatstring = "yy-mm-dd"
    document.getElementById("wahlbekanntmachung_link").href = wahlbekanntmachung_link + "start=" + $.datepicker.formatDate( formatstring, first_day ) + "&end=" + $.datepicker.formatDate( formatstring, last_day )
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

function updateDates(first_day, last_day){
  
  updateWochentag(first_day, last_day)
 
  var formatstring = "dd.mm.yy";
  //Festlegung Wahltermin 
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#flwahltermin').text($.datepicker.formatDate( formatstring, d ));
  //Wahl: Wahlleitung und Wahlausschuss
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#wlundwa').text($.datepicker.formatDate( formatstring, d ));
  //Stichtag Wahlberechtigung
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#stwber').text($.datepicker.formatDate( formatstring, d ));
  //konstituierende Sitzung des Wahlausschusses
  d = new Date(first_day);
  d.setDate(d.getDate() - 25);
  $('#konstwa').text($.datepicker.formatDate( formatstring, d ));
  //Festlegung Auslage des Wählendenverzeichnis (Fristen, Termine, Orte)
  d = new Date(first_day);
  d.setDate(d.getDate() - 25);
  $('#flaowvz').text($.datepicker.formatDate( formatstring, d ));
  //Übernahme Wählendenverzeichnis
  d = new Date(first_day);
  d.setDate(d.getDate() - 19);
  $('#uebernahmewvz').text($.datepicker.formatDate( formatstring, d ));
  //Wahlbekanntmachung
  d = new Date(first_day);
  d.setDate(d.getDate() - 18);
  $('#wbk').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Wahlvorschlägen (frühestens)
  d = new Date(first_day);
  d.setDate(d.getDate() - 13);
  $('#wvs').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Wahlvorschlägen (spätestens)
  d = new Date(first_day);
  d.setDate(d.getDate() - 10);
  $('#wve').text($.datepicker.formatDate( formatstring, d ));
  //Bekanntmachung von Wahlvorschlägen
  d = new Date(first_day);
  d.setDate(d.getDate() - 9);
  $('#bkwv').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Briefwahlanträgen Start
  d = new Date(first_day);
  d.setDate(d.getDate() - 13);
  $('#fbws').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Briefwahlanträgen Ende
  d = new Date(first_day);
  d.setDate(d.getDate() - 10);
  $('#fbwe').text($.datepicker.formatDate( formatstring, d ));
  //Erster Wahltag
  d = new Date(first_day);
  $('#ewt').text($.datepicker.formatDate( formatstring, d ));
  //letzter Wahltag
  d = new Date(last_day);
  $('#lwt').text($.datepicker.formatDate( formatstring, d ));
  // Veröffentlichung des Wahlergebnisses
  d = new Date(last_day);
  d.setDate(d.getDate() + 3);
  $('#vwep').text($.datepicker.formatDate( formatstring, d ));
  //konstituierende FSV Sitzung
  d = new Date(last_day);
  d.setDate(d.getDate() + 5);
  $('#konstfsvs').text($.datepicker.formatDate( formatstring, d ));
   //konstituierende FSV Sitzung Ende
  d = new Date(last_day);
  d.setDate(d.getDate() + 14);
  $('#konstfsve').text($.datepicker.formatDate( formatstring, d ));
}

function resetDates(){
  $('#flwahltermin').text("-");
  $('#wlundwa').text("-");
  $('#konstwa').text("-");
  $('#flaowvz').text("-");
  $('#wbk').text("-");
  $('#alwvzs').text("-");
  $('#alwvze').text("-");
  $('#bkwv').text("-");
  $('#ewt').text("-");
  $('#lwt').text("-");
  $('#vwep').text("-");
  $('#konstfsv').text("-");
}
