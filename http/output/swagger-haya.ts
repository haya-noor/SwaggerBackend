const swaggerSpec = {
  "openapi": "3.0.0",
  "components": {
    "examples": {},
    "headers": {},
    "parameters": {},
    "requestBodies": {},
    "responses": {},
    "schemas": {
      "IPet": {
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "number",
            "format": "double"
          },
          "species": {
            "type": "string"
          },
          "customerId": {
            "type": "string"
          },
          "petId": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "species",
          "customerId",
          "petId"
        ],
        "type": "object",
        "additionalProperties": false
      },
      "Pick_IPet.Exclude_keyofIPet.petId-or-customerId__": {
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "number",
            "format": "double"
          },
          "species": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "species"
        ],
        "type": "object",
        "description": "From T, pick a set of properties whose keys are in the union K"
      },
      "AddPetsDTO": {
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "number",
            "format": "double"
          },
          "species": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "species"
        ],
        "type": "object",
        "additionalProperties": false
      },
      "ICustomer": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "customerId": {
            "type": "string"
          }
        },
        "required": [
          "firstName",
          "lastName",
          "customerId"
        ],
        "type": "object",
        "additionalProperties": false
      },
      "Pick_ICustomer.Exclude_keyofICustomer.customerId__": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        },
        "required": [
          "firstName",
          "lastName"
        ],
        "type": "object",
        "description": "From T, pick a set of properties whose keys are in the union K"
      },
      "AddCustomerDTO": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        },
        "required": [
          "firstName",
          "lastName"
        ],
        "type": "object",
        "additionalProperties": false
      }
    },
    "securitySchemes": {}
  },
  "info": {
    "title": "example-server-tsoa",
    "version": "1.0.0",
    "description": "Example server with TSOA",
    "contact": {}
  },
  "paths": {
    "/petsapp/pet": {
      "get": {
        "operationId": "GetPets",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/IPet"
                  },
                  "type": "array"
                }
              }
            }
          },
          "500": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "message",
                    "status"
                  ],
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [],
        "parameters": [
          {
            "in": "query",
            "name": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ]
      },
      "post": {
        "operationId": "AddPets",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IPet"
                }
              }
            }
          },
          "201": {
            "description": "Created"
          },
          "500": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "message",
                    "status"
                  ],
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [],
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddPetsDTO"
              }
            }
          }
        }
      }
    },
    "/customersapp/customer": {
      "get": {
        "operationId": "GetCustomers",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/ICustomer"
                  },
                  "type": "array"
                }
              }
            }
          },
          "500": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "message",
                    "status"
                  ],
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [],
        "parameters": [
          {
            "in": "query",
            "name": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ]
      },
      "post": {
        "operationId": "AddCustomer",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ICustomer"
                }
              }
            }
          },
          "201": {
            "description": "Created"
          },
          "500": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "message",
                    "status"
                  ],
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [],
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddCustomerDTO"
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "/"
    }
  ]
} as const;
export default swaggerSpec;
