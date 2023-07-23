describe("Parsing JSON Response", ()=>{

    it("Parsing simple JSON Response", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
        .then((response)=>{
            // Validating the response body:
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.eq(1);
            expect(response.body[0].title).to.eq("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
            expect(response.body[0].price).to.eq(109.95);
            expect(response.body[0].rating.rate).to.eq(3.9);
        })

    })

    it.only("Parsing complex JSON Response", ()=>{

        let totalPrice = 0;

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs: {limit:5}
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            response.body.forEach(element => {
                totalPrice = totalPrice + element.price;
            });
            expect(totalPrice).to.eq(899.23); //this price is for 5 products as we have set limit to 5
            
        })

    })

})