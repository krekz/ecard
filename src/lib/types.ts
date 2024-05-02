export type TOrganizers = {
  father: string;
  mother: string;
  bride: string;
  groom: string;
  couple: string;
  phone_number: string;
  heirs?: {
    name?: string;
    phone?: string;
    relation?: string;
  }[];
  name?:string;
  account?:string
};
