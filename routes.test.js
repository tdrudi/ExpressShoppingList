process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');

let items = require('./fakeDB');
let item = {name: 'testItem', price: 10};

beforeEach(async() => {
    items = [];
});

afterEach(async() =>{
    items = [];
});

//Test get route -> render list of items
describe("GET /routes", async function (){
    test("Get a list of items", async function (){
        const res = await request(app).get(`/routes`);
        const {items} = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});


//Test get route -> return json about specific item
describe("GET /routes/:name", async function (){
    test("Get a specific item", async function (){
        const res = await request(app).get(`/routes/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });

    test("Respond with error 404 if item not found", async function (){
        const res = await request(app).get(`/routes/none`);
        expect(res.statusCode).toBe(404);
    });
});



//Test post route -> create an item
describe("POST /routes", async function (){
    test("create new item", async function (){
        const res = await request(app).post(`/routes`).send({name:"Sandwich", price: 20 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual("Sandwich");
        expect(res.body.item.price).toEqual(20);
    });
});



//Test patch route -> update specific item
describe("PATCH /routes/:name", async function (){
    test("Update a specific item", async function (){
        const res = await request(app).patch(`/routes/${item.name}`).send({name: "Milk"});
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({name: "Milk"});
    });

    test("Respond with error 404 if item not found", async function (){
        const res = await request(app).get(`/routes/none`);
        expect(res.statusCode).toBe(404);
    });
});


//Test delete route -> delete specific item
describe("Delete /routes/:name", async function (){
    test("Delete a specific item", async function (){
        const res = await request(app).delete(`/routes/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg: "Item Deleted"});
    });
});