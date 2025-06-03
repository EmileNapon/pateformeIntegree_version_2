import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Livrable, Phase, Projet } from '../models/phase.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock data
  private projets: Projet[] = [
    { id: 1, nom: 'Construction Route N7', description: 'Rénovation et élargissement de la route nationale 7' },
    { id: 2, nom: 'Autoroute A1', description: 'Construction du nouveau tronçon de l\'autoroute A1' }
  ];

  private phases: Phase[] = [
    {
      id: 1,
      projetId: 1,
      titre: 'Études préliminaires',
      description: 'Analyse du terrain et études de faisabilité',
      dateDebut: new Date('2025-01-01'),
      dateFin: new Date('2025-02-15'),
      montant: 45000
    },
    {
      id: 2,
      projetId: 1,
      titre: 'Terrassement',
      description: 'Préparation du terrain et nivellement',
      dateDebut: new Date('2025-02-16'),
      dateFin: new Date('2025-04-30'),
      montant: 120000
    },
    {
      id: 3,
      projetId: 1,
      titre: 'Fondation',
      description: 'Mise en place des couches de fondation',
      dateDebut: new Date('2025-05-01'),
      dateFin: new Date('2025-06-30'),
      montant: 230000
    }
  ];

  private livrables: Livrable[] = [
    {
      id: 1,
      phaseId: 1,
      nom: 'Rapport d\'étude de sol',
      description: 'Analyse détaillée de la composition du sol',
      dateRemise: new Date('2025-01-25')
    },
    {
      id: 2,
      phaseId: 1,
      nom: 'Plan topographique',
      description: 'Cartographie détaillée du terrain',
      dateRemise: new Date('2025-02-10')
    },
    {
      id: 3,
      phaseId: 2,
      nom: 'Rapport de terrassement',
      description: 'Détails des travaux de terrassement effectués',
      dateRemise: new Date('2025-04-20')
    }
  ];

  // BehaviorSubjects
  private phasesSubject = new BehaviorSubject<Phase[]>(this.phases);
  private livrablesSubject = new BehaviorSubject<Livrable[]>(this.livrables);
  private projetsSubject = new BehaviorSubject<Projet[]>(this.projets);

  // Observable streams
  phases$ = this.phasesSubject.asObservable();
  livrables$ = this.livrablesSubject.asObservable();
  projets$ = this.projetsSubject.asObservable();

  constructor() { }

  // Phases methods
  getAllPhases(): Observable<Phase[]> {
    return this.phases$;
  }

  getPhasesByProjet(projetId: number): Observable<Phase[]> {
    const filteredPhases = this.phases.filter(phase => phase.projetId === projetId);
    return of(filteredPhases);
  }

  getPhaseById(id: number): Observable<Phase | undefined> {
    const phase = this.phases.find(p => p.id === id);
    return of(phase);
  }

  addPhase(phase: Phase): Observable<Phase> {
    const newPhase = {
      ...phase,
      id: this.generateId(this.phases)
    };
    
    this.phases = [...this.phases, newPhase];
    this.phasesSubject.next(this.phases);
    
    return of(newPhase);
  }

  updatePhase(phase: Phase): Observable<Phase> {
    this.phases = this.phases.map(p => p.id === phase.id ? phase : p);
    this.phasesSubject.next(this.phases);
    
    return of(phase);
  }

  deletePhase(id: number): Observable<boolean> {
    this.phases = this.phases.filter(p => p.id !== id);
    this.phasesSubject.next(this.phases);
    
    // Also delete associated livrables
    this.livrables = this.livrables.filter(l => l.phaseId !== id);
    this.livrablesSubject.next(this.livrables);
    
    return of(true);
  }

  // Livrables methods
  getLivrablesByPhase(phaseId: number): Observable<Livrable[]> {
    const filteredLivrables = this.livrables.filter(livrable => livrable.phaseId === phaseId);
    return of(filteredLivrables);
  }

  getLivrableById(id: number): Observable<Livrable | undefined> {
    const livrable = this.livrables.find(l => l.id === id);
    return of(livrable);
  }

  addLivrable(livrable: Livrable): Observable<Livrable> {
    const newLivrable = {
      ...livrable,
      id: this.generateId(this.livrables)
    };
    
    this.livrables = [...this.livrables, newLivrable];
    this.livrablesSubject.next(this.livrables);
    
    return of(newLivrable);
  }

  updateLivrable(livrable: Livrable): Observable<Livrable> {
    this.livrables = this.livrables.map(l => l.id === livrable.id ? livrable : l);
    this.livrablesSubject.next(this.livrables);
    
    return of(livrable);
  }

  deleteLivrable(id: number): Observable<boolean> {
    this.livrables = this.livrables.filter(l => l.id !== id);
    this.livrablesSubject.next(this.livrables);
    
    return of(true);
  }

  // Projets methods
  getAllProjets(): Observable<Projet[]> {
    return this.projets$;
  }

  getProjetById(id: number): Observable<Projet | undefined> {
    const projet = this.projets.find(p => p.id === id);
    return of(projet);
  }

  // Helper method to generate IDs
  private generateId<T extends { id?: number }>(items: T[]): number {
    if (items.length === 0) {
      return 1;
    }
    const maxId = Math.max(...items.map(item => item.id || 0));
    return maxId + 1;
  }
}