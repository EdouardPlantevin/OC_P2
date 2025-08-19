import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

const STATUS_MESSAGES: Record<number, string> = {
  0:   "Erreur réseau : l'application est hors ligne ou le serveur est injoignable.",
  400: "Requête invalide.",
  401: "Non authentifié : veuillez vous connecter.",
  403: "Accès refusé.",
  404: "La ressource demandée n'existe pas.",
  408: "Délai d'attente de la requête expiré.",
  429: "Trop de requêtes : veuillez réessayer plus tard.",
  500: "Un problème interne est survenu sur le serveur.",
  502: "Mauvaise passerelle.",
  503: "Service indisponible.",
  504: "Temps d'attente dépassé.",
};

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  private route = inject(ActivatedRoute);

  statusCode: number | null = null;
  message = "Une erreur inattendue est survenue.";

  getErrorMessage(status?: number | null): string {
    if (status == null || Number.isNaN(status)) {
      return "Une erreur inattendue est survenue.";
    }
    return STATUS_MESSAGES[status] ?? "Une erreur inattendue est survenue.";
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const raw = params.get('statusCode');
      const status = raw !== null ? Number(raw) : null;
      this.statusCode = Number.isFinite(status as number) ? (status as number) : null;
      this.message = this.getErrorMessage(this.statusCode);
    });
  }
}
