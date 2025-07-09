async function loadLostItems() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwHU_TRgtBjo-cGk2kXT78KLCjUAL8AMrOhD_p-KsWeJplat01JUHrdBfpStYK5nIaZEQ/exec");
        const items = await response.json();
        const carousel = document.getElementById("carousel");

        if (!carousel) {
            console.error("Carousel element not found in DOM.");
            return;
        }

        carousel.innerHTML = ""; // Clear old cards

        if (!items.length) {
            carousel.innerHTML = "<p>No lost items found.</p>";
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "carousel-card";

            card.innerHTML = `
                <img src="${item.image}" alt="Lost Item Image" />
                <p>${item.name}</p>
            `;

            carousel.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading lost items:", error);
    }
}

window.addEventListener("DOMContentLoaded", loadLostItems);
setInterval(loadLostItems, 60000);
