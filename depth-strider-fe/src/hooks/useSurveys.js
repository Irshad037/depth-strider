import { useQuery } from '@tanstack/react-query'
import { getSurveys, getSurvey } from '../services/api/surveys'

export function useSurveys() {
  return useQuery({
    queryKey: ['surveys'],
    queryFn: getSurveys,
  })
}

export function useSurvey(id) {
  return useQuery({
    queryKey: ['surveys', id],
    queryFn: () => getSurvey(id),
    enabled: !!id,
  })
}
