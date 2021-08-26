import { CustomFile } from "../custom-file";
import { Entity } from "../entity";

export class DocumentDossierCandidature extends Entity
{
    listDocument:{label:String,files:CustomFile[]}[]=[]
}