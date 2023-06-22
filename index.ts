type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

interface IProduct {
  _id: string;
  image: string;
  name: string;
  preference: IntRange<0, 10>;
}

let products: IProduct[] = [
  {
    _id: getRandomString(10),
    image: "./assets/img/caja0.JPG",
    name: "Pan de caja 0",
    preference: 0,
  },
  {
    _id: getRandomString(10),
    image: "./assets/img/littleBites.JPG",
    name: "Little Bites",
    preference: 0,
  },
  {
    _id: getRandomString(10),
    image: "./assets/img/mediasNoches.JPG",
    name: "Medias Noches",
    preference: 5,
  },
  {
    _id: getRandomString(10),
    image: "./assets/img/tostado.JPG",
    name: "Pan tostado",
    preference: 6,
  },
  {
    _id: getRandomString(10),
    image: "./assets/img/donas.JPG",
    name: "Donas",
    preference: 3,
  },
];

let lockeds: string[] = ["Pan de caja 0", "Little Bites"];
configProductsView();
function configProductsView() {
  let productsDiv: null | HTMLElement = document.getElementById("products");
  let productsView: string = "";
  products.forEach((product) => {
    /* <h3>${product.name}</h3> */
    productsView += `
    <div class="d-flex flex-wrap justify-content-between align-items-center bef bef-wmx-320px my-3">
      <img class="w-50" src="${product.image}" alt="${product.name}" />
      <div id="input-container-${product._id}" class="w-50">
        <input type="number" 
        name="${product.name}" id="${product.name}"
        onkeyup="checkInputValid('${product._id}')"
        class="text-center mx-auto d-block bef bef-bw-0__0__2px__0 bef-w-100px bef-bcFocus-primary" 
        value="${
          product.preference !== 0 ? product.preference : ""
        }" placeholder="${product.preference !== 0 ? product.preference : ""}"
        min="0" max="10"/>
      </div>
    </div>
  `;
    window.cssCreate();
  });
  if (!!productsDiv) {
    productsDiv.innerHTML = productsView;
  }
}

function checkInputValid(id: string) {
  let productInput: null | HTMLElement = document.getElementById(
    `input-container-${id}`
  );
  if (!!productInput) {
    let input: null | HTMLInputElement = productInput.querySelector("input");
    if (!!input) {
      if (
        isNaN(parseInt(input.value)) ||
        parseInt(input.value) < 0 ||
        parseInt(input.value) > 10
      ) {
        input.placeholder = input.value;
        input.removeAttribute("value");
        let alert: null | HTMLElement = productInput.querySelector(
          "#alert-" + id
        );
        if (!alert) {
          productInput.innerHTML += `
          <div id="alert-${id}" class="alert text-danger">
            El valor debe estar entre 0 y 10
          </div>
          `;
        }
        if (!lockeds.includes(input.name)) {
          lockeds.push(input.name);
        }
      } else {
        let alert: null | HTMLElement = productInput.querySelector(
          "#alert-" + id
        );
        if (!!alert) {
          alert.remove();
        }
        if (lockeds.includes(input.name)) {
          lockeds = lockeds.filter((locked) => locked !== input?.name);
        }
      }
      checkIfFormIsValid();
    }
  }
}

function onSubmit() {
  let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
  inputs.forEach((input) => {
    products.find((product) => {
      if (product.name === input.name) {
        product.preference =
          !isNaN(parseInt(input.value)) &&
          parseInt(input.value) >= 0 &&
          parseInt(input.value) <= 10
            ? (parseInt(input.value) as IntRange<0, 10>)
            : 0;
      }
    });
  });
  configProductsView();
  createModal();
}

function createModal() {
  let main: null | HTMLElement = document.querySelector("main");
  if (!!main) {
    main.innerHTML += `
      <div id="modal">
        <div onclick="closeModal()" class="bef bef-w-100vw bef-h-100vh position-fixed start-0 top-0 bef-bg-dark__OPA__0_50 bef-z-100"></div>
        <div class="position-fixed w-75 p-3 bef bef-s-12_5vw bef-t-12_5vh bef-h-75vh bef-bg-white bef-overflowY-scroll rounded  bef-z-150">
        <button class="position-absolute bef bef-t-0_5rem bef-e-0_5rem btn btn-warning" onclick="closeModal()" >X</button> 
        <h2 class="text-center bef bef-text-principal my-3">¡Gracias por participar!</h2>
          ${products
            .map((product) => {
              return `
            <div class="d-flex flex-column justify-content-between align-items-center">
              <img class="w-50" src="${product.image}" alt="${product.name}" title="${product.name}" />
              <div class="w-50">  
                <h3 class="bef bef-fs-1rem">${product.name}</h3>
                <p>Preferencia: ${product.preference}</p>
              </div>
            </div>
            `;
            })
            .join("")}
            <button class="d-block mx-auto btn btn-warning" onclick="closeModal()" >Cerrar</button> 
        </div>
      </div>
      `;
    window.cssCreate();
  }
}

function closeModal() {
  let modal: null | HTMLElement = document.getElementById("modal");
  if (!!modal) {
    modal.remove();
  }
}

function checkIfFormIsValid() {
  let submitBTN: null | HTMLElement = document.getElementById("submitBTN");
  if (!!submitBTN) {
    if (lockeds.length === 0) {
      submitBTN.removeAttribute("disabled");
    } else {
      submitBTN.setAttribute("disabled", "true");
    }
  }
}

function getRandomString(length: number): string {
  let result: string = "";
  let characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength: number = characters.length;
  for (let i: number = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
