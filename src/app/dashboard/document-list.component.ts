// Injetar AuthService no construtor
constructor(private authService: AuthService) {}

// Modificar o método para carregar os documentos com base na unidade
ngOnInit() {
  const userUnit = this.authService.getUserUnit();
  this.loadDocuments(userUnit);
}

loadDocuments(unit: string) {
  this.documentService.getDocumentsByUnit(unit).subscribe({
    next: (data) => this.documents = data,
    error: (error) => console.error(error)
  });
}
