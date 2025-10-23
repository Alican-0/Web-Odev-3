import React from 'react';

const KategoriFiltre = ({ kategori, setKategori, kategoriler }) => {
  return (
    <select
      value={kategori}
      onChange={(e) => setKategori(e.target.value)}
      className="kategori-select"
    >
      {kategoriler.map(kat => (
        <option key={kat} value={kat}>
          {kat}
        </option>
      ))}
    </select>
  );
};

export default KategoriFiltre;