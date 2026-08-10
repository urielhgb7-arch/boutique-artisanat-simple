const API_URL = import.meta.env.VITE_API_URL;

export async function getProduits() {
  const res = await fetch(`${API_URL}/produits`);
  if (!res.ok) throw new Error('Erreur chargement produits');
  return res.json();
}

export async function creerCommande(client, items) {
  const res = await fetch(`${API_URL}/commandes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client, items }),
  });
  if (!res.ok) throw new Error('Erreur création commande');
  return res.json();
}