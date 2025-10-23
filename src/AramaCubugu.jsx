import React from 'react';

const AramaCubugu = ({ aramaMetni, setAramaMetni }) => {
  return (
    <input
      type="text"
      placeholder="Başlık veya yazar ara..."
      value={aramaMetni}
      onChange={(e) => setAramaMetni(e.target.value)}
      className="arama-input"
    />
  );
};

export default AramaCubugu;