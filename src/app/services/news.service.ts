// Adicionar filtro por unidade nos métodos
getNewsByUnit(unit: string) {
  return this.supabase
    .from('news')
    .select('*')
    .eq('unit', unit)
    .order('created_at', { ascending: false });
}

createNews(newsData: any) {
  return this.supabase
    .from('news')
    .insert([{ ...newsData, unit: newsData.unit }]);
}

updateNews(id: string, newsData: any) {
  return this.supabase
    .from('news')
    .update(newsData)
    .eq('id', id)
    .eq('unit', newsData.unit); // Garantir que só atualize da mesma unidade
}
