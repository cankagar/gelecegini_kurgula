export type {
  Gender,
  ParentRelation,
  StudentDemographics,
  StudentDemographicsUpdate,
} from "./model/types";
export { GENDER_LABELS, PARENT_RELATION_LABELS } from "./model/labels";
export { getMyDemographics, updateMyDemographics } from "./api/studentDemographicsApi";
export { useMyDemographicsQuery } from "./lib/useMyDemographicsQuery";
export { useUpdateMyDemographicsMutation } from "./lib/useUpdateMyDemographicsMutation";
