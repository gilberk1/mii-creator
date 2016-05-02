var url = "https://fake-people.benspoon.com/2d8c35ce/people";

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
          $('#edit').css({display: "block"});
          $('#delete').css({display: "block"});
          $('#information').css({display: "block"});
          $('#new-person').css({display: "none"});
          $('#post-person').css({display: "none"});
          $('#error').css({display: "none"});
          $('#edit-person').css({display: "none"});
          $('#patch-person').css({display: "none"});
          $('#remove-person').css({display: "none"});
          $('#undo').css({display: "none"});
          $('#delete-person').css({display: "none"});

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

              $('#edit').on("click", function() {
                $('#instructions').css({display: "none"});
                $('#edit').css({display: "none"});
                $('#delete').css({display: "none"});
                $('#information').css({display: "none"});
                $('#new-person').css({display: "none"});
                $('#post-person').css({display: "none"});
                $('#error').css({display: "none"});
                $('#edit-person').css({display: "block"});
                $('#patch-person').css({display: "block"});
                $('#remove-person').css({display: "none"});
                $('#undo').css({display: "none"});
                $('#delete-person').css({display: "none"});

                $('input[name=edit-picture]').filter("[value='" + res.picture + "']").attr('checked', true);
                $('#edit-name').val(res.name);
                $('#edit-age').val(res.age);
                $('#edit-eyeColor').val(res.eyeColor);
                $('#edit-gender').val(res.gender);
                $('#edit-email').val(res.email);
                $('#edit-phone').val(res.phone);
                $('#edit-address').val(address);
                $('#edit-city').val(city);
                $('#edit-state').val(state);
                $('#edit-zipCode').val(zip);

                $('#patch-person').on("click", function() {
                  var person = {};

                  person.picture = $('input[name=edit-picture]:checked').val();
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
                  $.ajax({
                    url: url + "/" + personId,
                    success: function(res) {
                      $.ajax({
                        method: "PATCH",
                        url: url + "/" + res.id,
                        data: person,
                        success: function (res) {
                          location.reload();
                        }
                      });
                    }
                  });
                });
              });
              $('#delete').on("click", function() {
                $('#instructions').css({display: "none"});
                $('#edit').css({display: "none"});
                $('#delete').css({display: "none"});
                $('#information').css({display: "none"});
                $('#new-person').css({display: "none"});
                $('#post-person').css({display: "none"});
                $('#error').css({display: "none"});
                $('#edit-person').css({display: "none"});
                $('#patch-person').css({display: "none"});
                $('#remove-person').css({display: "block"});
                $('#undo').css({display: "block"});
                $('#delete-person').css({display: "block"});

                $('#undo').on("click", function() {
                  $('#instructions').css({display: "none"});
                  $('#edit').css({display: "block"});
                  $('#delete').css({display: "block"});
                  $('#information').css({display: "block"});
                  $('#new-person').css({display: "none"});
                  $('#post-person').css({display: "none"});
                  $('#error').css({display: "none"});
                  $('#edit-person').css({display: "none"});
                  $('#patch-person').css({display: "none"});
                  $('#remove-person').css({display: "none"});
                  $('#undo').css({display: "none"});
                  $('#delete-person').css({display: "none"});
                });

                $('#delete-person').on("click", function() {
                  $.ajax({
                    method: "DELETE",
                    url: url + "/" + res.id,
                    data: res,
                    success: function (res) {
                      location.reload();
                    }
                  });
                });
              });
            }
          });
  		});
    }
  });
  $('#create-new').on("click", function() {
    $('#instructions').css({display: "none"});
    $('#edit').css({display: "none"});
    $('#delete').css({display: "none"});
    $('#information').css({display: "none"});
    $('#new-person').css({display: "block"});
    $('#post-person').css({display: "block"});
    $('#error').css({display: "none"});
    $('#edit-person').css({display: "none"});
    $('#patch-person').css({display: "none"});
  });
  $('#post-person').on("click", function() {
    var person = {};
    
    person.picture = $('input[name=picture]:checked').val();
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
        $('#new-address').val() != "" &&
        $('#new-city').val() != "" &&
        $('#new-state').val() != "" &&
        $('#new-zipCode').val() != "") {

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
});