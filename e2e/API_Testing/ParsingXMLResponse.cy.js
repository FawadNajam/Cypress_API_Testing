// Importing xml2js library:
const xml2js = require('xml2js');

// Creating new instance of xml2js.parser class and assign it to parser variable:
const parser = new xml2js.Parser({explicitArray: false});

describe("XML Parsing", ()=>{

    const xmlPayload = "<Pet>     <id>0</id>     <Category>         <id>0</id>         <name>Dog</name>     </Category>     <name>Jimmy</name>     <photoUrls>         <photoUrl>string</photoUrl>     </photoUrls>     <tags>         <Tag>             <id>0</id>             <name>string</name>         </Tag>     </tags>     <status>available</status> </Pet>"

    // to store petid:
    let petid = null;

    before("Creating Pet", ()=>{

        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body:xmlPayload,
            headers: {'Content-Type': "application/xml",    //for sending the request
                      'accept': "application/xml"           //for accepting the response
                     }
        })
        .then((response) =>{
            expect( response.status ).to.eq(200);
            parser.parseString(response.body,(err,result)=>{     //parsestring will convert xml to json object
                petid=result.Pet.id;
            })  
        })

    })

    it("Fetching pet data - Parsing XML response", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/'+petid,
            headers: {
                      'accept': 'application/xml' //for accepting the response
                     }
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            parser.parseString(response.body,(err,result)=>{     //convert xml to json object
                expect(result.Pet.id).equal(petid);
                expect(result.Pet.name).equal("Jimmy");
            })  
        })

    })

})