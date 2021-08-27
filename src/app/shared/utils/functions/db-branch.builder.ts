import { EntityID } from "../../entities/entityid";
import { DbBranch } from "../enum/db-branch.enum";

export function getBranchOfUsers():string
{
    return `${DbBranch.general_users}`
}

export function getBranchOfUser(userID:EntityID):string
{
    return `${getBranchOfUsers()}/${userID.toString()}`;
}

export function getBranchOfUserData():string
{
    return `${DbBranch.general_users_data}`
}

export function getBanchOfCandidatureOfUser(userID:EntityID):string
{
    return `${getBranchOfCandidatures()}/${userID.toString()}`
}
export function getBranchOfCandidatures():string
{
    return `${getBranchOfUserData()}/${DbBranch.candidatures}`
}
{

}

