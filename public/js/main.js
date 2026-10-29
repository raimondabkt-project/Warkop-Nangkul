let addToCard = (x) => {
    window.alert("Berhasil ditambahkan!")
}

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }