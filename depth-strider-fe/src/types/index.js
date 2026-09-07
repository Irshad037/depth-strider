/**
 * @typedef {'ghost_net' | 'debris' | 'submerged_vehicle' | 'anomaly'} DetectionType
 * @typedef {'needs_review' | 'verified' | 'dismissed'} DetectionStatus
 * @typedef {'in_progress' | 'completed' | 'failed'} SurveyStatus
 */

/**
 * @typedef {Object} Detection
 * @property {string} id
 * @property {string} surveyId
 * @property {DetectionType} type
 * @property {number} confidence
 * @property {number} lat
 * @property {number} lng
 * @property {string} timestamp
 * @property {DetectionStatus} status
 * @property {string} thumbnailUrl
 * @property {{x:number,y:number,w:number,h:number}} boundingBox
 * @property {[number, number][]} [segmentation] Percent points for U-Net overlay
 */

/**
 * @typedef {Object} Survey
 * @property {string} id
 * @property {string} name
 * @property {SurveyStatus} status
 * @property {string} startedAt
 * @property {string} area
 * @property {[number, number][]} track
 * @property {number} detectionCount
 */
