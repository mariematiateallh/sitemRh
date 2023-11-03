$(document).ready(function () {
  login();
  /* autre_materiel */
  delete_autre_materiel();
  get_data_autre_materiel();
  /* demande */
  add_demande_materiel();
  /* stock */
  add_stock();
  add_autre_stock();
  view_stock();
  view_materiel_stock();
  /* User */
  view_user();
  add_user();
  delete_user();
  update_user();
  get_data_user();
  disable_account();
  activate_account();
  //  test_table();
  /* Profil */
  get_data_profil();
  update_profil();
  /* Materiel */
  add_materiel();
  view_materiel();
  get_data_materiel();
  update_materiel();
  delete_materiel();
  /* Projet */
  view_project();
  add_project();
  delete_project();
  get_data_etat();
  update_etat_project();
  get_data_project();
  update_project();
    /* Tache */
  view_tache();
  add_tache();
  delete_tache();
  get_data_etatTache();
  update_etat_tache();
  get_data_tache();
  update_tache();
  // Client
  view_client();
  add_client();
  delete_client();
  get_data_client();
  update_client();
  //Agence
  view_agence();
  add_agence();
  get_data_agence();
  update_agence();
  delete_agence();

});

/*close modal*/

$(document).on("click", "#btn-close", function () {
  location.reload(true);
});

/*validate phone*/

function validatePhoneNumber(input_str) {
  var re = /^\(?\d{2}\)?[- ]?(\d{3})[- ]?(\d{3})$/;

  return re.test(input_str);
}

/*validate CIN*/

function validateCIN_Number(input_str) {
  var re = /^\(?(\d{8})$/;

  return re.test(input_str);
}

/*validate email*/

function IsValidEmail(email) {
  //Check minimum valid length of an Email.
  if (email.length <= 2) {
    return false;
  }
  //If whether email has @ character.
  if (email.indexOf("@") == -1) {
    return false;
  }
  var parts = email.split("@");
  var dot = parts[1].indexOf(".");
  var dotSplits = parts[1].split(".");
  var dotCount = dotSplits.length - 1;

  //Check whether Dot is present, and that too minimum 1 character after @.
  if (dot == -1 || dot < 2 || dotCount > 2) {
    return false;
  }
  //Check whether Dot is not the last character and dots are not repeated.
  for (var i = 0; i < dotSplits.length; i++) {
    if (dotSplits[i].length == 0) {
      return false;
    }
  }

  return true;
}

function isValidDate(date) {
  var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  // Check if the date string format is a match
  var matchArray = date.match(datePattern);
  if (matchArray == null) {
    return false;
  }
  // Remove any non digit characters
  var dateString = date.replace(/\D/g, "");
  // Parse integer values from the date string
  var year = parseInt(dateString.substr(0, 4));
  var month = parseInt(dateString.substr(4, 2));
  var day = parseInt(dateString.substr(6, 2));

  // Define the number of days per month
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // Leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    daysInMonth[1] = 29;
  }
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    return false;
  }
  return true;
}

function showpasswordupdate(idpassword) {
  var idcheck = idpassword.id;
  var passwordDiv = $("#" + idcheck + "")
    .parent()
    .parent()
    .next()
    .attr("id");
  $("#" + idcheck + "").change(function () {
    if (this.checked) {
      $("#" + passwordDiv + "").css("display", "block");
    } else {
      $("#" + passwordDiv + "").css("display", "none");
    }
  });
}

function login() {
  $(document).on("click", "#btn_login", function () {
    var email = $("#email").val();
    var password = $("#password").val();
    $("#email_error").html("");
    $("#password_error").html("");
    $("#messageError").html("");

    if (email == "") {
      $("#email_error").html("Saisir votre email s'il vous plait.");
      $("#email").focus();
    } else if (!IsValidEmail(email)) {
      $("#email_error").html("Adresse email invalide");
      $("#email").focus();
    } else if (password == "") {
      $("#password_error").html("Saisir votre mot de passe s'il vous plait.");
      $("#password").focus();
    } else {
      $.ajax({
        url: "login_fn.php",
        method: "post",
        data: {
          password: password,
          email: email,
        },
        success: function (data) {
          if (data.includes("success")) {
            location.href = "accueil.php";
          } else {
            $("#messageError").html(data);
          }
        },
      });
    }
  });
}

/*User*/

function view_user() {
  $.ajax({
    url: "view_user.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_user").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}

function add_user() {
  $(document).on("click", "#btn_openModelAddUser", function () {
    document.getElementById('sh1').style.display = 'none';
    $("#insert-user_form").trigger("reset");
    var msgErrorLabel = $("#insert-user_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#modal_addUser").modal("show");
    $(document).on("click", "#btn_ajout_user", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });
      var id_role_user = $("#id_role_user").attr("IdRoleusUr");
      if (id_role_user == "2") {
        var role = "0";
      }
      else {
        var role = $("#role").val();
      }
      var nom = $("#nom").val();
      var prenom = $("#prenom").val();
      var address = $("#address").val();
      var numCIN = $("#numCIN").val();
      var email = $("#email").val();
      var numTel = $("#numTel").val();
      var doc_photoProfile = $("#doc_photoProfile").prop("files")[0];
      var dateNaissance = $("#dateNaissance").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirmPassword").val();

      var specialite = $("#specialite option:selected")
        .map(function () {
          return $(this).val();
        })
        .get();

      if (doc_photoProfile == undefined) {
        doc_photoProfile = "";
      }

      if (specialite == null && role != "1") {
        specialite == "";
      }
      if (role == null) {
        $("#role_error").html("Choisir le role.");
        $("#role").focus();
      } else if (specialite == null && role == "1") {
        $("#specialite_error").html("Choisir la specialité.");
        $("#specialite").focus();
      } else if (nom == "") {
        $("#nom_error").html("Saisir votre nom s'il vous plait.");
        $("#nom").focus();
      } else if (prenom == "") {
        $("#prenom_error").html("Saisir votre prénom s'il vous plait.");
        $("#prenom").focus();
      } else if (email == "") {
        $("#email_error").html("Saisir votre email s'il vous plait.");
        $("#email").focus();
      } else if (!IsValidEmail(email)) {
        $("#email_error").html("Adresse email invalide");
        $("#email").focus();
      } else if (numCIN == "") {
        $("#numCIN_error").html("Saisir votre CIN s'il vous plait.");
        $("#numCIN").focus();
      } else if (!validateCIN_Number(numCIN)) {
        $("#numCIN_error").html("Numéro CIN invalide.");
        $("#numCIN").focus();
      } else if (numTel == "") {
        $("#numTel_error").html("Saisir votre Téléphone s'il vous plait.");
        $("#numTel").focus();
      } else if (!validatePhoneNumber(numTel)) {
        $("#numTel_error").html("Numéro téléphone invalide");
        $("#numTel").focus();
      } else if (address == "") {
        $("#address_error").html("Saisir votre adresse s'il vous plait.");
        $("#address").focus();
      } else if (dateNaissance == "") {
        $("#dateNaissance_error").html(
          "Saisir votre date de Naissance s'il vous plait."
        );
        $("#dateNaissance").focus();
      } else if (password == "") {
        $("#password_error").html("Saisir votre mot de passe s'il vous plait.");
        $("#password").focus();
      } else if (confirmPassword == "" || password != confirmPassword) {
        $("#confirmPassword_error").html(
          "Confirmer votre  Mot de Passe s'il vous plait."
        );
        $("#confirmPassword").focus();
      } else {
        var form_data = new FormData();
        form_data.append("role", role);
        form_data.append("specialite", specialite);
        form_data.append("nom", nom);
        form_data.append("prenom", prenom);
        form_data.append("address", address);
        form_data.append("numCIN", numCIN);
        form_data.append("email", email);
        form_data.append("numTel", numTel);
        form_data.append("doc_photoProfile", doc_photoProfile);
        form_data.append("dateNaissance", dateNaissance);
        form_data.append("password", password);
        $.ajax({
          url: "add_user.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes('text-echec')) {
              $("#modal_addUser").modal("hide");
              $("#adduser_echec").removeClass("text-checked").addClass("text-echec").html(data);
              $("#EchecAddUser").modal("show");
              setTimeout(function () {
                if ($("#EchecAddUser").length > 0) {
                  $("#EchecAddUser").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addUser").modal("hide");
              $("#adduser_success").addClass("text-checked").html(data);
              $("#SuccessAddUser").modal("show");
              $("#adduser_success")
                .removeClass("text-echec")
                .addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddUser").length > 0) {
                  $("#SuccessAddUser").modal("hide");
                  view_user();
                }
              }, 2000);
            }
          },
        });
      }
    });
  });
}


function disable_account() {
  $(document).on("click", "#btn_desactiver_user", function () {
    var user_ID = $(this).attr("data-id2");
    $("#disable_user").modal("show");
    $(document).on("click", "#disableUser", function () {
      $.ajax({
        url: "disable_account.php",
        method: "post",
        data: {
          user_ID: user_ID,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#disable_user").modal("hide");
            $("#disableUser_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecDisableUser").modal("show");
            setTimeout(function () {
              if ($("#EchecDisableUser").length > 0) {
                $("#EchecDisableUser").modal("hide");
              }
            }, 2000);
          } else {
            $("#disable_user").modal("hide");
            $("#disableUser_success").addClass("text-checked").html(data);
            $("#SuccessDisableUser").modal("show");
            $("#disableUser_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDisableUser").length > 0) {
                $("#SuccessDisableUser").modal("hide");
                view_user();
              }
            }, 2000);
          }
        },
      });
    });
  });
}

function activate_account() {
  $(document).on("click", "#btn_activer_user", function () {
    var user_ID = $(this).attr("data-id3");
    $("#activate_user").modal("show");
    $(document).on("click", "#activateUser", function () {
      $.ajax({
        url: "activate_account.php",
        method: "post",
        data: {
          user_ID: user_ID,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#activate_user").modal("hide");
            $("#activateUser_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecActivateUser").modal("show");
            setTimeout(function () {
              if ($("#EchecActivateUser").length > 0) {
                $("#EchecActivateUser").modal("hide");
              }
            }, 2000);
          } else {
            $("#activate_user").modal("hide");
            $("#activateUser_success").addClass("text-checked").html(data);
            $("#SuccessActivateUser").modal("show");
            $("#activateUser_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessActivateUser").length > 0) {
                $("#SuccessActivateUser").modal("hide");
                view_user();
              }
            }, 2000);
          }
        },
      });
    });
  });
}
function view_stock(){
  $.ajax({
    url: "view_stock.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_materiel_stock").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}
function view_materiel_stock() {
  $.ajax({
    url: "view_materiel.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_materiel_stock").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}
function test_table() {
  const liste = document.getElementById('liste_tableau');

  liste.addEventListener('change', function() {
    var selectedValue = liste.value;

    if (selectedValue === 'tabmateriel') {
      view_materiel_stock();
    } else {
      view_stock();
    }

    // Test d'affichage de la sélection dans la console
    console.log('Option sélectionnée :', selectedValue);
  });
}



function delete_user() {
  $(document).on("click", "#btn_supprimer_user", function () {
    var Delete_ID = $(this).attr("data-id1");
    $("#delete_user").modal("show");
    $(document).on("click", "#supprimer_user", function () {
      $.ajax({
        url: "delete_user.php",
        method: "post",
        data: {
          DeleteID: Delete_ID,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#delete_user").modal("hide");
            $("#deleteUser_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecDeleteUser").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteUser").length > 0) {
                $("#EchecDeleteUser").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_user").modal("hide");
            $("#deleteUser_success").addClass("text-checked").html(data);
            $("#SuccessDeleteUser").modal("show");
            $("#deleteUser_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDeleteUser").length > 0) {
                $("#SuccessDeleteUser").modal("hide");
                view_user();
              }
            }, 2000);
          }
        },
      });
    });
    $(document).on("hide.bs.modal", "#delete_user", function () {
      Delete_ID = "";
    });
  });
}

function get_data_user() {
  $(document).on("click", "#btn_modifier_user", function () {
    document.getElementById("sh2").style.display = "none";
    $("#passwordupdate").prop("checked", false);
    $("#passwordchange_form ").css("display", "none");
    $("#update-user_form").trigger("reset");
    var msgErrorLabel = $("#update-user_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var updateID = $(this).attr("data-id");
    $.ajax({
      url: "get_data_user.php",
      method: "post",
      data: {
        update_ID: updateID,
      },
      dataType: "JSON",
      success: function (data) {
        $("#idUser").val(data[0]);
        $("#up_role").val(data[1]);
        var specialite = data[2].split(",");
        $("select[name=up_specialite]").val(specialite);
        $("#up_specialite").selectpicker("refresh");
        $("#up_specialite").val(specialite);
        $("#up_nom").val(data[3]);
        $("#up_prenom").val(data[4]);
        $("#up_email").val(data[5]);
        $("#up_numCIN").val(data[6]);
        $("#up_numTel").val(data[7]);
        $("#up_address").val(data[8]);
        $("#up_dateNaissance").val(data[9]);

        $("#update_user_modal").modal("show");
        if ($("#up_role").val() == "1") {
          document.getElementById("sh2").style.display = "block";
        }
        const id_up_role = document.getElementById("up_role");
        id_up_role.addEventListener("change", handleSelectChange);
        function handleSelectChange(event) {
          const id_role = event.target.value;
          document.getElementById("sh2").style.display = "none";
          if (id_role == "1") {
            document.getElementById('sh2').style.display = 'block';
          } else {
            $("#up_specialite").val("");
          }
        }
      },
    });
  });
}

function update_user() {
  $(document).on("click", "#btn_update_user", function () {
    var msgErrorLabel = $("#update-user_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var up_id_role_user = $("#idUser").attr("UpIdRoleusUr");
    $("#update_user_modal").scrollTop(0);
    var idUser = $("#idUser").val();
    if (id_role_user == "2") {
      var role = "0";
    }
    else {
      var role = $("#up_role").val();
    }
    var nom = $("#up_nom").val();
    var prenom = $("#up_prenom").val();
    var address = $("#up_address").val();
    var numCIN = $("#up_numCIN").val();
    var email = $("#up_email").val();
    var numTel = $("#up_numTel").val();
    var doc_photoProfile = $("#up_doc_photoProfile").prop("files")[0];
    var dateNaissance = $("#up_dateNaissance").val();
    var password = $("#up_password").val();
    var newPassword = $("#newPassword").val();
    var specialite = $("#up_specialite option:selected")
      .map(function () {
        return $(this).val();
      })
      .get();
    if (doc_photoProfile == undefined) {
      doc_photoProfile = "";
    }

    if (specialite == null && role != "1") {
      specialite == "";
    }

    if (role == null) {
      $("#up_role_error").html("Choisir le role.");
      $("#up_role").focus();
    } else if (specialite == null && role == "1") {
      $("#up_specialite_error").html("Choisir la specialité.");
      $("#up_specialite").focus();
    } else if (nom == "") {
      $("#up_nom_error").html("Saisir votre nom s'il vous plait.");
      $("#up_nom").focus();
    } else if (prenom == "") {
      $("#up_prenom_error").html("Saisir votre prénom s'il vous plait.");
      $("#up_prenom").focus();
    } else if (email == "") {
      $("#up_email_error").html("Saisir votre email s'il vous plait.");
      $("#up_email").focus();
    } else if (!IsValidEmail(email)) {
      $("#up_email_error").html("Adresse email invalide");
      $("#up_email").focus();
    } else if (numCIN == "") {
      $("#up_numCIN_error").html("Saisir votre CIN s'il vous plait.");
      $("#up_numCIN").focus();
    } else if (!validateCIN_Number(numCIN)) {
      $("#up_numCIN_error").html("Numéro CIN invalide.");
      $("#up_numCIN").focus();
    } else if (numTel == "") {
      $("#up_numTel_error").html("Saisir votre Téléphone s'il vous plait.");
      $("#up_numTel").focus();
    } else if (!validatePhoneNumber(numTel)) {
      $("#up_numTel_error").html("Numéro téléphone invalide");
      $("#up_numTel").focus();
    } else if (address == "") {
      $("#up_address_error").html("Saisir votre adresse s'il vous plait.");
      $("#up_address").focus();
    } else if (dateNaissance == "") {
      $("#up_dateNaissance_error").html(
        "Saisir votre date de Naissance s'il vous plait."
      );
      $("#up_dateNaissance").focus();
    } else if (
      document.getElementById("passwordupdate").checked == true &&
      password == ""
    ) {
      $("#up_password_error").html(
        "Saisir votre mot de passe actuel s'il vous plait."
      );
      $("#up_password").focus();
    } else if (
      document.getElementById("passwordupdate").checked == true &&
      newPassword == ""
    ) {
      $("#newPassword_error").html(
        "Saisir le nouveau mot de passe s'il vous plait."
      );
      $("#newPassword").focus();
    } else {
      var form_data = new FormData();
      form_data.append("idUser", idUser);
      form_data.append("role", role);
      form_data.append("specialite", specialite);
      form_data.append("nom", nom);
      form_data.append("prenom", prenom);
      form_data.append("address", address);
      form_data.append("numCIN", numCIN);
      form_data.append("email", email);
      form_data.append("numTel", numTel);
      form_data.append("doc_photoProfile", doc_photoProfile);
      form_data.append("dateNaissance", dateNaissance);
      form_data.append("password", password);
      form_data.append("newPassword", newPassword);

      $.ajax({
        url: "update_user.php",
        method: "post",
        processData: false,
        contentType: false,
        data: form_data,
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#update_user_modal").modal("hide");
            $("#UpdateUser_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecUpdateUser").modal("show");
            setTimeout(function () {
              if ($("#EchecUpdateUser").length > 0) {
                $("#EchecUpdateUser").modal("hide");
              }
            }, 2000);
          } else {
            $("#update_user_modal").modal("hide");
            $("#UpdateUser_success").addClass("text-checked").html(data);
            $("#SuccessUpdateUser").modal("show");
            $("#UpdateUser_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessUpdateUser").length > 0) {
                $("#SuccessUpdateUser").modal("hide");
                view_user();
              }
            }, 2000);
          }
        },
      });
    }
  });
}

/* profil*/

