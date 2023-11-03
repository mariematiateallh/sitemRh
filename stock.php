<?php
include 'Gestion/header.php'
?>
<style>
  #fiche_1row {
  grid-template-columns: repeat(2, auto) !important;
  gap:0px
  }
</style>
<div class="page-wrapper">
  <div class="page-content">
    <div class="row">
      <h3 class="mb-4" style="color:#05DD9A;"><i class="fa fa-angle-right"></i> Stock</h3>
      <div class="row mt">
        <div class="col-md-12">
          <div class="content-panel">
              
             <button type="button" title="Ajouter demande" class="btn btn-success btn-xs" id="btn_openModel_stock" ><i class="fa fa-plus-circle"></i></button> <br>
             <div class="form-group">
              <br>
                               
                                <label class="col-md-12 p-0">selectionner votre choix<span class="text-danger"></span></label>
                                <div class="col-md-12 p-0">
                                <select class="selectpicker form-control" id="liste_tableau" name="liste_tableau"  aria-label="select">
                                   <option selected="selected" value="tabmateriel">table materiel</option>
                                   <option value="tabprd_bureau">Produit Bureautique</option>
                              </select>                
                                </div>
             <!-- choix stock Modal -->
            <div class="modal fade bd-example-modal-lg" id="modal_stock"  tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Quel choix souhaitez-vous ajouter ?</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="insert_stock_form" autocomplete="off" class="form-horizontal form-material">                
                       
                          <div id="fiche_1row">
                           
                            <div class="form-group">
                                <label class="col-md-12 p-0">selectionner votre choix<span class="text-danger"></span></label>
                                <div class="col-md-12 p-0">
                                <select class="selectpicker form-control" id="liste_materiel_employee" name="liste_materiel_employee"  aria-label="select">
                                <option selected="selected" value="" disabled>Selectionner votre choix</option>
                                   <option value="ajmateriel">ajout materiel</option>
                                   <option value="ajautremateriel">ajout Produit Bureautique</option>
                              </select>                
                                </div>
                            </div>
                        </div>                          
                        
                        
                      </form>
                    </div>
                    <div class="modal-body">
                      <div style="float: right;">
                        <button class=" btn btn-success" id="btn_ajout_autrmat" name="btn_ajout_autrmat">suivant</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end add Project Model -->
                  <!-- Add materiel Modal -->
            <div class="modal fade bd-example-modal-lg" id="modal_addMateriel_stock"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ajout Materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="insert_materiel_form_stock" autocomplete="off" class="form-horizontal form-material">
                        <div id="fiche_1row">
                          <div class="form-group">
                            <label class="col-md-12 p-0">Nom materiel&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="text" class="form-control" style="margin-bottom:8px" name="nom_materiel" id="nom_materiel" >
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="nom_materiel" id="nom_materiel_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Prix (DT)&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="prix_materiel" id="prix_materiel" placeholder="40"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="prix_materiel" id="prix_materiel_materiel"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Date achat&nbsp;<span
                            class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="date"  style="margin-bottom:8px" class="form-control" id="date_acha_materiel" name="date_acha_materiel">
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="date_acha_materiel" id="date_acha_materiel_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Facture</label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input style=" width: 311px;" type="file" id="facture_materiel" name="facture_materiel" class="form-control">
                            </div>
                          </div>
                          </div>
                          <div class="form-group mb-4">
                                        <label class="col-md-12 p-0">Employée<span
                                                class="text-danger">*</span></label>
                                <?php
                                 $query = "SELECT * FROM user";
                                 $result = mysqli_query($conn, $query);
                                ?>
                             <div style="width: 310px;" class="col-md-12 p-0" >
                              <select class="selectpicker form-control" id="liste_materiel_employee_materiel_stock" name="liste_materiel_employee_stock"  aria-label="select">
                                <option selected="selected" value="" disabled>Selectionner un employée</option>
                                <?php
                                    if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                    echo '<option value="' . $row['id_user'] . '">' . $row['prenom_user'] . ' ' . $row['nom_user'] . ' </option>';
                                    }
                                    }
                                ?>
                              </select>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="liste_materiel_employee" id="liste_materiel_employee_stock_error"> </p>

                             </div>
                            </div>
                      </form>
                    </div>
                    <div class="modal-body">
                      <div style="float: right;">
                        <button class=" btn btn-success" id="btn_ajout_materiel_stock" name="btn_ajout_materiel_stock">Ajouter</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end add materiel Model -->
            <!-- Add  autre materiel Modal -->
              <div class="modal fade bd-example-modal-lg" id="modal_addautMateriel"  tabindex="-1" role="dialog"aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ajout Produit Bureautique</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="insert-produit_form" autocomplete="off" class="form-horizontal form-material">
                        <div id="fiche_1row">
                          <div class="form-group">
                            <label class="col-md-12 p-0">Nom_produit&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="text" class="form-control" style="margin-bottom:8px" name="nom_produit" id="nom_produit" >
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="nom_produit" id="nom_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">quantite_produit&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="qt_produit" id="qt_produit" placeholder="1"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="qt_produit" id="qt_produit_err"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">prix (DT)&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="prix_produit" id="prix_produit" placeholder="40"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="prix_produit" id="prix_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Date achat&nbsp;<span
                            class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="date"  style="margin-bottom:8px" class="form-control" id="date_produit" name="date_produit">
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="date_produit" id="date_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">piece_joint_produit</label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input style=" width: 311px;" type="file" id="piece" name="piece" class="form-control">
                            </div>
                          </div>
                          </div>
                          
                      </form>
                    </div>
                    <div class="modal-body">
                      <div style="float: right;">
                        <button class=" btn btn-success" id="btn_ajout_autrmateriel" name="btn_ajout_autrmateriel">Ajouter77</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end add autre materiel Model -->
                <!-- Model alert add demande succès -->
                <div class="modal fade" id="SuccessAdddemande" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Demande Envoyer</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circlechecked">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#05DD9A; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="adddem_success"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert add autre  demande succès -->

              <!-- Model alert add materiel succès -->
              <div class="modal fade" id="SuccessAddMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ajout Utilisateur</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circlechecked">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#05DD9A; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="addMateriel_success"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert add materiel succès -->

              <!-- Model alert add materiel echec -->
              <div class="modal fade" id="EchecAddMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ajout Utilisateur</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circleerror">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#FF0000; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="addMateriel_echec"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert add materiel echec -->

                <!-- delete materiel model -->
                <div class="modal fade" id="delete_materiel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Utilisateur</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Voulez-vous supprimer le materiel ?</p>
                      <div class="modal-body">
                        <div style="float: right;">
                          <button class="btn btn-success" id="supprimer_materiel">Supprimer</button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end delet materiel modal -->
              
              <!-- delete autre  materiel model -->
                <div class="modal fade" id="delete_autre_materiel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Utilisateur</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Voulez-vous supprimer le produit ?</p>
                      <div class="modal-body">
                        <div style="float: right;">
                          <button class="btn btn-success" id="supprimer_autre_materiel">Supprimer</button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end delet autre materiel modal -->
                       <!-- Model alert delete autre materiel succès -->
                       <div class="modal fade" id="SuccessDeleteautreMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Supprimer produit</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circlechecked">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#05DD9A; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="deleteautreMateriel_success"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert delete materiel succès -->

              <!-- Model alert delete materiel succès -->
              <div class="modal fade" id="SuccessDeleteMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Supprimer materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circlechecked">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#05DD9A; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="deleteMateriel_success"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert delete materiel succès -->
              

              <!-- Model alert delete materiel echec -->
              <div class="modal fade" id="EchecDeleteMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Supprimer materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circleerror">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#FF0000; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="deleteMateriel_echec"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert delete materiel echec -->
                   <!-- Model alert delete materiel echec -->
              <div class="modal fade" id="EchecDeleteMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Supprimer materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circleerror">
                        <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#FF0000; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="deleteMateriel_echec"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert delete materiel echec -->

              <!-- update materiel Modal -->
              <div class="modal fade bd-example-modal-lg" id="modal_updateMateriel"  tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modifier Materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="update_materiel_form" autocomplete="off" class="form-horizontal form-material">
                        <div hidden>
                              <input type="text" id="up_idMateriel" class="form-control">
                        </div>
                        <div id="fiche_1row">
                          <div class="form-group">
                            <label class="col-md-12 p-0">Nom materiel&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="text" class="form-control" style="margin-bottom:8px" name="up_nom_materiel" id="up_nom_materiel" >
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_nom_materiel" id="up_nom_materiel_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Prix (DT)&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="up_prix_materiel" id="up_prix_materiel" placeholder="40"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_prix_materiel" id="up_prix_materiel_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Date achat&nbsp;<span
                            class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="date"  style="margin-bottom:8px" class="form-control" id="up_date_acha_materiel" name="up_date_acha_materiel">
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_date_acha_materiel" id="up_date_acha_materiel_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Facture</label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input style=" width: 311px;" type="file" id="up_facture_materiel" name="up_facture_materiel" class="form-control">
                            </div>
                          </div>
                          </div>
                          <div class="form-group mb-4">
                                        <label class="col-md-12 p-0">Employée<span
                                                class="text-danger">*</span></label>
                                <?php
