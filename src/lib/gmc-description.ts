type GmcDescriptionProduct = {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
};

export type CameraSpecifications = {
  model: string;
  resolution: string;
  opticalZoom: string;
  cameraWeight: string;
};

type CameraSpecificationRule = CameraSpecifications & {
  patterns: RegExp[];
};

// Effective resolution and CIPA weight values come from manufacturer specifications.
const CAMERA_SPECIFICATION_RULES: CameraSpecificationRule[] = [
  {
    model: 'Sony RX100 VII',
    patterns: [/\bsony\b.*\brx100\s*(?:m7|mark\s*7|vii)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '8.0x',
    cameraWeight: 'Approx. 302 g including battery and memory card',
  },
  {
    model: 'Sony RX100 VI',
    patterns: [/\bsony\b.*\brx100\s*(?:m6|mark\s*6|vi)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '8.0x',
    cameraWeight: 'Approx. 301 g including battery and memory card',
  },
  {
    model: 'Sony RX100 V',
    patterns: [/\bsony\b.*\brx100\s*(?:m5|mark\s*5|v)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '2.9x',
    cameraWeight: 'Approx. 299 g including battery and memory card',
  },
  {
    model: 'Sony RX100 III',
    patterns: [/\bsony\b.*\brx100\s*(?:m3|mark\s*3|iii)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '2.9x',
    cameraWeight: 'Approx. 290 g including battery and memory card',
  },
  {
    model: 'Sony RX100 II',
    patterns: [/\bsony\b.*\brx100\s*(?:m2|mark\s*2|ii)\b/i],
    resolution: '20.2 MP effective',
    opticalZoom: '3.6x',
    cameraWeight: 'Approx. 281 g including battery and memory card',
  },
  {
    model: 'Sony RX100',
    patterns: [/\bsony\b.*\brx100\b/i],
    resolution: '20.2 MP effective',
    opticalZoom: '3.6x',
    cameraWeight: 'Approx. 240 g including battery and memory card',
  },
  {
    model: 'Sony DSC-HX80',
    patterns: [/\bsony\b.*\b(?:dsc\s*)?hx80\b/i],
    resolution: '18.2 MP effective',
    opticalZoom: '30x',
    cameraWeight: 'Approx. 245 g including battery and memory card',
  },
  {
    model: 'Sony DSC-W810',
    patterns: [/\bsony\b.*\b(?:dsc\s*)?w810\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '6x',
    cameraWeight: 'Approx. 127 g including battery and memory card',
  },
  {
    model: 'Sony ZV-1F',
    patterns: [/\bsony\b.*\bzv\s*1f\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: 'None (fixed 20 mm wide-angle lens)',
    cameraWeight: 'Approx. 256 g including battery and memory card',
  },
  {
    model: 'Sony ZV-1',
    patterns: [/\bsony\b.*\bzv\s*1\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '2.7x',
    cameraWeight: 'Approx. 294 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G7 X Mark III',
    patterns: [/\b(?:canon\b.*)?(?:powershot\s*)?g7\s*x\s*mark\s*(?:3|iii)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '4.2x',
    cameraWeight: 'Approx. 304 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G7 X Mark II',
    patterns: [/\b(?:canon\b.*)?(?:powershot\s*)?g7\s*x\s*mark\s*(?:2|ii)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '4.2x',
    cameraWeight: 'Approx. 319 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot SX730 HS',
    patterns: [
      /\bcanon\b.*\bsx\s*730\s+sx\s*740\s+hs\b/i,
      /\bcanon\b.*\bsx\s*730\s*hs\b/i,
    ],
    resolution: '20.3 MP effective',
    opticalZoom: '40x',
    cameraWeight: 'Approx. 300 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot SX740 HS',
    patterns: [/\bcanon\b.*\bsx\s*740\s*hs\b/i],
    resolution: '20.3 MP effective',
    opticalZoom: '40x',
    cameraWeight: 'Approx. 299 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot SX720 HS',
    patterns: [/\bcanon\b.*\bsx\s*720\s*hs\b/i],
    resolution: '20.3 MP effective',
    opticalZoom: '40x',
    cameraWeight: 'Approx. 270 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot SX620 HS',
    patterns: [/\bcanon\b.*\bsx\s*620\s*hs\b/i],
    resolution: '20.2 MP effective',
    opticalZoom: '25x',
    cameraWeight: 'Approx. 182 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G5 X Mark II',
    patterns: [/\bcanon\b.*\bg5\s*x\s*mark\s*(?:2|ii)\b/i],
    resolution: '20.1 MP effective',
    opticalZoom: '5x',
    cameraWeight: 'Approx. 340 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G1 X Mark III',
    patterns: [/\bcanon\b.*\bg1\s*x\s*mark\s*(?:3|iii)\b/i],
    resolution: '24.2 MP effective',
    opticalZoom: '3x',
    cameraWeight: 'Approx. 399 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G1 X Mark II',
    patterns: [/\bcanon\b.*\bg1\s*x\s*mark\s*(?:2|ii)\b/i],
    resolution: '12.8 MP effective at 3:2',
    opticalZoom: '5x',
    cameraWeight: 'Approx. 553 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot ELPH 110 HS',
    patterns: [/\bcanon\b.*\belph\s*110\s*hs\b/i],
    resolution: '16.1 MP effective',
    opticalZoom: '5x',
    cameraWeight: 'Approx. 135 g including battery and memory card',
  },
  {
    model: 'Canon PowerShot G9 X',
    patterns: [/\bcanon\b.*\bg9\s*x\b/i],
    resolution: '20.2 MP effective',
    opticalZoom: '3x',
    cameraWeight: 'Approx. 209 g including battery and memory card',
  },
  {
    model: 'Canon IXUS 185',
    patterns: [/\bcanon\b.*\bixus\s*185\b/i],
    resolution: '20.0 MP effective',
    opticalZoom: '8x',
    cameraWeight: 'Approx. 126 g including battery and memory card',
  },
  {
    model: 'Fujifilm X100VI',
    patterns: [/\b(?:fujifilm|fujfilm|fuji)\b.*\bx100vi\b/i],
    resolution: '40.2 MP effective',
    opticalZoom: 'None (fixed 23 mm f/2 lens)',
    cameraWeight: 'Approx. 521 g including battery and memory card',
  },
  {
    model: 'Fujifilm X100V',
    patterns: [/\b(?:fujifilm|fujfilm|fuji)\b.*\bx100v\b/i],
    resolution: '26.1 MP effective',
    opticalZoom: 'None (fixed 23 mm f/2 lens)',
    cameraWeight: 'Approx. 478 g including battery and memory card',
  },
  {
    model: 'Fujifilm X100F',
    patterns: [/\b(?:fujifilm|fujfilm|fuji)\b.*\bx100f\b/i],
    resolution: '24.3 MP effective',
    opticalZoom: 'None (fixed 23 mm f/2 lens)',
    cameraWeight: 'Approx. 469 g including battery and memory card',
  },
  {
    model: 'Fujifilm X100S',
    patterns: [/\b(?:fujifilm|fujfilm|fuji)\b.*\bx100s\b/i],
    resolution: '16.3 MP effective',
    opticalZoom: 'None (fixed 23 mm f/2 lens)',
    cameraWeight: 'Approx. 445 g including battery and memory card',
  },
  {
    model: 'Ricoh GR IIIx',
    patterns: [/\bricoh\b.*\bgr\s*3x\b/i, /\bricoh\b.*\bgr\s*iiix\b/i],
    resolution: '24.24 MP effective',
    opticalZoom: 'None (fixed 26.1 mm f/2.8 lens)',
    cameraWeight: 'Approx. 262 g including battery and memory card',
  },
  {
    model: 'Panasonic Lumix TZ99',
    patterns: [/\bpanasonic\b.*\b(?:dc\s*)?tz99\b/i],
    resolution: '20.3 MP effective',
    opticalZoom: '30x',
    cameraWeight: 'Approx. 322 g including battery and memory card',
  },
  {
    model: 'Leica Q2',
    patterns: [/\bleica\b.*\bq2\b/i],
    resolution: '47.3 MP effective',
    opticalZoom: 'None (fixed 28 mm f/1.7 lens)',
    cameraWeight: 'Approx. 734 g including battery',
  },
];

function normalizeProductIdentity(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u2013\u2014_\/-]+/g, ' ')
    .replace(/\bpower\s+shot\b/g, 'powershot')
    .replace(/\bmark\s+l{3}\b/g, 'mark iii')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getCameraSpecificationsForGmc(
  title: string | null | undefined,
  slug?: string | null,
): CameraSpecifications | null {
  const identity = normalizeProductIdentity(`${title || ''} ${slug || ''}`);
  const match = CAMERA_SPECIFICATION_RULES.find(rule =>
    rule.patterns.some(pattern => pattern.test(identity))
  );

  if (!match) return null;

  const { model, resolution, opticalZoom, cameraWeight } = match;
  return { model, resolution, opticalZoom, cameraWeight };
}

const HAS_RESOLUTION = /\b\d{1,3}(?:\.\d+)?\s*(?:mp|megapixels?)\b/i;
const HAS_OPTICAL_ZOOM = /(?:\boptical\s+zoom\s*[:\-]?\s*(?:none|no|\d+(?:\.\d+)?\s*[xX])|\b\d+(?:\.\d+)?\s*[xX]\s+optical\s+zoom\b)/i;
const HAS_CAMERA_WEIGHT = /\b(?:camera\s+)?weight\s*[:\-]?\s*(?:approx\.?\s*)?\d+(?:\.\d+)?\s*(?:g|kg|oz|lb|grams?|ounces?|pounds?)\b/i;

export function enrichGmcDescription(product: GmcDescriptionProduct): string {
  const baseDescription = String(product.description || product.title || '').trim();
  const specifications = getCameraSpecificationsForGmc(product.title, product.slug);

  if (!specifications) return baseDescription;

  const additions: string[] = [];
  if (!HAS_RESOLUTION.test(baseDescription)) {
    additions.push(`Resolution: ${specifications.resolution}`);
  }
  if (!HAS_OPTICAL_ZOOM.test(baseDescription)) {
    additions.push(`Optical zoom: ${specifications.opticalZoom}`);
  }
  if (!HAS_CAMERA_WEIGHT.test(baseDescription)) {
    additions.push(`Camera weight: ${specifications.cameraWeight}`);
  }

  if (additions.length === 0) return baseDescription;

  const punctuatedDescription = /[.!?]$/.test(baseDescription)
    ? baseDescription
    : `${baseDescription}.`;

  return `${punctuatedDescription}\n\nKey camera specifications: ${additions.join('; ')}.`;
}
