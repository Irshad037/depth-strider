import { mockDetections } from '../../mock/mockDetections'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** @param {string} [surveyId] */
export async function getDetections(surveyId) {
  await sleep(300 + Math.random() * 300)
  if (!surveyId) return [...mockDetections]
  return mockDetections.filter((d) => d.surveyId === surveyId)
}

export async function getDetection(id) {
  await sleep(200 + Math.random() * 200)
  return mockDetections.find((d) => d.id === id) ?? null
}

export async function markDetectionVerified(id) {
  await sleep(200)
  const d = mockDetections.find((x) => x.id === id)
  if (d) d.status = 'verified'
  return d
}
