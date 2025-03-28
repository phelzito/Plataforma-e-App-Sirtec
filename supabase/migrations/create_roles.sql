/*
  # Criar roles e atualizar políticas de RLS

  1. Segurança
    - Criar roles: `admin`, `editor`, `viewer`
    - Atualizar políticas de RLS para usar as novas roles
*/

-- Criar roles se não existirem
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'editor') THEN
    CREATE ROLE editor;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'viewer') THEN
    CREATE ROLE viewer;
  END IF;
END $$;

-- Atualizar políticas de RLS para usar as novas roles
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
