//then id like to somehow store them in local storage to be reloaded everytime a user comes back to the page
//need to store them in an array in local storage and then run a function that loops through the array and displays them
//need to add in conditional if the initial loop is empty
document.querySelector("button").addEventListener("click", getFetch);
let author;
let authorName;
let count = 0;
let newp;
let newDiv;
let books = [];
let bookNumber;

async function getFetch() {
  const choice = document.querySelector("input").value;
  // const choice = "0593230256";
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  const coverurl = `https://covers.openlibrary.org/b/isbn/${choice}-M.jpg`;
  localStorage.setItem("booknumber", bookNumber);
  books[bookNumber] = choice;
  bookNumber++;
  localStorage.setItem("book", JSON.stringify(books));
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
//uncomment this once I have the array thing working
// loadFetch();
