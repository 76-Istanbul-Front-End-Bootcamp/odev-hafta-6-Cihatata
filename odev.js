window.mockApiUrl = "https://5ff1abf3db1158001748b43c.mockapi.io/pets/";

const modalDiv = document.createElement('div')
document.querySelector('body').appendChild(modalDiv);

window.removePet = (id) => {
    // remove the pet with given id
    fetch(`${window.mockApiUrl}${id}`, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload()
        })
        .catch((err) => console.log(err));
};

window.openPetDetail = async (id) => {
    const res = await fetch(`${window.mockApiUrl}${id}`)
    const data = await res.json();
    const modal = showDetail(data);
    modalDiv.innerHTML = modal;
    $(`#${id}`).modal("show");
};

function showDetail(pet) {
    return (`
    <div class="modal fade" id="${pet.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
           </div>
        <div class="modal-body">
         <img src="${pet.image}" alt="petimage" />
          ${pet.name}</br>${pet.description}
         </div>
        </div>
    </div>
  </div>
    `)
}