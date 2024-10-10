
const neo4j = require('neo4j-driver');
const { N } = require('swig/lib/dateformatter');

// Connexion à la base de données
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic('neo4j', 'neo4j_pwd1'));

// Création de la session et de la transaction
const session = driver.session();
const transaction = session.beginTransaction();

// Création de la session et de la transaction pour les index
const sessionIndex = driver.session();
const transactionIndex = sessionIndex.beginTransaction();


// Création de la session et de la transaction pour les recherches
const sessionRecherche = driver.session();
const transactionRecherche = sessionRecherche.beginTransaction();

// Création des entreprises
let entreprises = [
{
  nom: "Apple Inc.",
  secteur_activite: "Technologie",
  description: "Apple conçoit et fabrique des produits électroniques grand public, logiciels et services en ligne.",
  taille: 164000
},
{
  nom: "Google LLC",
  secteur_activite: "Technologie",
  description: "Google est spécialisée dans les services et produits liés à Internet, notamment dans les technologies de recherche, publicité en ligne, systèmes d'exploitation et matériels.",
    taille: 190000
  },
  {
    nom: "Microsoft Corporation",
    secteur_activite: "Technologie",
    description: "Microsoft développe, fabrique, licence, et vend des logiciels, du matériel informatique, des services et solutions.",
    taille: 221000
  },
  {
    nom: "Pfizer Inc.",
    secteur_activite: "Pharmaceutique",
    description: "Pfizer est l'une des plus grandes entreprises pharmaceutiques mondiales, spécialisée dans le développement de médicaments et vaccins.",
    taille: 83000
  },
  {
    nom: "Tesla, Inc.",
    secteur_activite: "Automobile",
    description: "Tesla conçoit et fabrique des véhicules électriques ainsi que des solutions énergétiques propres.",
    taille: 128000
  },
  {
    nom: "Samsung Electronics Co., Ltd.",
    secteur_activite: "Technologie",
    description: "Samsung est un leader mondial de l'électronique grand public, notamment dans les domaines des téléphones, téléviseurs, et électroménagers.",
    taille: 290000
  },
  {
    nom: "Airbus SE",
    secteur_activite: "Aéronautique",
    description: "Airbus est un leader mondial de l'aéronautique, de l'espace et des services liés.",
    taille: 130000
  },
  {
    nom: "LVMH Moët Hennessy Louis Vuitton",
    secteur_activite: "Luxe",
    description: "LVMH est un conglomérat spécialisé dans les produits de luxe, avec des marques prestigieuses dans la mode, les vins et spiritueux, les parfums et cosmétiques.",
    taille: 175000
  }
];

async function createEntreprises() {
  for (const entreprise of entreprises) {
    const query = `
      MERGE (e:Entreprise {
        nom: "${entreprise.nom}",
        secteur_activite: "${entreprise.secteur_activite}",
        description: "${entreprise.description}",
        taille: ${entreprise.taille}
      });
    `;
    await transaction.run(query);
  }
}

// Création des employés
let employes = [
  {
    nom: "Doe",
    prenom: "John",
    description: "Développeur full-stack avec 5 ans d'expérience dans le développement web.",
    competences: ["JavaScript", "Node.js", "React", "MongoDB", "Docker"]
  },
  {
    nom: "Smith",
    prenom: "Jane",
    description: "Chef de projet en informatique, spécialisée dans la gestion d'équipes et les méthodes agiles.",
    competences: ["Gestion de projet", "Scrum", "Kanban", "Communication", "Leadership"]
  },
  {
    nom: "Garcia",
    prenom: "Maria",
    description: "Designer UI/UX avec un fort intérêt pour la conception centrée sur l'utilisateur.",
    competences: ["Adobe XD", "Figma", "Sketch", "Wireframing", "Prototyping"]
  },
  {
    nom: "Dupont",
    prenom: "Paul",
    description: "Data scientist passionné par le machine learning et l'analyse prédictive.",
    competences: ["Python", "R", "Machine Learning", "TensorFlow", "SQL"]
  },
  {
    nom: "Lefevre",
    prenom: "Sophia",
    description: "Ingénieure en sécurité informatique spécialisée dans la cybersécurité et la protection des données.",
    competences: ["Cybersécurité", "Cryptographie", "Firewall", "Audit de sécurité", "Gestion des risques"]
  },
  {
    nom: "Bernard",
    prenom: "Lucas", 
    description: "Spécialiste en marketing digital avec une expérience dans la gestion de campagnes de publicité en ligne.",
    competences: ["SEO", "Google Ads", "Social Media", "Content Marketing", "Analytics"]
  },
  {
    nom: "Fabre",
    prenom: "Marie",
    description: "Responsable des ventes avec une expertise dans la gestion de la relation client et la stratégie commerciale.",
    competences: ["CRM", "Gestion de la relation client", "Stratégie commerciale", "Négociation", "Ventes B2B"]
  },
  {
    nom: "Charpentier",
    prenom: "Thomas",
    description: "Consultant en finance avec une expertise dans l'analyse financière et la gestion des risques.",
    competences: ["Analyse financière", "Gestion des risques", "Modélisation financière", "Audit", "Planification stratégique"]
  },
  {
    nom: "Moreau",
    prenom: "Claire",
    description: "Architecte logiciel avec une expérience en conception de systèmes distribués et en architecture microservices.",
    competences: ["Architecture logicielle", "Microservices", "Cloud", "Kubernetes", "DevOps"]
  },
  {
    nom: "Girard",
    prenom: "Camille",
    description: "Ingénieur en intelligence artificielle spécialisé dans les algorithmes d'apprentissage automatique et l'IA appliquée.",
    competences: ["Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch"]
  },
  {
    nom: "Chevalier",
    prenom: "Nicolas",
    description: "Expert en blockchain, développeur de solutions décentralisées pour le secteur financier.",
    competences: ["Blockchain", "Smart Contracts", "Ethereum", "Solidity", "Cryptomonnaie"]
  },
  {
    nom: "Perrin",
    prenom: "Julie",
    description: "Consultante en développement durable, spécialisée dans les stratégies environnementales pour les entreprises.",
    competences: ["Développement durable", "Énergie renouvelable", "Stratégie environnementale", "Gestion des déchets", "RSE"]
  },
  {
    nom: "Leclerc",
    prenom: "Maxime",
    description: "Architecte cloud spécialisé dans la migration vers le cloud et l'optimisation des infrastructures.",
    competences: ["Cloud", "AWS", "Azure", "Kubernetes", "Automatisation"]
  },
  {
    nom: "Benoit",
    prenom: "Sophie",
    description: "Responsable de la communication spécialisée dans la gestion des relations publiques et la stratégie de marque.",
    competences: ["Relations publiques", "Communication de crise", "Stratégie de marque", "Médias sociaux", "Événementiel"]
  },
  {
    nom: "Boucher",
    prenom: "Thibault",
    description: "Consultant en transformation numérique avec une expérience dans l'accompagnement des entreprises vers le digital.",
    competences: ["Transformation numérique", "Stratégie digitale", "Gestion du changement", "Cloud computing", "Business Intelligence"]
  },
  {
    nom: "Robert",
    prenom: "Céline",
    description: "Chef de projet événementiel, experte dans la gestion d'événements corporatifs et culturels.",
    competences: ["Gestion de projet", "Planification d'événements", "Logistique", "Communication", "Relations avec les fournisseurs"]
  },
  {
    nom: "Charpentier",
    prenom: "Adrien",
    description: "Développeur frontend passionné par les technologies web modernes et le design réactif.",
    competences: ["HTML", "CSS", "JavaScript", "Vue.js", "Responsive Design"]
  },
  {
    nom: "Marchand",
    prenom: "Lucie",
    description: "Analyste de données spécialisée dans la visualisation de données et les statistiques appliquées.",
    competences: ["Data Visualization", "Power BI", "Tableau", "Statistiques", "Python"]
  },
  {
    nom: "Renard",
    prenom: "Samuel",
    description: "Spécialiste en recrutement IT avec une expérience dans l'acquisition de talents et la gestion des carrières.",
    competences: ["Recrutement IT", "Acquisition de talents", "Gestion des carrières", "Sourcing", "Entretien d'embauche"]
  },
  {
    nom: "Vidal",
    prenom: "Elodie",
    description: "Consultante en finance durable, aidant les entreprises à intégrer des pratiques ESG dans leurs activités.",
    competences: ["Finance durable", "ESG", "Stratégie d'investissement", "Analyse financière", "Reporting RSE"]
  },
  {
    nom: "Leroy",
    prenom: "Antoine",
    description: "Développeur backend avec une expertise dans la sécurité des applications et la gestion des données sensibles.",
    competences: ["Sécurité des applications", "Gestion des données sensibles", "API", "Docker", "Kubernetes"]
  },
  {
    nom: "Morel",
    prenom: "Cédric",
    description: "Expert en gestion de projet, spécialisé dans la gestion de projets de développement logiciel et de transformation numérique.",
    competences: ["Gestion de projet", "Projet logiciel", "Transformation numérique", "Gestion du changement", "Communication"]
  },
  {
    nom: "Girard",
    prenom: "Émilie",
    description: "Consultante en marketing digital, avec une expertise dans la gestion de campagnes de publicité en ligne et l'analyse des données marketing.",
    competences: ["Marketing digital", "Campagnes de publicité", "Analyse des données", "SEO", "Google Ads"]
  },
  {
    nom: "Leroy",
    prenom: "Maxime",
    description: "Architecte logiciel avec une expérience en conception de systèmes distribués et en architecture microservices.",
    competences: ["Architecture logicielle", "Microservices", "Cloud", "Kubernetes", "DevOps"]
  },
  {
    nom: "Hubert",
    prenom: "Céline",
    description: "Chef de projet événementiel, experte dans la gestion d'événements corporatifs et culturels.",
    competences: ["Gestion de projet", "Planification d'événements", "Logistique", "Communication", "Relations avec les fournisseurs"]
  }
];

