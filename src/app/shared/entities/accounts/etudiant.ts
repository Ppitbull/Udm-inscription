import { AccountType } from "src/app/shared/utils/enum";
import { EntityID } from "../entityid";
import { User } from "./user";

export class Etudiant extends User
{
    accountType:AccountType=AccountType.ETUDIANT
    inscrit:boolean=false;
    emailContact:string="";
    nomContact:string="";
    telContact:string="";
    constructor(){
        super();
    }
    
}