import React, { useState, useEffect, useMemo } from 'react';
import KitapListe from './KitapListe';
import AramaCubugu from './AramaCubugu';
import KategoriFiltre from './KategoriFiltre';
import FavoriPanel from './FavoriPanel';
import './App.css'; 

const initialKitaplar = [
  { id: 101, baslik: "Yüzyıllık Yalnızlık", yazar: "Gabriel García Márquez", kategori: "Edebiyat" },
  { id: 102, baslik: "Suç ve Ceza", yazar: "Fyodor Dostoyevski", kategori: "Edebiyat" },
  { id: 103, baslik: "Kürk Mantolu Madonna", yazar: "Sabahattin Ali", kategori: "Edebiyat" },
  
  { id: 201, baslik: "Temiz Kod (Clean Code)", yazar: "Robert C. Martin", kategori: "Yazılım" },
  { id: 202, baslik: "Yazılım Mimarisinde Temeller", yazar: "Simon Brown", kategori: "Yazılım" },
  { id: 203, baslik: "Yapısal Programlamanın Gücü", yazar: "Edsger W. Dijkstra", kategori: "CS" },
  
  { id: 301, baslik: "Alışkanlıkların Gücü", yazar: "Charles Duhigg", kategori: "Gelişim" },
  { id: 302, baslik: "İnsanları Nasıl Kazanırız", yazar: "Dale Carnegie", kategori: "Gelişim" },
  
  { id: 401, baslik: "Don't Make Me Think", yazar: "Steve Krug", kategori: "UX/Tasarım" },
  { id: 402, baslik: "Sanatın Öyküsü", yazar: "E.H. Gombrich", kategori: "Sanat" },
];

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    try {
        return saved ? JSON.parse(saved) : defaultValue;
    } catch {
        return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};


const App = () => {
  const [aramaMetni, setAramaMetni] = useLocalStorageState('aramaMetni', '');
  const [kategori, setKategori] = useState('Tümü');
  const [favoriler, setFavoriler] = useLocalStorageState('favoriler', []); 

  const toggleFavori = (kitapId) => {
    setFavoriler(prevFavoriler => {
      if (prevFavoriler.includes(kitapId)) {
        return prevFavoriler.filter(id => id !== kitapId);
      } else {
        return [...prevFavoriler, kitapId];
      }
    });
  };

  const filtrelenmisKitaplar = useMemo(() => {
    return initialKitaplar
      .filter(kitap => 
        kategori === 'Tümü' || kitap.kategori === kategori
      )
      .filter(kitap => 
        kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) || 
        kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
      )
      .map(kitap => ({
        ...kitap,
        favorideMi: favoriler.includes(kitap.id),
      }));
  }, [kategori, aramaMetni, favoriler]);

  const favoriKitaplar = useMemo(() => {
    return initialKitaplar.filter(kitap => favoriler.includes(kitap.id));
  }, [favoriler]);

  const mevcutKategoriler = ['Tümü', ...new Set(initialKitaplar.map(k => k.kategori))];

  return (
    <div className="container">
      <h1>Mini Kitaplık</h1>
      
      <div className="search-filter-area">
        <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
        <KategoriFiltre 
          kategori={kategori} 
          setKategori={setKategori} 
          kategoriler={mevcutKategoriler}
        />
      </div>

      <div className="content-area">
        <div className="kitap-listesi-container">
          <KitapListe kitaplar={filtrelenmisKitaplar} toggleFavori={toggleFavori} />
        </div>
        
        <div className="favori-panel-container">
          <FavoriPanel 
            favoriKitaplar={favoriKitaplar} 
            toggleFavori={toggleFavori} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;