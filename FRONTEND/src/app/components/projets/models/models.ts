
export interface Projet {
    id: number;
    nom: string;
    typeProjet: string;
    budget: number;
    dateDebut: string;
    dateFin: string;
    statut: string;
    user: number; // User ID
  }
  

export interface Partenaire {
    id?: number;
    nom: string;
    type: 'Financier' | 'Technique' | 'Logistique';
    contact?: string;
}
  
export interface DetailsProjet {
    id?: number;
    projetId: number;
    objectifs: string;
    description: string;
  }
  
export interface Localisation {
    id?: number;
    projetId: number;
    region: string;
    latitude: number;
    longitude: number;
}
  
export interface ActeursImpliques {
    id?: number;
    projetId: number;
    autoriteResponsable: string;
    prestataires: string; // Liste de prestataires séparés par des virgules
}
  
export interface Decaissement {
    id?: number;
    projetId: number;
    nomEtape: string;
    montant: number;
    dateDecaissement: string; // Format ISO (YYYY-MM-DD)
    description?: string;
    actualDeliverables: string;
}
  