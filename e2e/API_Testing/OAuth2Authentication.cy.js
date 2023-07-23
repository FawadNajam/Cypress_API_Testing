describe("OAuth 2.0 Token", ()=>{

    let accessToken = "";

    it("Get OAuth2 Access Token", ()=>{

        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
                client_id: 'c263a214aab793300aed',
                client_secret: 'edb14570c1a29cba352f8af5701e63fe0af2b82f',
                code: 'ce9b0878b7d5409aa915'
            }
        })
        .then((response)=>{
            // we will get the response as:
            // access_token=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&scope=&token_type=bearer
            // To get extract the token from this response, we will use split function:
            const params = response.body.split('&');
            accessToken = params[0].split('=')[1];
            // To print the access Token:
            cy.log("Generated Token is: "+accessToken);
        })

    })


    it("OAuth2 Request", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer '+accessToken
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
        })

    })

})