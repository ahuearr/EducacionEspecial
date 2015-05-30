var listaImagenes;
var tabla;

$(document).ready(function(){

    Parse.initialize(APP_ID, JAVASCRIPT_KEY);

    recuperarListaImagenes();
    
    prepararDesplegables();
    
});

function recuperarListaImagenes(){
    var Image = Parse.Object.extend("Image");
    var query = new Parse.Query(Image);
    query.find({
      success: function(results) {
	  listaImagenes = results;
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          $('.selectImagen').append(optionImageHTML(object));
        }
        tabla = $('#listasesiones').DataTable();
        recuperarSesiones();
      },
      error: function(error) {
	  console.log("Error: " + error.code + " " + error.message);
      }
    });
}

function recuperarSesiones(){
    var Sesion = Parse.Object.extend("Sesion");
    var query = new Parse.Query(Sesion);
    query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length + " sessions.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          var row = crearFilaSesion(object);
          tabla.row.add(row).draw();
          console.log(object.id + ' - ' + object.get('description'));
        }
      },
      error: function(error) {
	  console.log("Error: " + error.code + " " + error.message);
      }
    });
}

function crearFilaSesion(object){
    var row = [];
    row[0]='<input id="actualizasesion_"'+object.id+'" type="button" value="Actualizar" onclick="javascript:grabarSesion(\''+object.id+'\')"/>';
    row[1]='<input type="text" id="descripcion_'+object.id+'" value="'+object.get('description')+'" maxlength=30/>';
    row[2]='	<select name="imagen1_'+object.id+'" id="imagen1_'+object.id+'" class="selectImagen">'+
    '		<option value="0">Imagen1</option>';
    for(var i=0;i<listaImagenes.length;i++){
	row[2] += optionImageHTML(listaImagenes[i], object.get('Image1Id'));
    }
    row[2] +=
    '	</select>'+
    '	<select name="imagen2_'+object.id+'" id="imagen2_'+object.id+'" class="selectImagen">'+
    '		<option value="0">Imagen2</option>';
    for(var i=0;i<listaImagenes.length;i++){
	row[2] += optionImageHTML(listaImagenes[i], object.get('Image2Id'));
    }
    row[2] +=
    '	</select>'+
    '	<select name="imagen3_'+object.id+'" id="imagen3_'+object.id+'" class="selectImagen">'+
    '		<option value="0">Imagen3</option>';
    for(var i=0;i<listaImagenes.length;i++){
	row[2] += optionImageHTML(listaImagenes[i], object.get('Image3Id'));
    }
    row[2] +='	</select>';
    row[3]=selectPositionHTML('pos11_'+object.id, object.get('pos11'))+
    selectPositionHTML('pos12_'+object.id, object.get('pos12'))+
    selectPositionHTML('pos13_'+object.id, object.get('pos13'));
    row[4]=selectPositionHTML('posDrop21_'+object.id, object.get('posDrop21'))+
    selectPositionHTML('posDrop22_'+object.id, object.get('posDrop22'))+
    selectPositionHTML('posDrop23_'+object.id, object.get('posDrop23'));
    row[5]=selectPositionHTML('posDrag21_'+object.id, object.get('posDrag21'))+
    selectPositionHTML('posDrag22_'+object.id, object.get('posDrag22'))+
    selectPositionHTML('posDrag23_'+object.id, object.get('posDrag23'));
    row[6]=selectPositionHTML('posDrop31_'+object.id, object.get('posDrop31'))+
    selectPositionHTML('posDrop32_'+object.id, object.get('posDrop32'))+
    selectPositionHTML('posDrop33_'+object.id, object.get('posDrop33'));
    row[7]=selectPositionHTML('posDrag31_'+object.id, object.get('posDrag31'))+
    selectPositionHTML('posDrag32_'+object.id, object.get('posDrag32'))+
    selectPositionHTML('posDrag33_'+object.id, object.get('posDrag33'));
    row[8]=selectPositionHTML('pos41_'+object.id, object.get('pos41'))+
    selectPositionHTML('pos42_'+object.id, object.get('pos42'))+
    selectPositionHTML('pos43_'+object.id, object.get('pos43'));
    row[9]=selectPositionHTML('pos51_'+object.id, object.get('pos51'))+
    selectPositionHTML('pos52_'+object.id, object.get('pos52'))+
    selectPositionHTML('pos53_'+object.id, object.get('pos53'));
    return row;
}
function prepararDesplegables(){
    $('.ui-selectmenu-button').remove();
    $('select').show();
}

function grabarSesion(suffix){

    if(!validarCampos(suffix))	return;
    
    var Sesion = Parse.Object.extend("Sesion");
    if(suffix=='Nueva'){
	    var sesion = new Sesion();
	    guardarObjetoSesion(suffix, sesion);
    } else{
	var query = new Parse.Query(Sesion);
	query.get(suffix, {
	    success: function(sesion) {
		    guardarObjetoSesion(suffix, sesion);
		    console.log('Actualizando sesion:'+suffix);
	    },
	    error: function(object, error) {
		    console.log('Error Actualizando sesion:'+suffix);
	    }
	  });    }
}

