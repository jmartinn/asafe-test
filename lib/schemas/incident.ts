import { z } from 'zod';

export const severityEnum = z.enum(['Low', 'Medium', 'High', 'Critical']);
export type Severity = z.infer<typeof severityEnum>;

export const statusEnum = z.enum(['Resolved', 'In Progress', 'Pending']);
export type Status = z.infer<typeof statusEnum>;

export const incidentTypeEnum = z.enum([
  'Impact Detection',
  'Barrier Breach',
  'System Offline',
  'Unauthorized Access',
  'Fire Alarm',
  'Equipment Failure',
]);
export type IncidentType = z.infer<typeof incidentTypeEnum>;

export const incidentSchema = z.object({
  id: z.string(),
  location: z.string(),
  type: incidentTypeEnum,
  severity: severityEnum,
  status: statusEnum,
  date: z.string(),
});

export type Incident = z.infer<typeof incidentSchema>;
