import React from 'react';

const FavoriPanel = ({ favoriKitaplar, toggleFavori }) => {
  return (
    <div className="favori-panel">
      <h2>Favoriler ({favoriKitaplar.length})</h2>
      
      {favoriKitaplar.length === 0 ? (
        <p>Henüz favori kitabınız yok.</p>
      ) : (
        <ul>
          {favoriKitaplar.map(kitap => (
            <li key={kitap.id} className="favori-item">
              <span>{kitap.baslik}</span>
              <button 
                onClick={() => toggleFavori(kitap.id)}
                className="kaldir-button"
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriPanel;