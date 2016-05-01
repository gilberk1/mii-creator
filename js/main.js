var url = "https://fake-people.benspoon.com/2d8c35ce/people";
var id;

$(document).ready(function() {
  $.ajax({
  	url: url,
    success: function(res) {
  		res.forEach(function(person){
        $('#people').append("<li class = 'person-name'><span data-id = "+ person.id + " class = person-id>" + person.name + "</span></li>");
      });
      $('.person-id').on("click", function(){
          personId = $(this).data('id');
          $('#instructions').css({display: "none"});
          $('#information').css({display: "block"});
          $('#new-person').css({display: "none"});

          $.ajax({
            url: url + "/" + personId,
            success: function(res) {
              var address = (res.address).split(', ')[0];
              var city = (res.address).split(', ')[1];
              var state = (res.address).split(', ')[2];
              var zip = (res.address).split(', ')[3];

              $('#mii').attr("src", res.picture);
              $('#name').text("Name: " + res.name);
              $('#age').text("Age: " + res.age);
              $('#eyeColor').text("Eye Color: " + res.eyeColor);
              $('#gender').text("Gender: " + res.gender);
              $('#email').text("Email: " + res.email);
              $('#phone').text("Phone: " + res.phone);
              $('#address').html("Address: <br/>" + address + "<br/>" + city + ", " + state + ", " + zip);
            }
          });
  		});
    }
  });
  $('#create-new').on("click", function() {
    $('#instructions').css({display: "none"});
    $('#information').css({display: "none"});
    $('#new-person').css({display: "block"});
    $('#post-person').css({display: "block"});
  });
  $('#post-person').on("click", function() {
      var person = {};

      person.name = $('#new-name').val();
      person.age = $('#new-age').val();
      person.eyeColor = $('#new-eyeColor').val();
      person.gender = $('#new-gender').val();
      person.email = $('#new-email').val();
      person.phone = $('#new-phone').val();
      person.address = $('#new-address').val() + ", "
                        + $('#new-city').val() + ", "
                        + $('#new-state').val() + ", "
                        + $('#new-zipCode').val();

      if(person.name != "" &&
          person.age != "" &&
          person.eyeColor != "" &&
          person.gender != "" &&
          person.email != "" &&
          person.phone != "" &&
          person.address != "") {

          $.ajax({
          method: "POST",
          url: url,
          data: person,
          success: function (res) {
            location.reload();
          }
        });
      }
      else {
        $('#error').css({display: "block"});
      }
  });
  $('#patch-person').on("click", function() {
      var person = {};

      person.name = $('#edit-name').val();
      person.age = $('#edit-age').val();
      person.eyeColor = $('#edit-eyeColor').val();
      person.gender = $('#edit-gender').val();
      person.email = $('#edit-email').val();
      person.phone = $('#edit-phone').val();
      person.address = $('#edit-address').val() + ", "
                        + $('#edit-city').val() + ", "
                        + $('#edit-state').val() + ", "
                        + $('#edit-zipCode').val();

      document.getElementById('edit-name').value = '';
      document.getElementById('edit-age').value = '';
      document.getElementById('edit-eyeColor').value = '';
      document.getElementById('edit-gender').value = '';
      document.getElementById('edit-email').value = '';
      document.getElementById('edit-phone').value = '';
      document.getElementById('edit-address').value = '';
      document.getElementById('edit-city').value = '';
      document.getElementById('edit-state').value = '';
      document.getElementById('edit-zipCode').value = '';

      $.ajax({
        url: url,
        success: function(res) {
          var personId;
          res.forEach(function(possible){
            if(possible.name == person.name) {
              personId = possible.id
            }
          });
          $.ajax({
            url: url + "/" + personId,
            success: function(res) {
              $.ajax({
                method: "PATCH",
                url: url + "/" + res.id,
                data: person,
                success: function (res) {
                }
              });
            }
          });
        }
      });
  });
  $('#delete-person').on("click", function() {
      var person = {};

      person.name = $('#delete-name').val();

      $.ajax({
        url: url,
        success: function(res) {
          var personId;
          res.forEach(function(possible){
            if(possible.name == person.name) {
              personId = possible.id
            }
          });
          $.ajax({
            url: url + "/" + personId,
            success: function(res) {
              $.ajax({
                method: "DELETE",
                url: url + "/" + res.id,
                data: person,
                success: function (res) {
                }
              });
            }
          });
        }
      })
  });
});
