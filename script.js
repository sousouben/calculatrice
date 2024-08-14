function equilibrerManege() {
  const poidsMax = 180; // Poids maximum par cabine
  const nbManege = 4;
  const poidsManege = [];

  // Récupérer les poids de chaque personne pour chaque cabine
  for (let i = 1; i <= nbManege; i++) {
    let poidsTotal = 0;
    for (let j = 1; j <= 4; j++) {
      let poids =
        parseFloat(document.getElementById(`manege${i}_person${j}`).value) || 0;
      poidsTotal += poids;
    }

    if (poidsTotal > poidsMax) {
      document.getElementById(
        "resultat"
      ).innerHTML = `Attention ! Le poids total pour la cabine ${i} dépasse le poids maximum de ${poidsMax} kg.`;
      document.getElementById("resultat").style.display = "block"; // Affiche le résultat
      return;
    }

    poidsManege.push(poidsTotal);
  }

  // Trouver le poids maximum parmi les cabines
  let poidsMaxManege = Math.max(...poidsManege);

  // Calculer le poids à ajouter pour chaque cabine
  let resultatHTML = "<h2>Résultat:</h2><ul>";
  for (let i = 0; i < nbManege; i++) {
    let poidsAajouter = poidsMaxManege - poidsManege[i];
    let sacs = calculerSacs(poidsAajouter);
    resultatHTML += `<li>BANC ${i + 1} = <strong>${
      poidsManege[i]
    } kg</strong>, manque <strong>${poidsAajouter} kg</strong>, ajoutez <strong>${sacs}</strong> pour équilibrer à <strong>${poidsMaxManege} kg</strong>.</li>`;
  }
  resultatHTML += "</ul>";

  // Afficher les résultats
  document.getElementById("resultat").innerHTML = resultatHTML;
  document.getElementById("resultat").style.display = "block"; // Affiche le résultat
}

// Fonction pour calculer le nombre de sacs de 5kg, 10kg, ou 15kg nécessaires
function calculerSacs(poids) {
  const sacs = { "15kg": 0, "5kg": 0 };

  // Prioriser les sacs de 15kg
  sacs["15kg"] = Math.floor(poids / 15);
  poids %= 15;

  // Enfin les sacs de 5kg
  sacs["5kg"] = Math.floor(poids / 5);

  // Construire la chaîne de texte
  let resultatSacs = [];
  for (let [cle, valeur] of Object.entries(sacs)) {
    if (valeur > 0) {
      resultatSacs.push(`${valeur} sac(s) de ${cle}`);
    }
  }

  return resultatSacs.join(", ");
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