async function createEmployes() {
  for (const employe of employes) {
    const query = `
      MERGE (e:Employe {
        nom: "${employe.nom}",
        prenom: "${employe.prenom}",
        description: "${employe.description}",
        competences: [${employe.competences.map(c => `"${c}"`).join(", ")}]
      });
    `;
    await transaction.run(query);
  }
}

let relationsEntreprises = [
  {
    nom: "Doe",
    prenom: "John",
    entreprise: "Apple Inc.",
    de: "2018-01-02",
    a: "2021-05-30",
    en_tant_que: "salarié"
  },
  {
    nom: "Doe",
    prenom: "John",
    entreprise: "Google LLC",
    de: "2022-06-12",
    a: "2023-07-08",
    en_tant_que: "consultant"
  },
  {
    nom: "Smith",
    prenom: "Jane",
    entreprise: "Google LLC",
    de: "2020-12-01",
    a: "2022-04-11",
    en_tant_que: "sous-traitant"
  },
  {
    nom: "Bernard",
    prenom: "Lucas",
    entreprise: "Microsoft Corporation",
    de: "2016-05-12",
    a: "2024-10-11",
    en_tant_que: "salarié"
  },
  {
    nom: "Bernard",
    prenom: "Lucas",
    entreprise: "Apple Inc.",
    de: "2011-03-01",
    a: "2015-07-08",
    en_tant_que: "salarié"
  },
  {
    nom: "Garcia",
    prenom: "Maria",
    entreprise: "Tesla, Inc.",
    de: "2019-06-12",
    a: "2024-10-11",
    en_tant_que: "sous-traitant"
  },
  {
    nom: "Dupont",
    prenom: "Paul",
    entreprise: "Pfizer Inc.",
    de: "2017-06-26",
    a: "2023-02-02",
    en_tant_que: "salarié"
  },
  {
    nom: "Dupont",
    prenom: "Paul",
    entreprise: "Tesla, Inc.",
    de: "2023-10-10",
    a: "2024-01-20",
    en_tant_que: "consultant"
  },
  {
    nom: "Hubert",
    prenom: "Céline",
    entreprise: "Pfizer Inc.",
    de: "2012-03-14",
    a: "2024-09-18",
    en_tant_que: "salarié"
  },  
  {
    nom: "Leroy",
    prenom: "Maxime",
    entreprise: "LVMH Moët Hennessy Louis Vuitton",
    de: "2001-06-21",
    a: "2020-10-07",
    en_tant_que: "salarié"
  },
  {
    nom: "Fabre",
    prenom: "Marie",
    entreprise: "LVMH Moët Hennessy Louis Vuitton",
    de: "2006-05-09",
    a: "2015-12-22",
    en_tant_que: "salarié"
  },
  {
    nom: "Fabre",
    prenom: "Marie",
    entreprise: "Airbus SE",
    de: "2015-02-11",
    a: "2024-04-03",
    en_tant_que: "salarié"
  },
  {
    nom: "Morel",
    prenom: "Cédric",
    entreprise: "Airbus SE",
    de: "2000-08-30",
    a: "2024-07-15",
    en_tant_que: "salarié"
  },
  {
    nom: "Boucher",
    prenom: "Thibault",
    entreprise: "Airbus SE",
    de: "2015-01-19",
    a: "2024-11-05",
    en_tant_que: "salarié"
  },
  {
    nom: "Renard",
    prenom: "Samuel",
    entreprise: "Samsung Electronics Co., Ltd.",
    de: "2015-12-01",
    a: "2024-03-08",
    en_tant_que: "consultant"
  },
  {
    nom: "Vidal",
    prenom: "Elodie",
    entreprise: "Samsung Electronics Co., Ltd.",
    de: "2010-07-17",
    a: "2021-05-28",
    en_tant_que: "salarié"
  },
  {
    nom: "Girard",
    prenom: "Émilie",
    entreprise: "Microsoft Corporation",
    de: "2010-04-26",
    a: "2021-02-13",
    en_tant_que: "salarié"
  },
  {
    nom: "Lefevre",
    prenom: "Sophia",
    entreprise: "Microsoft Corporation",
    de: "2000-11-10",
    a: "2010-03-02",
    en_tant_que: "salarié"
  },
  {
    nom: "Lefevre",
    prenom: "Sophia",
    entreprise: "Apple Inc.",
    de: "2010-09-05",
    a: "2024-06-21",
    en_tant_que: "salarié"
  },
  {
    nom: "Charpentier",
    prenom: "Thomas",
    entreprise: "Microsoft Corporation",
    de: "2010-01-28",
    a: "2024-08-12",
    en_tant_que: "salarié"
  },
  {
    nom: "Charpentier",
    prenom: "Thomas",
    entreprise: "Airbus SE",
    de: "1999-02-03",
    a: "2009-10-30",
    en_tant_que: "salarié"
  },
  {
    nom: "Moreau",
    prenom: "Claire",
    entreprise: "Microsoft Corporation",
    de: "1997-05-07",
    a: "2024-09-29",
    en_tant_que: "salarié"
  },
  {
    nom: "Chevalier",
    prenom: "Nicolas",
    entreprise: "Apple Inc.",
    de: "2001-12-23",
    a: "2010-06-04",
    en_tant_que: "salarié"
  },
  {
    nom: "Chevalier",
    prenom: "Nicolas",
    entreprise: "Samsung Electronics Co., Ltd.",
    de: "2011-04-16",
    a: "2022-07-09",
    en_tant_que: "salarié"
  },
  {
    nom: "Girard",
    prenom: "Camille",
    entreprise: "Samsung Electronics Co., Ltd.",
    de: "2019-02-23",
    a: "2020-11-14",
    en_tant_que: "consultant"
  },
  {
    nom: "Girard",
    prenom: "Camille",
    entreprise: "Tesla, Inc.",
    de: "2021-05-03",
    a: "2022-09-19",
    en_tant_que: "consultant"
  },
  {
    nom: "Girard",
    prenom: "Camille",
    entreprise: "Apple Inc.",
    de: "2023-01-25",
    a: "2024-08-07",
    en_tant_que: "consultant"
  },
  {
    nom: "Perrin",
    prenom: "Julie",
    entreprise: "Pfizer Inc.",
    de: "2020-06-30",
    a: "2022-04-15",
    en_tant_que: "consultant"
  },
  {
    nom: "Leclerc",
    prenom: "Maxime",
    entreprise: "Microsoft Corporation",
    de: "2019-03-10",
    a: "2022-08-27",
    en_tant_que: "sous-traitant"
  },
  {
    nom: "Leclerc",
    prenom: "Maxime",
    entreprise: "LVMH Moët Hennessy Louis Vuitton",
    de: "2023-05-11",
    a: "2024-11-20",
    en_tant_que: "sous-traitant"
  },
  {
    nom: "Benoit",
    prenom: "Sophie",
    entreprise: "LVMH Moët Hennessy Louis Vuitton",
    de: "1990-07-08",
    a: "2024-12-30",
    en_tant_que: "salarié"
  },
  {
    nom: "Charpentier",
    prenom: "Adrien",
    entreprise: "Microsoft Corporation",
    de: "2020-09-13",
    a: "2024-05-17",
    en_tant_que: "salarié"
  },
  {
    nom: "Robert",
    prenom: "Céline",
    entreprise: "Google LLC",
    de: "2000-03-21",
    a: "2023-06-24",
    en_tant_que: "salarié"
  },
  {
    nom: "Marchand",
    prenom: "Lucie",
    entreprise: "Google LLC",
    de: "2021-04-04",
    a: "2024-02-11",
    en_tant_que: "consultant"
  },
  {
    nom: "Marchand",
    prenom: "Lucie",
    entreprise: "Apple Inc.",
    de: "2010-01-29",
    a: "2020-10-12",
    en_tant_que: "salarié"
  },
  {
    nom: "Leroy",
    prenom: "Antoine",
    entreprise: "Pfizer Inc.",
    de: "2008-11-22",
    a: "2024-03-08",
    en_tant_que: "salarié"
  }
];

