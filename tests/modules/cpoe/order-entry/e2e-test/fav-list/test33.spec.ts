const { expect } = require('@playwright/test');

import {PatientData} from "@tests/shared/test-data/patient-data";
import { Config } from "@tests/shared/environment-configuration";
import capturePatientPage from '@tests/shared/components/capture-patient/capture-patient.page'

const config = new Config();
const patientData = new PatientData();


export async function capturePatient(page){
  const capPatient = new capturePatientPage(page)
  await capPatient.navigateToPage(page, `${config.baseUrl}physicianDesktop`);
  await expect(page).toHaveURL(/.*physicianDesktop/);
  await capPatient.captureAction(page, patientData.SearchKeyWord);
}

  
