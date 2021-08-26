import { AccountType } from "../../utils/enum";
import { Entity } from "../entity";
import { EntityID } from "../entityid";

export class User extends Entity
{
    nom:String="";
    prenom:String="";
    sexe:String="";
    email:String="";
    photoUrl:String="";
    mdp:String="";
    tel:String="";
    accountType:AccountType;
    dateCreation:String="";
    dateNaissance:String="";
    lieuxNaissance:String="";
    villeResidenceActuelle:String="";
    nationnalite:String="";

    getPrintableName()
    {
        return this.prenom.length>0?this.prenom:this.nom
    }
    getFullName()
    {
        return `${this.prenom} ${this.nom}`
    }

    getRole()
    {
        let role:String="";
        switch(this.accountType)
        {
            case AccountType.PLATEFROM_ADMIN:
                role="Super Administrateur";
                break;
            case AccountType.ETUDIANT:
                role="Etudiant";
                break;
        }
        return role;
    }

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(Reflect.has(this,key)) {
                if(key=="id") this.id.setId(entity.id)
                else Reflect.set(this,key,entity[key]);
            }
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}
