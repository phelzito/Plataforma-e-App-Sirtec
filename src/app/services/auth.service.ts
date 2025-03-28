// Adicionar BehaviorSubject para a unidade do usuário
private userUnitSubject = new BehaviorSubject<string>('');
userUnit$ = this.userUnitSubject.asObservable();

// Modificar o método login para armazenar a unidade do usuário
async login(email: string, password: string): Promise<void> {
  this.isLoadingSubject.next(true);
  try {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      if (error.message.includes('second factor required')) {
        this.twoFactorSubject.next(true);
        return;
      }
      throw error;
    }
    
    this.setToken(data.session?.access_token!);
    const userUnit = data.user?.user_metadata?.unit;
    this.userUnitSubject.next(userUnit);
    this.router.navigate(['/dashboard']);
  } catch (error) {
    this.handleError(error, 'Erro ao fazer login');
  } finally {
    this.isLoadingSubject.next(false);
  }
}

// Adicionar método para obter a unidade do usuário
getUserUnit(): string {
  return this.userUnitSubject.getValue();
}
