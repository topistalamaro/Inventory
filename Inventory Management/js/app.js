const delBtn = document.getElementsByClassName("fa-trash");
const editBtn = document.getElementsByClassName("fa-edit");
const addProduct = document.getElementsByClassName("add-btn")[0];
const addItemLi = document.querySelector("#myBtn");
const addProdBtn = document.querySelector(".add-prod-Btn");

$(document).ready(function () {
  $(".bar").click(function () {
    $(".sidebar-nav").toggleClass("hide");
    $("header , .main_contant").toggleClass("slide-left");
  });
  displayProducts();

  let delBtnArray = [...delBtn];
  delBtnArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.closest("tr").rowIndex;
      e.target.closest("tr").remove();
      updateLocalStorage(id);
    });
  });
  let editBtnArray = [...editBtn];
  editBtnArray.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let id = e.target.closest("tr").rowIndex;
      addProduct.innerText = "Update Product";
      addProduct.id = "add-btn";
      openModal();
      showItems(id);
      document.querySelector("#add-btn").addEventListener("click", () => {
        editItem(id);
      });
    });
  });
  addProdBtn.addEventListener("click", () => {
    addProduct.innerText = "Add Product";
    addProduct.id = "btn-add";
    openModal();
    document.querySelector("#btn-add").addEventListener("click", () => {
      addItem();
    });
  });
});

function openModal() {
  document.getElementById("pop_modal").style.visibility = "visible";
}

function closeModal() {
  document.getElementById("pop_modal").style.visibility = "hidden";
}

const editModalshow = () => {
  document.getElementById("pop_modal").style.visibility = "visible";
};

const updateLocalStorage = (id) => {
  let product = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < product.length; i++) {
    if (i == id - 1) {
      product.splice(i, 1);
    }
    localStorage.setItem("product", JSON.stringify(product));
  }
};

const displayProducts = () => {
  const storedProducts = getProducts();
  console.log(storedProducts);
  storedProducts.forEach((product) => PopulateRows(product));
};

const PopulateRows = (product) => {
  let productContainer = document.getElementById("table_body");

  productContainer.innerHTML += `
    <tr>
    <td>${product.Name}</td>
    <td> ${product.Desc} </td>
    <td>${product.Cat}</td>
    <td class="rule-center">${product.Qty}</td>
    <td><a href="#"><i class="fas fa-trash" ></i> <span><i
                    class="fas fa-edit"></i></span></a></td>
    <td class="rule-center">${product.Qty}</td>

</tr>`;
};

const editItem = (id) => {
  let itemName = document.getElementById("item_name");
  let itemDesc = document.getElementById("itemDesc");
  let itemQty = document.getElementById("itemQty");
  let itemCat = document.getElementById("itemCat");
  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach((product, index) => {
    if (index == id - 1) {
      product.Name = itemName.value;
      product.Desc = itemDesc.value;
      product.Qty = itemQty.value;
      product.Cat = itemCat.value;
    }
    document.getElementById("pop_modal").style.visibility = "hidden";
  });
  localStorage.setItem("product", JSON.stringify(products));
  location.reload();
};

const showItems = (id) => {
  let itemName = document.getElementById("item_name");
  let itemDesc = document.getElementById("itemDesc");
  let itemQty = document.getElementById("itemQty");
  let itemCat = document.getElementById("itemCat");
  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach((product, index) => {
    if (index == id - 1) {
      itemName.value = product.Name;
      itemDesc.value = product.Desc;
      itemQty.value = product.Qty;
      itemCat.value = product.Cat;
    }
  });
};

const addItem = () => {
  document.getElementById("pop_modal").style.visibility = "hidden";
  let itemName = document.getElementById("item_name").value;
  let itemDesc = document.getElementById("itemDesc").value;
  let itemQty = document.getElementById("itemQty").value;
  let itemCat = document.getElementById("itemCat").value;

  if (itemName === "" && itemDesc === "" && itemQty === "" && itemDesc === "") {
    alert("Enter valid values and try again!");
  } else {
    let object = {
      Name: itemName,
      Desc: itemDesc,
      Cat: itemCat,
      Qty: itemQty,
    };
    PopulateRows(object);
    saveProducts(object);

    location.reload();
  }
};

const getProducts = () => {
  let products = "";
  if (localStorage.getItem("product") == null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  return products;
};

const saveProducts = (prodObject) => {
  let productsFromLocalStorage = getProducts();
  productsFromLocalStorage.push(prodObject);
  localStorage.setItem("product", JSON.stringify(productsFromLocalStorage));
};

































// / Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
// //   modal.style.display = "none";v
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }