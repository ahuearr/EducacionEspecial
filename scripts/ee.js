var cont=0;

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


