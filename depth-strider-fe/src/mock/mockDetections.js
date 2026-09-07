/** @type {Detection[]} */
export const mockDetections = [
  {
    id: 'DS-001',
    surveyId: 'SURVEY-2026-0820',
    type: 'ghost_net',
    confidence: 94.7,
    lat: 18.7,
    lng: 72.95,
    timestamp: '2026-08-20T09:15:00Z',
    status: 'needs_review',
    thumbnailUrl: '/sonar/ghostnet1.jpg',
    boundingBox: { x: 120, y: 80, w: 60, h: 40 },
  },
  {
    id: 'DS-002',
    surveyId: 'SURVEY-2026-0820',
    type: 'debris',
    confidence: 88.2,
    lat: 18.75,
    lng: 72.92,
    timestamp: '2026-08-20T09:30:00Z',
    status: 'verified',
    thumbnailUrl: '/sonar/debris1.jpg',
    boundingBox: { x: 200, y: 150, w: 50, h: 50 },
  },
  // … add ~25 more entries, mostly ghost_net & debris,
  // with 2–3 submerged_vehicle and 3–4 needs_review.
];
