const urunler = [
    { id: 1, ad: "Kablosuz Kulaklık", kategori: "Elektronik", fiyat: 1250 },
    { id: 2, ad: "Mekanik Klavye", kategori: "Elektronik", fiyat: 2100 },
    { id: 3, ad: "Laptop Çantası", kategori: "Aksesuar", fiyat: 750 },
    { id: 4, ad: "USB-C Hub", kategori: "Aksesuar", fiyat: 950 },
    { id: 5, ad: "Web Kamera", kategori: "Elektronik", fiyat: 1600 }
];

let sepet = [];

const urunListesi = document.getElementById("urunListesi");
const sepetElement = document.getElementById("sepet");
const arama = document.getElementById("arama");
const kategori = document.getElementById("kategori");
const toplam = document.getElementById("toplam");
const urunSayisi = document.getElementById("urunSayisi");
const kargo = document.getElementById("kargo");

function urunleriGoster(liste) {
    urunListesi.innerHTML = "";

    for (let urun of liste) {
        const div = document.createElement("div");

        const baslik = document.createElement("h3");
        baslik.innerText = urun.ad;

        const bilgi = document.createElement("p");
        bilgi.innerText = urun.kategori + " - " + urun.fiyat + " TL";

        const btn = document.createElement("button");
        btn.innerText = "Sepete Ekle";

        btn.addEventListener("click", function () {
            sepeteEkle(urun);
        });

        div.appendChild(baslik);
        div.appendChild(bilgi);
        div.appendChild(btn);

        urunListesi.appendChild(div);

    }

}

function sepeteEkle(urun) {
    let bulundu = false;

    for (let item of sepet) {
        if (item.id == urun.id) {
            item.adet++;
            bulundu = true;
        }
    }
    if (bulundu == false) {
        sepet.push({
            id: urun.id,
            ad: urun.ad,
            fiyat: urun.fiyat,
            adet: 1
        });
    }
    sepetiGoster();
}

function sepetiGoster() {
    sepetElement.innerHTML = "";

    for (let item of sepet) {
        const li = document.createElement("li");
        const bilgi = document.createElement("span");

        bilgi.innerText =
            item.ad + " - " +
            item.adet + " - " +
            item.fiyat * item.adet + " TL ";

        const btnArttir = document.createElement("button");
        btnArttir.innerText = "+";

        const btnAzalt = document.createElement("button");
        btnAzalt.innerText = "-";

        const btnSil = document.createElement("button");
        btnSil.innerText = "Sil";

        li.appendChild(bilgi);
        li.appendChild(btnArttir);
        li.appendChild(btnAzalt);
        li.appendChild(btnSil);

        sepetElement.appendChild(li);

        btnArttir.addEventListener("click", function () {
            item.adet++;

            sepetiGoster();
        });

        btnAzalt.addEventListener("click", function () {
            item.adet--;

            if (item.adet == 0)
                urunSil(item.id);

            sepetiGoster();
        });

        btnSil.addEventListener("click", function () {
            urunSil(item.id);

            sepetiGoster();
        });
    }

    sepetHesapla();
}

function urunSil(id) {
    for (let i = 0; i < sepet.length; i++) {
        if (sepet[i].id == id) {
            sepet.splice(i, 1);

            break;
        }
    }
}

function sepetHesapla() {
    let toplamTutar = 0;
    let toplamAdet = 0;

    for (let item of sepet) {
        toplamTutar += item.fiyat * item.adet;

        toplamAdet += item.adet;
    }
    toplam.innerText = "Toplam: " + toplamTutar + " TL";

    if (toplamTutar >= 3000) {
        kargo.innerText = "Kargo Ücretsiz!";

        kargo.style.color = "green";

    }
    else {
        kargo.innerText = "Ücretsiz Kargo İçin " + (3000 - toplamTutar) + " TL Daha Ekleyiniz";

        kargo.style.color = "red";
    }

}

function urunFiltrele() {
    let sonuc = [];

    for (let urun of urunler) {
        let adUygun = urun.ad.toLowerCase().includes(arama.value.toLowerCase());

        let kategoriUygun = kategori.value == "Tümü" || urun.kategori == kategori.value;

        if (adUygun && kategoriUygun)
            sonuc.push(urun);
    }
    urunleriGoster(sonuc);
}
arama.addEventListener("input", urunFiltrele);
kategori.addEventListener("change", urunFiltrele);
urunleriGoster(urunler);
