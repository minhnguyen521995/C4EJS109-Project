let topCuisine = document.querySelectorAll(".btn-light");

for (let i of topCuisine) {
  i.addEventListener("click", () => {
    localStorage.setItem("cuisine", JSON.stringify(i.textContent));
    window.open("filter.html");
  });
}

function renderCard(data) {
  let linkWebsite = "";
  if (data.restaurant_website !== "") {
    linkWebsite = data.restaurant_website;
  } else {
    linkWebsite = `https://www.google.com.vn/search?q=${data.restaurant_name}`;
  }
  let html = `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 g-4">
  <div class="card h-100" style="width: 18rem;"><div class="card-body">
      <h5 class="card-title">${data.restaurant_name}</h5>
      <p class="card-text">Add: ${data.address.formatted}</p>
      <p class="card-text">Tel: ${data.restaurant_phone}</p>
      <a class="btn btn-success" target="_blank" href="${linkWebsite}">Explore</a>
  </div>
</div>
</div>`;
  let myDiv = document.getElementById("a");
  myDiv.innerHTML += html;
}

let getData2 = async (name) => {
  renderLoading();
  try {
    let preData = await fetch(
      `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${name}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`
    );
    let result = await preData.json();
    let myRes = result.data;

    let myDiv = document.getElementById("a");
    myDiv.innerHTML = "";

    myRes.map((data) => renderCard(data));
  } catch (err) {
    console.log(err);
    alert("Cannot find any results. Please try again");
  }
};

let getData1 = async (address) => {
  renderLoading();
  try {
    let preData = await fetch(
      `https://api.documenu.com/v2/restaurants/search/fields?address=${address}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`
    );
    let result = await preData.json();
    let myRes = result.data;

    let myDiv = document.getElementById("a");
    myDiv.innerHTML = "";

    myRes.map((data) => renderCard(data));
  } catch (err) {
    console.log(err);
    alert("Cannot find any results. Please try again");
  }
};

let getData3 = async (cuisine) => {
  renderLoading();
  try {
    let preData = await fetch(
      `https://api.documenu.com/v2/restaurants/search/fields?cuisine=${cuisine}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`
    );
    let result = await preData.json();
    let myRes = result.data;

    let myDiv = document.getElementById("a");
    myDiv.innerHTML = "";

    myRes.map((data) => renderCard(data));
  } catch (err) {
    console.log(err);
    alert("Cannot find any results. Please try again");
  }
};

let form = document.querySelector("#input");

form.onsubmit = (e) => {
  e.preventDefault();
  let name = form.resName.value;
  let address = form.address.value;
  let cuisine = form.cuisine.value;
  let param = {};

  if (address !== "") {
    param.value = address;
    param.type = "address";
  } else if (name !== "") {
    param.value = name;
    param.type = "name";
  } else if (cuisine !== "") {
    param.value = cuisine;
    param.type = "cuisine";
  }

  localStorage.setItem("data", JSON.stringify(param));
  window.open("./search.html");

  form.resName.value = "";
  form.address.value = "";
  form.cuisine.value = "";
};

let form2 = document.querySelector("#input2");

form2.onsubmit = (e) => {
  e.preventDefault();
  let name = form2.resName.value;
  let address = form2.address.value;
  let cuisine = form2.cuisine.value;
  if (address !== "") {
    getData1(address);
  } else if (name !== "") {
    getData2(name);
  } else if (cuisine !== "") {
    getData3(cuisine);
  }
  form2.resName.value = "";
  form2.address.value = "";
  form2.cuisine.value = "";
};

function renderLoading() {
  let myDiv = document.getElementById("a");
  myDiv.innerHTML = `<img src = "./resources/images/loading.gif"  class="img-fluid" style="margin: auto;
  height: 200px; width: 200px">`;
}