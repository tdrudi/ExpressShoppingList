const items = require('./fakeDb');

class Item{
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this);
    }

    //Find and return item with specific name
    static find(name){
        let selectedItem = items.find(item => item.name === name);
        if(selectedItem === undefined)
            throw {msg : 'Not Found', status: 404}
        return selectedItem;
    }

    //return all items
    static findAll() {
        return items;
    }

    //update specified item
    static update(name, data){
        let selectedItem = Item.find(name);
        if(selectedItem === undefined)
            throw {msg : 'Not Found', status: 404}
        
        selectedItem.name = data.name;
        selectedItem.price = data.price;
        return selectedItem;
    }

    //Delete specified item
    static delete(name){
        let selectedItemIdx = items.findIndex(item => item.name === name);
        if(selectedItemIdx === -1)
            throw {msg : 'Not Found', status: 404}
        
        items.splice(selectedItemIdx, 1);
    }
}

module.exports = Item;

