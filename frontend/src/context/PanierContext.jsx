import { createContext, useContext, useState, useEffect } from 'react';

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('panier');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(items));
  }, [items]);

  function ajouterProduit(produit, quantite = 1) {
    setItems((prev) => {
      const existant = prev.find((i) => i.produit_id === produit.id);
      if (existant) {
        return prev.map((i) =>
          i.produit_id === produit.id ? { ...i, quantite: i.quantite + quantite } : i
        );
      }
      return [...prev, { produit_id: produit.id, nom: produit.nom, prix: produit.prix, quantite }];
    });
  }

  function retirerProduit(produitId) {
    setItems((prev) => prev.filter((i) => i.produit_id !== produitId));
  }

  function viderPanier() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.prix * i.quantite, 0);

  return (
    <PanierContext.Provider value={{ items, ajouterProduit, retirerProduit, viderPanier, total }}>
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}