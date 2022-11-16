import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hkfsdtcrepkwprzqivvx.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZnNkdGNyZXBrd3ByenFpdnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1MTUzMzMsImV4cCI6MTk4NDA5MTMzM30.9DoXVLbgbcMgJiOHBDITEGQseI0TQvXq5-RE3tlLx1k";
const supabase = createClient(supabaseUrl, supabaseKey);


export function videoService() {
    return {
        getAllVideo() {
            return supabase.from("video")
                .select("*");
        }
    }
}