// Fonction permettant de créer la relation "A travaillé pour" entre les employés et les entreprises
async function createRelationsEntreprises() {
  for (const relation of relationsEntreprises) {
    const query = `
      MATCH (e:Employe {nom: "${relation.nom}", prenom: "${relation.prenom}"}), (ent:Entreprise {nom: "${relation.entreprise}"})
      MERGE (e)-[:A_TRAVAILLE_POUR {
        de: "${relation.de}",
        a: "${relation.a}",
        en_tant_que: "${relation.en_tant_que}"
      }]->(ent);
    `;
    await transaction.run(query);
  }
}

let connaissances = [
  {
    nom1: "Dupont",
    prenom1: "Paul",
    nom2: "Moreau",
    prenom2: "Claire"
  },
  {
    nom1: "Garcia",
    prenom1: "Maria",
    nom2: "Bernard",
    prenom2: "Lucas"
  },
  {
    nom1: "Doe",
    prenom1: "John",
    nom2: "Smith",
    prenom2: "Jane"
  },
  {
    nom1: "Chevalier",
    prenom1: "Nicolas",
    nom2: "Girard",
    prenom2: "Camille"
  },
  {
    nom1: "Renard",
    prenom1: "Samuel",
    nom2: "Vidal",
    prenom2: "Elodie"
  },
  {
    nom1: "Boucher",
    prenom1: "Thibault",
    nom2: "Perrin",
    prenom2: "Julie"
  },
  {
    nom1: "Marchand",
    prenom1: "Lucie",
    nom2: "Leclerc",
    prenom2: "Maxime"
  },
  {
    nom1: "Morel",
    prenom1: "Cédric",
    nom2: "Leroy",
    prenom2: "Antoine"
  },
  {
    nom1: "Girard",
    prenom1: "Émilie",
    nom2: "Charpentier",
    prenom2: "Thomas"
  },
  {
    nom1: "Fabre",
    prenom1: "Marie",
    nom2: "Robert",
    prenom2: "Céline"
  },
  {
    nom1: "Fabre",
    prenom1: "Marie",
    nom2: "Bernard",
    prenom2: "Lucas"
  },
  {
    nom1: "Garcia",
    prenom1: "Maria",
    nom2: "Chevalier",
    prenom2: "Nicolas"
  },
  {
    nom1: "Charpentier",
    prenom1: "Adrien",
    nom2: "Girard",
    prenom2: "Émilie"
  },
  {
    nom1: "Perrin",
    prenom1: "Julie",
    nom2: "Renard",
    prenom2: "Samuel"
  },
  {
    nom1: "Bernard",
    prenom1: "Lucas",
    nom2: "Moreau",
    prenom2: "Claire"
  },
  {
    nom1: "Robert",
    prenom1: "Céline",
    nom2: "Marchand",
    prenom2: "Lucie"
  },
  {
    nom1: "Leroy",
    prenom1: "Antoine",
    nom2: "Chevalier",
    prenom2: "Nicolas"
  },
  {
    nom1: "Leroy",
    prenom1: "Antoine",
    nom2: "Girard",
    prenom2: "Camille"
  },
  {
    nom1: "Boucher",
    prenom1: "Thibault",
    nom2: "Leroy",
    prenom2: "Maxime"
  },
  {
    nom1: "Boucher",
    prenom1: "Thibault",
    nom2: "Girard",
    prenom2: "Émilie"
  },
  {
    nom1: "Smith",
    prenom1: "Jane",
    nom2: "Benoit",
    prenom2: "Sophie"
  }
]

