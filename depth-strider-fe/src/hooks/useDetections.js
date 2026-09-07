import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDetections, markDetectionVerified } from '../services/api/detections'

export function useDetections(surveyId) {
  return useQuery({
    queryKey: ['detections', surveyId],
    queryFn: () => getDetections(surveyId),
    enabled: !!surveyId,
  })
}

export function useVerifyDetection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => markDetectionVerified(id),
    onSuccess: (updated) => {
      queryClient.invalidateQueries(['detections', updated.surveyId])
    },
  })
}
