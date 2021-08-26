import { Entity } from "../entity";
import { DocumentDossierCandidature } from "./document_dossier_candidature";
import { FilliereFormationCandidature } from "./filiere_formation_candidature";
import { QualificationCandidature } from "./qualification_candidature"

export class DossierCandidature extends Entity
{
    documents:DocumentDossierCandidature=new DocumentDossierCandidature();
    formations:FilliereFormationCandidature=new FilliereFormationCandidature();
    qualifications:QualificationCandidature=new QualificationCandidature();

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="documents") this.documents.hydrate(entity[key]);
            else if(key=="formations") this.formations.hydrate(entity[key]);
            else if(key=="qualifications") this.qualifications.hydrate(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            else if(k=="documents") r[k]=this.documents.toString();
            else if(k=="formations") r[k]=this.formations.toString();
            else if(k=="qualifications") r[k]=this.qualifications.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}