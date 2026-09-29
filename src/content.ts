// Seul fichier à modifier au quotidien : coordonnées, carte des becs.

export const site = {
  name: 'BrewTruck',
  slogan: 'La bière à portée de main',
  description:
    'Bar à bières mobile pour mariages, soirées d’entreprise et festivals : bières artisanales à la pression, brassées maison, et ateliers de zythologie.',
  email: 'contact@brewtruck.fr', // TODO: adresse réelle
  instagram: 'https://www.instagram.com/brewtruck', // TODO: compte réel
  // Endpoint qui accepte un POST FormData (Formspree, Basin, Netlify function…).
  // Vide : le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie.
  formEndpoint: '',
};

// La carte tourne avec les brassins : on modifie ce tableau, rien d'autre.
// `color` = robe de la bière, utilisée comme donnée visuelle dans la carte.
export const taps = [
  {
    name: 'Première Pression',
    origin: 'Brassée maison',
    style: 'Blonde de soif',
    color: '#E4B34C',
    colorName: 'Dorée',
    bitterness: 'Légère',
    notes: 'Céréale fraîche, miel, finale sèche.',
  },
  {
    name: 'Ambre Lente',
    origin: 'Brassée maison',
    style: 'Ambrée',
    color: '#B4621E',
    colorName: 'Cuivrée',
    bitterness: 'Moyenne',
    notes: 'Caramel, pain grillé, houblon discret.',
  },
  {
    name: 'L’Invitée',
    origin: 'Sélection d’un brasseur artisan',
    style: 'Variable',
    color: '#4A2614',
    colorName: 'Selon la cuvée',
    bitterness: 'Selon la cuvée',
    notes: 'Une bière d’artisan choisie pour votre menu et la saison.',
  },
];

export const eventTypes = ['Mariage', 'Soirée d’entreprise', 'Événement privé', 'Festival', 'Autre'];
