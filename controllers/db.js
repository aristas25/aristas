const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://peuhseswtlexeijsmmvu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldWhzZXN3dGxleGVpanNtbXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTYwMDIsImV4cCI6MjA1OTQzMjAwMn0._5recilenozkARlN0m_QGDnhXoOlJOCEmTFhTWhcrQ8";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
