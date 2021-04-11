let form2 = document.querySelector('#input2');

form2.onsubmit = (e) => {
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
}


function renderCard(data) {
    let myDiv = document.getElementById('a');
    let myDiv2 = document.createElement('div');
    myDiv2.classList = 'col-lg-3 col-md-4 col-sm-6 col-xs-6 g-4';
    let myCard = document.createElement('div');
    myCard.classList = 'card h-100';
    myCard.style = 'width: 18rem';
    let myDiv3 = document.createElement('div');
    myDiv3.classList = 'card-body';
    let cardName = document.createElement('h5');
    cardName.classList = 'card-title';
    let cardAdd = document.createElement('p');
    cardAdd.classList = 'card-text';
    let cardNumb = document.createElement('p');
    cardNumb.classList = 'card-text';
    let cardWeb = document.createElement('a');
    cardWeb.classList = 'btn btn-success';
    cardWeb.target = '_blank';
    cardWeb.textContent = 'Explore';
    myDiv.appendChild(myDiv2);
    myDiv2.appendChild(myCard);
    myCard.appendChild(myDiv3);
    myDiv3.appendChild(cardName);
    myDiv3.appendChild(cardAdd);
    myDiv3.appendChild(cardNumb);
    myDiv3.appendChild(cardWeb);
    cardName.textContent = data.restaurant_name;
    cardAdd.textContent = data.address.formatted;
    cardNumb.textContent = data.restaurant_phone;
    cardWeb.href = data.restaurant_website;
}

// myRes.map(result => renderCard(result));

let getData2 = async (name) => {
    try {
        let preData = await fetch(`https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${name}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`);
        let result = await preData.json();
        let myRes = result.data;
        myRes.map(data => renderCard(data));
    } catch (err) {
        console.log(err);
        alert('Cannot find any results. Please try again')
    }
}

let getData1 = async (address) => {
    try {
        let preData = await fetch(`https://api.documenu.com/v2/restaurants/search/fields?address=${address}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`);
        let result = await preData.json();
        let myRes = result.data;
        myRes.map(data => renderCard(data));
    } catch (err) {
        console.log(err);
        alert('Cannot find any results. Please try again')
    }
}

let getData3 = async (cuisine) => {
    try {
        let preData = await fetch(`https://api.documenu.com/v2/restaurants/search/fields?cuisine=${cuisine}&exact=true&size=40&key=83be9ffe9365f50847d8fe2488bb5dce`);
        let result = await preData.json();
        let myRes = result.data;
        myRes.map(data => renderCard(data));
    } catch (err) {
        console.log(err);
        alert('Cannot find any results. Please try again')
    }
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}



function indexSearch () {
    var params = getSearchParameters();
    let address = params.address;
    let name = params.resName;
    let cuisine = params.cuisine;
    if (address !== "") {
        getData1(address);
    } else if (name !== "") {
        getData2(name);
    } else if (cuisine !== "") {
        getData3(cuisine);
    }
}


