import { useState } from 'react';
import { usePanier } from '../../context/PanierContext';
import { creerCommande } from '../../services/api';

export default function FormulaireCommande({ onSuccess }) {
  const { items, viderPanier } = usePanier();
  const [nom, setNom] = useState('');
  const [contact, setContact] = useState('');
  const [erreur, setErreur] = useState(null);
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);
    try {
      const itemsAEnvoyer = items.map((i) => ({ produit_id: i.produit_id, quantite: i.quantite }));
      const commande = await creerCommande({ nom, contact }, itemsAEnvoyer);
      viderPanier();
      onSuccess(commande);
    } catch (err) {
      setErreur(err.message);
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Votre nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Numéro WhatsApp / téléphone"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      {erreur && <p className="erreur">{erreur}</p>}
      <button type="submit" disabled={envoi || items.length === 0}>
        {envoi ? 'Envoi...' : 'Passer la commande'}
      </button>
    </form>
  );
}