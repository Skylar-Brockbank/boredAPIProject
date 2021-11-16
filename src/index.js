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

$(document).ready(function() {
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