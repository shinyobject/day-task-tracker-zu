/**
 * Supabase Integration Stub
 *
 * When ready to add Supabase:
 * 1. npm install @supabase/supabase-js
 * 2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env
 * 3. Uncomment the code below
 * 4. Create tables in Supabase:
 *    - users (managed by Supabase Auth)
 *    - tasks (id, user_id, task_id, name, done, enough_time, length, created_at, updated_at)
 *    - blocks (id, user_id, block_id, status, created_at, updated_at)
 *    - settings (id, user_id, use_24_hour_time, start_hour, end_hour, number_of_hours, block_size, updated_at)
 */

// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Sync state to Supabase
 * Call this from AppContext.jsx useEffect when state changes
 */
export const syncToSupabase = async (state) => {
  // TODO: Implement Supabase sync
  // Example:
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) return // Not logged in, skip sync

  // // Sync tasks
  // await supabase
  //   .from('tasks')
  //   .upsert(
  //     Object.values(state.tasks).map(task => ({
  //       ...task,
  //       user_id: user.id
  //     }))
  //   )

  // // Sync settings
  // await supabase
  //   .from('settings')
  //   .upsert({
  //     user_id: user.id,
  //     ...state.settings
  //   })

  console.log("Supabase sync stub - state ready to sync:", state);
};

/**
 * Load state from Supabase
 * Call this on app initialization after user logs in
 */
export const loadFromSupabase = async () => {
  // TODO: Implement Supabase load
  // Example:
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) return null

  // const { data: tasks } = await supabase
  //   .from('tasks')
  //   .select('*')
  //   .eq('user_id', user.id)

  // const { data: settings } = await supabase
  //   .from('settings')
  //   .select('*')
  //   .eq('user_id', user.id)
  //   .single()

  // return {
  //   tasks: tasks.reduce((acc, task) => ({ ...acc, [task.task_id]: task }), {}),
  //   settings: settings || {},
  //   blocks: {},
  //   date: new Date().getDate()
  // }

  console.log("Supabase load stub - would load user data here");
  return null;
};

/**
 * Subscribe to realtime changes
 * Use this to sync across devices
 */
export const subscribeToChanges = (userId, onUpdate) => {
  // TODO: Implement Supabase realtime subscriptions
  // Example:
  // const channel = supabase
  //   .channel('db-changes')
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: '*',
  //       schema: 'public',
  //       table: 'tasks',
  //       filter: `user_id=eq.${userId}`
  //     },
  //     onUpdate
  //   )
  //   .subscribe()

  // return () => {
  //   supabase.removeChannel(channel)
  // }

  console.log("Supabase realtime stub - would subscribe to changes for user:", userId);
  return () => {};
};
