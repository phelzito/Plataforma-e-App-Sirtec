// Adicionar no construtor, após a criação do form
this.form.addControl('unit', this.fb.control(this.data?.userUnit || '', Validators.required));

// Modificar o método onSubmit
async onSubmit() {
  if (this.form.invalid) return;

  this.isLoading = true;
  try {
    const newsData = {
      ...this.form.value,
      unit: this.data.userUnit // Garantir que a unidade seja sempre a do usuário
    };
    
    if (this.isEditMode) {
      await this.newsService.updateNews(this.data.news.id, newsData);
      this.snackBar.open('Notícia atualizada com sucesso!', 'Fechar', { duration: 5000 });
    } else {
      await this.newsService.createNews(newsData);
      this.snackBar.open('Notícia criada com sucesso!', 'Fechar', { duration: 5000 });
    }
    
    this.dialogRef.close(true);
  } catch (error) {
    this.snackBar.open('Erro ao salvar notícia', 'Fechar', { duration: 5000 });
  } finally {
    this.isLoading = false;
  }
}
