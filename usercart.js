function OnButtonCart(index) {
    // nambah quantity
    // sebelum masukin value ke database cart
    // check apakah produk udah ada di cart ato ga dengan cara:
    // 1. kita copy seluruh prop dan value yang ada di dataProduk[index]
    //    ke dalam satu object produk
    let produk = {...dataProduk[index]}

    // 2. lalu kita buat variable untuk menampung INDEX dataCart di mana dataCart = produk
    let cartIndex

    // 3. check apakah prop "nama" di dataCart dan produk sama? pake looping
    //    looping ini TIDAK JALAN kalau dataCart BELUM ADA ISINYA
    for(let i = 0; i < dataCart.length; i++) {
        if(dataCart[i].nama === produk.nama && dataCart[i].harga === produk.harga) {
            cartIndex = i
        }
    }

    // 4. tambahkan produk ke dataCart dengan menggunakan 2 KONDISI
    if(cartIndex !== undefined) {
        dataCart[cartIndex].quantity += 1
    } else {
        // masukin value
        dataCart.push(new Cart(
        dataCart.length+1, 
        dataProduk[index].nama,
        dataProduk[index].img,
        dataProduk[index].harga,
        1
        ))
    }
    console.log(dataCart)

    // update stok
    UpdateStok(index)

    // enable button cetak receipt
    let button = document.getElementById("cetak")
    if(button.disabled) {
        button.disabled = false
    }

    // tampilkan data cart ke html
    ShowUserCart()
    console.log("updated stock: ", dataProduk[index].stok)

    // tampilkan updated stok di daftar produk
    ShowProducts()
}

// show product di cart
function ShowUserCart() {
    // akses tabel cart
    let tabel = document.getElementById("user-cart")
    console.log(tabel)

    // define tbody di user-cart
    let tbodyCart = tabel.getElementsByTagName("tbody")[0]
    let tr = ""
    for(let i = 0; i < dataCart.length; i++) {
        tr += `
        <tr>
            <td>${i + 1}</td>
             <td>${dataCart[i].nama}</td>
            <td>
                <img src="${dataCart[i].img}" height="70px"/>
            </td>
            <td>${dataCart[i].harga}</td>
            <td>${dataCart[i].quantity}</td>
            <td>${dataCart[i].total()}</td>
            <td>
                <button class="delete-cart" onclick="OnButtonDeleteCart(${i})">DELETE</button>
            </td>
        </tr>
        `
    }
    tbodyCart.innerHTML = tr
}

// delete cart
function OnButtonDeleteCart(index) {
    // cari index di dataProduk yang valuenya sama dengan dataCart
    // carinya pake method .findIndex()
    // prinsipnya sama kaya loop tapi lebih 'sederhana' bentuknya
    let idxProduk = dataProduk.findIndex((item) => item.nama === dataCart[index].nama)

    if(dataCart[index].quantity > 1) {
        dataCart[index].quantity -= 1
    } else {
        dataCart.splice(index, 1)
    }

    dataProduk[idxProduk].stok += 1

    // disable button cetak kalo dataCart kosong
    let button = document.getElementById("cetak")
    if(dataCart.length === 0) {
        button.disabled = true
    }

    ShowUserCart()
    ShowProducts()
}