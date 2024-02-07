# Expose

Expose is a web application which allow you to collect your BeeKeep and BeeSwarm sensors datas.

## Getting Started

To install the application just clone the repo and launch this command in your bash (pay attention to be in the good folder):
```
npm install
```
If you didn't install npm here's the doc to install it: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Launch application

To launch the application you need to use this command in your prompt:
```
npm run dev
```
You can now access it with this url : http://localhost:3000/

### Hox to use it

When you are on the web page you can type your sensor id in the search bar and validate it.
You'll be redirected to your sensor page and you'll see:

    - Your data in real time in the first card
    - Your datetime filters to have your datas for one day / one week / one month or for personalised datetime in the second card
    - Your sensor datas in the third and fourth card

Pay attention if you use free sigfox API you can do 10 API call by hour.

## Personalization

You can personalize this project if you want, just modify this file: 

```
public\css\var.css
```

You can customize :
    - Colors
    - Font
    - Font weight 

Likewise you can change images in this folder : 
```
public\images 
```

On sensor page you can also change colors steps to change first card icons colors in this file : 
```
public\js\bornes.js
```
You just have to change contants at the begining of the file.

## Router 

The router is in this files : 
```
router\router.js
``` 
The most important route is : /sensor/:id/messages
This road permit you to get all datas from your sensor and decrypt them

## Documentations utiles 

* [Node](https://nodejs.org/docs/latest/api/)
* [npm]( https://docs.npmjs.com/)
* [Expressjs](https://expressjs.com/)
* [Axios](https://axios-http.com/docs/intro)
* [ejs](https://ejs.co/#install)
* [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) 
* [Fontawesome](https://fontawesome.com/) 
* [Leaflet](https://leafletjs.com/) 
* [Moment](https://momentjs.com/) 
* [AmCharts](https://www.amcharts.com/docs/v5/) 

## Authors

* **Cécilia Ruin** - [Arendlia](https://github.com/Arendlia)
* **Guillaume Bongrand** - [Guillaume](https://github.com/guillaume-bgr)
* **Océance Fourdain** - [Océance](https://github.com/OceanceFourdain)

## Conttributors
* **La Manu Amiens** - [LaManu](https://lamanu.fr/campus/amiens-formation-numerique/)

