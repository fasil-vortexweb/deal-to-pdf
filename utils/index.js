import { PDFDocument } from "pdf-lib";
import fs from "fs";

export const TYPES = {
  DD: "DD",
  SOF: "SOF",
  APPLICATION: "APPLICATION",
};

/**
 * Retrieves the positions based on the type provided.
 *
 * @param {string} type - The type of positions to retrieve.
 * @return {object} The positions object for the specified type or an empty object if type is not found.
 */
export function getFieldPositions(type) {
  const positions = {
    DD: {
      "Legal Name 3": { x: 23, y: 53 },
      "Bank Number 1": { x: 23, y: 76 },
      "Bank Number 2": { x: 34, y: 76 },
      "Bank Number 3": { x: 45, y: 76 },
      "Bank Number 4": { x: 56, y: 76 },
      "Bank Number 5": { x: 67, y: 76 },
      "Bank Number 6": { x: 78, y: 76 },
      "Bank Number 7": { x: 89, y: 76 },
      "Bank Number 8": { x: 100, y: 76 },
      "Bank Number 9": { x: 23, y: 90 },
      "Bank Number 10": { x: 34, y: 90 },
      "Bank Number 11": { x: 45, y: 90 },
      "Bank Number 12": { x: 56, y: 90 },
      "Bank Number 13": { x: 67, y: 90 },
      "Bank Number 14": { x: 78, y: 90 },
    },
    SOF: {
      "Legal Name 1": { x: 36, y: 36 },
    },
    APPLICATION: {
      "FUNDING 11": { x: 19, y: 92 },
    },
  };

  return positions[type] || {};
}

/**
 * Retrieves the fields based on the type provided.
 *
 * @param {Object} deal - The deal object containing the fields.
 * @param {string} type - The type of fields to retrieve.
 * @return {Object} The fields object for the specified type or an empty object if type is not found.
 */
export function getFields(deal, type) {
  const fields = {
    DD: {
      "Legal Name 3": deal["UF_CRM_6687D4F0A615A"],
      "Bank Number": deal["UF_CRM_6687D4F0C95F0"][0],
      "Bank Number 1": deal["UF_CRM_6687D4F0C95F0"][1],
      "Bank Number 2": deal["UF_CRM_6687D4F0C95F0"][2],
      "Bank Number 3": deal["UF_CRM_6687D4F0C95F0"][3],
      "Bank Number 4": deal["UF_CRM_6687D4F0C95F0"][4],
      "Bank Number 5": deal["UF_CRM_6687D4F0C95F0"][5],
      "Bank Number 6": deal["UF_CRM_6687D4F0C95F0"][6],
      "Bank Number 7": deal["UF_CRM_6687D4F0C95F0"][7],

      "Bank Number 8": deal["UF_CRM_6687D4F0C95F0"][0],
      "Bank Number 9": deal["UF_CRM_6687D4F0D94ED"][1],
      "Bank Number 10": deal["UF_CRM_6687D4F0D94ED"][2],
      "Bank Number 11": deal["UF_CRM_6687D4F0D94ED"][3],
      "Bank Number 12": deal["UF_CRM_6687D4F0D94ED"][4],
      "Bank Number 13": deal["UF_CRM_6687D4F0D94ED"][5],
    },
    SOF: {
      "Legal Name 1": deal["UF_CRM_66879DD074993"],
    },
    APPLICATION: {
      "FUNDING 11": deal["UF_CRM_1721456148164"],
    },
  };

  return fields[type] || {};
}

/**
 * Checks if the provided data object represents a valid deal event.
 *
 * @param {Object} data - The data object to validate.
 * @return {boolean} True if the data represents a valid deal event, false otherwise.
 */
export function isValidDealEvent(data) {
  return data.event && data.data.FIELDS.ID && data.event === "ONCRMDEALADD";
}

/**
 * Asynchronously fetches deal details based on the provided dealId.
 *
 * @param {number} dealId - The ID of the deal to fetch details for.
 * @return {Object | null} The deal details if found, or null if not found.
 */
export async function fetchDealDetails(dealId) {
  console.log("dealId", dealId);
  const response = await fetch(
    `https://5tel.bitrix24.uk/rest/13/buxgulfut3835t54/crm.deal.get.json?ID=${dealId}`
  );

  const result = await response.json();
  const deal = result?.result;

  if (deal) return deal;

  return null;
}

/**
 * Processes a deal based on the provided deal object and deal ID.
 *
 * @param {Object} deal - The deal object containing the deal details.
 * @param {number} dealId - The ID of the deal.
 * @return {void}
 */
export function processDeal(deal, dealId) {
  if (deal?.UF_CRM_6687D4F0C95F0 && deal?.UF_CRM_6687D4F0C95F0 != "")
    modifyPdf(deal, dealId, TYPES.DD);
  else if (deal?.UF_CRM_66879DD074993 && deal?.UF_CRM_66879DD074993 != "")
    modifyPdf(deal, dealId, TYPES.SOF);
  else if (deal?.UF_CRM_1721456148164 && deal?.UF_CRM_1721456148164 == "")
    modifyPdf(deal, dealId, TYPES.APPLICATION);
}

export async function modifyPdf(deal, dealId, type) {
  console.log("modifyPdf", deal, dealId, type);

  const templateFilePath = `./templates/${type}.pdf`;
  const outputFilePath = `./output/${type}_${dealId}.pdf`;

  // Load the template PDF
  const templateFile = fs.readFileSync(templateFilePath);
  const pdfDoc = await PDFDocument.load(templateFile);

  const form = pdfDoc.getForm();

  const positions = getFieldPositions(type);
  const fields = getFields(deal, type);

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    console.log(key, ": ", value);
    const field = form.getField(key);
    if (!field) return;
    console.log(field);
    field.setText(value);
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFilePath, pdfBytes);
}
