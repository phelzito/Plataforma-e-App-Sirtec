// Injetar AuthService no construtor
constructor(private authService: AuthService) {}

// Adicionar método para carregar as informações com base na unidade
ngOnInit() {
  const userUnit = this.authService.getUserUnit();
  this.loadNews(userUnit);
  this.loadDocuments(userUnit);
}

loadNews(unit: string) {
  this.newsService.getNewsByUnit(unit).subscribe({
    next: (data) => this.news = data,
    error: (error) => console.error(error)
  });
}

loadDocuments(unit: string) {
  this.documentService.getDocumentsByUnit(unit).subscribe({
    next: (data) => this.documents = data,
    error: (error) => console.error(error)
  });
}