// Fonction permettant de créer la relation "Connait" entre les employés
async function createRelationsConnaissances() {
  for (const relation of connaissances) {
    const query = `
      MATCH (e1:Employe {nom: "${relation.nom1}", prenom: "${relation.prenom1}"}), (e2:Employe {nom: "${relation.nom2}", prenom: "${relation.prenom2}"})
      MERGE (e1)-[:CONNAIT]->(e2);
    `;
    await transaction.run(query);
  }
}

let travailleAvec = [
  {
    nom1: "Hubert",
    prenom1: "Céline",
    nom2: "Leroy",
    prenom2: "Antoine"
  },
  {
    nom1: "Hubert",
    prenom1: "Céline",
    nom2: "Perrin",
    prenom2: "Julie"
  },
  {
    nom1: "Leroy",
    prenom1: "Antoine",
    nom2: "Perrin",
    prenom2: "Julie"
  },
  {
    nom1: "Perrin",
    prenom1: "Julie",
    nom2: "Dupont",
    prenom2: "Paul"
  },
  {
    nom1: "Leclerc",
    prenom1: "Maxime",
    nom2: "Benoit",
    prenom2: "Sophie"
  },
  {
    nom1: "Dupont",
    prenom1: "Paul",
    nom2: "Garcia",
    prenom2: "Maria"
  },
  {
    nom1: "Charpentier",
    prenom1: "Thomas",
    nom2: "Morel",
    prenom2: "Cédric"
  },
  {
    nom1: "Morel",
    prenom1: "Cédric",
    nom2: "Boucher",
    prenom2: "Thibault"
  },
  {
    nom1: "Smith",
    prenom1: "Jane",
    nom2: "Robert",
    prenom2: "Céline"
  },
  {
    nom1: "Marchand",
    prenom1: "Lucie",
    nom2: "Robert",
    prenom2: "Céline"
  },
  {
    nom1: "Leroy",
    prenom1: "Maxime",
    nom2: "Benoit",
    prenom2: "Sophie"
  },
  {
    nom1: "Leroy",
    prenom1: "Maxime",
    nom2: "Fabre",
    prenom2: "Marie"
  },
  {
    nom1: "Benoit",
    prenom1: "Sophie",
    nom2: "Leclerc",
    prenom2: "Maxime"
  },
  {
    nom1: "Leclerc",
    prenom1: "Maxime",
    nom2: "Charpentier",
    prenom2: "Adrien"
  },
  {
    nom1: "Leclerc",
    prenom1: "Maxime",
    nom2: "Moreau",
    prenom2: "Claire"
  },
  {
    nom1: "Girard",
    prenom1: "Émilie",
    nom2: "Bernard",
    prenom2: "Lucas"
  },
  {
    nom1: "Lefevre",
    prenom1: "Sophia",
    nom2: "Moreau",
    prenom2: "Claire"
  },
  {
    nom1: "Lefevre",
    prenom1: "Sophia",
    nom2: "Doe",
    prenom2: "John"
  },
  {
    nom1: "Lefevre",
    prenom1: "Sophia",
    nom2: "Marchand",
    prenom2: "Lucie"
  },
  {
    nom1: "Lefevre",
    prenom1: "Sophia",
    nom2: "Charpentier",
    prenom2: "Thomas"
  },
  {
    nom1: "Fabre",
    prenom1: "Marie",
    nom2: "Boucher",
    prenom2: "Thibault"
  },
  {
    nom1: "Renard",
    prenom1: "Samuel",
    nom2: "Chevalier",
    prenom2: "Nicolas"
  },
  {
    nom1: "Renard",
    prenom1: "Samuel",
    nom2: "Vidal",
    prenom2: "Elodie"
  }
]

