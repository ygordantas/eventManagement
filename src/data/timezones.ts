import type Option from "../models/Option";

const TIMEZONES: Option[] = [
  // UTC and GMT
  { code: "UTC", value: "Coordinated Universal Time (UTC)" },
  { code: "GMT", value: "Greenwich Mean Time (GMT)" },

  // North America
  { code: "EST", value: "Eastern Standard Time (EST) - UTC-5" },
  { code: "EDT", value: "Eastern Daylight Time (EDT) - UTC-4" },
  { code: "CST", value: "Central Standard Time (CST) - UTC-6" },
  { code: "CDT", value: "Central Daylight Time (CDT) - UTC-5" },
  { code: "MST", value: "Mountain Standard Time (MST) - UTC-7" },
  { code: "MDT", value: "Mountain Daylight Time (MDT) - UTC-6" },
  { code: "PST", value: "Pacific Standard Time (PST) - UTC-8" },
  { code: "PDT", value: "Pacific Daylight Time (PDT) - UTC-7" },
  { code: "AKST", value: "Alaska Standard Time (AKST) - UTC-9" },
  { code: "AKDT", value: "Alaska Daylight Time (AKDT) - UTC-8" },
  { code: "HST", value: "Hawaii Standard Time (HST) - UTC-10" },
  { code: "HDT", value: "Hawaii Daylight Time (HDT) - UTC-9" },
  { code: "ATL", value: "Atlantic Standard Time (ATL) - UTC-4" },
  { code: "ATD", value: "Atlantic Daylight Time (ATD) - UTC-3" },

  // South America
  { code: "ART", value: "Argentina Time (ART) - UTC-3" },
  { code: "AMT", value: "Amazon Time (AMT) - UTC-4" },
  { code: "AMST", value: "Amazon Summer Time (AMST) - UTC-3" },
  { code: "ACT", value: "Acre Time (ACT) - UTC-5" },
  { code: "UYT", value: "Uruguay Standard Time (UYT) - UTC-3" },
  { code: "UYST", value: "Uruguay Summer Time (UYST) - UTC-2" },
  { code: "VET", value: "Venezuelan Standard Time (VET) - UTC-4" },

  // Europe
  { code: "WET", value: "Western European Time (WET) - UTC+0" },
  { code: "WEST", value: "Western European Summer Time (WEST) - UTC+1" },
  { code: "CET", value: "Central European Time (CET) - UTC+1" },
  { code: "CEST", value: "Central European Summer Time (CEST) - UTC+2" },
  { code: "EET", value: "Eastern European Time (EET) - UTC+2" },
  { code: "EEST", value: "Eastern European Summer Time (EEST) - UTC+3" },
  { code: "MSK", value: "Moscow Standard Time (MSK) - UTC+3" },
  { code: "MSD", value: "Moscow Daylight Time (MSD) - UTC+4" },
  { code: "AZOT", value: "Azores Standard Time (AZOT) - UTC-1" },
  { code: "AZOST", value: "Azores Summer Time (AZOST) - UTC+0" },
  { code: "TRT", value: "Turkey Time (TRT) - UTC+3" },
  { code: "AZT", value: "Azerbaijan Time (AZT) - UTC+4" },
  { code: "VOLT", value: "Volgograd Time (VOLT) - UTC+4" },
  { code: "YEKT", value: "Yekaterinburg Time (YEKT) - UTC+5" },
  { code: "YAKT", value: "Yakutsk Time (YAKT) - UTC+9" },
  { code: "VLAT", value: "Vladivostok Time (VLAT) - UTC+10" },

  // Asia
  { code: "JST", value: "Japan Standard Time (JST) - UTC+9" },
  { code: "KST", value: "Korea Standard Time (KST) - UTC+9" },
  { code: "CHST", value: "China Standard Time (CHST) - UTC+8" },
  { code: "IST", value: "India Standard Time (IST) - UTC+5:30" },
  { code: "PKT", value: "Pakistan Standard Time (PKT) - UTC+5" },
  { code: "AFT", value: "Afghanistan Time (AFT) - UTC+4:30" },
  { code: "TMT", value: "Turkmenistan Time (TMT) - UTC+5" },
  { code: "UZT", value: "Uzbekistan Time (UZT) - UTC+5" },
  { code: "BDT", value: "Bangladesh Standard Time (BDT) - UTC+6" },
  { code: "MMT", value: "Myanmar Time (MMT) - UTC+6:30" },
  { code: "ICT", value: "Indochina Time (ICT) - UTC+7" },
  { code: "WIB", value: "Western Indonesia Time (WIB) - UTC+7" },
  { code: "WIT", value: "Eastern Indonesia Time (WIT) - UTC+9" },
  { code: "PHT", value: "Philippine Time (PHT) - UTC+8" },
  { code: "SGT", value: "Singapore Time (SGT) - UTC+8" },
  { code: "MYT", value: "Malaysia Time (MYT) - UTC+8" },
  { code: "HKT", value: "Hong Kong Time (HKT) - UTC+8" },
  { code: "TST", value: "Taiwan Standard Time (TST) - UTC+8" },
  { code: "ULAT", value: "Ulaanbaatar Standard Time (ULAT) - UTC+8" },
  { code: "ULAST", value: "Ulaanbaatar Summer Time (ULAST) - UTC+9" },

  // Australia and Oceania
  { code: "AWST", value: "Australian Western Standard Time (AWST) - UTC+8" },
  { code: "ACST", value: "Australian Central Standard Time (ACST) - UTC+9:30" },
  {
    code: "ACDT",
    value: "Australian Central Daylight Time (ACDT) - UTC+10:30",
  },
  { code: "AEST", value: "Australian Eastern Standard Time (AEST) - UTC+10" },
  { code: "AEDT", value: "Australian Eastern Daylight Time (AEDT) - UTC+11" },
  {
    code: "ACWST",
    value: "Australian Central Western Standard Time (ACWST) - UTC+8:45",
  },
  { code: "NZST", value: "New Zealand Standard Time (NZST) - UTC+12" },
  { code: "NZDT", value: "New Zealand Daylight Time (NZDT) - UTC+13" },
  { code: "FJT", value: "Fiji Time (FJT) - UTC+12" },
  { code: "TOT", value: "Tonga Time (TOT) - UTC+13" },
  { code: "TVT", value: "Tuvalu Time (TVT) - UTC+12" },
  { code: "WAKT", value: "Wake Island Time (WAKT) - UTC+12" },
  { code: "WFT", value: "Wallis and Futuna Time (WFT) - UTC+12" },
  { code: "VUT", value: "Vanuatu Time (VUT) - UTC+11" },
  { code: "VOST", value: "Vostok Station Time (VOST) - UTC+6" },

  // Africa
  { code: "WAT", value: "West Africa Time (WAT) - UTC+1" },
  { code: "WAST", value: "West Africa Summer Time (WAST) - UTC+2" },
  { code: "CAT", value: "Central Africa Time (CAT) - UTC+2" },
  { code: "EAT", value: "East Africa Time (EAT) - UTC+3" },
  { code: "SAST", value: "South Africa Standard Time (SAST) - UTC+2" },
  { code: "MUT", value: "Mauritius Time (MUT) - UTC+4" },
  { code: "SCT", value: "Seychelles Time (SCT) - UTC+4" },

  // Middle East
  { code: "AST", value: "Arabia Standard Time (AST) - UTC+3" },
  { code: "GST", value: "Gulf Standard Time (GST) - UTC+4" },
  { code: "OMST", value: "Omsk Standard Time (OMST) - UTC+6" },
  { code: "NOVT", value: "Novosibirsk Time (NOVT) - UTC+7" },
  { code: "KRAT", value: "Krasnoyarsk Time (KRAT) - UTC+7" },
  { code: "IRKT", value: "Irkutsk Time (IRKT) - UTC+8" },
  { code: "MAGT", value: "Magadan Time (MAGT) - UTC+11" },
  { code: "PETT", value: "Kamchatka Time (PETT) - UTC+12" },
];

export default TIMEZONES;
