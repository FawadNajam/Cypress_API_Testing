/*
POST     https://gorest.co.in/public/v2/users
PUT      https://gorest.co.in/public/v2/users/${userId}
Delete   https://gorest.co.in/public/v2/users/${userId}
*/


describe("GoRest API Chaining", ()=>{

    const auth_token = 'Bearer 37e4de2d3b18a20a2fc592a56f4fa4376885424a7fda104417e032487bd96e5d'

    it("Create, Update, Delete user in GoRest API", ()=>{

        // To create new user:
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body: {
                name: 'John Kenedy',
                gender: 'male',
                email: Math.random().toString(5).substring(2)+"@gmail.com",
                status: 'active'
            },
            headers: {
                Authorization: auth_token
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(201);
            const userId = response.body.id

            // To update username:
            cy.request({
                method: 'PUT',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                body: {
                    name: 'Scott'
                },
                headers: {
                    Authorization: auth_token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.name).to.equal('Scott')

                // To delete resource:
                cy.request({
                    method: 'DELETE',
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    headers: {
                        Authorization: auth_token
                    }
                })
                .then((response)=>{
                    expect(response.status).to.eq(204)
                })
            })
        })

    })

})