// database produk
let dataProduk = [
    {
        id: 1,
        nama: "iPhone 12",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021661000",
        harga: 23000000,
        stok: 12
    },
    {
        id: 2,
        nama: "Samsung Galaxy Note 20",
        img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-note20-ultra-1.jpg",
        harga: 22500000,
        stok: 20
    },
    {
        id: 3,
        nama: "Google Pixel 5 5G",
        img: "https://www.xda-developers.com/files/2020/09/Google-Pixel-5-in-Green-3-1.jpg",
        harga: 8960000,
        stok: 5
    },
    {
        id: 4,
        nama: "OnePlus 8T",
        img: "https://p.ipricegroup.com/uploaded_234cf54ddcf832acc162c549230fa0f3.jpg",
        harga: 6570000,
        stok: 8
    }
]

// database cart
let dataCart = []

// class untuk bikin object produk
class Produk {
    constructor(id, nama, img, harga, stok) {
        this.id = id,
        this.nama = nama,
        this.img = img,
        this.harga = harga,
        this.stok = stok
    }
}

// class untuk isi cart
class Cart {
    constructor(id, nama, img, harga, quantity) {
        this.id = id,
        this.nama = nama,
        this.img = img,
        this.harga = harga,
        this.quantity = quantity
    }

    //add method untuk menentukan jumlah
    total = function() {
        let total = this.quantity * this.harga
        return total
    }
}