function OnButtonCetak() {
    let output = document.getElementById("output")

    let receipt = "Receipt: <br>"
    let total = 0
    for(let i = 0; i < dataCart.length; i++) {
        receipt += `${dataCart[i].nama}: ${dataCart[i].quantity} x ${dataCart[i].harga} = ${dataCart[i].total()} <br>`
        total += dataCart[i].total()
    }
    receipt += `<br> Total Belanja = Rp.${total}`

    output.innerHTML = receipt

    // kalo tombol cetak diklik, tombol delete dan add to cart disabled
    let btnDeleteCart = document.body.getElementsByClassName("delete-cart")
    let btnAddCart = document.body.getElementsByClassName("add-cart")

    // bentuk lain dari for loop. coba pelajari lagi yang lain!!
    for(let item of btnDeleteCart) {
        item.disabled = true
    }

    for(let item of btnAddCart) {
        item.disabled = true
    }

    // show checkout button and input
    let checkout = document.getElementById("checkout")
    let input = document.getElementById("uang")
    checkout.hidden = false
    input.hidden = false
}

// checkout
function OnButtonCheckout() {
    // get value dari input
    let uang = document.getElementById("uang")
    let uangUser = parseInt(uang.value)

    // hitung total belanja
    let total = 0
    for(let item of dataCart) {
        total += item.total()
    }

    // cek kembalian
    let kembalian = uangUser - total

    // bandingkan total belanja dengan jumlah uang user
    if(kembalian < 0) {
        alert("Uang tidak cukup")
    } else if(isNaN(uangUser)) {
        alert("Masukan jumlah uang yang ingin dibayarkan")
    } else if(kembalian >= 0){
        alert("Terima kasih sudah berbelanja")
        Reset()
    }
}

// reset
function Reset() {
    // setelah proses checkout, reset semua kondisi
    // dataCart = []
    // button direset. jadi buttonnya dienable lagi. kecuali button cetak didisable
    dataCart = [] 

    // enable delete dan add to cart
    let btnDeleteCart = document.body.getElementsByClassName("delete-cart")
    let btnAddCart = document.body.getElementsByClassName("add-cart")
    let btnCetak = document.getElementById("cetak")
    btnCetak.disabled = true

    for(let item of btnDeleteCart) {
        item.disabled = false
    }

    for(let item of btnAddCart) {
        item.disabled = false
    }

    // hapus receipt
    let receipt = document.getElementById("output")
    receipt.textContent = "Receipt: "

    // hapus input bayar dari user
    uang.value = ""

    // show checkout button and input
    let checkout = document.getElementById("checkout")
    checkout.hidden = true
    uang.hidden = true

    // tampilkan product dan cart lagi de~
    ShowProducts()
    ShowUserCart()
}