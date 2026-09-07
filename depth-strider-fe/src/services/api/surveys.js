import { mockSurveys } from '../../mock/mockSurveys'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getSurveys() {
  await sleep(250 + Math.random() * 250)
  return mockSurveys
}

export async function getSurvey(id) {
  await sleep(200 + Math.random() * 200)
  return mockSurveys.find((s) => s.id === id) ?? null
}
