import React from 'react';
import KitapKartı from './KitapKartı';

const KitapListe = ({ kitaplar, toggleFavori }) => {
  if (kitaplar.length === 0) {
    return <p>Aradığınız kriterlere uygun kitap bulunamadı.</p>;
  }

  return (
    <div className="kitap-liste">
      {kitaplar.map(kitap => (
        <KitapKartı 
          key={kitap.id} 
          {...kitap} 
          toggleFavori={toggleFavori} 
        />
      ))}
    </div>
  );
};

export default KitapListe;