// Fonction permettant de créer la relation "A travaillé avec" entre les employés
async function createRelationsATravailleAvec() {
  for (const relation of travailleAvec) {
    const query = `
      MATCH (e1:Employe {nom: "${relation.nom1}", prenom: "${relation.prenom1}"}), (e2:Employe {nom: "${relation.nom2}", prenom: "${relation.prenom2}"})
      MERGE (e1)-[:A_TRAVAILLE_AVEC]->(e2);
    `;
    await transaction.run(query);
  }
}

// Fonction permettant de créer les index
async function ajoutIndex() {
  try {
    await transactionIndex.run('CREATE INDEX IF NOT EXISTS FOR (e:Employe) ON (e.nom)')
    await transactionIndex.run('CREATE INDEX IF NOT EXISTS FOR (e:Employe) ON (e.prenom)')
    await transactionIndex.run('CREATE INDEX IF NOT EXISTS FOR (ent:Entreprise) ON (ent.nom)')
  } catch (error) {
    console.error("Error creating indexes:", error);
    await transactionIndex.rollback();
  }
}

// Fonction permettant de créer les données
async function CreateData(){
  try {
    await createEntreprises();
    await createEmployes();
    await createRelationsEntreprises();
    await createRelationsATravailleAvec();
    await createRelationsConnaissances();
  } catch (error) {
    console.error("Erreur lors de la création des données : ", error);
    await transaction.rollback();
  }
}

