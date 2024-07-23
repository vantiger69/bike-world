document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  let currentIndex = 0;
  let bikesData = []; // To store fetched bike data

  const bikeContainer = document.getElementById("bike-container");
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  bikeContainer.appendChild(btnContainer);

  // Function to play bike sound
  function playBikeSound() {
    const audio = new Audio("wasaki.mp3");

    audio.play();
  }

  function showBike(index) {
    // Hide all bike cards
    const bikeCards = document.querySelectorAll(".bike-card");
    bikeCards.forEach((card) => (card.style.display = "none"));

    // Show the bike card at the specified index
    bikeCards[index].style.display = "block";

    // Play bike sound when showing bike card
    playBikeSound();
  }

  function fetchBikes() {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        bikesData = data.bikes;
        renderBikes();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function renderBikes() {
    bikesData.forEach((bike, index) => {
      const bikeCard = document.createElement("div");
      bikeCard.classList.add("bike-card");

      bikeCard.innerHTML = `
                <img src="${bike.poster}" alt="${bike.name}">
                <div class="bike-info">
                    <h2>${bike.name}</h2>
                    <p><strong>CC:</strong> ${bike.cc}</p>
                    <p><strong>Speed:</strong> ${bike.speed}</p>
                </div>
            `;

      bikeContainer.appendChild(bikeCard);

      if (index === currentIndex) {
        bikeCard.style.display = "block";
      } else {
        bikeCard.style.display = "none";
      }
    });

    // Add previous and next buttons
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous Bike";
    prevBtn.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + bikesData.length) % bikesData.length;
      showBike(currentIndex);
    });
    btnContainer.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Bike";
    nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % bikesData.length;
      showBike(currentIndex);
    });
    btnContainer.appendChild(nextBtn);
  }

  // Fetch bikes data when the page loads
  fetchBikes();
});
