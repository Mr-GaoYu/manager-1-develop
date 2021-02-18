import { Event } from '@rua/api-v1/lib/account';
import { Subject } from '@reactivex/rxjs/dist/package';
import { DISABLE_EVENT_THROTTLE, INTERVAL } from 'src/website/constants';
import {
  getPollingInterval,
  getRequestDeadline,
  setPollingInterval,
  setRequestDeadline
} from './eventsPolling';
// import store from 'src/store';
// import { ThunkDispatch } from 'src/store/types';

export const events$ = new Subject<Event>();

const inProgress = false;

export const startEventsInterval = () =>
  setInterval(
    () => {
      const now = Date.now();
      const pollIteration = getPollingInterval();
      const eventRequestDeadline = getRequestDeadline();

      if (now > eventRequestDeadline) {
        if (inProgress) {
          return;
        }

        if (document.visibilityState !== 'visible') {
          return;
        }

        if (DISABLE_EVENT_THROTTLE) {
          setPollingInterval(now + 500);
        } else {
          const timeout = INTERVAL * pollIteration;

          setRequestDeadline(now + timeout);

          const newIteration = Math.min(pollIteration * 2, 16);
          if (pollIteration < 16) {
            setPollingInterval(newIteration);
          }
        }
      }
    },

    INTERVAL / 2 - 1
  );
