describe("API Testing", ()=>{

    it("Passing Query Parameters", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: { page: 2 },
        })
        .then( (response) =>{
            expect(response.status).equal(200);
            expect(response.body.page).equal(2);
            expect(response.body.data).has.length(6);

            expect(response.body.data[0]).have.property('id',7);
            expect(response.body.data[0]).has.property('first_name','Michael')
        })

    })

})