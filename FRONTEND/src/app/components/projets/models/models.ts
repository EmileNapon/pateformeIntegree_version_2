
export interface Phase{
    id: number;
    projet:number;
    nom: string;
    montant: number;
    dateDebut: string;
    dateFin: string;
    statut: string;
    description: string;
  }
  
//   export interface Project1 {
//     id: number;
//     name: string;
//     location: string;
//     progress: number;
//     startDate: string;
//     endDate: string;
//     budget: string;
//     disbursements: string;
//     companies: string[];
//   }

export interface Projet {
  nom: string;
  code_projet: string;
  debut_troncon?: string;
  fin_troncon?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  type_travaux?: string;
  longueur_troncon?: number;
  largeur_chaussee?: number;
  dateDebut?: string; // Format ISO : '2025-06-03'
  dateFin?: string;
  type_revetement?: string;
  normes_techniques?: string;
  maitre_ouvrage?: string;
  bureau_controle?: string;
  prestataire?: string;
  bailleurs?: string;
  budget?: number;
  description?: string;
  statut?: string;

  // Fichiers
  plan_directeur?: File | null;
  budget_detaille?: File | null;
  contrat_principal?: File | null;
}

  
//   interface DashboardControllerType {
//     sidebarCollapsed: boolean;
//     selectedProject: Project | null;
//     projects: Project[];
//     toggleSidebar: () => void;
//     showProjectDetails: (projectId: number) => void;
//     clearProjectSelection: () => void;
// }

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
  