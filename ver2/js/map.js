$(document).ready(function(){

  $('#maps_bb').hover(function(){
    $('.image_setter img').attr('src','images/bacbo.png');
  })

  $('#maps_tb').hover(function(){
    $('.image_setter img').attr('src','images/trungbo.png');
  })

  $('#maps_nb').hover(function(){
    $('.image_setter img').attr('src','images/nambo.png');
  })

$('#Map area').hover(function( e ){
	e.preventDefault();
	
	
   var item_ind =  $(this).index();
  
   var position 	= $(this).attr('coords').split(',');
   var pointname 	= $(this).attr('potname');
  
	  x = +position[0]-72;
	  y = +position[1] -120;
	  
	  placeDiv( x, y, pointname );
     
	  
	});
function placeDiv(x_pos, y_pos, pointname ) {

  var d = document.getElementById('head_tag');
  var lbl = document.getElementById('label_text');

  lbl.innerHTML = "";



  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
  d.style.display = "block";

  lbl.innerHTML += pointname;
  

}
})