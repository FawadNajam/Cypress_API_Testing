describe("API Testing", ()=>{

    it("Approach-1: Hard coded json object", ()=>{

        const RequestBody={
            tourist_name: "Ahmad",
            tourist_email: "Ahmad321@gmail.com",
            tourist_location: "Pakistan"
        }

        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: RequestBody
        })
        .then( (response) =>{
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq("Ahmad")
            expect(response.body.tourist_email).to.eq("Ahmad321@gmail.com")
            expect(response.body.tourist_location).to.eq("Pakistan")
        })
    })

    it("Approach-2: Dynamically generating json object", ()=>{

        const RequestBody={
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2) + "@gmail.com",
            tourist_location: "Pakistan"
        }

        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: RequestBody
        })
        .then( (response) =>{
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(RequestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(RequestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(RequestBody.tourist_location)
        })
    })

    it("Approach-3: using Fixture", ()=>{

        cy.fixture('tourist_info').then( (data)=>{
            const RequestBody = data;

            cy.request({
                method: 'POST',
                url: 'http://restapi.adequateshop.com/api/Tourist',
                body: RequestBody
            })
            .then( (response) =>{
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(RequestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(RequestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(RequestBody.tourist_location)

                expect(response.body).has.property('tourist_email', RequestBody.tourist_email)
            })

        })
        
    })

})