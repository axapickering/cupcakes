"use strict";


const BASE_URL = "http://localhost:5001/api";

class Cupcake {
    /**Makes Cupcakces  */
    constructor(){
    }

    /** Gets a list of all cupcakes */
    static async getAllCupcakes() {

        const response = await fetch(`${BASE_URL}/cupcakes`);
        console.log(response);
        const allCupcakesObject = await response.json();
        const { cupcakes } = allCupcakesObject;
        return cupcakes;

    }

    /**Sends post request to the API to add cupcake*/
    static async addCupcake(flavor, size, rating, image_url) {

        console.log("flavor:", flavor);

        const formData = JSON.stringify({ flavor, size, rating, image_url });
        console.log("form data:", typeof formData);

        const response = await fetch(`${BASE_URL}/cupcakes`, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    /** Makes a call to the API to delete a cupcake  */
    static async deleteCupcake(cupcakeId) {

        const response = await fetch(`${BASE_URL}/cupcakes/${cupcakeId}`,{
            method: "DELETE"
        })

    }




}