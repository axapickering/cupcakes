"use strict";

const $cupcakeList = $('#cupcake-list')

const BASE_URL = "http://localhost:5001/api"

class Cupcake() {

    constructor(flavor,size,rating,image_url) {
        self.flavor = flavor;
        self.size = size;
        self.rating = rating;
        self.image_url = image_url;
    }

    /** Gets a list of all cupcakes */
    static async getAllCupcakes() {

        const response = await fetch(`${BASE_URL}/cupcakes`)

        return response.json()


    }




}