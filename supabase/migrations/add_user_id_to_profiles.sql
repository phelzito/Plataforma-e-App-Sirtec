/*
  # Adicionar coluna user_id à tabela profiles

  1. Alterações
    - Adicionar coluna `user_id` (uuid) à tabela `profiles`
    - Criar índice na coluna `user_id`
    - Atualizar políticas de RLS para usar a nova coluna
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN user_id uuid REFERENCES auth.users NOT NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Atualizar políticas de RLS para usar a nova coluna
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Usuários podem ver seu próprio perfil'
  ) THEN
    DROP POLICY "Usuários podem ver seu próprio perfil" ON profiles;
  END IF;
END $$;

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Administradores podem gerenciar perfis'
  ) THEN
    DROP POLICY "Administradores podem gerenciar perfis" ON profiles;
  END IF;
END $$;

CREATE POLICY "Administradores podem gerenciar perfis"
  ON profiles
  FOR ALL
  TO admin
  USING (true);
