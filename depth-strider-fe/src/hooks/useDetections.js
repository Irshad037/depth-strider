import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDetections,
  getDetection,
  markDetectionVerified,
} from '../services/api/detections'

/** @param {string} [surveyId] */
export function useDetections(surveyId) {
  return useQuery({
    queryKey: ['detections', surveyId ?? 'all'],
    queryFn: () => getDetections(surveyId),
  })
}

export function useDetection(id) {
  return useQuery({
    queryKey: ['detection', id],
    queryFn: () => getDetection(id),
    enabled: !!id,
  })
}

export function useVerifyDetection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => markDetectionVerified(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detections'] })
      queryClient.invalidateQueries({ queryKey: ['detection'] })
    },
  })
}
