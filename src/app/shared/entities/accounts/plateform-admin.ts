import { AccountType } from "src/app/shared/utils/enum";
import { User } from "./user";

export class PlateFormAdmin extends User
{
    accountType:AccountType=AccountType.PLATEFROM_ADMIN
}