function guardarObjetoSesion(suffix,sesion){
    sesion.set("description", document.getElementById("descripcion_"+suffix).value);
    sesion.set("Image1Id", document.getElementById("imagen1_"+suffix).value);
    sesion.set("Image2Id", document.getElementById("imagen2_"+suffix).value);
    sesion.set("Image3Id", document.getElementById("imagen3_"+suffix).value);
    sesion.set("pos11", document.getElementById("pos11_"+suffix).value);
    sesion.set("pos12", document.getElementById("pos12_"+suffix).value);
    sesion.set("pos13", document.getElementById("pos13_"+suffix).value);
    sesion.set("posDrag21", document.getElementById("posDrag21_"+suffix).value);
    sesion.set("posDrag22", document.getElementById("posDrag22_"+suffix).value);
    sesion.set("posDrag23", document.getElementById("posDrag23_"+suffix).value);
    sesion.set("posDrop21", document.getElementById("posDrop21_"+suffix).value);
    sesion.set("posDrop22", document.getElementById("posDrop22_"+suffix).value);
    sesion.set("posDrop23", document.getElementById("posDrop23_"+suffix).value);
    sesion.set("posDrag31", document.getElementById("posDrag31_"+suffix).value);
    sesion.set("posDrag32", document.getElementById("posDrag32_"+suffix).value);
    sesion.set("posDrag33", document.getElementById("posDrag33_"+suffix).value);
    sesion.set("posDrop31", document.getElementById("posDrop31_"+suffix).value);
    sesion.set("posDrop32", document.getElementById("posDrop32_"+suffix).value);
    sesion.set("posDrop33", document.getElementById("posDrop33_"+suffix).value);
    sesion.set("pos41", document.getElementById("pos41_"+suffix).value);
    sesion.set("pos42", document.getElementById("pos42_"+suffix).value);
    sesion.set("pos43", document.getElementById("pos43_"+suffix).value);
    sesion.set("pos51", document.getElementById("pos51_"+suffix).value);
    sesion.set("pos52", document.getElementById("pos52_"+suffix).value);
    sesion.set("pos53", document.getElementById("pos53_"+suffix).value);
    sesion.save(null, {
        success: function(sesion) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + sesion.id);
            location.reload();
        },
        error: function(sesion, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Se ha producido un error al grabar la sesion');
        }
    });
}

function validarCampos(suffix){
    if(document.getElementById("descripcion_"+suffix).value==''){
	alert('ERROR: Descripcion vacía');
	return false;
    }
    if(document.getElementById("imagen1_"+suffix).value=='0'){
	alert('ERROR: Imagen vacía');
	return false;
    }
    if(document.getElementById("imagen2_"+suffix).value=='0'){
	alert('ERROR: Imagen vacía');
	return false;
    }
    if(document.getElementById("imagen3_"+suffix).value=='0'){
	alert('ERROR: Imagen vacía');
	return false;
    }
    if(document.getElementById("pos11_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos12_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos13_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag21_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag22_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag23_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop21_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop22_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop23_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag31_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag32_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrag33_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop31_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop32_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("posDrop33_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos41_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos42_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos43_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos51_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos52_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos53_"+suffix).value=='0'){
	alert('ERROR: Posicion vacía');
	return false;
    }
    if(document.getElementById("pos11_"+suffix).value==document.getElementById("pos12_"+suffix).value ||
	    document.getElementById("pos12_"+suffix).value==document.getElementById("pos13_"+suffix).value ||
	    document.getElementById("pos11_"+suffix).value==document.getElementById("pos13_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("posDrag21_"+suffix).value==document.getElementById("posDrag22_"+suffix).value ||
	    document.getElementById("posDrag22_"+suffix).value==document.getElementById("posDrag23_"+suffix).value ||
	    document.getElementById("posDrag21_"+suffix).value==document.getElementById("posDrag23_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("posDrop21_"+suffix).value==document.getElementById("posDrop22_"+suffix).value ||
	    document.getElementById("posDrop22_"+suffix).value==document.getElementById("posDrop23_"+suffix).value ||
	    document.getElementById("posDrop21_"+suffix).value==document.getElementById("posDrop23_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("posDrag31_"+suffix).value==document.getElementById("posDrag32_"+suffix).value ||
	    document.getElementById("posDrag32_"+suffix).value==document.getElementById("posDrag33_"+suffix).value ||
	    document.getElementById("posDrag31_"+suffix).value==document.getElementById("posDrag33_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("posDrop31_"+suffix).value==document.getElementById("posDrop32_"+suffix).value ||
	    document.getElementById("posDrop32_"+suffix).value==document.getElementById("posDrop33_"+suffix).value ||
	    document.getElementById("posDrop31_"+suffix).value==document.getElementById("posDrop33_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("pos41_"+suffix).value==document.getElementById("pos42_"+suffix).value ||
	    document.getElementById("pos42_"+suffix).value==document.getElementById("pos43_"+suffix).value ||
	    document.getElementById("pos41_"+suffix).value==document.getElementById("pos43_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }
    if(document.getElementById("pos51_"+suffix).value==document.getElementById("pos52_"+suffix).value ||
	    document.getElementById("pos52_"+suffix).value==document.getElementById("pos53_"+suffix).value ||
	    document.getElementById("pos51_"+suffix).value==document.getElementById("pos53_"+suffix).value){
	alert('ERROR: Posicion repetida');
	return false;
    }

    return true;
}

function optionImageHTML(object, selectedPos){
    return '<option value="'+object.id+'"'+((selectedPos==object.id) ? ' selected' : '' )+'>'+object.get('imageName')+'</option>';
}

function selectPositionHTML(id, selectedPos){
    var html =
    '	<select name="'+id+'" id="'+id+'">'+
    '		<option value="0">Posicion</option>'+
    '		<option value="1"'+((selectedPos=='1') ? ' selected' : '' )+'>1</option>'+
    '		<option value="2"'+((selectedPos=='2') ? ' selected' : '' )+'>2</option>'+
    '		<option value="3"'+((selectedPos=='3') ? ' selected' : '' )+'>3</option>'+
    '	</select>'
    return html;
}

