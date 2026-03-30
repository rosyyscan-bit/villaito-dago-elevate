import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type TableName = "bedrooms" | "facilities" | "rates" | "faqs" | "testimonials" | "gallery" | "site_settings";

export function useRealtimeTable<T = any>(
  table: TableName,
  orderBy: string = "sort_order",
  ascending: boolean = true,
  filter?: { column: string; value: any }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let query = supabase.from(table).select("*");
    if (filter) {
      query = query.eq(filter.column, filter.value);
    }
    query = query.order(orderBy, { ascending });
    const { data: rows } = await query;
    if (rows) setData(rows as T[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel(`realtime-${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, orderBy]);

  return { data, loading };
}

export function useRealtimeSetting(key: string) {
  const [value, setValue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", key)
      .single();
    if (data) setValue(data.value);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel(`realtime-setting-${key}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [key]);

  return { value, loading };
}
