// Injetar AuthService no construtor
constructor(private authService: AuthService) {}

// Modificar o método para carregar as notícias com base na unidade
ngOnInit() {
  const userUnit = this.authService.getUserUnit();
  this.loadNews(userUnit);
}

loadNews(unit: string) {
  this.newsService.getNewsByUnit(unit).subscribe({
    next: (data) => this.news = data,
    error: (error) => console.error(error)
  });
}
