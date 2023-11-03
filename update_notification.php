<?php
// update_notification.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assurez-vous que vous avez correctement inclus votre fichier de connexion à la base de données
    include 'Gestion/connect_db.php';

    // Récupérez l'ID de la notification à mettre à jour depuis les données POST
    $notificationId = $_POST['id'];

    // Effectuez la mise à jour de l'état de la notification dans la base de données
    $sql = "UPDATE demande_materiel SET etat_demande_mat = '0' WHERE id_demande_mat = '$notificationId'";

    if ($conn->query($sql) === TRUE) {
        // La mise à jour a réussi
        http_response_code(200); // OK
    } else {
        // La mise à jour a échoué
        http_response_code(500); // Erreur serveur
    }

    // Fermez la connexion à la base de données
    $conn->close();
} else {
    // Si ce n'est pas une requête POST, renvoyez une erreur 400 Bad Request
    http_response_code(400);
}
?>