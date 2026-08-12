import { projectSchema } from "./project";
import { teamMemberSchema } from "./teamMember";
import { serviceSchema } from "./service";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  projectSchema,
  teamMemberSchema,
  serviceSchema,
  siteSettingsSchema,
];
