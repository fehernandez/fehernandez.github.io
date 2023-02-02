// Cart Start!

// DECLARATE LET AND CONST

let emptyCartButton = document.getElementById('empty-cart')
let continueCheckoutButton = document.getElementById('continue-checkout')
let modal = document.getElementsByClassName("modal-body")
let addProducts = document.querySelectorAll('.add-product')
let pricePerProduct
let precioCadaProducto
let namePerProduct
let idCadaProducto
let priceWithout
let total = 0
let productsList = document.querySelector('.products-list')
const cards = document.querySelectorAll('.card')
const newLi = ""


cards.forEach((card) => {
    card.addEventListener('click', (e) => {
        readDatesProducts(e.target.parentElement)
        writeProductList(newLi, namePerProduct)
    })
});

function readDatesProducts(producto) {

    const infoCadaProducto = {
        precio: producto.querySelector('.card-text').textContent,
        id: producto.querySelector('.btn').getAttribute('data-id'),
        nombre: producto.querySelector('.card-title').textContent
    }

    precioCadaProducto = infoCadaProducto.precio.replace(/[^0-9]+/g, "");

    namePerProduct = infoCadaProducto.nombre
    idCadaProducto = Number(infoCadaProducto.id)

    arrayCart.push(infoCadaProducto)

    localStorage.setItem('precio', Number(precioCadaProducto))
    localStorage.setItem('nombre', namePerProduct)
    localStorage.setItem('id', idCadaProducto)

    total = Number(precioCadaProducto) + total

    localStorage.setItem('totalPriceFinal', total)
    document.getElementById("total-price").innerHTML = 'Precio Total $ ' + total

}

let arrayCart = []

if (localStorage.counterProduct == 0 ) {
    document.getElementById("total-price").innerHTML = 'Precio Total $ 0' 
}

function emptyCartEvent() {

    if (localStorage.counterProduct != 0) {

        arrayCart = []
        localStorage.productsList = ''
        localStorage.counterProduct = 0
        localStorage.totalPriceFinal = 0
        total = 0
        document.getElementById("number-cart").innerHTML = localStorage.counterProduct;
        document.getElementById("total-price").innerHTML = 'Precio Total $ ' + localStorage.totalPriceFinal
        let cleanProductList = ""
        document.querySelector('.products-list').innerHTML = cleanProductList

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Productos del carrito eliminados con exito'
        })

    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'El carrito se encuentra vacio, no hay productos que eliminar'
        })
    }

}

refreshList(newLi, arrayCart)

function counterProductsEvent() {

    // Refresh
    if (localStorage.counterProduct) {
        localStorage.counterProduct = Number(localStorage.counterProduct) + 1;
    } else {
        localStorage.counterProduct = 1;
    }
    document.getElementById("number-cart").innerHTML = localStorage.counterProduct;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Producto añadido al carrito'
    })
}

if (localStorage.counterProduct) {
    document.getElementById("number-cart").innerHTML = localStorage.counterProduct
} else {
    localStorage.counterProduct = 0
}

// LIST OF PRODUCTS MODAL

function writeProductList(newLi, namePerProduct) {

    newLi = document.createElement('li')

    newLi.innerHTML = `<li>${namePerProduct + ' $' + localStorage.precio}</li>`
    productsList.appendChild(newLi)
    localStorage.setItem('productsList', JSON.stringify(arrayCart))

}

function refreshList(newLi, arrayCart) {

    if (localStorage.productsList) {

        JSON.parse(localStorage.productsList)

        arrayCart = JSON.parse(localStorage.productsList)

        arrayCart.forEach(element => {
            newLi = document.createElement('li')
            productsList.appendChild(newLi)
            newLi.innerHTML = `<li>${element.nombre + ' ' + element.precio}</li>`
        });

    }

}

// Refresh 
arrayCart.forEach(element => {
    newLi.innerHTML = `<li>${element.nombre + ' $' + element.precio}</li>`
});

// Refresh
if (localStorage.productsList) {

    arrayCart = JSON.parse(localStorage.productsList)

    arrayCart.forEach(element => {
        priceWithout = element.precio.replace(/[^0-9]+/g, "");
        total = Number(priceWithout) + total
    });

    document.getElementById("total-price").innerHTML = 'Precio Total $ ' + total
}

// CART END !

// LOGIN START !

// DECLARATE LET AND CONST

const signRegisterButton = document.getElementById('buttonSignRegister')
const signWelcomeButton = document.getElementById('buttonSignWelcome')
const loginButton = document.getElementById('buttonLogin')
const volverButton = document.getElementById('buttonVolver')
let formLogin = document.getElementById('formLogin')
let formRegister = document.getElementById('formRegister')
let signoDolar = document.querySelectorAll('.card-text')
let closeIcon = document.getElementById('close-icon')
let personIcon = document.getElementById('person-icon')


// EVENTS

formLogin.addEventListener("submit", (e) => {

    e.preventDefault()
    let passwordLogin = document.getElementById('passwordUser').value
    let userLogin = document.getElementById('usuarioUser').value
    let datesLogin = {
        user: userLogin,
        pass: passwordLogin,
    }

    saveDatesLogin(datesLogin, userLogin, passwordLogin)
    validarDatos()
    formLogin.reset()
})

