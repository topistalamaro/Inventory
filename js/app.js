const delBtn = document.getElementsByClassName("fa-trash");
const editBtn = document.getElementsByClassName("fa-edit");
const addProduct = document.getElementsByClassName("add-btn")[0];
const addItemLi = document.querySelector("#myBtn");
const addProdBtn = document.querySelector(".add-prod-Btn");
const closeModalBtn =document.getElementById("btn-close")
const labelIndicators = document.getElementsByClassName("fa-exchange")

$(document).ready(function () {
  $(".bar").click(function () {
    $(".sidebar-nav").toggleClass("hide");
    $("header , .main_contant").toggleClass("slide-left");
  });
  displayProducts();
changeLabelColors()
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
  closeModalBtn.addEventListener('click',()=>{
    closeModal()
    location.reload()
  })
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
    <td><a href="#"><i class="fa fa-exchange " data-indicator=${product.Qty} ></i> </a></td>
    

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
      // product.Label = itemLabel;
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
  let itemLbale = document.getElementById("itemLabel");

  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach((product, index) => {
    if (index == id - 1) {
      itemName.value = product.Name;
      itemDesc.value = product.Desc;
      itemQty.value = product.Qty;
      itemCat.value = product.Cat;
      itemLabel.value = product.Label
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
       // Label: itemLabel
    };
    PopulateRows(object);
    saveProducts(object);

    location.reload();
  }
};

const changeLabelColors= ()=>{
  let labelArray = [...labelIndicators]
  // let products = JSON.parse(localStorage.getItem("product"));
labelArray.forEach((label)=>{
  let labelQty= parseInt(label.dataset.indicator)
  // console.log(labelQty)
  if(labelQty==0){
    label.classList.add('out-of-stock')
  }
  else if(labelQty<20){
    label.classList.add('almost-out-of-stock')
  }
  else{
    label.classList.add('in-stock')

  }
})
}

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