function get_data_profil() {
  $.ajax({
    url: "get_data_profil.php",
    method: "post",
    dataType: "JSON",
    success: function (data) {
      $("#userid").html(data[0]);
      $("#username").html(data[2] + " " + data[1]);
      $("#nameuser").html(data[2] + " " + data[1]);
      $("#useremail").html(data[5]);
      var userDateNaiss = data[7].split("-");
      var reversedUserDateNaiss =
        userDateNaiss[2] + "-" + userDateNaiss[1] + "-" + userDateNaiss[0];
      $("#userdataenaissance").html(reversedUserDateNaiss);
      $("#usertel").html(data[4]);
      $("#useradresse").html(data[10]);
      $("#userpaasword").val(data[6]);
      $("#userspecialité").html(data[12]);
      if (data[11] != "") {
        $("#profilphoto").attr("src", "uploads/user/" + data[11]);
      }
    },
  });
  $(document).on("click", "#up_profil_btn", function () {
    $("#passwordupdate").prop("checked", false);
    $("#passwordchange_form ").css("display", "none");
    var msgErrorLabel = $("#up-profilForm").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $.ajax({
      url: "get_data_profil.php",
      method: "post",
      dataType: "JSON",
      success: function (data) {
        $("#up_idProfil").val(data[0]);
        $("#up_profilNom").val(data[1]);
        $("#up_profilPrenom").val(data[2]);
        $("#up_profilDateNaissance").val(data[7]);
        $("#up_profilNumCin").val(data[3]);
        $("#up_profilEmail").val(data[5]);
        $("#up_profilPhone").val(data[4]);
        $("#up_profilAdresse").val(data[10]);
        var specialites = data[9].split(",");
        $("select[name=up_specialitename]").val(specialites);
        $("#up_profilspecialite").selectpicker("refresh");
        $("#up_profil_modal").modal("show");
      },
    });
  });
}
function update_profil() {
  $(document).on("click", "#btn_update_profil_user", function () {
    var msgErrorLabel = $("#up-profilForm").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#up_profil_modal").scrollTop(0);
    var id_role = $("#up_idProfil").attr("id_role");
    var up_idprofil = $("#up_idProfil").val();
    var up_profilNom = $("#up_profilNom").val();
    var up_profilPrenom = $("#up_profilPrenom").val();
    var up_profilDateNaissance = $("#up_profilDateNaissance").val();
    var up_profilPhone = $("#up_profilPhone").val();
    var up_profilAdresse = $("#up_profilAdresse").val();
    var up_profilPhoto = $("#up_profilPhoto").prop("files")[0];
    var selectedspecialite = $("#up_profilspecialite option:selected")
      .map(function () {
        return $(this).val();
      })
      .get();
    up_profilactuelpassword = "";
    up_profilnouveaupassword = "";
    var isChecked = $("#passwordupdate").prop("checked");
    if (isChecked) {
      var up_profilactuelpassword = $("#actuelpasswordprofil").val();
      var up_profilnouveaupassword = $("#newpasswordprofil").val();
    }
    switch (true) {
      case up_profilNom == "":
        $(" #UpNomMessageErreur").html("Saisir votre nom s'il vous plaît");
        $(" #up_profilNom").focus();
        break;
      case up_profilPrenom == "":
        $(" #UpPrenomMessageErreur").html(
          "Saisir votre prénom s'il vous plaît"
        );
        $(" #up_profilPrenom").focus();
        break;
      case up_profilDateNaissance == "":
        $(" #UpNaissanceMessageErreur").html(
          "Saisir votre date de naissance s'il vous plaît"
        );
        $(" #up_profilDateNaissance").focus();
        break;
      case up_profilPhone == "":
        $(" #UpPhoneMessageErreur").html(
          "Saisir votre numéro de téléphone s'il vous plaît"
        );
        $(" #up_profilPhone").focus();
        break;
      case !validatePhoneNumber(up_profilPhone):
        $(" #UpPhoneMessageErreur").html("Numéro téléphone invalide");
        $(" #up_profilPhone").focus();
        break;
      case up_profilAdresse == "":
        $(" #UpAdresseMessageErreur").html(
          "Saisir votre adresse s'il vous plaît"
        );
        $(" #up_profilAdresse").focus();
        break;
      case   id_role=="1" && selectedspecialite == "":
        $(" #upSpecialiteError").html("Choisir une spécialité s'il vous plaît");
        $(" #up_profilspecialite").focus();
        break;
      case isChecked && up_profilactuelpassword == "":
        $(" #UpPassMessageErreur").html(
          "Saisir votre mot de passe actuel s'il vous plaît"
        );
        $(" #actuelpasswordprofil").focus();
        break;
      case isChecked && up_profilnouveaupassword == "":
        $(" #UpNewPassMessageErreur").html(
          "Saisir votre nouveau mot de passe s'il vous plaît"
        );
        $(" #newpasswordprofil").focus();
        break;
      default:
        var form_data = new FormData();
        form_data.append("up_idprofil", up_idprofil);
        form_data.append("up_profilNom", up_profilNom);
        form_data.append("up_profilPrenom", up_profilPrenom);
        form_data.append("up_profilDateNaissance", up_profilDateNaissance);
        form_data.append("up_profilPhone", up_profilPhone);
        form_data.append("up_profilAdresse", up_profilAdresse);
        form_data.append("up_profilPhoto", up_profilPhoto);
        form_data.append("selectedspecialite", selectedspecialite);
        form_data.append("up_profilactuelpassword", up_profilactuelpassword);
        form_data.append("up_profilnouveaupassword", up_profilnouveaupassword);
        $.ajax({
          url: "update_profil.php",
          method: "POST",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes("text-echec-update")) {
              $("#up_profil_modal").modal("hide");
              $("#upprofil_echec")
                .removeClass("text-checked")
                .addClass("text-echec")
                .html(data);
              $("#EchecUpProfil").modal("show");
              setTimeout(function () {
                $("#EchecUpProfil").modal("hide");
                location.reload();
              }, 3000);
            } else if (data.includes("text-echec-password")) {
              $("#UpPassMessageErreur").html(data);
              $(" #actuelpasswordprofil").focus();
            } else if (data.includes("text-echec-photo")) {
              $(" #UpPhotoMessageErreur").html(data);
              $(" #up_profilPhoto").focus();
            } else {
              $("#up_profil_modal").modal("hide");
              $("#upprtofil_success")
                .removeClass("text-echec")
                .addClass("text-checked")
                .html(data);
              $("#SuccessUpProfil").modal("show");
              setTimeout(function () {
                $("#SuccessUpProfil").modal("hide");
                location.reload();
              }, 3000);
            }
          },
        });
    }
  });
}
function add_stock(){
  
  $(document).on("click", "#btn_openModel_stock", function () {
    $("#insert_demande_form").trigger("reset");
    var msgErrorLabel = $("#insert_demande_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#modal_stock").modal("show");
    $(document).on("click", "#adddem_success", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });
    })
})
}
function add_autre_stock(){

  
  $(document).on("click", "#btn_ajout_autrmat", function () {
    var liste = $("#liste_materiel_employee").val();
 
    if (liste=="ajmateriel"){
      
        $("#modal_addMateriel_stock").modal("show");
        $(document).on("click", "#btn_ajout_materiel_stock", function () {
          var msgErrorLabel = $("#insert_materiel_form_'( )'k").find("p");
          msgErrorLabel.each(function () {
            $(this).html('');
          });
          
          var nom = $("#nom_materiel").val();
         var prix = $("#prix_materiel").val();
        var dateAchat = $("#date_acha_materiel").val();
      var facture = $("#facture_materiel").prop("files")[0];
      var Emplyeeid = $("#liste_materiel_employee_materiel_stock").val();
      
      switch (true) {
        case nom == "":
          $(" #nom_materiel_error").html(
            "Saisir le nom de materiel s'il vous plaît"
          );
          $(" #nom_materiel").focus();
          break;
        case prix == "":
          $(" #prix_materiel_materiel").html("Saisir le prix s'il vous plaît");
          $(" #prix_materiel").focus();
          break;
        case dateAchat == "":
          $(" #date_acha_materiel_error").html(
            "Saisir la date d'achat s'il vous plaît"
          );
          $(" #date_acha_materiel").focus();
          break;
        case Emplyeeid == null:
          $(" #liste_materiel_employee_stock_error").html(
            "Choisir un employée s'il vous plaît"
          );
          $(" #liste_materiel_employee_materiel_stock").focus();
          break;
          default:
            var form_data = new FormData();
            form_data.append("nom", nom);
            form_data.append("prix", prix);
            form_data.append("dateAchat", dateAchat);
            form_data.append("facture", facture);
            form_data.append("EmplyeeID", Emplyeeid);
            
            $.ajax({
              url: "add_materiel.php",
              method: "post",
              processData: false,
              contentType: false,
              data: form_data,
              success: function (data) {
                if (data.includes("text-echec")) {
                  $("#modal_addMateriel").modal("hide");
                  $("#addMateriel_echec")
                    .removeClass("text-checked")
                    .addClass("text-echec")
                    .html(data);
                  $("#EchecAddMateriel").modal("show");
                  setTimeout(function () {
                    if ($("#EchecAddMateriel").length > 0) {
                      $("#EchecAddMateriel").modal("hide");
                    }
                  }, 2000);
                } else {
                  $("#modal_addMateriel").modal("hide");
                  $("#modal_addMateriel_stock").modal("hide");
                  $("#modal_stock").modal("hide");
                  $("#addMateriel_success").addClass("text-checked").html(data);
                  $("#SuccessAddMateriel").modal("show");
                  $("#addMateriel_success")
                    .removeClass("text-echec")
                    .addClass("text-checked");
                  setTimeout(function () {
                    if ($("#SuccessAddMateriel").length > 0) {
                      $("#SuccessAddMateriel").modal("hide");
                      view_materiel_stock();
                    }
                  }, 2000);
                }
              },
            });
        }})
        
      
      
   
    
    
    }
    else if (liste=="ajautremateriel"){
      $("#modal_addautMateriel").modal("show");
        $(document).on("click", "#btn_ajout_autrmateriel", function (){
          var msgErrorLabel = $("#insert-produit_form").find("p");
          msgErrorLabel.each(function () {
            $(this).html('');
          });
          var nom_produit = $("#nom_produit").val();
          var qt_produit = $("#qt_produit").val();
          var prix_produit = $("#prix_produit").val();
          var date_produit = $("#date_produit").val();
          var piece = $("#piece").prop("files")[0];
          switch (true) {
            case nom_produit == "":
              $(" #nom_produit_error").html(
                "Saisir le nom de produit s'il vous plaît"
              );
              $(" #nom_produit").focus();
              break;
            case qt_produit == "":
              $(" #qt_produit_err").html("Saisir le Quantite s'il vous plaît");
              $(" #qt_produit").focus();
              break;
            case prix_produit == "":
                $(" #prix_prod_error").html(
                  "Saisir le prix s'il vous plaît"
                );
                $(" #prix_produit").focus();
                break;
            case date_produit == "":
              $(" #date_produit_error").html("Saisir la date d'achat s'il vous plaît");
              $(" #date_produit").focus();
              break;
            default:
                var form_data = new FormData();
                form_data.append("nom_produit", nom_produit);
                form_data.append("qt_produit", qt_produit);
                form_data.append("prix_produit", prix_produit);
                form_data.append("date_produit", date_produit);
                form_data.append("piece", piece);
                
                $.ajax({
                  url: "add_stock.php",
                  method: "post",
                  processData: false,
                  contentType: false,
                  data: form_data,
                  success: function (data) {
                    if (data.includes("text-echec")) {
                      $("#modal_addMateriel").modal("hide");
                      $("#addMateriel_echec")
                        .removeClass("text-checked")
                        .addClass("text-echec")
                        .html(data);
                      $("#EchecAddMateriel").modal("show");
                      setTimeout(function () {
                        if ($("#EchecAddMateriel").length > 0) {
                          $("#EchecAddMateriel").modal("hide");
                        }
                      }, 2000);
                    } else {
                      
                      $("#modal_addMateriel").modal("hide");
                      $("#modal_addautMateriel").modal("hide");
                      $("#modal_stock").modal("hide");
                      $("#addMateriel_success").addClass("text-checked").html(data);
                      $("#SuccessAddMateriel").modal("show");
                      $("#addMateriel_success")
                        .removeClass("text-echec")
                        .addClass("text-checked");
                      setTimeout(function () {
                        if ($("#SuccessAddMateriel").length > 0) {
                          $("#SuccessAddMateriel").modal("hide");
                          
                        }
                      }, 2000);
                    }
                  },
                });
                view_stock();
            }

        })

    }
   
    
})
}


