const itemInput = document.querySelector('.add-item input'),
      list = document.querySelector('.item-list');

let groceryList = JSON.parse(localStorage.getItem('lista-compras'));

function mostraItem(item) {
    let li = '';
    if(groceryList) {
        groceryList.forEach((item, id) => {
            const completed = item.status == 'completed' ? 'checked' : '';

            li += 
                `<li class='item'>
                    <label for='${id}'>
                        <input onclick='updateStatus(this)' type='checkbox' id='${id}' ${completed}>
                        <p class='${completed}'>${item.name}</p>
                    </label>
                    <span onclick='deleteItem(${id})'><i class='bx bxs-trash'></i></span>
                </li>`;
        });
    }

    list.innerHTML = li || `<span class='null'>Digite um item e pressione 'Enter' para adicioná-lo à sua lista de compras</span>`;
}

mostraItem()

function deleteItem(del) {
    groceryList.splice(del, 1);
    localStorage.setItem('lista-compras', JSON.stringify(groceryList));
    mostraItem()
}

function updateStatus(selectedItem) {
    const itemName = selectedItem.parentElement.lastElementChild;

    if(selectedItem.checked) {
        itemName.classList.add('checked');
        groceryList[selectedItem.id].status = 'completed'
    } else {
        itemName.classList.remove('checked');
        groceryList[selectedItem.id].status = 'pending'
    }

    localStorage.setItem('lista-compras', JSON.stringify(groceryList));
}

itemInput.addEventListener('keyup', e => {
    const typedItem = itemInput.value.trim();

    if(e.key == 'Enter' && typedItem) {
        if(!groceryList) {
            groceryList = [];
        }

        itemInput.value = '';
        const itemInfo = {
            name: typedItem, 
            status: 'pending'};
        groceryList.push(itemInfo);
        localStorage.setItem('lista-compras', JSON.stringify(groceryList));

        mostraItem()
    }
});
