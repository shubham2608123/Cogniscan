// This file is a compatibility shim. Supabase has been replaced with MongoDB API.
// The app now uses src/lib/api.ts for all backend communication.

export const supabase = {
  auth: {
    signInWithPassword: async () => ({ error: { message: "Use api.ts instead" } }),
    signUp: async () => ({ error: { message: "Use api.ts instead" } }),
    signOut: async () => {},
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => ({ maybeSingle: () => ({ data: null }), single: () => ({ data: null }) }), single: () => ({ data: null }) }), count: () => ({ eq: () => ({ data: null }) }) }),
    insert: () => ({ select: () => ({ single: () => ({ data: null }) }) }),
    update: () => ({ eq: () => ({}) }),
    delete: () => ({ eq: () => ({}) }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    }),
  },
};
