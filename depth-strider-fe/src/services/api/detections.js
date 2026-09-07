import { mockDetections } from '../../mock/mockDetections'

// simple sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getDetections(surveyId) {
  await sleep(300 + Math.random() * 300)
  return mockDetections.filter(d => d.surveyId === surveyId)
}

export async function markDetectionVerified(id) {
  await sleep(200)
  const d = mockDetections.find(x => x.id === id)
  if (d) d.status = 'verified'
  return d
}
