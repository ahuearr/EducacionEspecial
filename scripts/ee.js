var cont=0;
var imagen1;
var imagen2;
var imagen3;
var sesionCargada;
$(init)

function init() {
	  $('.draggable').draggable({
		  cursor: 'move'
	  });
	  $('.droppable').droppable({
		  drop: handleDropEvent
	  });
}

$(document).ready(function(){
    
    Parse.initialize(APP_ID, JAVASCRIPT_KEY);
    
    var sesionId = getParameterByName('sesionId');
    
    cargarSesion(sesionId);
	  $('#continuar0').click(function(){
			 continuar('inicio'); 
		  });
	  $('#volver1').click(function(){
		  location.reload();
		  continuar('finalizar'); 
		  });
	  $('#continuar1').click(function(){
			 continuar('actividad1'); 
		  });
	  $('#volver2').click(function(){
		  location.reload();
		  continuar('inicio'); 
		  });
	  $('#continuar2').click(function(){
			 continuar('actividad2'); 
		  });
	  $('#volver3').click(function(){
		  location.reload();
		  continuar('actividad1'); 
		  });
	  $('#continuar3').click(function(){
			 continuar('actividad3'); 
		  });
	  $('#volver4').click(function(){
		  location.reload();
		  continuar('actividad2'); 
		  });
	  $('#continuar4').click(function(){
			 continuar('actividad4'); 
		  });
	  $('#volver5').click(function(){
		  location.reload();
		  continuar('actividad3'); 
		  });
	  $('#continuar5').click(function(){
			 continuar('actividad5'); 
		  });
	  $('#volver6').click(function(){
		  location.reload();
		  continuar('actividad4'); 
		  });
	  $('#finalizar').click(function(){
			 continuar('finalizar'); 
		  });
	  
	  $('input[type=text]').on("keyup blur", function(event){
		  var img = '#img'+$(this).attr('id').substring(4,6);
		  var ok='#ok'+$(this).attr('id').substring(4,6);
		  if($(ok).attr("src")!="../img/OK.png"){
			  if($(this).val()==$(img).data('texto')){
				  this.disabled=true;
				  $(ok).attr("src", "../img/OK.png");
				  $(ok).css('visibility','visible');
				  cont++;
				  if(cont==3){
					  cont=0;
					  var continuar='#continuar'+$(this).attr('id').substring(4,5);
					  $(continuar).show();
				  }
			  }else{
				  $(ok).attr("src", "../img/KO.png");
				  if(event.type=='blur')
					  $(ok).css('visibility','visible');
			  }
		  }
		  if($(this).val()==''){
			  $(ok).css('visibility','hidden');
		  }
	  });
	  
	  $('.ver').click(function(){
			var texto='#texto'+$(this).attr('id').substring(3,5);
			var elementoActual = $(this);
			elementoActual.hide();
			$(texto).show();
			setTimeout(function(){
				$(texto).hide();
				elementoActual.show();
			}, 10000);
	  });
});

function handleDropEvent( event, ui ) {
	  var contenido = ui.draggable;
	  var contenedor = $(this);
	  contenido.position( { of: $(this), my: 'center', at: 'center' } );
	  for(var i=1;i<4;i++){
		  var numeroPantalla = contenedor.attr('id').substring(3,4);
		  if($("#ok"+numeroPantalla+i).data('drop')==contenido.attr('id')){
			  $("#ok"+numeroPantalla+i).css('visibility','hidden');
			  $("#ok"+numeroPantalla+i).data('drop','');
		  }
	  }
	  if(contenido.data('contenido')==contenedor.data('contenedor')){
		  contenido.draggable('disable');
		  contenedor.droppable('disable');
		  contenido.draggable('option','revert',false);
		  var ok='#ok'+contenedor.attr('id').substring(3,5);
		  $(ok).attr("src", "../img/OK.png");
		  $(ok).css('visibility','visible');
		  $(ok).data('drop', '');
		  cont++;
		  if(cont==3){
			  cont=0;
			  var continuar='#continuar'+contenedor.attr('id').substring(3,4);
			  $(continuar).show();
		  }
	  } else {
		  var ko='#ok'+contenedor.attr('id').substring(3,5);
		  $(ko).attr("src", "../img/KO.png");
		  $(ko).css('visibility','visible');
		  $(ko).data('drop', contenido.attr('id'));
	  }
}

