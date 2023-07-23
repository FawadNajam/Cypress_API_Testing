describe("Authentication", ()=>{

    it("API Key Authentication", ()=>{

        cy.request({
            method: 'GET',
            url: 'api.openweathermap.org/data/2.5/forecast/daily?q=Delhi',
            qs: {
                appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'    //API Key
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
        })

    })

})