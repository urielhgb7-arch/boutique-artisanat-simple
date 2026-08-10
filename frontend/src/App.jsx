import { useState } from 'react';
import CatalogueProduits from './components/CatalogueProduits/CatalogueProduits';
import Panier from './components/Panier/Panier';
import FormulaireCommande from './components/Commande/FormulaireCommande';
import ConfirmationCommande from './components/Commande/ConfirmationCommande';

function App() {
  const [commandeConfirmee, setCommandeConfirmee] = useState(null);

  if (commandeConfirmee) {
    return <ConfirmationCommande commande={commandeConfirmee} />;
  }

  return (
    <div className="app">
      <h1>Boutique Artisanat</h1>
      <CatalogueProduits />
      <Panier />
      <FormulaireCommande onSuccess={setCommandeConfirmee} />
    </div>
  );
}

export default App;