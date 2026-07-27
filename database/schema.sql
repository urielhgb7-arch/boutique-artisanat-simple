-- Extension pour générer des UUID si tu préfères des IDs non-séquentiels
-- (optionnel — décommente si tu veux éviter des IDs devinables du type /commandes/1, /commandes/2)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- Table : produits
-- ------------------------------------------------------------
CREATE TABLE produits (
    id          SERIAL PRIMARY KEY,
    nom         VARCHAR(150) NOT NULL,
    description TEXT,
    prix        NUMERIC(10, 2) NOT NULL CHECK (prix >= 0),
    photo_url   VARCHAR(500),
    stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Table : clients
-- Pas d'authentification dans ce projet (pas de mot de passe,
-- pas de session) — le "compte" client est juste une fiche
-- identifiée par son contact (téléphone/WhatsApp), qui sert de
-- clé unique pour éviter les doublons entre deux commandes.
-- ------------------------------------------------------------
CREATE TABLE clients (
    id          SERIAL PRIMARY KEY,
    nom         VARCHAR(150) NOT NULL,
    contact     VARCHAR(100) NOT NULL UNIQUE,   -- téléphone/WhatsApp = identifiant métier
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Table : commandes
-- Une commande référence un client (créé ou retrouvé via son
-- contact au moment du POST /api/commandes) + un statut. Le
-- détail des articles est dans commande_items (relation 1-N),
-- pas dans une colonne JSON, pour rester interrogeable en SQL.
-- ------------------------------------------------------------
CREATE TABLE commandes (
    id             SERIAL PRIMARY KEY,
    client_id      INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    statut         VARCHAR(20) NOT NULL DEFAULT 'en_attente'
                   CHECK (statut IN ('en_attente', 'confirmee', 'expediee', 'annulee')),
    total          NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Table : commande_items
-- Ligne de commande. On snapshote prix_unitaire au moment de
-- la commande (ne PAS aller relire produits.prix plus tard) —
-- si le prix du produit change après coup, l'historique des
-- anciennes commandes doit rester exact.
-- ------------------------------------------------------------
CREATE TABLE commande_items (
    id             SERIAL PRIMARY KEY,
    commande_id    INTEGER NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
    produit_id     INTEGER NOT NULL REFERENCES produits(id) ON DELETE RESTRICT,
    quantite       INTEGER NOT NULL CHECK (quantite > 0),
    prix_unitaire  NUMERIC(10, 2) NOT NULL CHECK (prix_unitaire >= 0)
);

-- ------------------------------------------------------------
-- Index utiles (à ce volume de données ce n'est pas critique,
-- mais c'est la bonne pratique dès qu'on a des clés étrangères
-- interrogées fréquemment)
-- ------------------------------------------------------------
CREATE INDEX idx_commande_items_commande_id ON commande_items(commande_id);
CREATE INDEX idx_commande_items_produit_id  ON commande_items(produit_id);
CREATE INDEX idx_commandes_statut           ON commandes(statut);
CREATE INDEX idx_commandes_client_id        ON commandes(client_id);
