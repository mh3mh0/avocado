/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

//added alert on every DIV container
appNode.addEventListener("click", (event) => {
  if (event.target.nodeName === "DIV") {
    window.alert("How many of them¿?");
  }
});

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-En", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return newPrice;
};

//web api
async function fetchData() {
  const response = await fetch(`${baseUrl}/api/avo`),
    data = await response.json(),
    allItems = [];

  data.data.forEach((item) => {
    // create image
    const image = document.createElement("img");
    image.src = `${baseUrl}${item.image}`;
    image.className =
      "border-2 hover:border-green-900 h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

    // create title
    const title = document.createElement("h2");
    title.textContent = item.name;
    title.className = "text-2xl text-green-900 font-semibold tracking-tight";

    // create price
    const price = document.createElement("div");
    price.className = "text-green-30";
    price.textContent = formatPrice(item.price);

    // create container, title and price
    const priceAndTitle = document.createElement("div");
    priceAndTitle.className = "text-center md:text-left";
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    //insert everything into a container card
    const card = document.createElement("div");
    card.className =
      "cursor-pointer border border-black md:flex bg-white rounded-lg p-6 hover:bg-green-200 p-auto";
    card.append(image, priceAndTitle);

    //insert everything into the principal container

    const container = document.createElement("div");
    container.appendChild(card);

    allItems.push(container);
  });

  appNode.append(...allItems);
}

fetchData();
