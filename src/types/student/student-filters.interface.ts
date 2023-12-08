export interface StudentFilters {
  courseCompletion?: number;
  courseEngagement?: number;
  projectDegree?: number;
  teamProjectDegree?: number;
  'profile.expectedContractType'?: number;
  'profile.expectedTypeWork'?: number;
  'profile.expectedSalary'?: number;
  'profile.canTakeApprenticeship'?: number;
  'profile.monthsOfCommercialExp'?: number;
  [key: string]: number;
}
