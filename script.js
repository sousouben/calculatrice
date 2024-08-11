function equilibrerManege() {
  const poidsMax = 130; // Poids maximum par manège
  const nbManege = 4;
  const poidsManege = [];

  // Récupérer les poids de chaque personne pour chaque manège
  for (let i = 1; i <= nbManege; i++) {
    let poidsTotal = 0;
    for (let j = 1; j <= 3; j++) {
      let poids =
        parseFloat(document.getElementById(`manege${i}_person${j}`).value) || 0;
      poidsTotal += poids;
    }

    if (poidsTotal > poidsMax) {
      document.getElementById(
        "resultat"
      ).innerHTML = `Attention ! Le poids total pour le manège ${i} dépasse le poids maximum de ${poidsMax} kg.`;
      return;
    }

    poidsManege.push(poidsTotal);
  }

  // Trouver le poids maximum parmi les manèges
  let poidsMaxManege = Math.max(...poidsManege);

  // Calculer le poids à ajouter pour chaque manège
  let resultatHTML = "<h2>Résultat:</h2><ul>";
  for (let i = 0; i < nbManege; i++) {
    let poidsAajouter = poidsMaxManege - poidsManege[i];
    resultatHTML += `<li>Pour le manège ${
      i + 1
    }, ajoutez ${poidsAajouter} kg pour atteindre un poids de ${poidsMaxManege} kg.</li>`;
  }
  resultatHTML += "</ul>";

  // Afficher les résultats
  document.getElementById("resultat").innerHTML = resultatHTML;
}

function resetForm() {
  // Réinitialiser tous les champs de saisie
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => (input.value = ""));

  // Effacer le résultat affiché
  document.getElementById("resultat").innerHTML = "";
}
