/**
 * Data Layer — Centralized mock data for PRB2026 public pages.
 *
 * All exports here are structured to be API-swap-ready.
 * When the Laravel backend is ready, replace each export with
 * a React Query hook (e.g. useQuery(['events'], fetchEvents))
 * and remove the corresponding static import.
 *
 * Pattern:
 *   Static (now):  import { rundownSchedule } from '@/data'
 *   With API:      const { data: rundownSchedule } = useRundown()
 */

export * from './heroData';
export * from './gerakanData';
export * from './roadToPRBData';
export * from './prbHistoryData';
export * from './faqData';
export * from './mitraData';
export * from './rundownData';
export * from './speakerData';
export * from './akomodasiData';
export * from './mediaCenterData';
