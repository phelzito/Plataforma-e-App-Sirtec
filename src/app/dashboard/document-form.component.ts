// Adicionar no construtor, após a criação do form
this.form.addControl('unit', this.fb.control(this.data?.userUnit || '', Validators.required));

// Modificar o método onSubmit
async onSubmit() {
  if (this.form.invalid) return;

  this.isLoading = true;
  try {
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('unit', this.data.userUnit); // Adicionar a unidade
    
    if (this.fileToUpload) {
      formData.append('file', this.fileToUpload);
    }

    if (this.isEditMode) {
      await this.documentService.updateDocument(this.data.document.id, formData);
      this.snackBar.open('Documento atualizado com sucesso!', 'Fechar', { duration: 5000 });
    } else {
      await this.documentService.createDocument(formData);
      this.snackBar.open('Documento criado com sucesso!', 'Fechar', { duration: 5000 });
    }
    
    this.dialogRef.close(true);
  } catch (error) {
    this.snackBar.open('Erro ao salvar documento', 'Fechar', { duration: 5000 });
  } finally {
    this.isLoading = false;
  }
}
