export interface Phase {
  id?: number;
  projetId: number;
  titre: string;
  description?: string;
  dateDebut: Date;
  dateFin: Date;
  montant: number;
  livrables?: Livrable[];
}

export interface Livrable {
  id?: number;
  phaseId: number;
  nom: string;
  description?: string;
  dateRemise?: Date;
  fichier?: File | string;
}

export interface Projet {
  id: number;
  nom: string;
  description?: string;
}

export enum PhaseStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed'
}

export function getPhaseStatus(phase: Phase): PhaseStatus {
  const today = new Date();
  
  if (today < new Date(phase.dateDebut)) {
    return PhaseStatus.UPCOMING;
  } else if (today > new Date(phase.dateFin)) {
    return PhaseStatus.COMPLETED;
  } else {
    return PhaseStatus.ONGOING;
  }
}

export function getStatusLabel(status: PhaseStatus): string {
  switch (status) {
    case PhaseStatus.UPCOMING:
      return 'À venir';
    case PhaseStatus.ONGOING:
      return 'En cours';
    case PhaseStatus.COMPLETED:
      return 'Terminée';
    default:
      return '';
  }
}

export function calculateProgress(phase: Phase): number {
  const today = new Date();
  const start = new Date(phase.dateDebut);
  const end = new Date(phase.dateFin);
  
  if (today < start) {
    return 0;
  }
  
  if (today > end) {
    return 100;
  }
  
  const totalDuration = end.getTime() - start.getTime();
  const elapsedDuration = today.getTime() - start.getTime();
  
  return Math.round((elapsedDuration / totalDuration) * 100);
}