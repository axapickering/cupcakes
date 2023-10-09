"use strict";
const $cupcakeList = $('#cupcake-list');
const $addCupcakeForm = $("#add-cupcake-form");


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
function addCupcake(evt) {
  evt.preventDefault();
  const flavor = $("#cupcake-flavor").val()
  const rating = $("#cupcake-rating").val()
  const size = $("#cupcake-size").val()
  const image_url = $("#cupcake-image_url").val()

  Cupcake.addCupcake(flavor, size, rating, image_url)

}



$addCupcakeForm.on("submit", addCupcake);


// addCupcakesToDOM();