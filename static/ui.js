"use strict";
const $cupcakeList = $('#cupcake-list');
const $addCupcakeForm = $("#add-cupcake-form")


async function addCupcakesToDOM() {
  $cupcakeList.empty();
  const cupcakes = await Cupcake.getAllCupcakes();
  console.log(cupcakes, "cupcakes");

  for (cupcake in cupcakes) {
    const $image = $("<img>").attr("src", cupcake.image_url);
    const $text = $("<span>").append(
      `flavor: ${cupcakes.flavor} \n
      size: ${cupcakes.size} \n
      rating: ${cupcakes.rating}`);

    const $li = $("<li>").append($image).append($text);

    $cupcakeList.append($li);

  }

}


/** calls the addCupcake function to add a cupcake to the DB  */
async function addCupcake(evt) {

    evt.preventdefault()
    const formData = JSON.stringify($addCupcakeForm.serializeArray());
    await Cupcake.addCupcake(formData)

}

$addCupcakeForm.on("submit",addCupcake(evt))


addCupcakesToDOM();