function continuar(opcion){
	switch(opcion){
	case 'inicio':	$.mobile.changePage('#Actividad1')
	break;
	case 'actividad1':	$.mobile.changePage('#Actividad2')
	break;
	case 'actividad2':	$.mobile.changePage('#Actividad3')
	break;
	case 'actividad3':	$.mobile.changePage('#Actividad4')
	break;
	case 'actividad4':	$.mobile.changePage('#Actividad5')
	break;
	case 'actividad5':	$.mobile.changePage('#Fin')
	break;
	case 'finalizar':	$.mobile.changePage('#Inicio')
	break;
	default:
		break;
	}
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function cargarSesion(sesionId){

    var Sesion = Parse.Object.extend("Sesion");
    var query = new Parse.Query(Sesion);
    query.get(sesionId, {
	  success: function(sesion) {
	      sesionCargada=sesion;
	      cargarImagen(sesion.get('Image1Id'), sesion.get('Image2Id'), sesion.get('Image3Id'));
	  },
	  error: function(object, error) {
	  }
	});
}

function cargarImagen(imagenId1, imagenId2, imagenId3){

    var Imagen = Parse.Object.extend("Image");
    var query = new Parse.Query(Imagen);
    var imagenId;
    var callback=false;
    if(imagenId1!=null){
	imagenId=imagenId1;
	imagenId1=null;
    } else if(imagenId2!=null){
	imagenId=imagenId2;
	imagenId2=null;
    } else if(imagenId3!=null){
	imagenId=imagenId3;
	imagenId3=null;
	callback=true;
    }
    query.get(imagenId, {
	  success: function(imagen) {
	      if(imagenId3==null)	imagen3=imagen;
	      else if (imagenId2==null)	imagen2=imagen;
	      else if (imagenId1==null)	imagen1=imagen;
	      
	      console.log(imagen);
	      
	      if(callback)	prepararFormulario();
	      else		cargarImagen(imagenId1, imagenId2, imagenId3)
	  },
	  error: function(object, error) {
	  }
	});

}

function prepararFormulario(){
    $('#texto11').html(obtenerImagenDePosicion('pos11').get('imageName'));
    $('#texto12').html(obtenerImagenDePosicion('pos12').get('imageName'));
    $('#texto13').html(obtenerImagenDePosicion('pos13').get('imageName'));
    $('#texto21').html(obtenerImagenDePosicion('posDrop21').get('imageName'));
    $('#texto22').html(obtenerImagenDePosicion('posDrop22').get('imageName'));
    $('#texto23').html(obtenerImagenDePosicion('posDrop23').get('imageName'));
    $('#texto31').html(obtenerImagenDePosicion('posDrag31').get('imageName'));
    $('#texto32').html(obtenerImagenDePosicion('posDrag32').get('imageName'));
    $('#texto33').html(obtenerImagenDePosicion('posDrag33').get('imageName'));
    $('#img41').data('texto',obtenerImagenDePosicion('pos41').get('imageName'));
    $('#img42').data('texto',obtenerImagenDePosicion('pos42').get('imageName'));
    $('#img43').data('texto',obtenerImagenDePosicion('pos43').get('imageName'));
    $('#texto41').html(obtenerImagenDePosicion('pos41').get('imageName'));
    $('#texto42').html(obtenerImagenDePosicion('pos42').get('imageName'));
    $('#texto43').html(obtenerImagenDePosicion('pos43').get('imageName'));
}

function obtenerImagenDePosicion(posicion){
    switch(sesionCargada.get(posicion)){
    case '1':
	return imagen1;
    case '2':
	return imagen2;
    case '3':
	return imagen3;
    }
}