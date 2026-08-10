import { usePanier } from '../../context/PanierContext';

export default function Panier() {
  const { items, retirerProduit, total } = usePanier();

  if (items.length === 0) return <p>Panier vide</p>;

  return (
    <div className="panier">
      <h3>Mon panier</h3>
      {items.map((item) => (
        <div key={item.produit_id} className="ligne-panier">
          <span>{item.nom} x{item.quantite}</span>
          <span>{item.prix * item.quantite} FCFA</span>
          <button onClick={() => retirerProduit(item.produit_id)}>Retirer</button>
        </div>
      ))}
      <p><strong>Total : {total} FCFA</strong></p>
    </div>
  );
}