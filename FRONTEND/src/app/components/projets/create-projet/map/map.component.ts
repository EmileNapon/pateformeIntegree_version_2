import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  private map: any;
  private marker: any;

  @Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Initialisation de la carte
    this.map = L.map('map').setView([12.3714, -1.5197], 6); // Coordonnées du Burkina Faso

    // Ajout des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajout de la barre de recherche
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', (e: any) => {
        const latlng = e.geocode.center;
        this.map.setView(latlng, 14);
        this.addMarker(latlng.lat, latlng.lng);
      })
      .addTo(this.map);

    // Écouteur pour les clics sur la carte
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.addMarker(lat, lng);
    });
  }

  private addMarker(lat: number, lng: number): void {
    // Supprimez l'ancien marqueur s'il existe
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Ajoutez un nouveau marqueur
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    // Émettez les coordonnées sélectionnées
    this.locationSelected.emit({ latitude: lat, longitude: lng });

    // Écouteur pour le déplacement du marqueur
    this.marker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      this.locationSelected.emit({ latitude: lat, longitude: lng });
    });
  }
}