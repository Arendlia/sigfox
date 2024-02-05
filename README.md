# Expose

Expose est une application web vous permettant de collecter les données de vos capteur B-Keep et B-Swarm.

## Pour commencer

Pour installer l'application il vous suffit de la télécharger via ce repository et de lancer la commande :
```
npm install
```
Si vous ne possédez pas npm voici le lien de la documentation: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Démarer l'application

Une fois les dépendances installées vous povez lancer l'application avec la commande 
```
npm run dev
```
Elle sera alors accessible ici : http://localhost:3000/

### Comment l'utiliser

Une fois sur la page web entrez votre numéro de capteur dans la barre de recherche et validez.
Vous arriverez ensuite sur la page de votre capteur avec laquelle vous pouvez accéder à:

    - Vos données en temps réel dans la première carte
    - Vos filtres de temps pour avoir des données triées sur un jour /une semaine / un mois ou sur un laps de temps personalisé dans la deuxième carte
    - Vos données du capteur dans la troisième et quatrième carte

Attention si vous utilisez l'API sigfox gratuite vous n'avez le droit qu'à 10 appels par heures.

## Personalisation

Ce projet est personalisable si vous voulez le mettre aux couleurs de votre entreprise où même si vous voulez juste changer pour se faire vous pouvez accéder au fichier:
```
public\css\var.css
```

Dans lequel il est possible de changer:
    - Les couleurs
    - La police d'écriture
    - L'épaisseur de la police d'écriture

De même si une image ne vous convient le dossier d'image est celui-ci:
```
public\images 
```

Sur la page de capteur il est aussi possible de changer les bornes de couleur des icones de la première carte pour se faire il suffit d'aller dans le fichier :
```
public\js\bornes.js
```
et de changer les constantes correspondantes.

## Documentations utiles 

* [Node](https://nodejs.org/docs/latest/api/)
* [npm]( https://docs.npmjs.com/)
* [ejs](https://ejs.co/#install)
* [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) 
* [Fontawesome](https://fontawesome.com/) 
* [Leaflet](https://leafletjs.com/) 
* [Moment](https://momentjs.com/) 
* [AmCharts](https://www.amcharts.com/docs/v5/) 

## Auteurs

* **Cécilia Ruin** - [Arendlia](https://github.com/Arendlia)
* **Guillaume Bongrand** - [Guillaume](https://github.com/guillaume-bgr)
* **Océance Fourdain** - [Océance](https://github.com/OceanceFourdain)

## Contribution
* **La Manu Amiens** - [LaManu](https://lamanu.fr/campus/amiens-formation-numerique/)