function add_demande_materiel() {
  $(document).on("click", "#btn_openModel_demand", function () {
    $("#insert_demande_form").trigger("reset");
    var msgErrorLabel = $("#insert_demande_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#modal_adddem").modal("show");
    $(document).on("click", "#btn_ajout_demande", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });
      var nom_mat = $("#demande").val();
      var description = $("#description").val();
      var choix_radio = $("input[name='choix']:checked").val();
      if (nom_mat == null) {
        $("#mat_error").html("Choisir le nom de materiel.");
        $("#nom_mat").focus();
      }else if (description == "") {
        $("#description_error").html("Saisir la description du projet s'il vous plait.");
        $("#description").focus();
      }else if (choix_radio =="") {
        $("#choix_error").html("!!!!!!");
        $("#choix_radio").focus();
      }else {
        var form_data = new FormData();
        form_data.append("nom_mat", nom_mat);
        form_data.append("description", description);
        form_data.append("choix_radio", choix_radio);
        $.ajax({
          url: "add_demande.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes("text-echec")) {
              $("#modal_addMateriel").modal("hide");
              $("#addMateriel_echec")
                .removeClass("text-checked")
                .addClass("text-echec")
                .html(data);
              $("#EchecAddMateriel").modal("show");
              setTimeout(function () {
                if ($("#EchecAddMateriel").length > 0) {
                  $("#EchecAddMateriel").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addMateriel").modal("hide");
              $("#modal_adddem").modal("hide");
              $("#addMateriel_success").addClass("text-checked").html(data);
              $("#SuccessAddMateriel").modal("show");
              $("#addMateriel_success")
                .removeClass("text-echec")
                .addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddMateriel").length > 0) {
                  $("#SuccessAddMateriel").modal("hide");
                  
                  view_materiel();
                  notification();

                }
              }, 2000);
            }
          },
        });
      }
     });
    })

     }


    
/*Materiel*/

function add_materiel() {
  $(document).on("click", "#btn_InsertMateriel", function () {
    $("#insert_materiel_form").trigger("reset");
    var msgErrorLabel = $("#insert_materiel_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html("");
    });
    $("#modal_addMateriel").modal("show");
    $(document).on("click", "#btn_ajout_materiel", function () {
      msgErrorLabel.each(function () {
        $(this).html("");
      });
      var nom = $("#nom_materiel").val();
      var prix = $("#prix_materiel").val();
      var dateAchat = $("#date_acha_materiel").val();
      var facture = $("#facture_materiel").prop("files")[0];
      var EmplyeeID = $("#liste_materiel_employee").val();
      switch (true) {
        case nom == "":
          $(" #nom_materiel_error").html(
            "Saisir le nom de materiel s'il vous plaît"
          );
          $(" #nom_materiel").focus();
          break;
        case prix == "":
          $(" #prix_materiel_materiel").html("Saisir le prix s'il vous plaît");
          $(" #prix_materiel").focus();
          break;
        case dateAchat == "":
          $(" #date_acha_materiel_error").html(
            "Saisir la date d'achat s'il vous plaît"
          );
          $(" #date_acha_materiel").focus();
          break;
        case EmplyeeID == "":
          $(" #liste_materiel_employee_error").html(
            "Choisir un employée s'il vous plaît"
          );
          $(" #liste_materiel_employee").focus();
          break;
        default:
          var form_data = new FormData();
          form_data.append("nom", nom);
          form_data.append("prix", prix);
          form_data.append("dateAchat", dateAchat);
          form_data.append("facture", facture);
          form_data.append("EmplyeeID", EmplyeeID);
          $.ajax({
            url: "add_materiel.php",
            method: "post",
            processData: false,
            contentType: false,
            data: form_data,
            success: function (data) {
              if (data.includes("text-echec")) {
                $("#modal_addMateriel").modal("hide");
                $("#addMateriel_echec")
                  .removeClass("text-checked")
                  .addClass("text-echec")
                  .html(data);
                $("#EchecAddMateriel").modal("show");
                setTimeout(function () {
                  if ($("#EchecAddMateriel").length > 0) {
                    $("#EchecAddMateriel").modal("hide");
                  }
                }, 2000);
              } else {
                $("#modal_addMateriel").modal("hide");
                $("#addMateriel_success").addClass("text-checked").html(data);
                $("#SuccessAddMateriel").modal("show");
                $("#addMateriel_success")
                  .removeClass("text-echec")
                  .addClass("text-checked");
                setTimeout(function () {
                  if ($("#SuccessAddMateriel").length > 0) {
                    $("#SuccessAddMateriel").modal("hide");
                    view_materiel();
                  }
                }, 2000);
              }
            },
          });
      }
    });
  });
}


function view_materiel() {
  $.ajax({
    url: "view_materiel.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          
          $("#liste_materiel").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}

function get_data_materiel() {
  $(document).on("click", "#btn_modifier_materiel", function () {
    var msgErrorlabel = $("#update_materiel_form").find("p");
    msgErrorlabel.each(function () {
      $(this).html("");
    });
    var IDMateriel = $(this).attr("data-id");
    $.ajax({
      url: "get_data_materiel.php",
      method: "post",
      dataType: "JSON",
      data: { IDMateriel: IDMateriel },
      success: function (data) {
        $("#up_idMateriel").val(data[0]);
        $("#up_nom_materiel").val(data[1]);
        $("#up_prix_materiel").val(data[2]);
        $("#up_date_acha_materiel").val(data[3]);
        $("#up_liste_materiel_employee").find('option[value=' + data[4] + ']').prop('selected', true);
        $("#up_liste_materiel_employee").prop('disabled', true);
        $("#up_liste_materiel_employee").selectpicker("refresh");
        $("#modal_updateMateriel").modal("show");
      },
    });
  });
}
function get_data_autre_materiel() {
  $(document).on("click", "#btn_modifier_autrmateriel", function () {
    var msgErrorlabel = $("#update_produit_form").find("p");
    msgErrorlabel.each(function () {
      $(this).html("");
    });
    var IDproduit = $(this).attr("data-id");
    $.ajax({
      url: "get_data_produit.php",
      method: "post",
      dataType: "JSON",
      data: { IDproduit: IDproduit },
      success: function (data) {
        $("#up_idproduit").val(data[0]);
        $("#up_nom_produit").val(data[1]);
        $("#up_qt_produit").val(data[2]);
        $("#up_prix_produit").val(data[3]);
        $("#up_date_produit").val(data[4]);
      },
    });
  });
}

function update_materiel() {
  $(document).on("click", "#btn_up_materiel", function () {
    var msgErrorlabel = $("#update_materiel_form").find("p");
    msgErrorlabel.each(function () {
      $(this).html("");
    });
    $("#modal_updateMateriel").scrollTop(0);
    var up_idMateriel = $("#up_idMateriel").val();
    var up_nom_materiel = $("#up_nom_materiel").val();
    var up_prix_materiel = $("#up_prix_materiel").val();
    var up_date_acha_materiel = $("#up_date_acha_materiel").val();
    var up_facture_materiel = $("#up_facture_materiel").prop("files")[0];
    switch (true) {
      case up_nom_materiel == "":
        $(" #up_nom_materiel_error").html("Saisir le nom de materiel s'il vous plaît");
        $(" #up_nom_materiel").focus();
        break;
      case up_prix_materiel == "":
        $(" #up_prix_materiel_error").html(
          "Saisir le prix s'il vous plaît"
        );
        $(" #up_prix_materiel").focus();
        break;
      case up_date_acha_materiel == "":
        $(" #up_date_acha_materiel_error").html(
          "Saisir la date d'achat s'il vous plaît"
        );
        $(" #up_date_acha_materiel").focus();
      default:
        var form_data = new FormData();
        form_data.append("up_idMateriel", up_idMateriel);
        form_data.append("up_nom_materiel", up_nom_materiel);
        form_data.append("up_prix_materiel", up_prix_materiel);
        form_data.append("up_date_acha_materiel", up_date_acha_materiel);
        form_data.append("up_facture_materiel", up_facture_materiel);
        $.ajax({
          url: "update_materiel.php",
          method: "POST",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes("text-checked")) {
              $("#modal_updateMateriel").modal("hide");
              $("#UpdateMateriel_success")
                .removeClass("text-echec")
                .addClass("text-checked")
                .html(data);
              $("#SuccessUpdateMateriel").modal("show");


              setTimeout(function () {
                $("#SuccessUpdateMateriel").modal("hide");
                view_materiel_stock();
              }, 3000);
            } else {
              $("#modal_updateMateriel").modal("hide");
              $("#UpdateMateriel_echec")
                .removeClass("text-echec")
                .addClass("text-checked")
                .html(data);
              $("#EchecUpdateMateriel").modal("show");
              setTimeout(function () {
                $("#EchecUpdateMateriel").modal("hide");
              }, 3000);
            }
          },
        });
    }
  });
}

