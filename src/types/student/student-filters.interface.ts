export interface StudentFilters {
  courseCompletion?: number | undefined;
  courseEngagement?: number | undefined;
  projectDegree?: number | undefined;
  teamProjectDegree?: number | undefined;
  'profile.expectedContractType'?: number | undefined;
  'profile.expectedTypeWork'?: number | undefined;
  'profile.expectedSalary'?:
    | { min: number | undefined; max: number | undefined }
    | undefined;
  'profile.canTakeApprenticeship'?: number | undefined;
  'profile.monthsOfCommercialExp'?: number | undefined;

  [key: string]:
    | number
    | undefined
    | { min: number | undefined; max: number | undefined };
}
