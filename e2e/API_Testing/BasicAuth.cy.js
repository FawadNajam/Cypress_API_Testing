describe("Authentication", ()=>{

    it("Basic Authentication", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                user: 'postman',
                pass: 'password'
            }
        })

        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.eq(true);
        })

    })

})