$(document).ready(function() {

    //Init Parse SDK
    Parse.initialize("4w29j63T1p9cQYHynHvsPWp13I8ZbCfBk3iDOHeO", "ABT00XroMbHJCyfaV4MCBmfK9W5sS25zPuqGWdZj");

    //File Upload
    var file;

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {

        $('#messageOK').hide();
        $('#messageKO').hide();

        var serverUrl = 'https://api.parse.com/1/files/' + file.name;

        if($('#imageName').val()=='')
    	{
        	alert('Falta poner el nombre de la imagen');
        	return;
    	}
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", '4w29j63T1p9cQYHynHvsPWp13I8ZbCfBk3iDOHeO');
                request.setRequestHeader("X-Parse-REST-API-Key", 'I2XDWGYh0IW0Zwkve9irIVjRsHsu22Adl1ijChVV');
                request.setRequestHeader("Content-Type", file.type);
            },
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(data) {

                //Change variable to reflect your class to upload to
                var classUrl = "https://api.parse.com/1/classes/Image"

                if(data) {

                    var fileName = "" + data.name;
                    $.ajax({
                        type: "POST",
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Parse-Application-Id", '4w29j63T1p9cQYHynHvsPWp13I8ZbCfBk3iDOHeO');
                            request.setRequestHeader("X-Parse-REST-API-Key", 'I2XDWGYh0IW0Zwkve9irIVjRsHsu22Adl1ijChVV');
                            request.setRequestHeader("Content-Type", 'application/json');
                        },
                        url: classUrl,
                        data: '{"imageName" : "'+$('#imageName').val()+'", "imageFile" : {"name" : '+"\""+fileName+"\""+', "__type" : "File"}}',
                        processData: false,

                        success: function(data) {
                            $('#messageOK').show();
                            $('#messageKO').hide();
                            $('#imageName').val('');
                            $('#fileselect').val('');
                        },

                        error: function(error) {
                            $('#messageKO').show();
                            $('#messageOK').hide();
                            console.log("Error: " + error.message);
                        }
                    });

                } else {
                    //Data is null
                    console.log("Data IS NULL");
                }
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    });
});