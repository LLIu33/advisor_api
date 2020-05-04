const areaMap = {
  kuwaitCity: {
    name: 'Kuwait City',
    nw: { latitude: 29.393875, longitude: 47.95739 },
    se: { latitude: 29.358776, longitude: 48.00627 },
  },
  shuwaikh: {
    name: 'Shuwaikh',
    nw: { latitude: 29.366147, longitude: 47.899801 },
    se: { latitude: 29.312774, longitude: 47.963751 },
  },
  alRaiTheAvenuesMall: {
    name: 'Al Rai - The Avenues Mall',
    nw: { latitude: 29.306288, longitude: 47.927464 },
    se: { latitude: 29.300959, longitude: 47.944618 },
  },
  bneidAlGar: {
    name: 'Bneid Al Gar',
    nw: { latitude: 29.382661, longitude: 47.996745 },
    se: { latitude: 29.365496, longitude: 48.014168 },
  },
  salmiya: {
    name: 'Salmiya',
    nw: { latitude: 29.353072, longitude: 48.031429 },
    se: { latitude: 29.3147, longitude: 48.101935 },
  },
  shaab: {
    name: 'Shaab',
    nw: { latitude: 29.361239, longitude: 48.013101 },
    se: { latitude: 29.342562, longitude: 48.041407 },
  },
  alBidea: {
    name: 'Al Bidea',
    nw: { latitude: 29.300882, longitude: 48.092142 },
    se: { latitude: 29.323684, longitude: 48.085175 },
  },
  jabriya: {
    name: 'Jabriya',
    nw: { latitude: 29.330799, longitude: 48.012033 },
    se: { latitude: 29.184688, longitude: 48.118572 },
  },
  abuAlHasaniya: {
    name: 'Abu Al Hasaniya',
    nw: { latitude: 29.197846, longitude: 48.108064 },
    se: { latitude: 29.358776, longitude: 48.00627 },
  },
  messila: {
    name: 'Messila',
    nw: { latitude: 29.274044, longitude: 48.085049 },
    se: { latitude: 29.233117, longitude: 48.102529 },
  },
  ardiya: {
    name: 'Ardiya',
    nw: { latitude: 29.301192, longitude: 47.878262 },
    se: { latitude: 29.266847, longitude: 47.928943 },
  },
  fnaitees: {
    name: 'Fnaitees',
    nw: { latitude: 29.234094, longitude: 48.081685 },
    se: { latitude: 29.209451, longitude: 48.108853 },
  },
  mall360AndMurooj: {
    name: '360 Mall + Murooj',
    nw: { latitude: 29.270843, longitude: 47.98841 },
    se: { latitude: 29.257086, longitude: 48.032094 },
  },
  abuFteira: {
    name: 'Abu Fteira',
    nw: { latitude: 29.212917, longitude: 48.090788 },
    se: { latitude: 29.181223, longitude: 48.116452 },
  },
  eqaila: {
    name: 'Eqaila',
    nw: { latitude: 29.183828, longitude: 48.090957 },
    se: { latitude: 29.157947, longitude: 48.113672 },
  },
  fintas: {
    name: 'Fintas',
    nw: { latitude: 29.186251, longitude: 48.110048 },
    se: { latitude: 29.158756, longitude: 48.131246 },
  },
  abuHalifa: {
    name: 'Abu Halifa',
    nw: { latitude: 29.137536, longitude: 48.11442 },
    se: { latitude: 29.119085, longitude: 48.137358 },
  },
  mangaf: {
    name: 'Mangaf',
    nw: { latitude: 29.120867, longitude: 48.115892 },
    se: { latitude: 29.091695, longitude: 48.140783 },
  },
  hawally: {
    name: 'Hawally',
    nw: { latitude: 29.349811, longitude: 48.000762 },
    se: { latitude: 29.322874, longitude: 48.03827 },
  },
  mahboula: {
    name: 'Mahboula',
    nw: { latitude: 29.161341, longitude: 48.110815 },
    se: { latitude: 29.136304, longitude: 48.134418 },
  },
  alAsimahResidentialAreas: {
    name: 'Al Asimah Residential Areas',
    nw: { latitude: 29.373279, longitude: 47.945259 },
    se: { latitude: 29.305542, longitude: 48.029998 },
  },
  aswaqAlQurain: {
    name: 'Aswaq Al Qurain',
    nw: { latitude: 29.205151, longitude: 48.030753 },
    se: { latitude: 29.177937, longitude: 48.066152 },
  },
  fahaheel: {
    name: 'Fahaheel',
    nw: { latitude: 29.091785, longitude: 48.111722 },
    se: { latitude: 29.069639, longitude: 48.149836 },
  },
  sabahAlSalem: {
    name: 'Sabah Al Salem',
    nw: { latitude: 29.26803, longitude: 48.042031 },
    se: { latitude: 29.238629, longitude: 48.091954 },
  },
  alJahra: {
    name: 'Al Jahra',
    nw: { latitude: 29.374125, longitude: 47.630108 },
    se: { latitude: 29.281418, longitude: 47.79222 },
  },
  khaitan: {
    name: 'Khaitan',
    nw: { latitude: 29.303517, longitude: 47.963188 },
    se: { latitude: 29.266161, longitude: 47.987822 },
  },
};

const getListOfAreas = async () => {
  return areaMap;
};

module.exports = {
  getListOfAreas,
};
