/**
 * Sonar evidence metadata keyed by detection id.
 * boundingBox / segmentation use percentages of image width/height (0–100).
 */

/** @type {Record<string, { imageUrl: string, boundingBox: {x:number,y:number,w:number,h:number}, segmentation: [number,number][] }>} */
export const sonarEvidence = {
  'DS-001': {
    imageUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 18, y: 32, w: 24, h: 18 },
    segmentation: [
      [20, 38],
      [32, 34],
      [40, 38],
      [42, 44],
      [35, 48],
      [24, 46],
    ],
  },
  'DS-002': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 20, y: 48, w: 12, h: 16 },
    segmentation: [
      [22, 52],
      [28, 50],
      [31, 56],
      [28, 62],
      [23, 60],
    ],
  },
  'DS-003': {
    imageUrl: '/sonar/debris2.svg',
    boundingBox: { x: 72, y: 42, w: 12, h: 16 },
    segmentation: [
      [73, 46],
      [79, 44],
      [82, 50],
      [80, 56],
      [74, 54],
    ],
  },
  'DS-004': {
    imageUrl: '/sonar/ghostnet2.svg',
    boundingBox: { x: 58, y: 26, w: 26, h: 18 },
    segmentation: [
      [60, 32],
      [72, 28],
      [82, 34],
      [80, 40],
      [68, 42],
      [62, 38],
    ],
  },
  'DS-005': {
    imageUrl: '/sonar/anomaly1.svg',
    boundingBox: { x: 36, y: 28, w: 14, h: 18 },
    segmentation: [
      [38, 34],
      [44, 30],
      [48, 36],
      [46, 44],
      [40, 42],
    ],
  },
  'DS-006': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 22, y: 50, w: 11, h: 14 },
    segmentation: [
      [23, 54],
      [29, 52],
      [32, 58],
      [28, 62],
      [24, 60],
    ],
  },
  'DS-007': {
    imageUrl: '/sonar/vehicle1.svg',
    boundingBox: { x: 18, y: 38, w: 28, h: 18 },
    segmentation: [
      [20, 44],
      [36, 40],
      [44, 44],
      [42, 52],
      [28, 54],
      [20, 50],
    ],
  },
  'DS-008': {
    imageUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 20, y: 34, w: 22, h: 16 },
    segmentation: [
      [22, 38],
      [34, 36],
      [40, 40],
      [38, 46],
      [26, 48],
    ],
  },
  'DS-009': {
    imageUrl: '/sonar/debris2.svg',
    boundingBox: { x: 74, y: 44, w: 10, h: 14 },
    segmentation: [
      [75, 48],
      [80, 46],
      [83, 52],
      [80, 56],
      [76, 54],
    ],
  },
  'DS-010': {
    imageUrl: '/sonar/ghostnet2.svg',
    boundingBox: { x: 60, y: 28, w: 24, h: 16 },
    segmentation: [
      [62, 32],
      [74, 30],
      [82, 36],
      [78, 42],
      [66, 40],
    ],
  },
  'DS-011': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 21, y: 49, w: 12, h: 15 },
    segmentation: [
      [22, 53],
      [28, 51],
      [32, 57],
      [28, 62],
      [23, 59],
    ],
  },
  'DS-012': {
    imageUrl: '/sonar/anomaly2.svg',
    boundingBox: { x: 52, y: 54, w: 14, h: 16 },
    segmentation: [
      [54, 58],
      [60, 56],
      [64, 62],
      [60, 68],
      [54, 66],
    ],
  },
  'DS-013': {
    imageUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 19, y: 33, w: 23, h: 17 },
    segmentation: [
      [21, 37],
      [33, 35],
      [40, 39],
      [38, 45],
      [25, 47],
    ],
  },
  'DS-014': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 20, y: 48, w: 12, h: 16 },
    segmentation: [
      [22, 52],
      [28, 50],
      [31, 56],
      [28, 62],
      [23, 60],
    ],
  },
  'DS-015': {
    imageUrl: '/sonar/debris2.svg',
    boundingBox: { x: 72, y: 42, w: 12, h: 16 },
    segmentation: [
      [73, 46],
      [79, 44],
      [82, 50],
      [80, 56],
      [74, 54],
    ],
  },
  'DS-016': {
    imageUrl: '/sonar/ghostnet2.svg',
    boundingBox: { x: 58, y: 26, w: 26, h: 18 },
    segmentation: [
      [60, 32],
      [72, 28],
      [82, 34],
      [80, 40],
      [68, 42],
      [62, 38],
    ],
  },
  'DS-017': {
    imageUrl: '/sonar/vehicle2.svg',
    boundingBox: { x: 52, y: 46, w: 28, h: 16 },
    segmentation: [
      [54, 50],
      [68, 48],
      [78, 52],
      [76, 58],
      [60, 60],
      [54, 56],
    ],
  },
  'DS-018': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 22, y: 50, w: 11, h: 14 },
    segmentation: [
      [23, 54],
      [29, 52],
      [32, 58],
      [28, 62],
      [24, 60],
    ],
  },
  'DS-019': {
    imageUrl: '/sonar/anomaly1.svg',
    boundingBox: { x: 36, y: 28, w: 14, h: 18 },
    segmentation: [
      [38, 34],
      [44, 30],
      [48, 36],
      [46, 44],
      [40, 42],
    ],
  },
  'DS-020': {
    imageUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 18, y: 32, w: 24, h: 18 },
    segmentation: [
      [20, 38],
      [32, 34],
      [40, 38],
      [42, 44],
      [35, 48],
      [24, 46],
    ],
  },
  'DS-021': {
    imageUrl: '/sonar/debris2.svg',
    boundingBox: { x: 74, y: 44, w: 10, h: 14 },
    segmentation: [
      [75, 48],
      [80, 46],
      [83, 52],
      [80, 56],
      [76, 54],
    ],
  },
  'DS-022': {
    imageUrl: '/sonar/ghostnet2.svg',
    boundingBox: { x: 60, y: 28, w: 24, h: 16 },
    segmentation: [
      [62, 32],
      [74, 30],
      [82, 36],
      [78, 42],
      [66, 40],
    ],
  },
  'DS-023': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 20, y: 48, w: 12, h: 16 },
    segmentation: [
      [22, 52],
      [28, 50],
      [31, 56],
      [28, 62],
      [23, 60],
    ],
  },
  'DS-024': {
    imageUrl: '/sonar/debris2.svg',
    boundingBox: { x: 72, y: 42, w: 12, h: 16 },
    segmentation: [
      [73, 46],
      [79, 44],
      [82, 50],
      [80, 56],
      [74, 54],
    ],
  },
  'DS-025': {
    imageUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 18, y: 32, w: 24, h: 18 },
    segmentation: [
      [20, 38],
      [32, 34],
      [40, 38],
      [42, 44],
      [35, 48],
      [24, 46],
    ],
  },
  'DS-026': {
    imageUrl: '/sonar/anomaly2.svg',
    boundingBox: { x: 52, y: 54, w: 14, h: 16 },
    segmentation: [
      [54, 58],
      [60, 56],
      [64, 62],
      [60, 68],
      [54, 66],
    ],
  },
  'DS-027': {
    imageUrl: '/sonar/vehicle1.svg',
    boundingBox: { x: 18, y: 38, w: 28, h: 18 },
    segmentation: [
      [20, 44],
      [36, 40],
      [44, 44],
      [42, 52],
      [28, 54],
      [20, 50],
    ],
  },
  'DS-028': {
    imageUrl: '/sonar/debris1.svg',
    boundingBox: { x: 21, y: 49, w: 12, h: 15 },
    segmentation: [
      [22, 53],
      [28, 51],
      [32, 57],
      [28, 62],
      [23, 59],
    ],
  },
}

/**
 * @param {string} detectionId
 * @param {string} [fallbackUrl]
 */
export function getSonarEvidence(detectionId, fallbackUrl) {
  return (
    sonarEvidence[detectionId] ?? {
      imageUrl: fallbackUrl || '/sonar/debris1.svg',
      boundingBox: { x: 35, y: 35, w: 20, h: 18 },
      segmentation: [
        [37, 40],
        [48, 38],
        [52, 46],
        [46, 52],
        [38, 50],
      ],
    }
  )
}
