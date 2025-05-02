export interface Project {
    id?: number;  // L'ID est optionnel pour la création d'un projet
    name: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    budget: number;
    contractor: string;
    status: string;
    geo_coordinates: { lat: number, lon: number };
    progress: number;
  }
  