function delete_materiel() {
  $(document).on("click", "#btn_supprimer_materiel", function () {
    var id_materiel = $(this).attr("data-id1");
    $("#delete_materiel").modal("show");
    $(document).on("click", "#supprimer_materiel", function () {
      $.ajax({
        url: "delete_materiel.php",
        method: "post",
        data: {
          id_materiel: id_materiel,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#delete_materiel").modal("hide");
            $("#deletemateriel_echec")
              .addClass("text-echec")
              .html(data);
            $("#EchecDeleteMateriel").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteMateriel").length > 0) {
                $("#EchecDeleteMateriel").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_materiel").modal("hide");
            $("#deleteMateriel_success").addClass("text-checked").html(data);
            $("#SuccessDeleteMateriel").modal("show");
            setTimeout(function () {
              if ($("#SuccessDeleteMateriel").length > 0) {
                $("#SuccessDeleteMateriel").modal("hide");
                view_materiel_stock();
              }
            }, 2000);
          }
        },
      });
    });
    $(document).on("hide.bs.modal", "#delete_user", function () {
      Delete_ID = "";
    });
  });
}
function delete_autre_materiel() {
  $(document).on("click", "#btn_supprimer_produit", function () {
    var id_produit = $(this).attr("data-id1");
    $("#delete_autre_materiel").modal("show");
    $(document).on("click", "#supprimer_autre_materiel", function () {
      
      $.ajax({
        url: "delete_produit.php",
        method: "post",
        data: {
          id_produit: id_produit,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#delete_autre_materiel").modal("hide");
            $("#deletemateriel_echec")
              .addClass("text-echec")
              .html(data);
            $("#EchecDeleteMateriel").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteMateriel").length > 0) {
                $("#EchecDeleteMateriel").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_autre_materiel").modal("hide");
            $("#deleteautreMateriel_success").addClass("text-checked").html(data);
            $("#SuccessDeleteautreMateriel").modal("show");
            setTimeout(function () {
              if ($("#SuccessDeleteautreMateriel").length > 0) {
                $("#SuccessDeleteautreMateriel").modal("hide");
                view_stock();
              }
            }, 2000);
          }
        },
      });
    });
    $(document).on("hide.bs.modal", "#delete_user", function () {
      Delete_ID = "";
    });
  });
}

/*projets*/

function view_project() {
  $.ajax({
    url: "view_project.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_project").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}

function delete_project() {
  $(document).on("click", "#btn_supprimer_projet", function () {
    var Delete_ID = $(this).attr("data-id1");
    $("#delete_project").modal("show");
    $(document).on("click", "#supprimer_projet", function () {
      $.ajax({
        url: "delete_project.php",
        method: "post",
        data: {
          DeleteID: Delete_ID
        },
        success: function (data) {
          if (data.includes('text-echec')) {
            $("#delete_project").modal("hide");
            $("#deleteProject_echec").removeClass("text-checked").addClass("text-echec").html(data);
            $("#EchecDeleteProject").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteProject").length > 0) {
                $("#EchecDeleteProject").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_project").modal("hide");
            $("#deleteProject_success").addClass("text-checked").html(data);
            $("#SuccessDeleteProject").modal("show");
            $("#deleteProject_success").removeClass("text-echec").addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDeleteProject").length > 0) {
                $("#SuccessDeleteProject").modal("hide");
                view_project();
              }
            }, 2000);
          }
        },
      });
    });
    $(document).on('hide.bs.modal', '#delete_project', function () {
      Delete_ID = "";
    });
  });
}

function add_project() {
  $(document).on("click", "#btn_openModel_addProject", function () {
    $("#insert_projet_form").trigger("reset");
    var msgErrorLabel = $("#insert_projet_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#modal_addProject").modal("show");
    $(document).on("click", "#btn_ajout_project", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });

      var nom_projet = $("#nom_projet").val();
      var client = $("#client").val();
      var chef_projet = $("#chef_projet").val();
      var description = $("#description").val();
      var dateDebutprojet = $("#dateDebutprojet").val();
      var dateFinprojet = $("#dateFinprojet").val();

      var doc_projet = $("#doc_projet").prop("files")[0];
      if (doc_projet == undefined) {
        doc_projet = "";
      }
      confirmationProjet = "0";

      let checkBox = document.querySelectorAll("input[type=checkbox]");
      checkBox.forEach((v) => {
        if (v.checked) {
          confirmationProjet = "1";
        }
      });

      if (nom_projet == "") {
        $("#nom_projet_error").html("Saisir le nom du projet s'il vous plait.");
        $("#nom_projet").focus();
      } else if (client == null) {
        $("#client_error").html("Choisir le client.");
        $("#client").focus();
      } else if (chef_projet == null) {
        $("#chef_projet_error").html("Choisir le chef de projet.");
        $("#chef_projet").focus();
      } else if (description == "") {
        $("#description_error").html("Saisir la description du projet s'il vous plait.");
        $("#description").focus();
      } else if (dateDebutprojet == "") {
        $("#dateDebutprojet_error").html("Saisir la date de début.");
        $("#dateDebutprojet").focus();
      } else if (dateFinprojet == "") {
        $("#dateFinprojet_error").html("Saisir la date de fin.");
        $("#dateFinprojet").focus();
      } else if (dateFinprojet < dateDebutprojet) {
        $("#dateFinprojet_error").html("Vérifier la date de fin.");
        $("#dateFinprojet").focus();
      } else {
        var form_data = new FormData();
        form_data.append("nom_projet", nom_projet);
        form_data.append("client", client);
        form_data.append("chef_projet", chef_projet);
        form_data.append("description", description);
        form_data.append("dateDebutprojet", dateDebutprojet);
        form_data.append("dateFinprojet", dateFinprojet);
        form_data.append("doc_projet", doc_projet);
        form_data.append("confirmationProjet", confirmationProjet);
        $.ajax({
          url: "add_project.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes('text-echec')) {
              $("#modal_addProject").modal("hide");
              $("#addProject_echec").removeClass("text-checked").addClass("text-echec").html(data);
              $("#EchecAddProject").modal("show");
              setTimeout(function () {
                if ($("#EchecAddProject").length > 0) {
                  $("#EchecAddProject").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addProject").modal("hide");
              $("#addProject_success").addClass("text-checked").html(data);
              $("#SuccessAddProject").modal("show");
              $("#addProject_success").removeClass("text-echec").addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddProject").length > 0) {
                  $("#SuccessAddProject").modal("hide");
                  view_project();
                }
              }, 2000);
            }
          },
        });
      }
    });
  });
}

function get_data_etat() {
  $(document).on("click", "#btn_modifier_Etatprojet", function () {
    var updateID = $(this).attr("data-id2");
    $("#update_etat_form").trigger("reset");
    $.ajax({
      url: "get_data_etat.php",
      method: "post",
      data: {
        update_ID: updateID
      },
      dataType: "JSON",
      success: function (data) {

        $("#up_id_projet_Etat").val(data[0]);
        $("#up_etat_projet").val(data[1]);
        $("#update_etat_projet").modal("show");

      },
    });
  });
}

function update_etat_project() {
  $(document).on("click", "#btn_modifi_etat_projet", function () {
    $("#update_etat_projet").scrollTop(0);
    var id_projet = $("#up_id_projet_Etat").val();
    var etat = $("#up_etat_projet").val();
    $.ajax({
      url: "update_etat_project.php",
      method: "post",
      data: {
        etat: etat,
        id_projet: id_projet,
      },
      success: function (data) {

        if (data.includes('text-echec')) {
          $("#update_etat_projet").modal("hide");
          $("#UpdateEtatProject_echec").removeClass("text-checked").addClass("text-echec").html(data);
          $("#EchecUpdateEtatProject").modal("show");
          setTimeout(function () {
            if ($("#EchecUpdateEtatProject").length > 0) {
              $("#EchecUpdateEtatProject").modal("hide");
            }
          }, 2000);
        } else {
          $("#update_etat_projet").modal("hide");
          $("#UpdateEtatProject_success").addClass("text-checked").html(data);
          $("#SuccessUpdateEtatProject").modal("show");
          $("#UpdateEtatProject_success").removeClass("text-echec").addClass("text-checked");
          setTimeout(function () {
            if ($("#SuccessUpdateEtatProject").length > 0) {
              $("#SuccessUpdateEtatProject").modal("hide");
              view_project();
            }
          }, 2000);
        }
      },
    });
  });
}

