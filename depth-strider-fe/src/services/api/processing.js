import { mockDetections } from '../../mock/mockDetections'
import { mockSurveys } from '../../mock/mockSurveys'
import { sonarEvidence } from '../../mock/mockSonarImages'

export const UPLOAD_SURVEY_ID = 'SURVEY-2026-0912'

const UPLOAD_DETECTION_SEED = [
  {
    id: 'DS-101',
    surveyId: UPLOAD_SURVEY_ID,
    type: 'ghost_net',
    confidence: 93.4,
    lat: 19.35,
    lng: 72.92,
    timestamp: '2026-09-07T10:22:00Z',
    status: 'needs_review',
    thumbnailUrl: '/sonar/ghostnet1.svg',
    boundingBox: { x: 18, y: 32, w: 24, h: 18 },
  },
  {
    id: 'DS-102',
    surveyId: UPLOAD_SURVEY_ID,
    type: 'debris',
    confidence: 86.1,
    lat: 19.48,
    lng: 72.96,
    timestamp: '2026-09-07T10:28:00Z',
    status: 'needs_review',
    thumbnailUrl: '/sonar/debris1.svg',
    boundingBox: { x: 20, y: 48, w: 12, h: 16 },
  },
  {
    id: 'DS-103',
    surveyId: UPLOAD_SURVEY_ID,
    type: 'debris',
    confidence: 81.7,
    lat: 19.62,
    lng: 72.88,
    timestamp: '2026-09-07T10:35:00Z',
    status: 'verified',
    thumbnailUrl: '/sonar/debris2.svg',
    boundingBox: { x: 72, y: 42, w: 12, h: 16 },
  },
  {
    id: 'DS-104',
    surveyId: UPLOAD_SURVEY_ID,
    type: 'ghost_net',
    confidence: 90.2,
    lat: 19.72,
    lng: 72.84,
    timestamp: '2026-09-07T10:41:00Z',
    status: 'needs_review',
    thumbnailUrl: '/sonar/ghostnet2.svg',
    boundingBox: { x: 58, y: 26, w: 26, h: 18 },
  },
  {
    id: 'DS-105',
    surveyId: UPLOAD_SURVEY_ID,
    type: 'submerged_vehicle',
    confidence: 95.6,
    lat: 19.55,
    lng: 72.9,
    timestamp: '2026-09-07T10:48:00Z',
    status: 'needs_review',
    thumbnailUrl: '/sonar/vehicle1.svg',
    boundingBox: { x: 18, y: 38, w: 28, h: 18 },
  },
]

const UPLOAD_SONAR = {
  'DS-101': {
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
  'DS-102': {
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
  'DS-103': {
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
  'DS-104': {
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
  'DS-105': {
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
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Finalize a demo upload: attach detections to the in-progress survey.
 * Idempotent — safe to call multiple times.
 */
export async function finalizeUploadProcessing(surveyId = UPLOAD_SURVEY_ID) {
  await sleep(200)

  for (const det of UPLOAD_DETECTION_SEED) {
    if (!mockDetections.some((d) => d.id === det.id)) {
      mockDetections.push({ ...det, surveyId })
    }
  }

  Object.assign(sonarEvidence, UPLOAD_SONAR)

  const survey = mockSurveys.find((s) => s.id === surveyId)
  if (survey) {
    survey.status = 'completed'
    survey.detectionCount = mockDetections.filter(
      (d) => d.surveyId === surveyId,
    ).length
    survey.name = survey.name.includes('Upload')
      ? survey.name
      : `${survey.name} (Processed)`
  }

  return {
    surveyId,
    detectionCount: mockDetections.filter((d) => d.surveyId === surveyId).length,
  }
}