// Fonction permettant de rechercher un employé
async function Recherche(nom, prenom) {
  const query = `
    MATCH (e:Employe {nom: "${nom}", prenom: "${prenom}"})
    RETURN e
  `;
  const result = await transactionRecherche.run(query);
  return result.records.map(record => record.get("e"));
}

// Fonction permettant de rechercher une entreprise
async function RechercheEntreprise(nom) {
  const query = `
    MATCH (e:Entreprise {nom: "${nom}"})
    RETURN e
  `;
  const result = await transactionRecherche.run(query);
  return result.records.map(record => record.get("e"));
}


// Fonction permettant de rechercher les personnes ayant travaillé avec un employé chez une entreprise dans la même période
async function Suggestion(nom, prenom, nomEntreprise) {
  const query = `
    MATCH (e1:Employe)-[r1:A_TRAVAILLE_POUR]->(ent:Entreprise)<-[r2:A_TRAVAILLE_POUR]-(e2:Employe)
    WHERE e1.nom = '${nom}'
    AND e1.prenom = '${prenom}'
    AND ent.nom = '${nomEntreprise}'
    AND r1.de <= r2.a
    AND r1.a >= r2.de
    AND e1 <> e2
    RETURN e2.nom AS nom, e2.prenom AS prenom
  `;
  const result = await transactionRecherche.run(query);
  return result.records.map(record => ({nom: record.get("nom"), prenom: record.get("prenom")}));
}

// Fonction permettant de rechercher les amis des amis d'un employé
async function SuggestionConnaissances(nom, prenom) {
  const query = `
    MATCH (e1:Employe {nom: "${nom}", prenom: "${prenom}"})-[:CONNAIT]-(e2:Employe)-[:CONNAIT]-(e3:Employe)
    WHERE NOT (e1)-[:CONNAIT]->(e3) AND e1 <> e3
    RETURN DISTINCT e3.nom AS nom, e3.prenom AS prenom
  `;
  const result = await transactionRecherche.run(query);
  return result.records.map(record => ({nom: record.get("nom"), prenom: record.get("prenom")}));
}

async function main() {
  try {
    // Création des données
    await CreateData();
    // Création des index
    await ajoutIndex();
    // Exemple de recherche d'un employé
    console.log(await Recherche("Dupont", "Paul"));
    // Exemple de recherche d'une entreprise
    console.log(await RechercheEntreprise("Airbus SE"));
    // Exemple de suggestion de personnes ayant travaillé avec Emile Girard chez Microsoft
    Suggestion("Girard", "Émilie", "Microsoft Corporation").then(
      results => {
        console.log("Personnes ayant probablement travaillé avec vous :");
        results.forEach((result, index) => {
          console.log(`Suggestion ${index + 1}: ${result.nom}, ${result.prenom}`);
      });
    });
    // Exemple de suggestion d'amis des amis de Boucher Thibault
    SuggestionConnaissances("Boucher", "Thibault").then(
      results => {
        console.log("Amis de vos amis :");
        results.forEach((result, index) => {
          console.log(`Suggestion ${index + 1}: ${result.nom}, ${result.prenom}`);
      });
    });
  } 
  finally 
  {
    // Commit des transactions
    await transaction.commit();
    await transactionRecherche.commit();
    await transactionIndex.commit();
    // Fermeture des sessions
    await session.close();
    await sessionIndex.close();
    await sessionRecherche.close();
    await driver.close();
  }
}

main();