function get_data_project() {
  $(document).on("click", "#btn_modifier_projet", function () {
    $("#update_project_form").trigger("reset");
    var msgErrorLabel = $("#update-user_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var updateID = $(this).attr("data-id");
    $.ajax({
      url: "get_data_project.php",
      method: "post",
      data: {
        update_ID: updateID
      },
      dataType: "JSON",
      success: function (data) {
        $("#idProject").val(data[0]);
        $("#up_nom_projet").val(data[1]);
        $("#up_dateDebutprojet").val(data[2]);
        $("#up_dateFinprojet").val(data[3]);
        $("#up_description").val(data[4]);
        var chefProjet = data[5];
        $('select[name=up_chef_projet]').val(chefProjet);
        $('#up_chef_projet').selectpicker('refresh')
        $("#up_chef_projet").val(chefProjet);
        var client = data[6];
        $('select[name=up_client]').val(client);
        $('#up_client').selectpicker('refresh')
        $("#up_client").val(client);
        if (data[7] == '1') {
          document.getElementById("up_confirmationProjet").checked = true;
        }
        $("#update_project_modal").modal("show");
      },
    });
  });

}

function update_project() {
  $(document).on("click", "#btn_updateProject", function () {
    var msgErrorLabel = $("#update_project_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#update_project_modal").scrollTop(0);

    var update_ID = $("#idProject").val();
    var nom_projet = $("#up_nom_projet").val();
    var client = $("#up_client").val();
    var chef_projet = $("#up_chef_projet").val();
    var description = $("#up_description").val();
    var dateDebutprojet = $("#up_dateDebutprojet").val();
    var dateFinprojet = $("#up_dateFinprojet").val();

    var doc_projet = $("#up_doc_projet").prop("files")[0];
    if (doc_projet == undefined) {
      doc_projet = "";
    }
    confirmationProjet = "0";
    if (document.querySelector('#up_confirmationProjet:checked')) {
      confirmationProjet = "1";
    }
    if (nom_projet == "") {
      $("#up_nom_projet_error").html("Saisir le nom de projet s'il vous plait.");
      $("#up_nom_projet").focus();
    } else if (client == null) {
      $("#up_client_error").html("Choisir le client.");
      $("#up_client").focus();
    } else if (chef_projet == null) {
      $("#up_chef_projet_error").html("Choisir le chef de projet.");
      $("#up_chef_projet").focus();
    } else if (description == "") {
      $("#up_description_error").html("Saisir la description de projet s'il vous plait.");
      $("#up_description").focus();
    } else if (dateDebutprojet == "") {
      $("#up_dateDebutprojet_error").html("Saisir la date de début.");
      $("#up_dateDebutprojet").focus();
    } else if (dateFinprojet == "") {
      $("#up_dateFinprojet_error").html("Saisir la date de fin.");
      $("#up_dateFinprojet").focus();
    } else if (dateFinprojet < dateDebutprojet) {
      $("#up_dateFinprojet_error").html("Vérifier la date de fin.");
      $("#up_dateFinprojet").focus();
    } else {
      var form_data = new FormData();
      form_data.append("update_ID", update_ID);
      form_data.append("nom_projet", nom_projet);
      form_data.append("client", client);
      form_data.append("chef_projet", chef_projet);
      form_data.append("description", description);
      form_data.append("dateDebutprojet", dateDebutprojet);
      form_data.append("dateFinprojet", dateFinprojet);
      form_data.append("doc_projet", doc_projet);
      form_data.append("confirmationProjet", confirmationProjet);
      $.ajax({
        url: "update_project.php",
        method: "post",
        processData: false,
        contentType: false,
        data: form_data,
        success: function (data) {
          if (data.includes('text-echec')) {
            $("#update_project_modal").modal("hide");
            $("#UpdateProject_echec").removeClass("text-checked").addClass("text-echec").html(data);
            $("#EchecUpdateProject").modal("show");
            setTimeout(function () {
              if ($("#EchecUpdateProject").length > 0) {
                $("#EchecUpdateProject").modal("hide");
              }
            }, 2000);
          } else {
            $("#update_project_modal").modal("hide");
            $("#UpdateProject_success").addClass("text-checked").html(data);
            $("#SuccessUpdateProject").modal("show");
            $("#UpdateProject_success").removeClass("text-echec").addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessUpdateProject").length > 0) {
                $("#SuccessUpdateProject").modal("hide");
                view_project();
              }
            }, 2000);
          }
        },

      });
    }
  });
}

/*tache*/

function view_tache() {
  var id_project = $("input[name=id_Project]").val();
  $.ajax({
    url: "view_tache.php",
    method: "post",
    data: { id_project: id_project },
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_tache").html(data.html);
        }
      } catch (e) {
      }
    },
  });
}

function add_tache() {
  $(document).on("click", "#btn_openModel_addTache", function () {
    $("#insert_tache_form").trigger("reset");
    var msgErrorLabel = $("#insert_tache_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#modal_addTache").modal("show");
    $(document).on("click", "#btn_ajout_tache", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });

      var id_project = document.querySelector("input[name=id_Project]").value;
      var description = $("#description").val();
      var dateDebutTache = $("#dateDebutTache").val();
      var dateFinTache = $("#dateFinTache").val();
      var employee = $("#employee_affect option:selected").map(function () {
        return $(this).val();
      }).get();
      var doc_tache = $("#doc_tache").prop("files")[0];
      if (doc_tache == undefined) {
        doc_tache = "";
      }
      if (employee == "") {
        $("#employee_affect_error").html("Choisir les employées affectées.");
        $("#employee_affect").focus();
      } else if (description == "") {
        $("#description_error").html("Saisir la description du projet s'il vous plait.");
        $("#description").focus();
      } else if (dateDebutTache == "") {
        $("#dateDebutTache_error").html("Saisir la date de début.");
        $("#dateDebutTache").focus();
      } else if (dateFinTache == "") {
        $("#dateFinTache_error").html("Saisir la date de fin.");
        $("#dateFinTache").focus();
      } else if (dateFinTache < dateDebutTache) {
        $("#dateFinTache_error").html("Vérifier la date de fin.");
        $("#dateFinTache").focus();
      } else {
        var form_data = new FormData();
        form_data.append("id_project", id_project);
        form_data.append("employee", employee);
        form_data.append("description", description);
        form_data.append("dateDebutTache", dateDebutTache);
        form_data.append("dateFinTache", dateFinTache);
        form_data.append("doc_tache", doc_tache);
        $.ajax({
          url: "add_tache.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes('text-echec')) {
              $("#modal_addTache").modal("hide");
              $("#addTache_echec").removeClass("text-checked").addClass("text-echec").html(data);
              $("#EchecAddTache").modal("show");
              setTimeout(function () {
                if ($("#EchecAddTache").length > 0) {
                  $("#EchecAddTache").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addTache").modal("hide");
              $("#addTache_success").addClass("text-checked").html(data);
              $("#SuccessAddTache").modal("show");
              $("#addTache_success").removeClass("text-echec").addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddTache").length > 0) {
                  $("#SuccessAddTache").modal("hide");
                  view_tache();
                }
              }, 2000);
            }
          },
        });
      }
    });
  });
}

function delete_tache() {
  $(document).on("click", "#btn_supprimerTache", function () {
    var Delete_ID = $(this).attr("data-id1");
    $("#delete_tache").modal("show");
    $(document).on("click", "#supprimer_tache", function () {
      $.ajax({
        url: "delete_tache.php",
        method: "post",
        data: {
          DeleteID: Delete_ID
        },
        success: function (data) {
          if (data.includes('text-echec')) {
            $("#delete_tache").modal("hide");
            $("#deleteTache_echec").removeClass("text-checked").addClass("text-echec").html(data);
            $("#EchecDeleteTache").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteTache").length > 0) {
                $("#EchecDeleteTache").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_tache").modal("hide");
            $("#deleteTache_success").addClass("text-checked").html(data);
            $("#SuccessDeleteTache").modal("show");
            $("#deleteTache_success").removeClass("text-echec").addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDeleteTache").length > 0) {
                $("#SuccessDeleteTache").modal("hide");
                view_tache();
              }
            }, 2000);
          }
        },
      });
    });
  });
}

function get_data_etatTache() {
  $(document).on("click", "#btn_modifier_EtatTache", function () {
    var updateID = $(this).attr("data-id2");
    $("#update_etatTache_form").trigger("reset");
    $.ajax({
      url: "get_data_etatTache.php",
      method: "post",
      data: {
        update_ID: updateID
      },
      dataType: "JSON",
      success: function (data) {

        $("#up_id_tache_Etat").val(data[0]);
        $("#up_etat_tache").val(data[1]);
        $("#update_etatTache").modal("show");

      },
    });
  });
}

