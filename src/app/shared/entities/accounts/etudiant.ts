import { AccountType } from "src/app/shared/utils/enum";
import { EntityID } from "../entityid";
import { User } from "./user";

export class Etudiant extends User
{
    accountType:AccountType=AccountType.ETUDIANT
    inscrit:boolean=false;
    constructor(){
        super();
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