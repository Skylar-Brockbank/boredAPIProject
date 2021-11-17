import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ActivitySystem from './activitySystem';

function dollarify(number){
  let dollars="";
  if(number === 0){
    return "Free!!!!!!";
  }else{
    for(let i = 0; i< Math.ceil((number*10)/2);i++){
      dollars = dollars + "$";
    }
    return dollars;
  }
}
function getElements(response) {
  if (response.activity) {
    $('#activity').text("Activity: " + response.activity);
    $('#price').text("Price: " + dollarify(response.price));
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $("#rando").click(function(){
    $('#activity').text('');
    $('#price').text('');
    $('.showErrors').text('');
    ActivitySystem.getRandomActivity().then(function(response) {
      getElements(response);
    });
  });
  $('#b').click(function() {
    $('#activity').text('');
    $('#price').text('');
    $('.showErrors').text('');
    let type = $('#type').val();
    let participants = $('#participants').val();
    let broke = $('#cost').is(":checked");

    let promise = ActivitySystem.getActivity(type,participants,broke);
    promise.then(function(response) {
      const body = JSON.parse(response);
      if (body.activity){
        $('#activity').text("Activity: " + body.activity);
        $('#price').text("Price: " + dollarify(body.price));
      }
      else{$('.showErrors').text(`There was an error processing your request: ${body.error}`);}
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      
    });
  });
});