function update_etat_tache() {
  $(document).on("click", "#btn_modifi_etat_tache", function () {
    $("#update_etatTache").scrollTop(0);
    var id_tache = $("#up_id_tache_Etat").val();
    var etat = $("#up_etat_tache").val();
    $.ajax({
      url: "update_etat_tache.php",
      method: "post",
      data: {
        etat: etat,
        id_tache: id_tache,
      },
      success: function (data) {

        if (data.includes('text-echec')) {
          $("#update_etatTache").modal("hide");
          $("#UpdateEtatTache_echec").removeClass("text-checked").addClass("text-echec").html(data);
          $("#EchecUpdateEtatTache").modal("show");
          setTimeout(function () {
            if ($("#EchecUpdateEtatTache").length > 0) {
              $("#EchecUpdateEtatTache").modal("hide");
            }
          }, 2000);
        } else {
          $("#update_etatTache").modal("hide");
          $("#UpdateEtatTache_success").addClass("text-checked").html(data);
          $("#SuccessUpdateEtatTache").modal("show");
          $("#UpdateEtatTache_success").removeClass("text-echec").addClass("text-checked");
          setTimeout(function () {
            if ($("#SuccessUpdateEtatTache").length > 0) {
              $("#SuccessUpdateEtatTache").modal("hide");
              view_tache();
            }
          }, 2000);
        }
      },
    });
  });
}

function get_data_tache() {
  $(document).on("click", "#btn_modifierTache", function () {
    $("#update_tache_form").trigger("reset");
    var msgErrorLabel = $("#update_tache_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var updateID = $(this).attr("data-id");
    $.ajax({
      url: "get_data_tache.php",
      method: "post",
      data: {
        update_ID: updateID
      },
      dataType: "JSON",
      success: function (data) {
        $("#idTache").val(data[0]);
        $("#up_description").val(data[1]);
        $("#up_dateDebutTache").val(data[2]);
        $("#up_dateFinTache").val(data[3]);
        var users = data[4].split(",");
        $('select[name=up_employee_affect]').val(users);
        $('#up_employee_affect').selectpicker('refresh')
        $("#up_employee_affect").val(users);

        $("#update_tache_modal").modal("show");
      },
    });
  });

}

function update_tache() {
  $(document).on("click", "#btn_updateTache", function () {
    var msgErrorLabel = $("#update_tache_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#update_tache_modal").scrollTop(0);

    var update_ID = $("#idTache").val();
    var description = $("#up_description").val();
    var dateDebutTache = $("#up_dateDebutTache").val();
    var dateFinTache = $("#up_dateFinTache").val();
    var employee = $("#up_employee_affect option:selected").map(function () {
      return $(this).val();
    }).get();
    var doc_tache = $("#up_doc_tache").prop("files")[0];
    if (doc_tache == undefined) {
      doc_tache = "";
    }
    if (employee == "") {
      $("#up_employee_affect_error").html("Choisir les employées affectées.");
      $("#employee_affect").focus();
    } else if (description == "") {
      $("#up_description_error").html("Saisir la description du projet s'il vous plait.");
      $("#description").focus();
    } else if (dateDebutTache == "") {
      $("#up_dateDebutTache_error").html("Saisir la date de début.");
      $("#dateDebutTache").focus();
    } else if (dateFinTache == "") {
      $("#up_dateFinTache_error").html("Saisir la date de fin.");
      $("#dateFinTache").focus();
    } else if (dateFinTache < dateDebutTache) {
      $("#up_dateFinTache_error").html("Vérifier la date de fin.");
      $("#dateFinTache").focus();
    } else {
      var form_data = new FormData();
      form_data.append("update_ID", update_ID);
      form_data.append("employee", employee);
      form_data.append("description", description);
      form_data.append("dateDebutTache", dateDebutTache);
      form_data.append("dateFinTache", dateFinTache);
      form_data.append("doc_tache", doc_tache);
      $.ajax({
        url: "update_tache.php",
        method: "post",
        processData: false,
        contentType: false,
        data: form_data,
        success: function (data) {
          if (data.includes('text-echec')) {
            $("#update_tache_modal").modal("hide");
            $("#UpdateTache_echec").removeClass("text-checked").addClass("text-echec").html(data);
            $("#EchecUpdateTache").modal("show");
            setTimeout(function () {
              if ($("#EchecUpdateTache").length > 0) {
                $("#EchecUpdateTache").modal("hide");
              }
            }, 2000);
          } else {
            $("#update_tache_modal").modal("hide");
            $("#UpdateTache_success").addClass("text-checked").html(data);
            $("#SuccessUpdateTache").modal("show");
            $("#UpdateTache_success").removeClass("text-echec").addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessUpdateTache").length > 0) {
                $("#SuccessUpdateTache").modal("hide");
                view_tache();
              }
            }, 2000);
          }
        },

      });
    }
  });
}



//client
function view_client() {
  $.ajax({
    url: "view_client.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_client").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}



function add_client() {
  $(document).on("click", "#btn_openModelAddclient", function () {
    $("#insert-client_form").trigger("reset");
    $("#modal_addclient").modal("show");
    var msgErrorLabel = $("#insert-client_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $(document).on("click", "#btn_ajout_client", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });

      var nom_entreprise_client = $("#nom_entreprise_client").val();
      var email_client = $("#email_client").val();
      var addresse_client = $("#addresse_client").val();
      var numtel_client = $("#numtel_client").val();
      var commentaire_client = $("#commentaire_client").val();

      if (nom_entreprise_client == "") {
        $("#nom_error").html("Saisir votre nom de votre entreprise s'il vous plait.");
        $("#nom_entreprise_client").focus();
      } else if (email_client == "") {
        $("#email_error").html("Saisir votre email s'il vous plait.");
        $("#email_client").focus();
      } else if (!IsValidEmail(email_client)) {
        $("#email_error").html("Adresse email invalide");
        $("#email_client").focus();
      } else if (addresse_client == "") {
        $("#addresse_client_error").html("Saisir votre adresse s'il vous plait.");
        $("#addresse_client").focus();
      } else if (numtel_client == "") {
        $("#numtel_error").html("Saisir votre Téléphone s'il vous plait.");
        $("#numtel_client").focus();
        
      } else if (!validatePhoneNumber(numtel_client)) {
        $("#numtel_error").html("Numéro téléphone invalide");
        $("#numtel_client").focus();
      } else {
        var form_data = new FormData();
        form_data.append("nom_entreprise_client", nom_entreprise_client);
        form_data.append("email_client", email_client);
        form_data.append("addresse_client", addresse_client);
        form_data.append("numtel_client", numtel_client);
        form_data.append("commentaire_client", commentaire_client);
        $.ajax({
          url: "add_client.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes('text-echec')) {
              $("#modal_addclient").modal("hide");
              $("#addclient_echec").removeClass("text-checked").addClass("text-echec").html(data);
              $("#EchecAddclient").modal("show");
              setTimeout(function () {
                if ($("#EchecAddclient").length > 0) {
                  $("#EchecAddclient").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addclient").modal("hide");
              $("#addclient_success").addClass("text-checked").html(data);
              $("#SuccessAddclient").modal("show");
              $("#addclient_success")
                .removeClass("text-echec")
                .addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddclient").length > 0) {
                  $("#SuccessAddclient").modal("hide");
                  view_client();
                }
              }, 2000);
            }
          },
        })
      }
     
    });
  });
}

function delete_client() {
  $(document).on("click", "#btn_supprimer_client", function () {
    var Delete_ID = $(this).attr("data-id1");
    $("#delete_client").modal("show");
    $(document).on("click", "#supprimer_client", function () {
      $.ajax({
        url: "delete_client.php",
        method: "post",
        data: {
          DeleteID: Delete_ID,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#delete_client").modal("hide");
            $("#deleteclient_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecDeleteclient").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteclient").length > 0) {
                $("#EchecDeleteclient").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_client").modal("hide");
            $("#deleteclient_success").addClass("text-checked").html(data);
            $("#SuccessDeleteclient").modal("show");
            $("#deleteclient_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDeleteclient").length > 0) {
                $("#SuccessDeleteclient").modal("hide");
                view_client();
              }
            }, 2000);
          }
        },
      });
    });
  });
  $(document).on("hide.bs.modal", "#delete_client", function () {
    Delete_ID = "";
  });
}


