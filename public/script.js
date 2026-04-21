async function loadProduk() {
  const res = await fetch('/api/produk');
  const data = await res.json();

  const list = document.getElementById('listProduk');
  list.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama_produk} | Harga: ${item.harga} | Stok: ${item.stok}`;
    list.appendChild(li);
  });
}

document.getElementById('formProduk').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nama_produk = document.getElementById('nama_produk').value;
  const harga = document.getElementById('harga').value;
  const stok = document.getElementById('stok').value;

  await fetch('/api/produk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nama_produk, harga, stok })
  });

  this.reset();
  loadProduk();
});

loadProduk();