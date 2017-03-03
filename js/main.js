var url = "http://fake-people.benspoon.com/2d8c35ce/people";

/* Function shows and hides the navigation in the hamburger menu */

function navigation() {
  if(!($('#navigation')).hasClass('show')) {
    $('#navigation').addClass('show');
    $('#navigation').removeClass('hide');
    $('#full-body').css({display: "none"});
  }
  else {
    $('#navigation').removeClass('show');
    $('#navigation').addClass('hide');
    $('#full-body').css({display: "block"});
  }
}

/* Function shows the Create New Mii Form to fill out */

function createNew() {
  $('#navigation').removeClass('show');
  $('#navigation').addClass('hide');
  $('#full-body').css({display: "block"});
}

/* Function selects one avatar for the Mii */

function avatarOptions() {
  $(this).next("input[type=radio]").attr("checked", true);
}

/* Function shows all the people listed in the API */

function showPeople(person) {
  $('#people').append("<li class = 'person-name'><img class = 'person-picture' src = '" + person.picture + "'/><span data-id = "+ person.id + " class = person-id>" + person.name + "</span></li>");
}

/* Function reloads page after POST, PATCH, DELETE */

function success(res) {
  location.reload();
}

/* Function shows all information about that person */

function showInfo() {
  $('.visible').css('display', 'none');
  $('.showInfo').css('display', 'block');
}

/* Function shows Create Mii information */

function createPerson() {
  $('.visible').css('display', 'none');
  $('.createPerson').css('display', 'block');
}

/* Function shows Edit Mii information */

function editInfo() {
  $('.visible').css('display', 'none');
  $('.editPerson').css('display', 'block');
}

/* Function confirms DELETE */

function confirmDelete() {
  $('.visible').css('display', 'none');
  $('.deletePerson').css('display', 'block');
}

/* Runs when document loads */

$(document).ready(function() {
  $('#hamburger').on("click", navigation);
  $('#create-new').on("click", createNew);
  $("#options").on("click", avatarOptions);
  
  $.ajax({
  	url: url,
    success: function(res) {

      /* List each person from the database */

  		res.forEach(showPeople);

      /* Make each entry clickable */

      $('.person-id').on("click", function() {
          personId = $(this).data('id');
                    
          $('#navigation').removeClass('show');
          $('#navigation').addClass('hide');
          $('#full-body').css('display', 'block');
          
          showInfo();

          /* GET information from the database */

          $.ajax({
            url: url + "/" + personId,
            success: function(res) {
              var address = (res.address).split(', ')[0];
              var city = (res.address).split(', ')[1];
              var state = (res.address).split(', ')[2];
              var zip = (res.address).split(', ')[3];

              $('#mii').attr("src", res.picture);
              $('#name').text(res.name);
              $('#age').text(res.age);
              $('#eyeColor').text(res.eyeColor + " eyes");
              $('#gender').text(res.gender);
              $('#email').text(res.email);
              $('#phone').text(res.phone);
              $('#address').html(address + "<br/>" + city + ", " + state + ", " + zip);

              /* Click Edit Button */

              $('#edit').on("click", function() {
                
                editInfo();

                /* Fill in all values from database into edit form */

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
                  
                  /* PATCH person in database */

                  $.ajax({
                    url: url + "/" + personId,
                    success: function(res) {
                      $.ajax({
                        method: "PATCH",
                        url: url + "/" + res.id,
                        data: person,
                        success: success
                      });
                    }
                  });
                });
              });

              $('#delete').on("click", function() {
                confirmDelete();
                $('#undo').on("click", showInfo);
                $('#delete-person').on("click", function() {

                  /* DELETE person from database */

                  $.ajax({
                    method: "DELETE",
                    url: url + "/" + res.id,
                    data: res,
                    success: success
                  });
                });
              });
            }
          });
  		});
    }
  });
  $('#create-new').on("click", createPerson);
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

        /* POST person into database */

        $.ajax({
        method: "POST",
        url: url,
        data: person,
        success: success
      });
    }
    else {

      /* Show Error Message if form is incomplete */

      $('#error').css('display', 'block');
    }
  });
});