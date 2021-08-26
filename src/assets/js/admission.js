/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
$body = $("body");    
$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});
$(document).on("submit", function(){
    $body.addClass("loading");
});
    
    //Loading cities after selecting a specific country
    $('#pays_residence').on("change", function(event){

        $.post({
            dataType:"Json",
            url: "loadcity",
            data : {country: $('#pays_residence').val()},
            
            success: function( data){
                //remove all the options from de slect input
                $('#ville_residence option').each(function() {
                    $(this).remove();
                });
                //Adding options from json
                $('#ville_residence').append($('<option>').text("----veuillez choisir une ville----"));
                $.each(data, function(i, obj){
                    $('#ville_residence').append($('<option>').text(obj.text).attr('value', obj.val));
                });}
            
        });
    });
       
 //Loading cities from prospective student form       
        $('#pays_residence_1').on("change", function(event){

        $.post({
            dataType:"Json",
            url: "loadcity",
            data : {country: $('#pays_residence_1').val()},
            
            success: function( data){
                //remove all the options from de slect input
                $('#ville_residence_1 option').each(function() {
                    $(this).remove();
                });
                //Adding options from json
                $('#ville_residence_1').append($('<option>').text("----veuillez choisir une ville----"));
                $.each(data, function(i, obj){
                    $('#ville_residence_1').append($('<option>').text(obj.text).attr('value', obj.val));
                });}
            
        });
       // $( this ).unbind( event );
    });
    
    //Loading city form information du pere form
         $('#pays_residence_pere').on("change", function(event){

        $.post({
            dataType:"Json",
            url: "loadcity",
            data : {country: $('#pays_residence_pere').val()},
            
            success: function( data){
                //remove all the options from de slect input
                $('#ville_residence_pere option').each(function() {
                    $(this).remove();
                });
                //Adding options from json
                $('#ville_residence_pere').append($('<option>').text("----veuillez choisir une ville----"));
                $.each(data, function(i, obj){
                    $('#ville_residence_pere').append($('<option>').text(obj.text).attr('value', obj.val));
                });}
            
        });
       // $( this ).unbind( event );
    });
    
    //Loadieng cties from information de la mere form
            $('#pays_residence_mere').on("change", function(event){

        $.post({
            dataType:"Json",
            url: "loadcity",
            data : {country: $('#pays_residence_mere').val()},
            
            success: function( data){
                //remove all the options from de slect input
                $('#ville_residence_mere option').each(function() {
                    $(this).remove();
                });
                //Adding options from json
                $('#ville_residence_mere').append($('<option>').text("----veuillez choisir une ville----"));
                $.each(data, function(i, obj){
                    $('#ville_residence_mere').append($('<option>').text(obj.text).attr('value', obj.val));
                });}
            
        });
       // $( this ).unbind( event );
    });
 
 //loading department after selecting a faculty
    $('#faculty').on("change", function(event){

        $.post({
            dataType:"Json",
            url: "loadept",
            data : {faculty: $('#faculty').val(),numdossier: $('#numdossier').val()},
            
            success: function( data){
                
                //remove all the options from de slect input
                $('#department_1 option,#department_2 option,#department_3 option').each(function() {
                    $(this).remove();
                });
                //Adding options from json
                $('#department_1,#department_2,#department_3').append($('<option>').text("---Veuillez choisir une filière---").attr('value',''));
                $.each(data, function(i, obj){
                $('#department_1,#department_2,#department_3').append($('<option>').text(obj.text).attr('value', obj.val));
                });}
            
        });
       // $( this ).unbind( event );
    });   

    //submitting user gneral information to the data base
    
   /* $('#etatCivil').on("submit", function(event){
        event.preventDefault();
        var $this = $(this);
        $.post({
            url : "newcandidate",
            data : $this.serialize(),
            success: function( data){
              $('#newcandidate').html(data);
              
            }

        }) ;       
    });*/
    
    //submitting inscription step 1 form to the data base
   /* $('#inscription1-form').on("submit", function(event){
        event.preventDefault();
        var $this = $(this);
        $.post({
            url : "inscriptionnext",
            data : $this.serialize(),
            success: function( data){
              $('#newcandidate').html(data);
              
            }

        }) ;       
    });    
 */
     //submitting inscription step 1 form to the data base
 /*   $('#candidatNextForm').on("submit", function(event){
        event.preventDefault();
        var $this = $(this);
        $.post({
            url : "inscriptionend",
            data : $this.serialize(),
            success: function( data){
              $('#newcandidate').html(data);
              
            }
        }) ;       
    });   
 */

     //Check in the payment has been done
 /* $('#paiementForm').on("submit", function(event){
        event.preventDefault();
        var $this = $(this);
        $.post({
            url : "checkpayment",
            data : $this.serialize(),
            success: function( data){
              $('#newcandidate').html(data);
              
            }

        }) ;       
    }); */  

      var i=1;
     $("#add_row").click(function(){
      $('#addr'+i).html("<td>"+ (i+1) +"</td><td><select name='annee"+i+"' type='text' 'required'='true' placeholder='Année' class='form-control input-md'  > \n\
        <option value=\'\'>--Choisir une anneé--</option>\n\
        <option value=\'2012/2013\'>2012/2013</option>\n\
        <option value=\'2013/2014\'>2013/2014</option>\n\
        <option value=\'2014/2015\'>2014/2015</option>\n\
        <option value=\'2015/2016\'>2015/2016</option>\n\
        <option value=\'2016/2017\'>2016/2017</option>\n\</select></td>\n\
        <td><input  name='classe"+i+"' type='text' placeholder='Classe' 'required'='true' class='form-control input-md'>\n\
        </td><td><input  name='nom_etablissement"+i+"' type='text' 'required'='true' placeholder='Nom établissement'  class='form-control input-md'></td>\n\
        <td><input name='ville"+i+"'  type='text' placeholder='Ville' 'required'='true' class='form-control input-md' /> </td></td>");

      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      i++; 
      $('#num_row').val(i-1);

  });
     $("#delete_row").click(function(){
    	 if(i>1){
		 $("#addr"+(i-1)).html('');
		 i--;
		 }
                       $('#num_row').val(i-1);

	 });

         
      var j=1;
     $("#dipadd_row").click(function(){
      $('#dipaddr'+j).html("<td>"+ (j+1) +"</td><td><input name='nom_diplome"+j+"' type='text' 'required'='true' placeholder='Intitule du diplome' class='form-control input-md'  ></td>\n\
        <td><input  name='annee_diplome"+j+"' type='text' 'required'='true' placeholder='Année obtention'  class='form-control input-md'>\n\
        </td><td><input  name='serie_diplome"+j+"' type='text' 'required'='true' placeholder='Série'  class='form-control input-md'></td>\n\
        <td><input name='mention"+j+"'  type='text' placeholder='Mention' 'required'='true' class='form-control input-md' /> </td></td>");

      $('#tab_logic_2').append('<tr id="dipaddr'+(j+1)+'"></tr>');
      j++; 
      $('#num_diplome_row').val(j-1);

  });
     $("#dipdelete_row").click(function(){
    	 if(j>1){
		 $("#dipaddr"+(j-1)).html('');
		 j--;
		 }
                       $('#num_diplome_row').val(j-1);

	 });         

  var k=1;
     $("#expadd_row").click(function(){
      $('#expaddr'+k).html("<td>"+ (k+1) +"</td><td><input name='periode_emploi"+k+"' type='text' placeholder='Période emploi' class='form-control input-md'  ></td>\n\
        <td><input  name='nom_entreprise"+k+"' type='text' placeholder='Entreprise'  class='form-control input-md'>\n\
        </td><td><input  name='secteur_activite"+k+"' type='text' placeholder='Secteur activité'  class='form-control input-md'></td>\n\
        <td><input name='nature_emploi"+k+"'  type='text' placeholder='Nature emploi' class='form-control input-md' /> </td></td>");

      $('#tab_logic_3').append('<tr id="expaddr'+(k+1)+'"></tr>');
      k++; 
      $('#num_emploi_row').val(k-1);

  });
     $("#expdelete_row").click(function(){
    	 if(k>1){
		 $("#expaddr"+(k-1)).html('');
		 k--;
		 }
                       $('#num_emploi_row').val(k-1);

	 });       
    
 
     $("#date_naissance" ).datepicker({ dateFormat: 'dd-mm-yy',
     changeMonth: true,
      changeYear: true}); 
    // $("#date_naissance" ).datepicker('setDate', new Date());
     $("#bac_year_obtention" ).datepicker({ dateFormat: 'yy',
     changeMonth: true,
      changeYear: true}); 
    // $("#bac_year_obtention" ).datepicker('setDate', new Date());
     
});