// Setting a cookie
document.cookie =
  "username=JohnDoe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
// Deleting a cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie =
  "username=JohnDoe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/; Secure";
document.cookie =
  "username=JohnDoe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/; SameSite=Lax";

// Getting a cookie using an arrow function
const getCookie = (name) => {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1); // Return cookie value
    }
  }
  return null;
};

let username = getCookie("username");
console.log(username); // Outputs: JohnDoe

// Fonction pour afficher les cookies enregistrés dans le localStorage avec une fonction fléchée
const afficherCookies = () => {
  const cookieList = document.getElementById("cookie-list");
  cookieList.innerHTML = ""; // Vide la liste avant de la remplir

  // Récupère et affiche les cookies sauvegardés
  const cookies = JSON.parse(localStorage.getItem("cookies")) || [];
  cookies.forEach((cookie, index) => {
    const cookieElement = document.createElement("div");
    cookieElement.textContent = `Cookie ${index + 1}: ${cookie.nom}, ${
      cookie.date
    }`;
    cookieList.appendChild(cookieElement);
  });
};

// Fonction pour sauvegarder un cookie dans le localStorage avec une fonction fléchée
const sauvegarderCookie = () => {
  const cookies = JSON.parse(localStorage.getItem("cookies")) || [];
  cookies.push({
    nom: "cookie_utilisateur",
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("cookies", JSON.stringify(cookies));
  afficherCookies();
};

// Ajoute un événement au bouton pour accepter le cookie avec une fonction fléchée
document.getElementById("accept-cookie").addEventListener("click", () => {
  sauvegarderCookie();
  document.getElementById("cookie-status").textContent =
    "Cookie accepté et sauvegardé !";
});

// Affiche les cookies au chargement de la page
window.onload = afficherCookies;
