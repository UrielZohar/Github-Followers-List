import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { newFollowersSearch, getNextFollowersPage } from './followersSlice';


// Create the middleware instance and methods
export const followerslistenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
followerslistenerMiddleware.startListening({
  matcher: isAnyOf(newFollowersSearch, getNextFollowersPage),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('The Side Effect Is Listening To: ', action);

    /*
    if (await listenerApi.condition(action?.meta?.requestStatus === 'fulfilled')) {
      console.log('fulfilled !!');
    }
    */

    if (await listenerApi.condition((action, currentState) => {
      return action?.meta?.requestStatus === 'fulfilled';
    }, 10000)) {
      console.log('fulfilled !!');
    }

    // Spawn "child tasks" that can do more work and return results
    const task = listenerApi.fork(async (forkApi) => {
      // Can pause execution
      console.log('Went to delay of 10 sec');
      await forkApi.delay(10000);
      // Complete the child by returning a value
      return 42
    });

    const result = await task.result;
    // Unwrap the child result in the listener
    if (result.status === 'ok') {
      // Logs the `42` result value that was returned
      console.log('Child succeeded: ', result.value);
    }

    // Can cancel other running instances
    // listenerApi.cancelActiveListeners();

    // Run async logic
    // const data = await fetchData()

    // Pause until action dispatched or state changed
    /*
    if (await listenerApi.condition(matchSomeAction)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(todoAdded('Buy pet food'));

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5);
        // Complete the child by returning a value
        return 42
      });

      const result = await task.result;
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        console.log('Child succeeded: ', result.value)
      }
    }
    */
  },
});
