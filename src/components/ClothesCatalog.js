import React from 'react';

const clothes = [
  { id: 1, name: 'Shirt 1', url: 'https://via.placeholder.com/200x300?text=Shirt+1' },
  { id: 2, name: 'T-Shirt 1', url: 'https://via.placeholder.com/200x300?text=T-Shirt+1' },
  { id: 3, name: 'Dress 1', url: 'https://via.placeholder.com/200x300?text=Dress+1' },
  { id: 4, name: 'Shirt 2', url: 'https://via.placeholder.com/200x300?text=Shirt+2' },
  { id: 5, name: 'T-Shirt 2', url: 'https://via.placeholder.com/200x300?text=T-Shirt+2' },
  { id: 6, name: 'Dress 2', url: 'https://via.placeholder.com/200x300?text=Dress+2' },
];

const ClothesCatalog = ({ onSelect }) => {
  return (
    <div className="catalog-section">
      <h2>Clothes Catalog</h2>
      <div className="catalog-grid">
        {clothes.map((item) => (
          <div key={item.id} className="catalog-item" onClick={() => onSelect(item.url)}>
            <img src={item.url} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesCatalog;