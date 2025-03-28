/*
  # Criação da tabela de perfis de usuários

  1. Nova Tabela
    - `profiles`
      - `id` (uuid, chave primária)
      - `user_id` (uuid, referência ao usuário)
      - `role` (texto, papel do usuário)
      - `created_at` (timestamp, data de criação)

  2. Segurança
    - Habilitar RLS na tabela `profiles`
    - Criar política para usuários acessarem seu próprio perfil
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL DEFAULT 'viewer',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Administradores podem gerenciar perfis"
  ON profiles
  FOR ALL
  TO admin
  USING (true);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
