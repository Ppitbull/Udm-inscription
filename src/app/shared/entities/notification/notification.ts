import { NotificationReadState, NotificationType } from "../../utils/enum/notification.enum";
import { Entity } from "../entity";
import { EntityID } from "../entityid";

export class Notification extends Entity
{
    to:EntityID=new EntityID();
    from:EntityID=new EntityID();
    dateSend:string="";
    dateRead:string="";
    isread:NotificationReadState=NotificationReadState.UNREAD;
    type:NotificationType=NotificationType.SIMPLE_NOTIFICATION;
    content:any="";

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="to") this.to.setId(entity[key]);
            else if(key=="from") this.from.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="from") r[k]=this.from.toString();
            if(k=="to") r[k]=this.to.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}