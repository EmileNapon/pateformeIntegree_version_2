import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Phase, getPhaseStatus, getStatusLabel, calculateProgress } from '../../models/phase.model';

@Component({
  selector: 'app-phase-detail',
  standalone: false,
  templateUrl:'./phase-detail.component.html',
  styleUrl: './phase-detail.component.css'
})
export class PhaseDetailComponent implements OnInit {
  phase?: Phase;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['idPhase'];
      this.loadPhase(id);
    });
  }

  loadPhase(id: number): void {
    this.dataService.getPhaseById(id).subscribe(phase => {
      this.phase = phase;
    });
  }

  getStatus(): string {
    return this.phase ? getPhaseStatus(this.phase) : '';
  }

  getStatusLabel(): string {
    return this.phase ? getStatusLabel(getPhaseStatus(this.phase)) : '';
  }

  getProgress(): number {
    return this.phase ? calculateProgress(this.phase) : 0;
  }

  calculateDuration(): number {
    if (!this.phase) return 0;
    
    const start = new Date(this.phase.dateDebut);
    const end = new Date(this.phase.dateFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  deletePhase(): void {
    if (!this.phase) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette phase?')) {
      this.dataService.deletePhase(this.phase.id!).subscribe(() => {
        this.router.navigate(['/phases']);
      });
    }
  }
}