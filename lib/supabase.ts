//creanddo cliente de Supabase
import { createClient } from '@supabase/supabase-js';

// Define tus credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL || 'no funciona la key';
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY || 'no funciona la key';

// Crea el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Exporta el cliente
export default supabase;