$query = "SELECT * FROM user";
$result = mysqli_query($conn, $query);
?>
                                        <div style="width: 310px;" class="col-md-12 p-0" >
                                        <select class="selectpicker form-control" id="up_liste_materiel_employee" name="up_liste_materiel_employee"  aria-label="select" >
                                <?php
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<option value="' . $row['id_user'] . '">' . $row['prenom_user'] . ' ' . $row['nom_user'] . ' </option>';
    }
}
?>
                                        </select>
                                        </div>
                                        <p style=" color: #D8000C;" class="error msgError mt-2" for="up_liste_materiel_employee" id="up_liste_materiel_employee_error"> </p>
                                    </div>
                      </form>
                    </div>
                    <div class="modal-body">
                      <div style="float: right;">
                        <button class=" btn btn-success" id="btn_up_materiel" name="btn_up_materiel">Ajouter</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end update materiel Model -->

              <!-- Model alert update materiel succès -->
              <div class="modal fade" id="SuccessUpdateMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modifier Materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circlechecked">
                      <i class="fas fa-check"></i>
                      </div>
                      <div style="color:#05DD9A; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="UpdateMateriel_success"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert update materiel succès -->

              <!-- Model alert update materiel echec -->
              <div class="modal fade" id="EchecUpdateMateriel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modifier Materiel</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-echec-succes">
                      <div class="circleerror">
                      <i class="fa fa-times"></i>
                      </div>
                      <div style="color:#FF0000; font-size:20px; margin-top:109px; margin-bottom:10px;">
                        <center id="UpdateMateriel_echec"></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Model alert update materiel echec -->
                    
              
              <!-- Add  update autre materiel Modal -->
                    <div class="modal fade bd-example-modal-lg" id="update_addautMateriel"  tabindex="-1" role="dialog"aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modifier Produit Bureautique</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="update_produit_form" autocomplete="off" class="form-horizontal form-material">
                        <div id="fiche_1row">
                          <div class="form-group">
                            <label class="col-md-12 p-0">Nom_produit&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="text" class="form-control" style="margin-bottom:8px" name="up_nom_produit" id="up_nom_produit" >
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_nom_produit" id="up_nom_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">quantite_produit&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="up_qt_produit" id="up_qt_produit" placeholder="1"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_qt_produit" id="up_qt_produit_err"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">prix (DT)&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="number" style="margin-bottom:8px" class="form-control" name="up_prix_produit" id="up_prix_produit" placeholder="40"/>
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_prix_produit" id="up_prix_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">Date achat&nbsp;<span
                            class="text-danger">*</span></label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input type="date"  style="margin-bottom:8px" class="form-control" id="up_date_produit" name="up_date_produit">
                              <p style=" color: #D8000C;" class="error msgError mt-2" for="up_date_produit" id="up_date_produit_error"> </p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-12 p-0">piece_joint_produit</label>
                            <div class="col-md-12 p-0" style="width:310px">
                              <input style=" width: 311px;" type="file" id="up_piece" name="up_piece" class="form-control">
                            </div>
                          </div>
                          </div>
                          
                      </form>
                    </div>
                    <div class="modal-body">
                      <div style="float: right;">
                        <button class=" btn btn-success" id="btn_modifier_autrmateriel" name="btn_modifier_autrmateriel">Modifier</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end update autre materiel Model -->
              

              <hr>
              <div class="table-responsive-xxl" id="liste_materiel_stock"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
include 'Gestion/footer.php'
?>