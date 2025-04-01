document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterForm = document.getElementById("monster-form");
    const loadMoreButton = document.getElementById("load-more");
    
    let page = 1;
    const limit = 50;
    const baseUrl = "http://localhost:3000/monsters";

    // Fetch and display monsters
    function fetchMonsters(page) {
        fetch(`${baseUrl}/?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => displayMonster(monster));
            })
            .catch(error => console.error("Error fetching monsters:", error));
    }

    // Display a single monster
    function displayMonster(monster) {
        const monsterDiv = document.createElement("div");
        monsterDiv.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age.toFixed(2)}</p>
            <p>${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
    }

    // Handle form submission to create a new monster
    createMonsterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const age = parseFloat(document.getElementById("age").value);
        const description = document.getElementById("description").value;

        const newMonster = { name, age, description };

        fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newMonster)
        })
        .then(response => response.json())
        .then(monster => {
            displayMonster(monster); // Add the new monster to the list
            createMonsterForm.reset(); // Reset form fields
        })
        .catch(error => console.error("Error adding monster:", error));
    });

    // Load more monsters
    loadMoreButton.addEventListener("click", () => {
        page++;
        fetchMonsters(page);
    });

    // Initial load of monsters
    fetchMonsters(page);
});
