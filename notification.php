<?php
// Notifications statiques (vous pouvez remplacer ces valeurs par les notifications réelles que vous souhaitez afficher)
include 'Gestion/connect_db.php';


$sql = "SELECT * FROM demande_materiel WHERE etat_demande_mat = '1'";
$result = $conn->query($sql);
$notifications = array(); // Tableau pour stocker les notifications

while ($row = $result->fetch_assoc()) {
    // Convertir la valeur de 'urgent_demande_mat' en "oui" ou "non" en fonction de sa valeur
    $urgentDemandeMat = ($row['urgent_demande_mat'] == 1) ? "oui" : "non";

    $notification = array(
        'id' => $row['id_demande_mat'],
        'nom_demande_mat' => $row['nom_demande_mat'],
        'justification_demande_mat' => $row['justification_demande_mat'],
        'urgent_demande_mat' => $urgentDemandeMat // Remplacer la valeur par "oui" ou "non"
    );

    // Ajouter la notification au tableau $notifications
    $notifications[] = $notification;
}

// Renvoyer les notifications sous forme de réponse JSON
header('Content-Type: application/json');
echo json_encode(array('notifications' => $notifications));
?>


