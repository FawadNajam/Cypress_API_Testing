// Importing the library
const Ajv =  require('ajv');

// Creating an instance for ajv library
const avj = new Ajv();

describe("JSON Schema Validation", ()=>{

    it("Schema Validation against response", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
        .then((response)=>{
            // from the above url, copy the JSON body and paste in website(json to json schema) to get the json schema.
            // once the schema is received, place it here below:

            const schema={
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "price": {
                      "type": "number"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "rating": {
                      "type": "object",
                      "properties": {
                        "rate": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "rate",
                        "count"
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                  ]
                }
              }

              const Validate = avj.compile(schema);  //To check that the response is according to the schema or not.
              const isValid = Validate(response.body); //Pass the response body inside the "Validate" variable to check if response is true or not.

            //   validation:
            expect(isValid).to.be.true;

        })

    })

})