import { User, PlateFormAdmin } from "../../entities/accounts";
import { Etudiant } from "../../entities/accounts/etudiant";
import { AccountType } from "../enum";


export function accountBuilder(entity:Record<string,any>) : User
{
    let user:User;
    switch (entity.accountType)
    {
        case AccountType.PLATEFROM_ADMIN:
            user=new PlateFormAdmin();
            break
        case AccountType.ETUDIANT:
            user = new Etudiant();
            break;
        default:
            user = new User();
    }
    user.hydrate(entity);
    return user;
}
