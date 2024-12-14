let button = document.getElementById("button");
let sidebar = document.getElementById("sidebar");

let modal = document.getElementById("modal");
document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("button");
  let sidebar = document.getElementById("sidebar");
  let toggleButton = document.getElementById("toggleButton");

  button.addEventListener("click", function () {
    sidebar.style.display = "none";
    toggleButton.style.display = "block";
  });

  toggleButton.addEventListener("click", function () {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
      toggleButton.style.display = "none";
    } else {
      sidebar.style.display = "none";
    }
  });

  async function fetchCours() {
    try {
      const response = await fetch("http://localhost:3000/cours"); // Modifier l'URL si nécessaire
      const cours = await response.json();

      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = ""; // Effacer le contenu existant

      cours.forEach((cour) => {
        const row = `
          <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left">${cour.id}</td>
            <td class="py-3 px-6 text-left">${cour.module}</td>
            <td class="py-3 px-6 text-left">${cour.nh}</td>
            <td class="py-3 px-6 text-left">${cour.professeur}</td>
            <td class="py-3 px-6 text-center">
              <button onclick="openModal('${cour.id}', '${cour.module}', '${cour.professeur}')"
                class="bg-blue-600 text-white font-medium px-3 py-1 rounded hover:bg-blue-700">
                Voir Séances
              </button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {

      console.error("Erreur lors de la récupération des cours:", error);

    }
  }

  fetchCours();

});
function openModal(id, module, professeur) {
    // Remplir les informations du modal
    const modalTitle = document.querySelector("#modal h1.text-blue-400");
    modalTitle.textContent = `Séances / ${module}`;
    
    // Cibler le conteneur de détails du cours
    const courseDetails = document.getElementById("courseDetails");
    
    // Mettre à jour le contenu avec les informations spécifiques du cours
    courseDetails.innerHTML = `
      <div class="bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg rounded-lg overflow-hidden text-white">
          <div class="p-6">
              <h2 class="text-xl font-bold">Séance ${id}</h2>
              <p class="text-white/90 mt-2">Professeur: ${professeur}</p>
              <p class="text-white/90 mt-2">Date de la séance: 03/12/2024</p>
              <p class="text-white/90 mt-2">Heure de Debut: 10h:00</p>
              <p class="text-white/90 mt-2">Heure de Fin: 12h:00</p>
          </div>
      </div>
    `;
    
    // Afficher le modal
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  }
  