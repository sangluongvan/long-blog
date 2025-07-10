// Mock Supabase client for development
const mockSupabase = {
  from: (table: string) => ({
    select: (columns?: string) => ({
      order: (column: string, options?: any) => ({
        then: (callback: any) => callback({ data: [], error: null }),
      }),
      then: (callback: any) => callback({ data: [], error: null }),
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => ({
          then: (callback: any) => callback({ data: data[0], error: null }),
        }),
        then: (callback: any) => callback({ data: data, error: null }),
      }),
      then: (callback: any) => callback({ data: data, error: null }),
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: () => ({
            then: (callback: any) => callback({ data: { ...data, id: value }, error: null }),
          }),
        }),
      }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        then: (callback: any) => callback({ error: null }),
      }),
    }),
  }),
}

export const supabase = null
export const createServerClient = () => null