formRegister.addEventListener("submit", (e) => {
    e.preventDefault()
    let emailSign = document.getElementById('emailNew').value
    let passwordSign = document.getElementById('passwordNew').value
    let userSign = document.getElementById('usuarioNew').value
    let nameSign = document.getElementById('nameNew').value
    let surnameSign = document.getElementById('surnameNew').value
    let datosRegister = {
        user: userSign,
        pass: passwordSign,
        email: emailSign,
        nombre: nameSign,
        surname: surnameSign
    }

    saveDatesSign(datosRegister, userSign, passwordSign, nameSign, surnameSign, emailSign)
    hideLogin()
    formRegister.reset()
})

signWelcomeButton.addEventListener('click', () => {
    hideSignIn()
})

volverButton.addEventListener('click', () => {
    hideLogin()
});

closeIcon.addEventListener('click', () => {

    localStorage.datosRegister = ''
    localStorage.userSign = ''
    localStorage.passwordSign = ''
    localStorage.nameSign = ''

    personIcon.className = 'fa-solid fa-user'

    hideLogin()
    formLogin.reset()

});

continueCheckoutButton.addEventListener('click', () => {

    if (localStorage.counterProduct != 0) {

        if (localStorage.userLogin && localStorage.userSign && localStorage.passwordLogin && localStorage.passwordSign) {

            if ((localStorage.userLogin === localStorage.userSign) && (localStorage.passwordLogin === localStorage.passwordSign)) {

                setTimeout(() => {
                    location.href = "../pages/checkout.html";
                }, 1700);
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
    
                Toast.fire({
                    icon: 'success',
                    title: 'Procesando pedido aguarde un momento...'
                })
    
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
    
                Toast.fire({
                    icon: 'error',
                    title: 'El carrito se encuentra vacìo, añade productos para continuar con la compra'
                })
    
            }
            
        } else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Por favor inicie sesiòn antes de realizar su pedido'
            })
        }

    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'El carrito se encuentra vacìo, añade productos antes de continuar con la compra'
        })

    }

})

// FUNCTIONS 

function loginTrue() {
    if ((localStorage.userLogin == localStorage.userSign) && (localStorage.passwordLogin == localStorage.passwordSign)) {
        closeIcon.className = 'fas fa-sign-out-alt'
        personIcon.className = 'fa-solid fa-user d-none'
    } else {
        closeIcon.className = 'fas fa-sign-out-alt d-none'
    }

}

if (localStorage.userLogin && localStorage.userSign && localStorage.passwordLogin && localStorage.passwordSign) {
    loginTrue()
}

function validarDatos() {
    if ((localStorage.userLogin == localStorage.userSign) && (localStorage.passwordLogin == localStorage.passwordSign)) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Inicio de sesion realizado con exito'
        })

        setTimeout(() => {
            location.href = "../index.html";
        }, 2000);

        closeIcon.className = 'fas fa-sign-out-alt'
        personIcon.className = 'fa-solid fa-user d-none'
    } else {
        closeIcon.className = 'fas fa-sign-out-alt d-none'
        formLogin.reset()

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Usuario o contraseña invalidas'
        })
    }
}

function saveDatesSign(datosRegister, userSign, passwordSign, nameSign, surnameSign, emailSign) {
    localStorage.setItem("datosRegister", JSON.stringify(datosRegister))
    localStorage.setItem("userSign", JSON.stringify(userSign))
    localStorage.setItem("passwordSign", JSON.stringify(passwordSign))
    localStorage.setItem("nameSign", JSON.stringify(nameSign))
    localStorage.setItem("surnameSign", JSON.stringify(surnameSign))
    localStorage.setItem("emailSign", JSON.stringify(emailSign))

}

function saveDatesLogin(datesLogin, userLogin, passwordLogin) {
    localStorage.setItem("datesLogin", JSON.stringify(datesLogin))
    localStorage.setItem("userLogin", JSON.stringify(userLogin))
    localStorage.setItem("passwordLogin", JSON.stringify(passwordLogin))
}

function hideSignIn() {
    formLogin.className = 'form-user d-none';
    formRegister.className = 'form-user';
}

function hideLogin() {
    formLogin.className = 'form-user';
    formRegister.className = 'form-user d-none';
}

function hideForm() {
    formLogin.className = 'form-user d-none';
    formRegister.className = 'form-user d-none';

}


// LOGIN END!

// CHECKOUT START

if (document.getElementById('form')) {

    localStorage.nameSign = localStorage.nameSign.replace(/['"]+/g, '')
    localStorage.surnameSign = localStorage.surnameSign.replace(/['"]+/g, '')
    localStorage.emailSign = localStorage.emailSign.replace(/['"]+/g, '')


    document.getElementById('name').value = localStorage.nameSign
    document.getElementById('surname').value = localStorage.surnameSign
    document.getElementById('email').value = localStorage.emailSign

    const randomNumber = random(500, 5000)
    const timeaprox = random(10, 30)

    document.getElementById('randomNumber').value = randomNumber

    document.getElementById('randomNumber').innerHTML = `<h1 id="randomNumber" name="randomNumber">Pedido #${randomNumber}</h1>`

    document.querySelector('.randomNumber').value = randomNumber

    document.querySelector('.timeAprox').value = timeaprox

    document.querySelector('.productsListCheckout').value = document.querySelector('.products-list').textContent
    const btn = document.getElementById('button');

    document.getElementById('form')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            btn.value = 'Realizando envio';

            const serviceID = 'default_service';
            const templateID = 'template_x06nrvn';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Send Email';
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido realizado con exito, revise su correo electronico donde encontrarà los detalles del mismo',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }, () => {
                    btn.value = 'Send Email';
                    Swal.fire({
                        icon: 'error',
                        title: 'Ingrese un email valido',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        });
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// CHECKOUT END

