export default function ConfirmationCommande({ commande }) {
  return (
    <div className="confirmation">
      <h3>Commande confirmée !</h3>
      <p>Numéro de commande : #{commande.id}</p>
      <p>Total : {commande.total} FCFA</p>
      <p>Nous vous contacterons bientôt sur WhatsApp.</p>
    </div>
  );
}