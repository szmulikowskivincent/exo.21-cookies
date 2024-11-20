// Fonction pour afficher un toast de réussite
const showToast = (message) => {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  toastMessage.textContent = message; // Affiche le message du toast
  toast.classList.add("show");

  // Cache le toast après 3 secondes
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// Fonction pour afficher les cookies enregistrés dans le localStorage
const afficherCookies = () => {
  const cookieList = document.getElementById("cookie-list");
  cookieList.innerHTML = ""; // Vide la liste avant de la remplir

  // Récupère et affiche les cookies sauvegardés
  const cookies = JSON.parse(localStorage.getItem("cookies")) || [];
  cookies.forEach((cookie, index) => {
    const cookieElement = document.createElement("div");
    cookieElement.textContent = `Cookie ${index + 1}: Nom: ${
      cookie.nom
    }, Date de validation: ${cookie.date}`;
    cookieList.appendChild(cookieElement);
  });
};

// Fonction pour sauvegarder un cookie dans le localStorage
const sauvegarderCookie = (nom, dateValidation) => {
  const cookies = JSON.parse(localStorage.getItem("cookies")) || [];
  cookies.push({
    nom: nom,
    date: dateValidation,
  });
  localStorage.setItem("cookies", JSON.stringify(cookies));
  afficherCookies();
  showToast(`Cookie "${nom}" enregistré avec succès !`); // Affiche le toast après la sauvegarde
};

// Ajoute un événement au formulaire pour accepter le cookie
document.getElementById("cookie-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupère les valeurs des champs du formulaire
  const nomCookie = document.getElementById("données du cookie").value;
  const dateValidation = document.getElementById(
    "entrez date de validation du cookie"
  ).value;

  // Crée le cookie avec les valeurs entrées
  document.cookie = `${nomCookie}=${dateValidation}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;

  // Sauvegarde dans le localStorage
  sauvegarderCookie(nomCookie, dateValidation);

  // Vide les champs du formulaire après la soumission
  document.getElementById("cookie-form").reset();
});

// Affiche les cookies au chargement de la page
window.onload = afficherCookies;
