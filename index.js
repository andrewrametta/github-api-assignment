// create a watchForm to listen to when submit button is pushed
function watchForm() {
  $("form").submit((event) => {
    // prevent form from be submited
    event.preventDefault();
    // capture username in form
    const searchUser = $("#js-search-username").val();
    getRepo(searchUser);
  });
}

$(watchForm);

function getRepo(searchUser) {
  // create url that inputs username path
  const url = `https://api.github.com/users/${searchUser}/repos`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the articles array, stopping at the length of array
  for (let i = 0; i < responseJson.length; i++) {
    // for each repo in the results
    //array, add a list item to the results
    //list with the repo name and repo url
    $("#results-list").append(
      `<li><h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].owner.repos_url}">${responseJson[i].owner.repos_url}</a>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}
