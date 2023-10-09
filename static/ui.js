"use strict";
const $cupcakeList = $('#cupcake-list');


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

addCupcakesToDOM();