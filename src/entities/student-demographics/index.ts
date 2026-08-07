export type {
  Gender,
  ParentRelation,
  StudentDemographics,
  StudentDemographicsUpdate,
} from "./model/types";
export { GENDER_LABELS, PARENT_RELATION_LABELS } from "./model/labels";
export {
  getMyDemographics,
  getStudentDemographics,
  updateMyDemographics,
} from "./api/studentDemographicsApi";
export { useMyDemographicsQuery } from "./lib/useMyDemographicsQuery";
export { useStudentDemographicsQuery } from "./lib/useStudentDemographicsQuery";
export { useUpdateMyDemographicsMutation } from "./lib/useUpdateMyDemographicsMutation";
