import { UserRoles } from "src/users/enums/user.enum";

export interface User extends Document{
    nom: string ; 
    prenom:string;
    tel:string;
    email:string;
    mdp:string;
    readonly role: UserRoles;
    readonly created_at: Date;
    readonly updated_at: Date;
}