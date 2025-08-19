# Olympic - Projet OC

Application web Angular pour explorer et visualiser des données liées aux Jeux olympiques. Elle affiche des statistiques sous forme de graphiques interactifs (Chart.js) dans une interface réactive.

## Stack
- Angular 20.1.6, TypeScript 5.8.3, RxJS 7.8.0
- Visualisation: Chart.js

## Prérequis
- Node.js 20+ et npm

## Installation
```shell script
 npm install
```


## Lancer en local
```shell script
 npm run start
# puis ouvrir http://localhost:4200
```


## Fonctionnalités
- Visualisation de statistiques via graphiques interactifs.
- Navigation fluide entre vues (liste, détail, comparaisons).
- Filtrage et mise à jour en temps réel des données (RxJS).
- Interface responsive.

## Comment ça marche
- Front-end: Angular 20.1.6 et TypeScript 5.8.3.
- Données: récupérées via services Angular
- Graphiques: rendus avec Chart.js pour des courbes, barres, etc., et mise à jour en direct selon les filtres.

## Gestion des erreurs
- Requêtes réseau: interception des erreurs, message utilisateur clair et option de réessai.
