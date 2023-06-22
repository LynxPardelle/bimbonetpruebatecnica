var products = [
    {
        _id: getRandomString(10),
        image: "./assets/img/caja0.JPG",
        name: "Pan de caja 0",
        preference: 0
    },
    {
        _id: getRandomString(10),
        image: "./assets/img/littleBites.JPG",
        name: "Little Bites",
        preference: 0
    },
    {
        _id: getRandomString(10),
        image: "./assets/img/mediasNoches.JPG",
        name: "Medias Noches",
        preference: 5
    },
    {
        _id: getRandomString(10),
        image: "./assets/img/tostado.JPG",
        name: "Pan tostado",
        preference: 6
    },
    {
        _id: getRandomString(10),
        image: "./assets/img/donas.JPG",
        name: "Donas",
        preference: 3
    },
];
var lockeds = ["Pan de caja 0", "Little Bites"];
configProductsView();
function configProductsView() {
    var productsDiv = document.getElementById("products");
    var productsView = "";
    products.forEach(function (product) {
        /* <h3>${product.name}</h3> */
        productsView += "\n    <div class=\"d-flex flex-wrap justify-content-between align-items-center bef bef-wmx-320px my-3\">\n      <img class=\"w-50\" src=\"" + product.image + "\" alt=\"" + product.name + "\" />\n      <div id=\"input-container-" + product._id + "\" class=\"w-50\">\n        <input type=\"number\" \n        name=\"" + product.name + "\" id=\"" + product.name + "\"\n        onkeyup=\"checkInputValid('" + product._id + "')\"\n        class=\"text-center mx-auto d-block bef bef-bw-0__0__2px__0 bef-w-100px bef-bcFocus-primary\" \n        value=\"" + (product.preference !== 0 ? product.preference : "") + "\" placeholder=\"" + (product.preference !== 0 ? product.preference : "") + "\"\n        min=\"0\" max=\"10\"/>\n      </div>\n    </div>\n  ";
        window.cssCreate();
    });
    if (!!productsDiv) {
        productsDiv.innerHTML = productsView;
    }
}
function checkInputValid(id) {
    var productInput = document.getElementById("input-container-" + id);
    if (!!productInput) {
        var input_1 = productInput.querySelector("input");
        if (!!input_1) {
            if (isNaN(parseInt(input_1.value)) ||
                parseInt(input_1.value) < 0 ||
                parseInt(input_1.value) > 10) {
                input_1.placeholder = input_1.value;
                input_1.removeAttribute("value");
                var alert = productInput.querySelector("#alert-" + id);
                if (!alert) {
                    productInput.innerHTML += "\n          <div id=\"alert-" + id + "\" class=\"alert text-danger\">\n            El valor debe estar entre 0 y 10\n          </div>\n          ";
                }
                if (!lockeds.includes(input_1.name)) {
                    lockeds.push(input_1.name);
                }
            }
            else {
                var alert = productInput.querySelector("#alert-" + id);
                if (!!alert) {
                    alert.remove();
                }
                if (lockeds.includes(input_1.name)) {
                    lockeds = lockeds.filter(function (locked) { return locked !== (input_1 === null || input_1 === void 0 ? void 0 : input_1.name); });
                }
            }
            checkIfFormIsValid();
        }
    }
}
function onSubmit() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        products.find(function (product) {
            if (product.name === input.name) {
                product.preference =
                    !isNaN(parseInt(input.value)) &&
                        parseInt(input.value) >= 0 &&
                        parseInt(input.value) <= 10
                        ? parseInt(input.value)
                        : 0;
            }
        });
    });
    configProductsView();
    createModal();
}
function createModal() {
    var main = document.querySelector("main");
    if (!!main) {
        main.innerHTML += "\n      <div id=\"modal\">\n        <div onclick=\"closeModal()\" class=\"bef bef-w-100vw bef-h-100vh position-fixed start-0 top-0 bef-bg-dark__OPA__0_50 bef-z-100\"></div>\n        <div class=\"position-fixed w-75 p-3 bef bef-s-12_5vw bef-t-12_5vh bef-h-75vh bef-bg-white bef-overflowY-scroll rounded  bef-z-150\">\n        <button class=\"position-absolute bef bef-t-0_5rem bef-e-0_5rem btn btn-warning\" onclick=\"closeModal()\" >X</button> \n        <h2 class=\"text-center bef bef-text-principal my-3\">\u00A1Gracias por participar!</h2>\n          " + products
            .map(function (product) {
            return "\n            <div class=\"d-flex flex-column justify-content-between align-items-center\">\n              <img class=\"w-50\" src=\"" + product.image + "\" alt=\"" + product.name + "\" title=\"" + product.name + "\" />\n              <div class=\"w-50\">  \n                <h3 class=\"bef bef-fs-1rem\">" + product.name + "</h3>\n                <p>Preferencia: " + product.preference + "</p>\n              </div>\n            </div>\n            ";
        })
            .join("") + "\n            <button class=\"d-block mx-auto btn btn-warning\" onclick=\"closeModal()\" >Cerrar</button> \n        </div>\n      </div>\n      ";
        window.cssCreate();
    }
}
function closeModal() {
    var modal = document.getElementById("modal");
    if (!!modal) {
        modal.remove();
    }
}
function checkIfFormIsValid() {
    var submitBTN = document.getElementById("submitBTN");
    if (!!submitBTN) {
        if (lockeds.length === 0) {
            submitBTN.removeAttribute("disabled");
        }
        else {
            submitBTN.setAttribute("disabled", "true");
        }
    }
}
function getRandomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
