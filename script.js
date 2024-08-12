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
      document.getElementById("resultat").style.display = "block"; // Affiche le résultat
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
    }, ajoutez <strong>${poidsAajouter}</strong> kg pour équilibrer à ${poidsMaxManege} kg.</li>`;
  }
  resultatHTML += "</ul>";

  // Afficher les résultats
  document.getElementById("resultat").innerHTML = resultatHTML;
  document.getElementById("resultat").style.display = "block"; // Affiche le résultat
}

function resetForm() {
  // Réinitialiser tous les champs de saisie
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => (input.value = ""));

  // Effacer le résultat affiché
  document.getElementById("resultat").innerHTML = "";
  document.getElementById("resultat").style.display = "none"; // Cache le résultat
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Empêche l'affichage de la bannière d'installation native
  e.preventDefault();
  deferredPrompt = e;

  // Affiche ton bouton personnalisé pour l'installation
  const installButton = document.getElementById("installButton");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    // Affiche la boîte de dialogue d'installation
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
