import { Entity } from "./entity";

export enum TarifImage
{
    GRATUIT="assets/landing/assets/img/pricing-free.png",
    DEBUTANT="assets/landing/assets/img/pricing-starter.png",
    BUSINESS="assets/landing/assets/img/pricing-business.png",
    ULTIME="assets/landing/assets/img/pricing-ultimate.png"
}

export enum TarifConstante
{
    GRATUIT="Gratuit",
    DEBUTANT="Debutant",
    BUSINESS="Business",
    ULTIME="Ultime"
}
export abstract class Tarif extends Entity
{
    plan:string=""
    prix_session_etudiant=0;
    nombreEtudiat:Number=0;
    inscription:boolean=false;
    paimentEnLigne:boolean=false;
    partageDocument:String="0Mo";
    session:boolean=false;
    examen:boolean=false;
    devoir:boolean=false;
    forumDiscution:boolean=false;
    integrationGSuite:boolean=false;
    agendaCours:boolean=false;
    videoConference:boolean=false;
}

export class PlanGratuit extends Tarif
{
    nombreEtudiat=15;
    inscription=true;
    paimentEnLigne=true;
    partageDocument="5Mo";
    session=true;
    examen=true;
    forumDiscution=true;
    plan=TarifConstante.GRATUIT;
}

export class PlanDebutant extends PlanGratuit
{
    devoir=true;
    prix_session_etudiant=500;
    plan=TarifConstante.DEBUTANT
}

export class PlanBusiness extends PlanDebutant
{
    prix_session_etudiant=1000;
    integrationGSuite=true;
    agendaCours=true;
    plan=TarifConstante.BUSINESS
}

export class PlanUltime extends PlanBusiness
{
    prix_session_etudiant=2500;
    videoConference=true; 
    plan=TarifConstante.ULTIME
}

