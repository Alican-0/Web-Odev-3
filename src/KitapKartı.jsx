import React from 'react';

const KitapKartı = ({ baslik, yazar, kategori, id, favorideMi, toggleFavori }) => {
  const handleToggle = () => {
    toggleFavori(id);
  };
  
  const buttonText = favorideMi ? '★ FAVORİDE' : '☆ FAVORİ EKLE';

  return (
    <div className="kitap-karti">
      <div className="kitap-info">
        <h3>{baslik}</h3>
        <p>{yazar} - {kategori}</p>
      </div>
      
      <button 
        onClick={handleToggle}
        className={favorideMi ? 'favori-button favoride' : 'favori-button'}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default KitapKartı;