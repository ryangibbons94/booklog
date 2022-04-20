//next thing to add is dynamically adding cards to the dom every time a book is added to the input
//then id like to somehow store them in local storage to be reloaded everytime a user comes back to the page

document.querySelector("button").addEventListener("click", getFetch);
let author;
let authorName;
let count = 0;
let newp;
let newDiv;

async function getFetch() {
  const choice = document.querySelector("input").value;
  // const choice = "0593230256";
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  const coverurl = `https://covers.openlibrary.org/b/isbn/${choice}-M.jpg`;
  localStorage.setItem("book", choice);
  await fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      newDiv = document.createElement("div");
      let newh2 = document.createElement("h2");
      newp = document.createElement("p");
      const newContent = document.createTextNode(`Title: ${data.title}`);
      newh2.appendChild(newContent);
      newDiv.appendChild(newh2);
      let container = document.querySelector(".container");
      container.insertAdjacentElement("beforeend", newDiv);
      console.log(data);
      author = data.authors[0].key;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  fetch(coverurl)
    .then((data) => {
      // console.log(data.url);
      let newImg = document.createElement("img");
      newImg.src = data.url;
      // document.querySelector("img").src = data.url;
      newDiv.appendChild(newImg);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  getAuthorName();
}
// getFetch();

async function getAuthorName() {
  const authorurl = `https://openlibrary.org${author}.json`;
  await fetch(authorurl)
    .then((res) => res.json())
    // parse response as JSON
    .then((data) => {
      // console.log(data.name);
      authorName = data.name;
      // document.querySelector(".author").innerText = authorName;
      const newPContent = document.createTextNode(`By: ${authorName}`);
      newp.appendChild(newPContent);
      newDiv.appendChild(newp);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// function makeSection() {
//   let newDiv = document.createElement("div");
//   let newh2 = document.createElement("h2");
//   const newContent = document.createTextNode(count);
//   newh2.appendChild(newContent);
//   let newImg = document.createElement("img");
//   newDiv.appendChild(newh2);
//   let currentDiv = document.querySelector("div");
//   document.body.insertAdjacentElement("beforeend", newDiv);
//   count++;
// }
async function loadFetch() {
  const choice = localStorage.getItem("book");
  // const choice = "0593230256";
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  const coverurl = `https://covers.openlibrary.org/b/isbn/${choice}-M.jpg`;
  await fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      newDiv = document.createElement("div");
      let newh2 = document.createElement("h2");
      newp = document.createElement("p");
      const newContent = document.createTextNode(`Title: ${data.title}`);
      newh2.appendChild(newContent);
      newDiv.appendChild(newh2);
      let container = document.querySelector(".container");
      container.insertAdjacentElement("beforeend", newDiv);
      console.log(data);
      author = data.authors[0].key;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  fetch(coverurl)
    .then((data) => {
      // console.log(data.url);
      let newImg = document.createElement("img");
      newImg.src = data.url;
      // document.querySelector("img").src = data.url;
      newDiv.appendChild(newImg);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  getAuthorName();
}

loadFetch();
