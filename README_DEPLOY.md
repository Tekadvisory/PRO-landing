# Prometheus Advisory - Déploiement Cloud

Ce projet est configuré pour un déploiement Full-Stack avec Rendu Côté Serveur (SSR) via Express et Vite.

## Architecture
- **Serveur** : Express (Node.js)
- **Frontend** : React + Vite
- **Mode** : SSR (Server Side Rendering) pour une indexation IA (GEO) optimale.

## Déploiement automatique depuis GitHub

### Prérequis
1. Un compte [Google Cloud Platform](https://console.cloud.google.com/).
2. Un compte [GitHub](https://github.com/).

### Étapes de déploiement (Cloud Run)
1. Poussez votre code sur un dépôt GitHub.
2. Dans la console Google Cloud, accédez à **Cloud Run**.
3. Cliquez sur **Créer un service**.
4. Sélectionnez **Déployer continuellement à partir d'un dépôt**.
5. Connectez votre dépôt GitHub.
6. Sélectionnez votre branche principale.
7. Dans les configurations de build :
   - Utilisez **Google Cloud Buildpacks**.
   - Commande de build : `npm run build`
   - Commande de démarrage : `npm start`
8. Dans **Variables d'environnement**, ajoutez :
   - `GEMINI_API_KEY` : Votre clé API Google AI Studio.
   - `NODE_ENV` : `production`
9. Cliquez sur **Créer**.

## Développement Local
```bash
npm install
npm run dev
```

## Build de Production (Local)
```bash
npm run build
npm start
```

## Variables d'Environnement
| Nom | Description |
|-----|-------------|
| `PORT` | Port d'écoute (par défaut 3000) |
| `GEMINI_API_KEY` | Clé API pour les services IA |
| `NODE_ENV` | Environnement (development/production) |
