import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'taskpilot-ai',
  eventKey: process.env.INNGEST_EVENT_KEY || 'sample_inngest_event_key',
});
