/**
 *
 * HTML5 Image uploader with Jcrop
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

// convert bytes into friendly format
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

// check for selected crop region
function checkForm() {
    if (parseInt($('#w').val())) 
   {
     if (($('#caption').val())!="") {
        
sessionStorage.caption=$('#caption').val();
   return true; }
    $('.error').html('Please enter a caption').show();
    return false;
   
   }



    $('.error').html('Please select a crop region and then press Frame It!').show();
    return false;

    
      
};

// update info by cropping (onChange and onSelect events handler)
function updateInfo(e) {
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#x2').val(e.x2);
    $('#y2').val(e.y2);
    $('#w').val(e.w);
    $('#h').val(e.h);

        sessionStorage.x=e.x;
        sessionStorage.y=e.y; 
        sessionStorage.w=e.w; 
        sessionStorage.h=e.h;
};

// clear info by cropping (onRelease event handler)
function clearInfo() {
    $('.info #w').val('');
    $('.info #h').val('');
};

// Create variables (in this scope) to hold the Jcrop API and image size
var jcrop_api, boundx, boundy;

function fileSelectHandler() {

    // get selected file
    var oFile = $('#image_file')[0].files[0];

    // hide all errors
    $('.error').hide();

    // check for image type (jpg and png are allowed)
    var rFilter = /^(image\/jpeg|image\/png)$/i;
    if (! rFilter.test(oFile.type)) {
        $('.error').html('Please select a valid image file (jpg and png are allowed)').show();
        return;
    }





    // check for file size
    if (oFile.size > 500 * 1024) {
        $('.error').html('Please select an image of lower size.').show();
        return;
    }
$('#myModal').modal({
  keyboard: false,
  
})
    // preview element
    var oImage = document.getElementById('preview');
           
    // prepare HTML5 FileReader
    var oReader = new FileReader();
        oReader.onload = function(e)
        {

        // e.target.result contains the DataURL which we can use as a source of the image
        oImage.src = e.target.result;
        localStorage.setItem("fpic", e.target.result);
        oImage.onload = function () 
        { // onload event handler


$('#myModal').modal('show');
$('.step1').hide();
$('.work').show();
$('.step2').show();
setTimeout(function(){
        $('#myModal').modal('hide');
    }, 2840);


         




            // display some basic image info
            var sResultFileSize = bytesToSize(oFile.size);
  

            $('#filesize').val(sResultFileSize);
            $('#filetype').val(oFile.type);
            $('#filedim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);

        

            // destroy Jcrop if it is existed
            if (typeof jcrop_api != 'undefined') {
                jcrop_api.destroy();
                jcrop_api = null;
                $('#preview').width(oImage.naturalWidth);
                $('#preview').height(oImage.naturalHeight);
            }

            setTimeout(function(){
                // initialize Jcrop
                $('#preview').Jcrop({
                    boxWidth: 600,
                    boxHeight: 400,
                    minSize: [32, 32], // min crop size
                    aspectRatio : 1/1.55, // keep aspect ratio 1:1
                    bgFade: true, // use fade effect
                    bgOpacity: .3, // fade opacity
                    
                    onChange: updateInfo,
                    onSelect: updateInfo,
                    onRelease: clearInfo
                }, function(){

                    // use the Jcrop API to get the real image size
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];

                    // Store the Jcrop API in the jcrop_api variable
                    jcrop_api = this;
                });
            },3000);

        };
    };

    // read selected file as DataURL
    oReader.readAsDataURL(oFile);
}