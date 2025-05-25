import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ziiftcpuieshnnifnkmg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaWZ0Y3B1aWVzaG5uaWZua21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMTM5MzEsImV4cCI6MjA2Mzc4OTkzMX0.qQwu8vuHUoml_uY06kkLYviK44JCTliKT8xoNe7lbzw';
export const supabase = createClient(supabaseUrl, supabaseKey);