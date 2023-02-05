import OrganizationUserRoles from "./organizationUserRoles";

export default interface Organization {
  id: number;
  name: string;
  description: string;
  organizationUserRoles: OrganizationUserRoles[];
}
