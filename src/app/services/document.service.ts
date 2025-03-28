// Adicionar filtro por unidade nos métodos
getDocumentsByUnit(unit: string) {
  return this.supabase
    .from('documents')
    .select('*')
    .eq('unit', unit)
    .order('created_at', { ascending: false });
}

createDocument(formData: FormData) {
  return this.supabase
    .from('documents')
    .insert([{ 
      title: formData.get('title'),
      description: formData.get('description'),
      unit: formData.get('unit'),
      file_path: formData.get('file') 
    }]);
}

updateDocument(id: string, formData: FormData) {
  return this.supabase
    .from('documents')
    .update({
      title: formData.get('title'),
      description: formData.get('description'),
      file_path: formData.get('file')
    })
    .eq('id', id)
    .eq('unit', formData.get('unit')); // Garantir que só atualize da mesma unidade
}
