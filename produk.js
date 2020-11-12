function ShowProducts(index) {
    // akses tabel dulu
    let table = document.getElementById("daftar-produk")
    console.log(table)

    // akses tbody
    let tbody = table.getElementsByTagName("tbody")[0] // karna kita tau tbodynya cuma 1 jd kita tambahin index ke-0
    console.log(tbody)

    let tr = ""
    for(let i = 0; i < dataProduk.length; i++) {
        
        //kalo index ada inputnya maka code yg dijalankan adalah:
        if(index == i) {
            tr += `
                <tr>
                    <td>#</td>
                    <td>
                        <input type="text" id="nama-baru" value="${dataProduk[i].nama}"/> 
                    </td>
                    <td>
                        <input type="text" id="img-baru" value="${dataProduk[i].img}"/>
                    </td>
                    <td>
                        <input type="number" id="harga-baru" value="${dataProduk[i].harga}"/>
                    </td>
                    <td>
                        <input type="number" id="stok-baru" value="${dataProduk[i].stok}"/>
                    </td>
                    <td>
                        <button onclick="OnButtonSave(${i})">SAVE</button>
                        <button onclick="OnButtonCancel()">CANCEL</button>
                    </td>
                </tr>
            `
        } else { // kalo index gaada input dia jalanin code berikut:
            tr += `
            <tr>
                <td>${i + 1}</td>
                <td class="text">${dataProduk[i].nama}</td>
                <td>
                    <img src="${dataProduk[i].img}" height="70px"/>
                </td>
                <td class="text">${dataProduk[i].harga}</td>
                <td class="text">${dataProduk[i].stok}</td>
                <td>
                    <button onclick="OnButtonDelete(${i})">DELETE</button>
                    <button onclick="OnButtonEdit(${i})">EDIT</button>
                    <button class="add-cart" onclick="OnButtonCart(${i})">ADD TO CART</button>
                </td>
            </tr>`
        }

    }
    tbody.innerHTML = tr
}
ShowProducts()

// add new product manual
// dataProduk.push(new Produk(dataProduk.length + 1, "Samsung Galaxy Fold 2", "https://static.toiimg.com/photo/77382786/Samsung-Galaxy-Z-Fold-2-5G.jpg", 29000000, 8))
// console.log(dataProduk)
// ShowProducts()

// add new product dari user
function OnButtonAdd(event) {
    event.preventDefault()
    console.log("add button diklik")

    // get input value
    let form = document.getElementById("produk-baru")
    // tes valuenya dapet apa ga
    console.log(form, form["nama"].value)

    let nama = form["nama"].value
    let img = form["img"].value
    let harga = form["harga"].value
    let stok = form["stok"].value

    // biar user ga masukin input kosong, kita alert aja
    if(nama === "" || img === "" || harga === "" || stok === "") {
        alert("input masih kosong❌")
    } else if(harga < 0 || stok < 0) {
        alert("input tidak boleh kurang dari 0")
    } else {
        // masukan semua value ke daftar produk
        dataProduk.push(new Produk(
        dataProduk.length + 1,
        nama,
        img,
        parseInt(harga),
        parseInt(stok)
        ))
        console.log(dataProduk)
    }


    // tampilkan ulang produk
    ShowProducts()

    // reset value di form
    form["nama"].value = ""
    form["img"].value = ""
    form["harga"].value = ""
    form["stok"].value = ""
}

// delete produk
function OnButtonDelete(index) {
    // mastiin buttonnya jalan
    console.log(`button index ke-${index} diklik`)
    
    // delete product
    dataProduk.splice(index, 1)

    // tampilkan produk
    ShowProducts()
}

// edit product
function OnButtonEdit(index) {
    // mastiin buttonnya jalan
    console.log(`button index ke-${index} diklik`)

    // tampilin produk beserta input di mana produk mau diedit
    ShowProducts(index)
}

// save product
function OnButtonSave(index) {
    // tampung nilai input masing-masing dalam variabel
    let namaBaru = document.getElementById("nama-baru").value
    let imgBaru = document.getElementById("img-baru").value
    let hargaBaru = parseInt(document.getElementById("harga-baru").value)
    let stokBaru = parseInt(document.getElementById("stok-baru").value)

    // harga dan stok tidak boleh negatif
    if(hargaBaru < 0 || stokBaru < 0) {
        alert("input tidak boleh kurang dari negatif")
    } else {
        // masukin input baru sesuai dengan index yang diubah
        dataProduk[index].nama = namaBaru
        dataProduk[index].img = imgBaru
        dataProduk[index].harga = hargaBaru
        dataProduk[index].stok = stokBaru

        // tampilin produknya
        ShowProducts()
    }
}

// cancel edit product
function OnButtonCancel() {
    // tampilin product aja
    ShowProducts()
}

// update stock
function UpdateStok(index) {
    if(dataProduk[index].stok > 0) {
        dataProduk[index].stok -= 1
    } else {
        alert("Stok Habis")
    }
}

// filter sort
function OnButtonSort() {
    let hasilSort = document.getElementById("sort").value
 
    function sorting (a, b) {
        if(a[hasilSort] > b[hasilSort]) {
            return 1
        } 
        if(a[hasilSort] < b[hasilSort]) {
            return -1
        }
        return 0
    }
    dataProduk.sort(sorting)

    ShowProducts()
}

// search
function OnButtonSearch() {
    // akses tabel dulu
    let table = document.getElementById("daftar-produk")
    console.log(table)
    
    // akses tbody
    let tbody = table.getElementsByTagName("tbody")[0]
    console.log(tbody)

    console.log("search diklik")
    let inputSearch = document.getElementById("search").value.toLowerCase()

    let searchProduk = dataProduk.filter(function(dataProduk) {
        return dataProduk.nama.toLowerCase().includes(inputSearch)
    })
    console.log(searchProduk)

    let idxProduk = []
    for(let i = 0; i < searchProduk.length; i++) {
        for(let j = 0; j < dataProduk.length; j++) {
            if(searchProduk[i].nama === dataProduk[j].nama) {
                idxProduk.push(j)
            }
        }
    }
    console.log(`${idxProduk}`)

    let tr = ""
    for(let i = 0; i < dataProduk.length; i++) {
        for(let j = 0; j < idxProduk.length; j++) {
            if(i == idxProduk[j]) {
                tr += `
                <tr>
                    <td>${j + 1}</td>
                    <td class="text">${dataProduk[i].nama}</td>
                    <td>
                        <img src="${dataProduk[i].img}" height="70px"/>
                    </td>
                    <td class="text">${dataProduk[i].harga}</td>
                    <td class="text">${dataProduk[i].stok}</td>
                    <td>
                        <button onclick="OnButtonDelete(${i})">DELETE</button>
                        <button onclick="OnButtonEdit(${i})">EDIT</button>
                        <button class="add-cart" onclick="OnButtonCart(${i})">ADD TO CART</button>
                    </td>
                </tr>`
            }
        }
        tbody.innerHTML = tr
    }

}