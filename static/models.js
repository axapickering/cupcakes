"use strict";


const BASE_URL = "http://localhost:5001/api";

class Cupcake {

    constructor(flavor, size, rating, image_url) {
        self.flavor = flavor;
        self.size = size;
        self.rating = rating;
        self.image_url = image_url;
    }

    /** Gets a list of all cupcakes */
    static async getAllCupcakes() {

        const response = await fetch(`${BASE_URL}/cupcakes`);
        console.log(response)
        const { data } = response.json();
        console.log(data);
        return data;
        
    }




}