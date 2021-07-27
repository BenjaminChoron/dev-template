# Dev Template

Ce projet a pour but d'aider les développeurs.euses à gagner en visibilité sans y passer des heures, avec un template de site web clés en main.

Je l'ai voulu personnalisable et open source. N'hésitez pas à y apporter des modifications !

Je ne demande aucune identification ou attribution si vous utilisez ce projet. Il est entièrement libre.

## Installation et utilisation

### 1. Récupérer le projet en local et l'initialiser

#### Step 1

Cloner le repo

#### Step 2

Ouvrir dans VScode (ou autre éditeur)

#### Step 3

``` npm install ``` dans le terminal

Et maintenant... on s'approprie le projet !

![This could be fun](https://media.giphy.com/media/oDOnRIDjxlCzC/giphy.gif)

### 2. Personnaliser le template

#### Step 1

Vous pouvez personnaliser les couleurs et polices dans les fichiers ``` style.scss ``` (pour le front) et ``` back.scss ``` (pour le back office), ces changement seront appliqués sur toutes les pages du site. Vous devez simplement lancer ``` npm run scss ``` dans le terminal avant de commencer la modification des fichiers ``` .scss ``` pour permettre la compilation automatique en ``` .css ```

#### Step 2

Vous devez créer une base de données ``` Postgres ``` et changer le fichier ``` .env.example ``` en ``` .env ``` en renseignant l'URL de la base crée par vos soins

#### Step 3

Vous devez créer un ``` User ``` pour vous connecter au back office. Il faut aller sur la route ``` /signup ```. Une fois l'utilisateur créé (pour les projets mis en ligne), il faut supprimer la page et la route ``` /signup ``` afin que personne d'autre que vous ne puisse s'enregistrer comme utilisateur

#### Step 4

Vous avez maintenant accès au back office avec vos identifiants. Vous pouvez voir les messages envoyés depuis le formulaire de contact, créer, modifier et supprimer des projets et des articles de blog

#### Step 5

Concernant la rédaction des projets :

Les champs ``` Contenu générique ```, ``` Contenu technique ```, ``` Lien Web ``` et ``` Lien Github ``` ne sont pas obligatoires. Seuls les champs remplis seront affichés sur la partie front du site

![Done](https://media.giphy.com/media/RkDX47fpp2nHlaZdjY/giphy.gif)

## Feedback

N'hésitez pas à modifier ce projet, lui apporter de nouvelles fonctionnalités, il est fait pour évoluer ! Les ``` pull request ``` sont les bienvenues 😉

![Don't forget to have fun](https://media.giphy.com/media/js0dt5JLCU01bvlt7d/giphy.gif)
