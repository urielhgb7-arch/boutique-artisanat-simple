import { useProduits } from '../../hooks/useProduits';
import { usePanier } from '../../context/PanierContext';

export default function CatalogueProduits() {
  const { produits, loading, error } = useProduits();
  const { ajouterProduit } = usePanier();

  if (loading) return <p>Chargement du catalogue...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="catalogue">
      {produits.map((produit) => (
        <div key={produit.id} className="carte-produit">
          <img src={produit.photo_url} alt={produit.nom} />
          <h3>{produit.nom}</h3>
          <p>{produit.prix} FCFA</p>
          <button onClick={() => ajouterProduit(produit)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
}