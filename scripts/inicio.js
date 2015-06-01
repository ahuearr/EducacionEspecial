$(document).ready(function(){
    cargarEventos();
});

function cargarEventos(){
    $("#sesiones").click(function(){
	       window.location.replace("./gestionsesiones.html");  
	   });
    $("#imagenes").click(function(){
	       window.location.replace("./cargarimagen.html");  
	   });
}