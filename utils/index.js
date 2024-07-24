import { PDFDocument } from "pdf-lib";
import fs from "fs";

export const TYPES = {
  DD: "DD",
  SOF: "SOF",
  APPLICATION: "APPLICATION",
};

/**
 * Retrieves the fields based on the type provided.
 *
 * @param {Object} deal - The deal object containing the fields.
 * @param {string} type - The type of fields to retrieve.
 * @return {Object} The fields object for the specified type or an empty object if type is not found.
 */
export async function getFields(deal, type) {
  const contact = await fetchContactDetails(deal["CONTACT_ID"]);

  const name = contact?.NAME + " " + contact?.LAST_NAME;
  const phone = contact?.PHONE[0]?.VALUE || "";
  const email = contact?.EMAIL[0]?.VALUE || "";
  const dob = contact?.BIRTHDATE || "";
  const address = contact?.ADDRESS || "";
  const city = contact?.ADDRESS_CITY || "";
  const postalCode = contact?.ADDRESS_POSTAL_CODE || "";
  const country = contact?.ADDRESS_COUNTRY || "";

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

      // TODO - GROUPS
      //   'Group2': deal["UF_CRM_66879DD074993"],

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

      // TODO - GROUPS
      //   'Group1': deal["UF_CRM_66879DD074993"],

      Text2: deal["UF_CRM_66879DD3EC2F6"],
      Text3: deal["UF_CRM_66879DD4069C2"],
      Text5: deal["UF_CRM_66879DD415C0D"],

      "Misc 4": deal["UF_CRM_66879DD425BE7"][0],
      "Misc 6": String(deal["UF_CRM_66879DD4358EA"][0]) || "",
      //    "Misc 7": deal["UF_CRM_66879DD074993"],
      //    "Misc 8": deal["UF_CRM_66879DD074993"],
      //    "Misc 9": deal["UF_CRM_66879DD074993"],
      //    "Misc 10": deal["UF_CRM_66879DD074993"],

      C104: deal["UF_CRM_66879DD074993"],
      C105: deal["UF_CRM_66879DD074993"],
      C106: deal["UF_CRM_66879DD074993"],
      C107: deal["UF_CRM_66879DD074993"],
      C108: deal["UF_CRM_66879DD074993"],
      C109: deal["UF_CRM_66879DD074993"],

      //    "C1010": deal["UF_CRM_66879DD074993"],
      //    "C1011": deal["UF_CRM_66879DD074993"],
      //    "C1012": deal["UF_CRM_66879DD074993"],
      //    "C1013": deal["UF_CRM_66879DD074993"],
      //    "C1014": deal["UF_CRM_66879DD074993"],
      //    "C1015": deal["UF_CRM_66879DD074993"],
      //    "C1016": deal["UF_CRM_66879DD074993"],
      //    "C1017": deal["UF_CRM_66879DD074993"],
      //    "C1018": deal["UF_CRM_66879DD074993"],
      //    "C1019": deal["UF_CRM_66879DD074993"],
      //    "C1020": deal["UF_CRM_66879DD074993"],
      //    "C1021": deal["UF_CRM_66879DD074993"],

      "Exc Charges 9": deal["UF_CRM_66879DD506068"],
      "Exc Charges 10": deal["UF_CRM_66879DD5145BC"],

      "Date 3": deal["UF_CRM_66879DD535EAE"],
      "FL NAME": deal["UF_CRM_66879DD546E08"],
      "Occupation 3": deal["UF_CRM_66879DD55649B"],
    },
    APPLICATION: {
      // TODO - C1010
      // TODO - C1011
      // TODO - C1012
      // FUNDING: deal["UF_CRM_1721456148164"],
      // "FUNDING 5": deal["UF_CRM_1721456148164"],
      "FUNDING 14": "",
      "FUNDING 13": "",
      // "FUNDING 1": deal["UF_CRM_1721456148164"],
      // "FUNDING 6": deal["UF_CRM_1721456148164"],
      // "FUNDING 2": deal["UF_CRM_1721456148164"],
      // "FUNDING 7": deal["UF_CRM_1721456148164"],
      // "FUNDING 12": deal["UF_CRM_1721456148164"],
      // "FUNDING 3": deal["UF_CRM_1721456148164"],
      // "FUNDING 8": deal["UF_CRM_1721456148164"],
      // "FUNDING 4": deal["UF_CRM_1721456148164"],
      // "FUNDING 9": deal["UF_CRM_1721456148164"],
      "Legal Name 176": "",
      "Legal Name 177": "",
      "Legal Name 178": "",
      "Legal Name 179": "",
      "Legal Name 180": "",
      // TODO - C10110
      // TODO - C101016
      // TODO - C101017
      // TODO - C101018
      // TODO - C10115
      // TODO - C10116
      // TODO - C10118
      // TODO - C10121
      // TODO - C10119
      // TODO - C10122
      // TODO - C10120
      // TODO - C10128
      // TODO - C10129
      // TODO - C10130
      // TODO - C10131
      // TODO - C10132
      // TODO - C10133
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
      // TODO - C10124
      // TODO - C10125
      // TOD) - C10135
      // TOD) - C10126
      // TOD) - C10136
      // TOD) - C10127
      // TOD) - C10137
      "FUNDING 22": "",
      "FUNDING 27": "",
      // TODO - C10138
      // TODO - C10143
      // TODO - C10144
      // TODO - C1064
      // TODO - C1065
      // TODO - C1066
      // TODO - C1067
      // TODO - C1068
      // TODO - C1069
      "FUNDING 39": "",
      "FUNDING 68": "",
      "FUNDING 78": "",
      "FUNDING 51": deal["UF_CRM_1721802784"],
      "FUNDING 53": deal["UF_CRM_1721805406"],
      // TODO - C10139
      // TODO - C10140
      // TODO - C10141
      // TODO - C10142
      "Legal Name 210": "",
      "Legal Name 211": "",
      "Legal Name 212": "",
      "FUNDING 45": "",
      "FUNDING 52": "",
      "FUNDING 54": "",
      "FUNDING 59": "",
      // TODO - C1046
      // TODO - C1047
      // TODO - C1048
      // TODO - C1049
      "FUNDING 44": deal["UF_CRM_1721806092"],
      "FUNDING 60": deal["UF_CRM_1721806107"],
      "FUNDING 61": deal["UF_CRM_1721806143"],
      "FUNDING 62": deal["UF_CRM_1721806201"],
      "FUNDING 63": deal["UF_CRM_1721806230"],
      "FUNDING 71": deal["UF_CRM_1721806023"],
      "FUNDING 72": deal["UF_CRM_1721806124"],
      // TODO - C1039
      // TODO - C1045
      "Legal Name 150": "",
      // TODO - C10145
      // TODO - C10146
      // TODO - C10147
      // TODO - C10148
      // TODO - C10165
      // TODO - C10166
      // TODO - C10167
      "Legal Name 173": name,
      "Legal Name 174": deal["UF_CRM_1721807688"],
      "Legal Name 175": "",
      // TODO - C1070
      // TODO - C1071
      "Legal Name 119": "",
      "Legal Name 120": "",
      "Legal Name 121": phone,
      "Legal Name 151": city,
      "Legal Name 118": "",
      "Legal Name 152": postalCode,
      // TODO - C10161
      // TODO - C10162
      // TODO - C10163
      // TODO - C10164
      // TODO - C10177
      // TODO - C10178
      // TODO - C10179
      "FUNDING 55": deal["UF_CRM_1721807834"],
      "FUNDING 85": "",
      "Legal Name 181": name,
      "Legal Name 182": deal["UF_CRM_1721807688"],
      "Legal Name 183": "",
      // TODO - C1079
      // TODO - C1082
      "Legal Name 153": "",
      "Legal Name 154": "",
      "Legal Name 155": phone,
      "Legal Name 156": email,
      "Legal Name 157": phone,
      "Legal Name 158": deal["UF_CRM_1721807790"],
      "Legal Name 159": "",
      "Legal Name 185": "",
      "Legal Name 160": city,
      "Legal Name 161": "",
      "Legal Name 162": postalCode,
      // TODO - C10168
      // TODO - C10169
      // TODO - C10170
      // TODO - C10171
      // TODO - C10180
      // TODO - C10181
      // TODO - C10182
      "FUNDING 56": deal["UF_CRM_1721807834"],
      "FUNDING 86": "",
      "Legal Name 186": name,
      "Legal Name 187": deal["UF_CRM_1721807688"],
      "Legal Name 188": "",
      // TODO - C1083
      // TODO - C1084
      "Legal Name 163": "",
      "Legal Name 164": "",
      "Legal Name 165": phone,
      "Legal Name 166": email,
      "Legal Name 167": phone,
      "Legal Name 168": deal["UF_CRM_1721807790"],
      "Legal Name 169": "",
      "Legal Name 189": "",
      "Legal Name 170": city,
      "Legal Name 171": "",
      "Legal Name 172": postalCode,
      // TODO - C10172
      // TODO - C10173
      // TODO - C10174
      // TODO - C10175
      // TODO - C10184
      // TODO - C10185
      "FUNDING 87": "",
      "Legal Name 190": name,
      "Legal Name 191": deal["UF_CRM_1721807688"],
      "Legal Name 192": "",
      // TODO - C1085
      // TODO - C1086
      "Legal Name 193": "",
      "Legal Name 194": "",
      "Legal Name 195": phone,
      "Legal Name 196": email,
      "Legal Name 197": phone,
      "Legal Name 198": deal["UF_CRM_1721807790"],
      "Legal Name 199": "",
      "Legal Name 200": "",
      "Legal Name 201": city,
      "Legal Name 202": "",
      "Legal Name 203": postalCode,
      "Legal Name 1012": "",
      "Legal Name 1013": "",
      "Legal Name 1014": phone,
      "Legal Name 1018": email,
      "Legal Name 80": "",
      "Legal Name 81": "",
      "Legal Name 82": "",
      "Legal Name 83": "",
      "Legal Name 84": "",
      "Legal Name 85": "",
      "Legal Name 86": "",
      "Legal Name 87": "",
      "Legal Name 88": "",
      "Legal Name 89": "",
      "Legal Name 90": "",
      "Legal Name 91": "",
      "Legal Name 92": "",
      "Legal Name 93": "",
      "Legal Name 94": "",
      "Legal Name 95": "",
      "Legal Name 96": "",
      "Legal Name 97": deal["UF_CRM_1721822441"],
      "Legal Name 98": deal["UF_CRM_1721822475"],
      "Legal Name 99": deal["UF_CRM_1721822460"],
      "Legal Name 100": "",
      "Legal Name 101": deal["UF_CRM_1721822491"],
      "Legal Name 1011": "",
      // TODO - C113
      // TODO - C114
      // TODO - C115
      // TODO - C126
      // TODO - C127
      // TODO - C128
      // TODO - C129
      // TODO - C132
      // TODO - C130
      // TODO - C133
      // TODO - C131
      // TODO - C134
      // TODO - C135
      // TODO - C10105
      // TODO - C10106
      // TODO - C10107
      // TODO - C10108
      // TODO - C101011
      // TODO - C101012
      // TODO - C101013
      // TODO - C101014
      // TODO - C101015
      // TODO - C101026
      // TODO - C101028
      // TODO - C101032
      // TODO - C101033
      // TODO - C101029
      // TODO - C101030
      // TODO - C101031
      // TODO - C101027
      // TODO - C101039
      // TODO - C101034
      // TODO - C101035
      // TODO - C101036
      // TODO - C101037
      "Legal Name 102": "",
      "Legal Name 1015": "",
      "Legal Name 1016": "",
      "Legal Name 1017": "",
      // TODO - C1080
      // TODO - C1081
      "Legal Name 109": deal["UF_CRM_66879DD546E08"],
      "Legal Name 1019": deal["UF_CRM_66879DD546E08"],
      "Legal Name 1010": deal["UF_CRM_1721802784"],
      "Legal Name 1020": deal["UF_CRM_1721802784"],
      // TOD - C95
      // "FUNDING 47": deal["UF_CRM_1721456148164"],
      // TODO - VAT NUMBER
      "FUNDING 79": "",
      // TODO - C1098
      "FUNDING 82": "",
      "FUNDING 83": "",
      "FUNDING 80": deal["UF_CRM_1721805951"],
      // TODO - VAT Number Pending
      // TODO - In Business Confirmation
      "FUNDING 11": name,
      // "Exclusion group/s": deal["UF_CRM_1721456148164"],
      // TODO - C10123
      // TODO - PCI 01
      // TODO - PCI 02
      "FUNDING 24": name,
      "Contact Name": name,
      "FUNDING 25": email,
      "Email address": email,
      "FUNDING 33": phone,
      "Mobile No": phone,
      "Phone No": phone,
      // TODO - C10134
      // TODO - MS PCI
      // TODO - MRS PCI
      // TODO - MISS PCI
      // TODO - MR PCI
      // Text1: email,
      "FUNDING 84": "",
      "Legal Name 122": email,
      "Legal Name 125": phone,
      "Legal Name 123": deal["UF_CRM_1721807790"],
      "Legal Name 124": "",
      "Legal Name 184": "",
      "FUNDING 46": deal["UF_CRM_1721807834"],
      "FUNDING 74": "",
      // TODO - C10183
      "FUNDING 57": deal["UF_CRM_1721807834"],
      // TODO - C1078
      // TODO - Govern Owned Entity
      "FUNDING 81": "",
      // TODO - C1097
      "income tax field": "",
      // TODO - income tax number
      // TODO - corporate tax number
      // TODO - charity number
      "x corp Tax Number": "",
      "x charity number": "",
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
    `https://5tel.bitrix24.uk/rest/13/buxgulfut3835t54/crm.deal.get.json?ID=${dealId}`
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
    `https://5tel.bitrix24.uk/rest/13/buxgulfut3835t54/crm.contact.get.json?ID=${contactId}`
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
export function processDeal(deal, dealId) {
  // if (deal?.UF_CRM_6687D4F0C95F0 && deal?.UF_CRM_6687D4F0C95F0 != "")
  modifyPdf(deal, dealId, TYPES.DD);
  // if (deal?.UF_CRM_66879DD074993 && deal?.UF_CRM_66879DD074993 != "")
  modifyPdf(deal, dealId, TYPES.SOF);
  // if (deal?.UF_CRM_1721822765 && deal?.UF_CRM_1721822765 != "")
  modifyPdf(deal, dealId, TYPES.APPLICATION);
}

export async function modifyPdf(deal, dealId, type) {
  const templateFilePath = `./templates/${type}.pdf`;
  const outputFilePath = `./output/${type}_${dealId}.pdf`;

  // Load the template PDF
  const templateFile = fs.readFileSync(templateFilePath);
  const pdfDoc = await PDFDocument.load(templateFile);

  const form = pdfDoc.getForm();

  // const positions = getFieldPositions(type);
  const fields = await getFields(deal, type);

  Object.keys(fields).forEach((key) => {
    const value = fields[key];

    if (type === TYPES.SOF && key.includes("C1")) {
      const checkBox = form.getCheckBox(key);
      checkBox.check();
      return;
    }

    const field = form.getField(key);
    if (!field) return;
    field.setText(value);
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFilePath, pdfBytes);
}
