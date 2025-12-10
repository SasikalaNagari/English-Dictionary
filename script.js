const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");
const wordInput = document.getElementById("word-input");

searchBtn.addEventListener("click", () => {
    let word = wordInput.value.trim();

    if (word === "") {
        result.innerHTML = `<p>Please enter a word.</p>`;
        return;
    }

    fetchData(word);
});

async function fetchData(word) {
    result.innerHTML = `<p>Loading...</p>`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            result.innerHTML = `<p>Word not found. Try another word.</p>`;
            return;
        }

        const data = await response.json();
        const item = data[0];

        let definition = item.meanings[0].definitions[0].definition;
        let example = item.meanings[0].definitions[0].example || "No example available";
        let audio = item.phonetics[0]?.audio || "";

        result.innerHTML = `
            <div class="word">
                <h3>${item.word}</h3>
                <span class="phonetics">${item.phonetics[0]?.text || ""}</span>
            </div>

            ${audio ? `<audio controls src="${audio}"></audio>` : ""}

            <div class="meaning">
                <h4>Meaning:</h4>
                <p>${definition}</p>
            </div>

            <div class="example">
                <h4>Example:</h4>
                <p>${example}</p>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `<p>Error fetching data.</p>`;
    }
}