function get_data_client() {
  $(document).on("click", "#btn_modifier_client", function () {
    $("#update-client_form").trigger("reset");
    var msgErrorLabel = $("#update-client_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var updateID = $(this).attr("data-id");
    $.ajax({
      url: "get_data_client.php",
      method: "post",
      data: {
        update_ID: updateID,
      },
      dataType: "JSON",
      success: function (data) {
        $("#idclient").val(data[0]);
        $("#up_nom_entreprise_client").val(data[1]);
        $("#up_email_client").val(data[2]);
        $("#up_numtel_client").val(data[3]);
        $("#up_addresse_client").val(data[4]);
        $("#up_commentaire_client").val(data[5]);
        $("#update_client_modal").modal("show");
      },
    });
  });
}


function update_client() {
  $(document).on("click", "#btn_update_client", function () {
    var msgErrorLabel = $("#update-client_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#update_client_modal").scrollTop(0);
    var idclient = $("#idclient").val();
    var nom_entreprise_client = $("#up_nom_entreprise_client").val();
    var email_client = $("#up_email_client").val();
    var addresse_client = $("#up_addresse_client").val();
    var numtel_client = $("#up_numtel_client").val();
    var commentaire_client = $("#up_commentaire_client").val();


    if (nom_entreprise_client == "") {
      $("#up_nom_error").html("Saisir votre nom de votre entreprise s'il vous plait.");
      $("#up_nom_entreprise_client").focus();
    } else if (email_client == "") {
      $("#up_email_error").html("Saisir votre email s'il vous plait.");
      $("#up_email_client").focus();
    }
    else if (!IsValidEmail(email_client)) {
      $("#up_email_error").html("Adresse email invalide");
      $("#up_email_client").focus();
    }
    else if (numtel_client == "") {
      $("#up_numtel_error").html("Saisir votre Téléphone s'il vous plait.");
      $("#up_numtel_client").focus();
    } else if (!validatePhoneNumber(numtel_client)) {
      $("#up_numtel_error").html("Numéro téléphone invalide");
      $("#up_numtel_client").focus();
    } else if (addresse_client == "") {
      $("#up_addresse_client_error").html("Saisir votre adresse s'il vous plait.");
      $("#up_addresse_client").focus();
    }
    else {
      var form_data = new FormData();
      form_data.append("idclient", idclient);
      form_data.append("nom_entreprise_client", nom_entreprise_client);
      form_data.append("email_client", email_client);
      form_data.append("addresse_client", addresse_client);
      form_data.append("numtel_client", numtel_client);
      form_data.append("commentaire_client", commentaire_client);
    
    $.ajax({
      url: "update_client.php",
      method: "post",
      processData: false,
      contentType: false,
      data: form_data,
      success: function (data) {
        if (data.includes("text-echec")) {
          $("#update_client_modal").modal("hide");
          $("#Updateclient_echec")
            .removeClass("text-checked")
            .addClass("text-echec")
            .html(data);
          $("#EchecUpdateclient").modal("show");
          setTimeout(function () {
            if ($("#EchecUpdateclient").length > 0) {
              $("#EchecUpdateclient").modal("hide");
            }
          }, 2000);
        } else {
          $("#update_client_modal").modal("hide");
          $("#Updateclient_success").addClass("text-checked").html(data);
          $("#SuccessUpdateclient").modal("show");
          $("#Updateclient_success")
            .removeClass("text-echec")
            .addClass("text-checked");
          setTimeout(function () {
            if ($("#SuccessUpdateclient").length > 0) {
              $("#SuccessUpdateclient").modal("hide");
              view_client();
            }
          }, 2000);
        }
      }
    })
  }
  });
} 


function view_agence() {
  $.ajax({
    url: "view_agence.php",
    method: "post",
    success: function (data) {
      try {
        data = $.parseJSON(data);
        if (data.status == "success") {
          $("#liste_agence").html(data.html);
        }
      } catch (e) {
        console.error("Invalid Response!");
      }
    },
  });
}


function add_agence() {
  $(document).on("click", "#btn_openModelAddagence", function () {
    $("#insert-agence_form").trigger("reset");
    $("#modal_addAgence").modal("show");
    var msgErrorLabel = $("#insert-agence_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $(document).on("click", "#btn_ajout_agence", function () {
      msgErrorLabel.each(function () {
        $(this).html('');
      });
      var nom_agence = $("#nom_agence").val();
      var email_agence = $("#email_agence").val();
      var numtel_agence = $("#numtel_agence").val();
      if (nom_agence == "") {
        $("#nom_error").html("Saisir votre nom de l'agence s'il vous plait.");
        $("#nom_agence").focus();
      } else if (email_agence == "") {
        $("#email_error").html("Saisir votre email s'il vous plait.");
        $("#email_agence").focus();
      } else if (!IsValidEmail(email_agence)) {
        $("#email_error").html("Adresse email invalide");
        $("#email_agence").focus();
      }  else if (numtel_agence == "") {
        $("#numtel_error").html("Saisir votre Téléphone s'il vous plait.");
        $("#numtel_agence").focus();
        
      } else if (!validatePhoneNumber(numtel_agence)) {
        $("#numtel_error").html("Numéro téléphone invalide");
        $("#numtel_agence").focus();
      } else {
        var form_data = new FormData();
        form_data.append("nom_agence", nom_agence);
        form_data.append("email_agence", email_agence);
        form_data.append("numtel_agence", numtel_agence);
      
        $.ajax({
          url: "add_agence.php",
          method: "post",
          processData: false,
          contentType: false,
          data: form_data,
          success: function (data) {
            if (data.includes('text-echec')) {
              $("#modal_addAgence").modal("hide");
              $("#addAgence_echec").removeClass("text-checked").addClass("text-echec").html(data);
              $("#EchecAddAgence").modal("show");
              setTimeout(function () {
                if ($("#EchecAddAgence").length > 0) {
                  $("#EchecAddAgence").modal("hide");
                }
              }, 2000);
            } else {
              $("#modal_addAgence").modal("hide");
              $("#addAgence_success").addClass("text-checked").html(data);
              $("#SuccessAddAgence").modal("show");
              $("#addAgence_success")
                .removeClass("text-echec")
                .addClass("text-checked");
              setTimeout(function () {
                if ($("#SuccessAddAgence").length > 0) {
                  $("#SuccessAddAgence").modal("hide");
                  view_agence();
                  
                }
              }, 2000);
              view_agence();
            }
          },
          
        })
  
      }
     
    });
  });
}

function get_data_agence() {
  $(document).on("click","#btn_modifier_agence", function () {
    $("#update-agence_form").trigger("reset");
    var msgErrorLabel = $("#update-agence_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    var updateID = $(this).attr("data-id");
    $.ajax({
      url: "get_data_agence.php",
      method: "post",
      data: {
        update_ID: updateID,
      },
      dataType: "JSON",
      success: function (data) {
        $("#idAgence").val(data[0]);
        $("#up_nom_agence").val(data[1]);
        $("#up_email_agence").val(data[2]);
        $("#up_numtel_agence").val(data[3]);
        $("#update_agence_modal").modal("show");
      },
    });
  });
}

function update_agence() {
  $(document).on("click", "#btn_modifierAgence", function () {
    var msgErrorLabel = $("#update-agence_form").find("p");
    msgErrorLabel.each(function () {
      $(this).html('');
    });
    $("#update_agence_modal").scrollTop(0);
    var idagence = $("#idAgence").val();
    var nom_agence = $("#up_nom_agence").val();
    var email_agence = $("#up_email_agence").val();
    var numtel_agence = $("#up_numtel_agence").val();


    if (nom_agence == "") {
      $("#up_nom_error").html("Saisir votre nom de votre entreprise s'il vous plait.");
      $("#up_nom_agence").focus();
    } else if (email_agence == "") {
      $("#up_email_error").html("Saisir votre email s'il vous plait.");
      $("#up_email_agence").focus();
    }
    else if (!IsValidEmail(email_agence)) {
      $("#up_email_error").html("Adresse email invalide");
      $("#up_email_agence").focus();
    }
    else if (numtel_agence == "") {
      $("#up_numtel_error").html("Saisir votre Téléphone s'il vous plait.");
      $("#up_numtel_agence").focus();
    } else if (!validatePhoneNumber(numtel_agence)) {
      $("#up_numtel_error").html("Numéro téléphone invalide");
      $("#up_numtel_agence").focus();
    }else {
      var form_data = new FormData();
      form_data.append("idagence", idagence);
      form_data.append("nom_agence", nom_agence);
      form_data.append("email_agence", email_agence);
      form_data.append("numtel_agence", numtel_agence);
    
    $.ajax({
      url: "update_agence.php",
      method: "post",
      processData: false,
      contentType: false,
      data: form_data,
      success: function (data) {
        if (data.includes("text-echec")) {
          $("#update_agence_modal").modal("hide");
          $("#UpdateAgence_echec")
            .removeClass("text-checked")
            .addClass("text-echec")
            .html(data);
          $("#EchecUpdateAgence").modal("show");
          setTimeout(function () {
            if ($("#EchecUpdateAgence").length > 0) {
              $("#EchecUpdateAgence").modal("hide");
            }
          }, 2000);
        } else{
          $("#update_agence_modal").modal("hide");
          $("#UpdateAgence_success").addClass("text-checked").html(data);
          $("#SuccessUpdateAgence").modal("show");
          $("#UpdateAgence_success")
            .removeClass("text-echec")
            .addClass("text-checked");
          setTimeout(function () {
            if ($("#SuccessUpdateAgence").length > 0) {
              $("#SuccessUpdateAgence").modal("hide");
              
            }
          }, 2000);
          view_agence();
        }
      }
    })
  }
  });
} 

function delete_agence() {
  $(document).on("click", "#btn_supprimer_agence", function () {
    var Delete_ID = $(this).attr("data-id1");
    $("#delete_agence").modal("show");
    $(document).on("click", "#supprimer_agence", function () {
      $.ajax({
        url: "delete_agence.php",
        method: "post",
        data: {
          DeleteID: Delete_ID,
        },
        success: function (data) {
          if (data.includes("text-echec")) {
            $("#delete_agence").modal("hide");
            $("#deleteAgence_echec")
              .removeClass("text-checked")
              .addClass("text-echec")
              .html(data);
            $("#EchecDeleteAgence").modal("show");
            setTimeout(function () {
              if ($("#EchecDeleteAgence").length > 0) {
                $("#EchecDeleteAgence").modal("hide");
              }
            }, 2000);
          } else {
            $("#delete_agence").modal("hide");
            $("#deleteAgence_success").addClass("text-checked").html(data);
            $("#SuccessDeleteAgence").modal("show");
            $("#deleteAgence_success")
              .removeClass("text-echec")
              .addClass("text-checked");
            setTimeout(function () {
              if ($("#SuccessDeleteAgence").length > 0) {
                $("#SuccessDeleteAgence").modal("hide");
                view_agence();
              }
            }, 2000);
          }
        },
      });
    });
  });
  $(document).on("hide.bs.modal", "#delete_agence", function () {
    Delete_ID = "";
  });
}

