export enum Role {
  Citizen = 'citizen',
  Authority = 'authority',
  Supplier = 'supplier',
  Admin = 'admin'
}

export interface User {
  role: Role;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  password?: string;
  phone_number?: string;
  profile_pic?: File | string | null;
  profession?: string | null;
  enabled_notifications?: boolean;
  name_organization?: string | null;
  nom_entreprise?: string | null;
  secteur_activite?: string | null;
}