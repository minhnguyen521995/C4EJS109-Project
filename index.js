let form = document.querySelector('#input');
form.onsubmit = (e) => {
    e.preventDefault();
    let name = form.resName.value;
    getData(name)
}

let getData = async (name) => {
    try {
        let preData = await fetch(`https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${name}&exact=true?key=83be9ffe9365f50847d8fe2488bb5dce`);
        let data = await preData.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}