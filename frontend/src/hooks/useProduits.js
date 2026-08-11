import { useState, useEffect } from 'react';
import { getProduits } from '../services/api';

export function useProduits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduits()
      .then(setProduits)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { produits, loading, error };
}