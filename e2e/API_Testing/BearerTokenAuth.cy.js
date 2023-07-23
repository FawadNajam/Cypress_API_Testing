describe("Authentication", ()=>{

    const Token = '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';

    it("Bearer Token Authentication", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer '+Token
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
        })

    })

})