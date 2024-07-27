import { PDFDocument } from "pdf-lib";
import fs from "fs";
import axios from "axios";

export const TYPES = {
  DD: "DD",
  SOF: "SOF",
  APPLICATION: "APPLICATION",
  HIRE: "HIRE",
  POYNT: "POYNT",
};

const WEBHOOK_URL = "https://5tel.bitrix24.uk/rest/13/06ya9ccs2qvobl6t/";

/**
 * Formats a given date into a string representation in the "en-GB" locale.
 *
 * @param {Date|string|number} date - The date to be formatted. It can be a Date object, a string representing a date, or a number representing a timestamp.
 * @return {string} The formatted date string in the "en-GB" locale.
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

/**
 * Retrieves the fields based on the type provided.
 *
 * @param {Object} deal - The deal object containing the fields.
 * @param {string} type - The type of fields to retrieve.
 * @return {Object} The fields object for the specified type or an empty object if type is not found.
 */
export async function getFields(deal, type) {
  const name = deal["UF_CRM_1721898555146"];
  const phone = deal["UF_CRM_1721898775132"];
  const email = deal["UF_CRM_1721898763992"];
  const mobile = deal["UF_CRM_1721898789505"];
  const city = deal["UF_CRM_1721898705193"];
  const postalCode = deal["UF_CRM_1721898721086"];
  const nationality = deal["UF_CRM_1721807834"];

  const dob = formatDate(deal["UF_CRM_1721807688"]);
  const sofDeclarationDate = formatDate(deal["UF_CRM_66879DD535EAE"]);
  const applicationDeclarationDate = formatDate(deal["UF_CRM_1721802784"]);
  const applicationDateOfIncorporation = formatDate(deal["UF_CRM_1721802784"]);
  const applicationDateOfCurrentOwnership = formatDate(
    deal["UF_CRM_1721805406"]
  );
  const applicationExpiryDate = formatDate(deal["UF_CRM_1721807823"]);
  const applicationIssueDate = formatDate(deal["UF_CRM_1721890417808"]);
  const applicationDateOfIndustryExperience = formatDate(
    deal["UF_CRM_1721899786303"]
  );
  const poyntDate = formatDate(deal["UF_CRM_1721926864215"]);

  const fields = {
    DD: {
      "Legal Name 3": deal["UF_CRM_66879DD074993"],
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
      "Legal Name 2": deal["UF_CRM_6687D4F0C95F0"],
      "Legal Name": deal["UF_CRM_66879DD09AF41"],
      "Legal Name 3": deal["UF_CRM_66879DD0A7044"],
      "Legal Name 4": deal["UF_CRM_66879DD0B671B"],

      "MS rate 01": deal["UF_CRM_66879DD0D2B42"],
      "MS rate 22": deal["UF_CRM_66879DD0DF39C"],

      "MS rate 02": deal["UF_CRM_66879DD0EAA4E"],
      "MS rate 23": deal["UF_CRM_66879DD102209"],

      "MS rate 03": deal["UF_CRM_66879DD10F8AE"],
      "MS rate 24": deal["UF_CRM_66879DD121599"],

      "MS rate 04": deal["UF_CRM_66879DD131667"],
      "MS rate 25": deal["UF_CRM_66879DD13D78B"],

      "MS rate 05": deal["UF_CRM_66879DD148E1B"],
      "MS rate 26": deal["UF_CRM_66879DD154D28"],

      "MS rate 06": deal["UF_CRM_66879DD16634A"],
      "MS rate 27": deal["UF_CRM_66879DD172513"],

      "MS rate 07": deal["UF_CRM_66879DD17E5FF"],
      "MS rate 28": deal["UF_CRM_66879DD18AB4A"],

      "MS rate 08": deal["UF_CRM_66879DD196BDF"],
      "MS rate 29": deal["UF_CRM_66879DD1A2FE4"],

      "MS rate 09": deal["UF_CRM_66879DD1ADF82"],
      "MS rate 30": deal["UF_CRM_66879DD1BA249"],

      "MS rate 10": deal["UF_CRM_66879DD1C6F19"],
      "MS rate 31": deal["UF_CRM_66879DD1DAA83"],

      "MS rate 11": deal["UF_CRM_66879DD1E6ED7"],
      "MS rate 32": deal["UF_CRM_66879DD2026E5"],

      "MS rate 12": deal["UF_CRM_66879DD20EAF0"],
      "MS rate 33": deal["UF_CRM_66879DD21AB5A"],

      "MS rate 13": deal["UF_CRM_66879DD226D6C"],
      "MS rate 34": deal["UF_CRM_66879DD2325C2"],

      "MS rate 14": deal["UF_CRM_66879DD240B67"],
      "MS rate 35": deal["UF_CRM_66879DD261DCE"],

      "MS rate 15": deal["UF_CRM_66879DD27157A"],
      "MS rate 36": deal["UF_CRM_66879DD29184E"],

      "MS rate 16": deal["UF_CRM_66879DD2A0208"],
      "MS rate 37": deal["UF_CRM_66879DD2AD0FB"],

      "MS rate 17": deal["UF_CRM_66879DD2BD61D"],
      "MS rate 38": deal["UF_CRM_66879DD2CD444"],

      "MS rate 18": deal["UF_CRM_66879DD2DA158"],
      "MS rate 39": deal["UF_CRM_66879DD2E6765"],

      "MS rate 19": deal["UF_CRM_66879DD300EAA"],

      "MS rate 20": deal["UF_CRM_66879DD3102AE"],
      "MS rate 41": deal["UF_CRM_66879DD31ED22"],

      "MS rate 21": deal["UF_CRM_66879DD32D496"],
      "MS rate 42": deal["UF_CRM_66879DD33D37A"],

      "MS rate 43": deal["UF_CRM_66879DD35356C"],
      "MS rate 44": deal["UF_CRM_66879DD362E90"],

      "MONEY Pricing 01": deal["UF_CRM_66879DD373AC9"],

      "Auth PP1": deal["UF_CRM_66879DD384871"],
      "Auth PP 2": deal["UF_CRM_66879DD3952D3"],

      "Auth PP 4": deal["UF_CRM_66879DD3A5DAA"],
      "Auth PP 5": deal["UF_CRM_66879DD3B3496"],

      "MONEY Pricing 02": deal["UF_CRM_66879DD373AC9"],

      "Auth PP 6": deal["UF_CRM_66879DD3C0AFE"],
      "Auth PP 7": deal["UF_CRM_66879DD3CE614"],

      Text2: deal["UF_CRM_66879DD3EC2F6"],
      Text3: deal["UF_CRM_66879DD4069C2"],
      Text5: deal["UF_CRM_66879DD415C0D"],

      "Misc 4": deal["UF_CRM_66879DD425BE7"][0],
      "Misc 6": String(deal["UF_CRM_66879DD4358EA"][0]) || "",

      "Exc Charges 9": deal["UF_CRM_66879DD506068"],
      "Exc Charges 10": deal["UF_CRM_66879DD5145BC"],

      "Date 3": sofDeclarationDate,
      "FL NAME": deal["UF_CRM_66879DD546E08"],
      "Occupation 3": deal["UF_CRM_66879DD55649B"],
    },
    APPLICATION: {
      "FUNDING 14": deal["UF_CRM_1721898817329"],
      "FUNDING 13": deal["UF_CRM_1721898686091"],
      "Legal Name 176": deal["UF_CRM_1721899462827"],
      "Legal Name 177": deal["UF_CRM_1721899487425"],
      "Legal Name 178": deal["UF_CRM_1721908583647"],
      "Legal Name 179": deal["UF_CRM_1721899514699"],
      "Legal Name 180": deal["UF_CRM_1721899530207"],
      "FUNDING 16": phone,
      "FUNDING 17": phone,
      "FUNDING 18": city,
      "FUNDING 23": city,
      "FUNDING 28": city,
      "FUNDING 20": name,
      "FUNDING 19": email,
      "FUNDING 21": postalCode,
      "FUNDING 26": postalCode,
      "FUNDING 29": postalCode,
      "FUNDING 32": phone,
      "FUNDING 22": deal["UF_CRM_1721898872287"],
      "FUNDING 27": deal["UF_CRM_1721898909721"],
      "FUNDING 39": deal["UF_CRM_1721899557936"],
      "FUNDING 68": deal["UF_CRM_1721911006603"],
      "FUNDING 78": deal["UF_CRM_1721910983409"],
      "FUNDING 51": applicationDateOfIncorporation,
      "FUNDING 53": applicationDateOfCurrentOwnership,
      "Legal Name 210": deal["UF_CRM_1721900423327"],
      "Legal Name 211": deal["UF_CRM_1721900478258"],
      "Legal Name 212": deal["UF_CRM_1721900457026"],

      "FUNDING 45": deal["UF_CRM_1721900256181"],
      "FUNDING 52": deal["UF_CRM_1721900270115"],
      "FUNDING 54": deal["UF_CRM_1721900289947"],
      "FUNDING 59": deal["UF_CRM_1721900303429"],

      "FUNDING 44": deal["UF_CRM_1721806092"],
      "FUNDING 60": deal["UF_CRM_1721806107"],
      "FUNDING 61": deal["UF_CRM_1721806143"],
      "FUNDING 62": deal["UF_CRM_1721806201"],
      "FUNDING 63": deal["UF_CRM_1721806230"],
      "FUNDING 71": deal["UF_CRM_1721900031554"],
      "FUNDING 72": deal["UF_CRM_1721806124"],

      "Legal Name 150": deal["UF_CRM_1721900328558"],

      "Legal Name 173": deal["UF_CRM_1721911814507"],
      "Legal Name 174": dob,
      "Legal Name 175": deal["UF_CRM_1721807702"],

      "Legal Name 119": deal["UF_CRM_1721904277527"],
      "Legal Name 120": deal["UF_CRM_1721904287264"],
      "Legal Name 121": phone,
      "Legal Name 151": city,
      "Legal Name 118": deal["UF_CRM_1721904246468"],
      "Legal Name 152": postalCode,

      "FUNDING 85": deal["UF_CRM_1721904312882"],
      "Legal Name 171": "",
      "FUNDING 87": "",
      "Legal Name 192": "",

      "Legal Name 193": "",
      "Legal Name 194": "",

      "Legal Name 202": "",

      "Legal Name 1012": deal["UF_CRM_1721909802272"],
      "Legal Name 1013": deal["UF_CRM_1721909817941"],
      "Legal Name 1014": deal["UF_CRM_1721914088584"],
      "Legal Name 1018": deal["UF_CRM_1721909847862"],
      "Legal Name 80": deal["UF_CRM_1721907567960"],
      "Legal Name 81": deal["UF_CRM_1721808234"],

      "Legal Name 82": deal["UF_CRM_1721907645150"],
      "Legal Name 83": deal["UF_CRM_1721907657241"],
      "Legal Name 84": deal["UF_CRM_1721907676288"],

      "Legal Name 85": deal["UF_CRM_1721825349249"],

      "Legal Name 86": deal["UF_CRM_1721907711498"],
      "Legal Name 87": deal["UF_CRM_1721907722847"],
      "Legal Name 88": deal["UF_CRM_1721907734779"],

      "Legal Name 89": deal["UF_CRM_1721907777577"],
      "Legal Name 90": deal["UF_CRM_1721907787562"],
      "Legal Name 91": deal["UF_CRM_1721907798322"],

      "Legal Name 92": deal["UF_CRM_1721907833246"],

      "Legal Name 93": deal["UF_CRM_1721907963575"],
      "Legal Name 94": deal["UF_CRM_1721908039041"],
      "Legal Name 95": deal["UF_CRM_1721908081916"],
      "Legal Name 96": deal["UF_CRM_1721908216553"],
      "Legal Name 97": deal["UF_CRM_1721822441"],
      "Legal Name 98": deal["UF_CRM_1721822475"],
      "Legal Name 99": deal["UF_CRM_1721822460"],
      "Legal Name 100": deal["UF_CRM_1721905628569"],
      "Legal Name 101": deal["UF_CRM_1721822491"],
      "Legal Name 1011": deal["UF_CRM_1721905691149"],

      "Legal Name 102": deal["UF_CRM_1721907854145"],
      "Legal Name 1015": deal["UF_CRM_1721897958423"],
      "Legal Name 1016": deal["UF_CRM_1721897971273"],
      "Legal Name 1017": deal["UF_CRM_1721897996676"],

      "Legal Name 109": deal["UF_CRM_1721909629462"],
      "Legal Name 1019": deal["UF_CRM_1721909629462"],
      "Legal Name 1010": applicationDeclarationDate,
      "Legal Name 1020": applicationDeclarationDate,

      "FUNDING 79": deal["UF_CRM_1721899899716"],

      "FUNDING 82": deal["UF_CRM_1721899947153"],
      "FUNDING 83": deal["UF_CRM_1721899754502"],
      "FUNDING 80": deal["UF_CRM_1721805951"],

      "FUNDING 11": name,

      "FUNDING 24": name,
      "Contact Name": deal["UF_CRM_1721899437643"],
      "FUNDING 25": email,
      "Email address": email,
      "FUNDING 33": phone,
      "Mobile No": phone,
      "Phone No": phone,

      "FUNDING 84": deal["UF_CRM_1721899978480"],
      "Legal Name 122": email,
      "Legal Name 125": mobile,
      "Legal Name 123": deal["UF_CRM_1721807790"],
      "Legal Name 124": applicationIssueDate,
      "Legal Name 184": applicationExpiryDate,
      "FUNDING 46": nationality,
      "FUNDING 74": deal["UF_CRM_1721904312882"],

      "FUNDING 81": applicationDateOfIndustryExperience,

      "income tax field": deal["UF_CRM_1721899822832"],

      "x corp Tax Number": deal["UF_CRM_1721899840789"],
      "x charity number": deal["UF_CRM_1721899850086"],
    },
    HIRE: {
      // Hirer Information 1
      "Legal Name 2": deal["UF_CRM_1721924693014"],
      "Postal address 2": deal["UF_CRM_1721924722247"],
      "Legal Name 83": deal["UF_CRM_1721924709010"],
      "City 2": deal["UF_CRM_1721924730767"],
      "Postcode 2": deal["UF_CRM_1721924739610"],
      "Email 2": deal["UF_CRM_1721924748470"],
      // Key Financial Information
      "Legal Name 55": deal["UF_CRM_1721924870001"][0] || "",
      "Legal Name 59": deal["UF_CRM_1721924971996"][0] || "",
      "Legal Name 63": deal["UF_CRM_1721925004229"][0] || "",
      "Legal Name 67": deal["UF_CRM_1721925027823"][0] || "",
      "Legal Name 71": deal["UF_CRM_1721925050044"][0] || "",

      "Legal Name 56": deal["UF_CRM_1721924870001"][1] || "",
      "Legal Name 60": deal["UF_CRM_1721924971996"][1] || "",
      "Legal Name 64": deal["UF_CRM_1721925004229"][1] || "",
      "Legal Name 68": deal["UF_CRM_1721925027823"][1] || "",
      "Legal Name 72": deal["UF_CRM_1721925050044"][1] || "",

      "Legal Name 57": deal["UF_CRM_1721924870001"][2] || "",
      "Legal Name 61": deal["UF_CRM_1721924971996"][2] || "",
      "Legal Name 65": deal["UF_CRM_1721925004229"][2] || "",
      "Legal Name 69": deal["UF_CRM_1721925027823"][2] || "",
      "Legal Name 73": deal["UF_CRM_1721925050044"][2] || "",

      "Legal Name 58": deal["UF_CRM_1721924870001"][3] || "",
      "Legal Name 62": deal["UF_CRM_1721924971996"][3] || "",
      "Legal Name 66": deal["UF_CRM_1721925004229"][3] || "",
      "Legal Name 70": deal["UF_CRM_1721925027823"][3] || "",
      "Legal Name 74": deal["UF_CRM_1721925050044"][3] || "",

      "Legal Name 75": deal["UF_CRM_1721924870001"][4] || "",
      "Legal Name 76": deal["UF_CRM_1721924971996"][4] || "",
      "Legal Name 77": deal["UF_CRM_1721925004229"][4] || "",
      "Legal Name 78": deal["UF_CRM_1721925027823"][4] || "",
      "Legal Name 79": deal["UF_CRM_1721925050044"][4] || "",

      "Legal Name 82": deal["UF_CRM_1721925118423"],
      "Legal Name 81": deal["UF_CRM_1721925137066"],
    },
    POYNT: {
      // Customer Information
      "Text_13 ": deal["UF_CRM_1721926292991"],
      "Text_14 ": deal["UF_CRM_1721926307981"],
      "Text_15 ": deal["UF_CRM_1721926317409"],
      "Text_16 ": deal["UF_CRM_1721926351184"],
      "Text_17 ": deal["UF_CRM_1721926372009"],
      "Text_19 ": deal["UF_CRM_1721926405302"],
      "Text_18 ": deal["UF_CRM_1721926418264"],
      // Deatils
      "Text_20 ": deal["UF_CRM_1721926448436"],
      Text2: deal["UF_CRM_1721926468296"],
      "Text_21 ": deal["UF_CRM_1721927109211"],

      "Text_22 ": deal["UF_CRM_1721926500614"],
      Text3: deal["UF_CRM_1721926573877"],
      "Text_23 ": deal["UF_CRM_1721926606922"],

      "Text_24 ": deal["UF_CRM_1721926623333"],
      Text4: deal["UF_CRM_1721926636587"],
      // Customer declaration and signatures
      "Text_26 ": deal["UF_CRM_1721926292991"],
      "Text_27 ": poyntDate,

      "Text_29 ": deal["UF_CRM_1721926292991"],
      // "Text_30": deal[""],
      "Text_31 ": poyntDate,
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
  const response = await fetch(
    `https://5tel.bitrix24.uk/rest/13/06ya9ccs2qvobl6t/crm.deal.get.json?ID=${dealId}`
  );

  const result = await response.json();
  const deal = result?.result;

  if (deal) return deal;

  return null;
}

/**
 * Asynchronously fetches contact details based on the provided contactId.
 *
 * @param {number} contactId - The ID of the contact to fetch details for.
 * @return {Promise<Object | null>} A promise that resolves to the contact details if found, or null if not found.
 */
export async function fetchContactDetails(contactId) {
  const response = await fetch(
    `https://5tel.bitrix24.uk/rest/13/06ya9ccs2qvobl6t/crm.contact.get.json?ID=${contactId}`
  );

  const result = await response.json();
  const contact = result?.result;

  if (contact) return contact;

  return null;
}

/**
 * Processes a deal based on the provided deal object and deal ID.
 *
 * @param {Object} deal - The deal object containing the deal details.
 * @param {number} dealId - The ID of the deal.
 * @return {void}
 */
export async function processDeal(deal, dealId) {
  const name = deal["UF_CRM_1721898555146"] || "";
  const phone = deal["UF_CRM_1721898775132"] || "";
  const email = deal["UF_CRM_1721898763992"] || "";

  const contactRes = await axios.get(`${WEBHOOK_URL}crm.contact.add`, {
    params: {
      fields: {
        NAME: name,
        EMAIL: [
          {
            VALUE: email,
          },
        ],
        PHONE: [
          {
            VALUE: phone,
          },
        ],
      },
    },
  });

  const contactId = contactRes?.data?.result;

  modifyPdf(deal, dealId, TYPES.DD, contactId);
  modifyPdf(deal, dealId, TYPES.SOF, contactId);
  modifyPdf(deal, dealId, TYPES.APPLICATION, contactId);
  modifyPdf(deal, dealId, TYPES.HIRE, contactId);
  modifyPdf(deal, dealId, TYPES.POYNT, contactId);
}

/**
 * Modifies a PDF template with deal details and saves it as a new PDF file.
 *
 * @param {Object} deal - The deal object containing details to be filled in the PDF.
 * @param {number} dealId - The ID of the deal.
 * @param {string} type - The type of the PDF template.
 * @param {number} contactId - The ID of the contact associated with the deal.
 * @return {Promise<void>} A promise that resolves when the PDF is saved and uploaded.
 */
export async function modifyPdf(deal, dealId, type, contactId) {
  const templateFilePath = `./templates/${type}.pdf`;
  const outputFilePath = `./output/${type}_${dealId}.pdf`;

  const templateFile = fs.readFileSync(templateFilePath);
  const pdfDoc = await PDFDocument.load(templateFile);

  const form = pdfDoc.getForm();

  const fields = await getFields(deal, type);

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    const field = form.getField(key);

    if (!field) return;

    field.setText(value);
  });

  if (type === TYPES.SOF) {
    const radioGroup2 = form.getRadioGroup("Group2");
    const radioGroup1 = form.getRadioGroup("Group1");

    // Selection of Merchant Service Charges Pricing Method
    const pricingMethod = deal["UF_CRM_66879DD0C2EB5"];
    if (pricingMethod) {
      const selection =
        pricingMethod === "91"
          ? "Choice1"
          : pricingMethod === "93"
          ? "0"
          : null;
      if (selection) radioGroup2.select(selection);
    }

    // Secured by Elavon
    const elavonSecurity = deal["UF_CRM_66879DD3DC198"];
    if (elavonSecurity) {
      const selection =
        elavonSecurity === "95"
          ? "Choice1"
          : elavonSecurity === "97"
          ? "Choice2"
          : null;
      if (selection) radioGroup1.select(selection);
    }

    // Other Charges
    const checkboxes = [
      "UF_CRM_66879DD496053",
      "UF_CRM_66879DD4A6C70",
      "UF_CRM_66879DD4B92A5",
      "UF_CRM_66879DD4CC36C",
      "UF_CRM_66879DD4DA414",
      "UF_CRM_66879DD4E9200",
    ];

    checkboxes.forEach((field, index) => {
      if (deal[field] === "1") {
        const checkBox = form.getCheckBox(`C10${4 + index}`);
        checkBox.check();
      }
    });
  }

  if (type === TYPES.APPLICATION) {
    const checkboxes = ["C129", "C130", "C131", "C132", "C133", "C134", "C135"];
    const multiSelectFields = [
      {
        field: "UF_CRM_1721908324310",
        checks: {
          375: "C101028",
          377: "C101029",
          379: "C101030",
          381: "C101031",
        },
      },
      {
        field: "UF_CRM_1721918348646",
        checks: {
          457: "C10165",
          459: "C10166",
          461: "C10167",
        },
      },
      {
        field: "UF_CRM_1721911208261",
        checks: {
          415: "C10118",
          417: "C10119",
          419: "C10120",
          421: "C10121",
          423: "C10122",
          425: "C10123",
          427: "PCI 01",
        },
      },
      {
        field: "UF_CRM_1721911345383",
        checks: {
          429: "C10128",
          431: "C10130",
          433: "C10132",
          435: "C10129",
          437: "C10131",
          439: "C10133",
          441: "PCI 02",
        },
      },
    ];

    checkboxes.forEach((field) => {
      if (field !== "C131") {
        form.getCheckBox(field).check();
      }
    });

    const singleChecks = [
      {
        field: "UF_CRM_1721899614199",
        value: "1",
        checkbox: "Govern Owned Entity",
      },
      { field: "UF_CRM_1721909867933", value: "1", checkbox: "C101015" },
      { field: "UF_CRM_1721908070298", value: "1", checkbox: "C101026" },
      { field: "UF_CRM_1721909673033", value: "1", checkbox: "C95" },
      {
        field: "UF_CRM_1721908160103",
        values: { 367: "C101027", 369: "C101039" },
      },
      {
        field: "UF_CRM_1721908256935",
        values: { 371: "C101032", 373: "C101033" },
      },
      { field: "UF_CRM_1721907540587", value: "1", checkbox: "C10107" },
      { field: "UF_CRM_1721907583706", values: { 1: "C101011", 0: "C101012" } },
      { field: "UF_CRM_1721905318512", values: { 1: "C1080", 0: "C1081" } },
      {
        field: "UF_CRM_1721907506452",
        values: { 349: "C10105", 351: "C10106" },
      },
      { field: "UF_CRM_1721911864260", values: { 0: "C1071", 1: "C1070" } },
      { field: "UF_CRM_1721917842920", values: { 0: "C101014", 1: "C101013" } },
      {
        field: "UF_CRM_1721918248141",
        values: { 449: "C10145", 451: "C10146", 453: "C10147", 455: "C10148" },
      },
      { field: "UF_CRM_1721900370652", values: { 0: "C10140", 1: "C10139" } },
      { field: "UF_CRM_1721900178038", values: { 0: "C1045", 1: "C1039" } },
      { field: "UF_CRM_1721900392951", values: { 0: "C10142", 1: "C10141" } },
      {
        field: "UF_CRM_1721910783095",
        values: { 393: "C1046", 395: "C1047", 397: "C1048", 399: "C1049" },
      },
      {
        field: "UF_CRM_1721910947278",
        values: {
          401: "C1064",
          403: "C1069",
          405: "C1067",
          407: "C1066",
          409: "C1078",
          411: "C1065",
          413: "C1068",
        },
      },
      {
        field: "UF_CRM_1721908556343",
        values: {
          383: "C10110",
          385: "C10116",
          387: "C10117",
          389: "C10138",
          391: "C101018",
        },
      },
      {
        field: "UF_CRM_1721899822832",
        condition: true,
        checkbox: "income tax number",
      },
      {
        field: "UF_CRM_1721899840789",
        condition: true,
        checkbox: "corporate tax number",
      },
      {
        field: "UF_CRM_1721899850086",
        condition: true,
        checkbox: "charity number",
      },
    ];

    singleChecks.forEach(({ field, value, checkbox, values, condition }) => {
      if (value !== undefined && deal[field] === value) {
        form.getCheckBox(checkbox).check();
      } else if (values) {
        const checkBoxValue = values[deal[field]];
        if (checkBoxValue) {
          form.getCheckBox(checkBoxValue).check();
        }
      } else if (condition && deal[field] !== "") {
        form.getCheckBox(checkbox).check();
      }
    });

    multiSelectFields.forEach(({ field, checks }) => {
      if (deal[field] && deal[field].length) {
        deal[field].forEach((item) => {
          const checkBoxValue = checks[item];
          if (checkBoxValue) {
            form.getCheckBox(checkBoxValue).check();
          }
        });
      }
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFilePath, pdfBytes);

  await uploadPDFToBitrix(outputFilePath);
  await createNewESign(outputFilePath, contactId);
}

/**
 * Asynchronously reads a file from the specified path and encodes it to base64.
 *
 * @param {string} filePath - The path to the file to be encoded.
 * @return {Promise<string>} A promise that resolves to the base64 encoded data of the file.
 *                           If an error occurs during the reading or encoding process, the promise is rejected with an error.
 */
function encodeFileToBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/**
 * Asynchronously uploads a PDF file to Bitrix24 CRM's Company Drive.
 *
 * @param {string} filePath - The path to the PDF file to be uploaded.
 * @return {Promise<Object>} A promise that resolves to an object indicating the success or failure of the operation.
 *   If successful, the object will have a `success` property set to `true`.
 *   If unsuccessful, the object will have a `success` property set to `false` and a `message` property containing the error message.
 */
async function uploadPDFToBitrix(filePath) {
  try {
    const base64File = await encodeFileToBase64(filePath);
    const fileName = filePath.split("/").pop();

    const response = await axios.post(
      `${WEBHOOK_URL}disk.folder.uploadfile`,
      {
        id: "1477", // Folder ID of Elavon Forms inside Company Drive
        data: {
          NAME: fileName,
        },
        fileContent: [fileName, base64File],
        generateUniqueName: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const fileId = response.data.result.FILE_ID;
    if (!fileId) {
      throw new Error("File upload failed");
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Asynchronously creates a new electronic signature (ESign) in Bitrix24 CRM.
 *
 * @param {string} filePath - The path to the file to be uploaded and used as the title of the ESign.
 * @param {number} contactId - The ID of the contact associated with the ESign.
 * @return {Promise<Object>} A promise that resolves to an object indicating the success or failure of the operation.
 *   If successful, the object will have a `success` property set to `true`.
 *   If unsuccessful, the object will have a `success` property set to `false` and a `message` property containing the error message.
 */
async function createNewESign(filePath, contactId) {
  const fileName = filePath.split("/").pop();

  try {
    const response = await axios.post(`${WEBHOOK_URL}crm.item.add`, {
      entityTypeId: "36",
      fields: {
        TITLE: fileName,
        CONTACT_IDS: [contactId],
      },
    });
  } catch (error) {
    console.error(error);
  }
}
