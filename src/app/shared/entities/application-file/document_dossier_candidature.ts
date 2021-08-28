import { CustomFile } from "../custom-file";
import { Entity } from "../entity";

export class DocumentDossierCandidature extends Entity
{
    listDocument:{label:String,files:CustomFile[]}[]=[]

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            else if(k=="listDocument")
            {
                r[k]=this.listDocument.map((docs)=>{
                    return {
                        label:docs.label,
                        files:docs.files.map((doc)=>{
                            return {
                                ...doc.toString(),
                                data:""
                            }
                        })
                    }
                })
            }
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="listDocument") this.listDocument=entity[key].map((docs)=>{
                return {
                    label:docs.label,
                    files:docs.files.map((doc)=>{
                        let file=new CustomFile();
                        file.hydrate(doc);
                        return file;
                    })
                }
            })
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }
}