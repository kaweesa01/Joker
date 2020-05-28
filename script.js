const jokePost = document.querySelector(".blog-posts");
const main = document.querySelector("main");
const loadingAnim = document.querySelector(".loading");

function displayJocks(response) {
  var display = "";
  response.forEach((joke) => {
    display += `
        <div class="blog">
        <div class="top-left_circle">${joke.id}</div>
        <h3 class="sub-heading">${joke.setup}</h3>
        <p class="post">
           ${joke.punchline}
        </p>
    </div>
        `;
  });

  jokePost.innerHTML = display;
}

async function getJokes() {
  const request = await fetch(
    "https://official-joke-api.appspot.com/random_ten"
  );
  const response = await request.json();

  console.log(response);

  displayJocks(response);
}
getJokes();

///loading more jokes

function moreJokes(response) {
  var display = "";
  response.forEach((joke) => {
    display += `
          <div class="blog">
          <div class="top-left_circle">${joke.id}</div>
          <h3 class="sub-heading">${joke.setup}</h3>
          <p class="post">
             ${joke.punchline}
          </p>
      </div>
          `;
  });

  jokePost.insertAdjacentHTML("beforeend", display);
}

function showloading() {
  loadingAnim.classList.add("show");
  setTimeout(() => {
    loadingAnim.classList.remove("show");
  }, 1000);

  setTimeout(() => {
    async function getJokes() {
      const request = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      const response = await request.json();
      console.log(response);
      moreJokes(response);
    }
    getJokes()
  }, 1500);
}
window.addEventListener("scroll", (e) => {
  var scrollVertical = e.currentTarget.scrollY;
  var height = main.clientHeight;

  if (scrollVertical >= height - 657) {
    showloading();
  }
});
