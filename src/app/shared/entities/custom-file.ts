import { Entity } from "./entity";

export class CustomFile extends Entity
{
    name:string="";
    lastModified:string="";
    size:number=0.0;
    type:string="";
    data:any="";
    link:String="";
}