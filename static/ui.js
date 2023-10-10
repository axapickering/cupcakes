"use strict";
const $cupcakeList = $('#cupcake-list');
const $addCupcakeForm = $("#add-cupcake-form");

/**Gets all cupcakes and appends each to DOM */
async function addCupcakesToDOM() {
  $cupcakeList.empty();
  const cupcakes = await Cupcake.getAllCupcakes();
  console.log(cupcakes, "cupcakes");

  for (let cupcake of cupcakes) {
    const $image = $("<img>").attr("src", cupcake.image_url).attr("width", 200);

    const $text = $("<span>").append(
      `flavor: ${cupcake.flavor}
      size: ${cupcake.size}
      rating: ${cupcake.rating}`);

    const $deleteButton = $('<button>')
      .addClass("delete-cupcake")
      .text("Delete")

    const $li = $("<li>").attr("id",cupcake.id)
      .append($text)
      .append($deleteButton)
      .append($("<div>"))
      .append($image);

    $cupcakeList.append($li);

  }

}


/** calls the addCupcake function to add a cupcake to the DB */
function addCupcake(evt) {
  const flavor = $("#cupcake-flavor").val();
  const rating = $("#cupcake-rating").val();
  const size = $("#cupcake-size").val();
  const image_url = $("#cupcake-image_url").val();

  Cupcake.addCupcake(flavor, size, rating, image_url);

}

function deleteCupcake(evt) {

    const cupcakeId = $(evt.target).parent().attr("id")

    Cupcake.deleteCupcake(cupcakeId);

    location.reload();


}

$addCupcakeForm.on("submit", addCupcake);

$('ul').on("click",'.delete-cupcake',deleteCupcake)


addCupcakesToDOM();