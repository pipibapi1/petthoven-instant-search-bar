import InstantSearch from "./InstantSearch.js";

const searchUsers = document.querySelector("#searchUsers");

const instantSearchUsers = new InstantSearch(searchUsers, {
    searchUrl: new URL("http://127.0.0.1:3000"),
    queryParam: "q",
    responseParser: (responseData) => {
        return responseData.results;
    }, 
    templateFunction: (result) => {
        return `
            <div class="instant-search__title">${result.name}</div>
            <p class="instant-search__paragraph">${result.description}</p>
        `;
    }
});

console.log(instantSearchUsers);
