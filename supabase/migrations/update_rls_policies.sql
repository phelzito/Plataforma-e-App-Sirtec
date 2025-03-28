/*
  # Atualizar políticas de RLS para usar a unidade do usuário

  1. Alterações
    - Atualizar políticas de RLS para usar a unidade do usuário
*/

-- Atualizar políticas de RLS para a tabela news
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'news' AND policyname = 'Usuários podem ver notícias da sua unidade'
  ) THEN
    DROP POLICY "Usuários podem ver notícias da sua unidade" ON news;
  END IF;
END $$;

CREATE POLICY "Usuários podem ver notícias da sua unidade"
  ON news
  FOR SELECT
  TO authenticated
  USING (unit = current_setting('app.current_unit'));

-- Atualizar políticas de RLS para a tabela documents
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'documents' AND policyname = 'Usuários podem ver documentos da sua unidade'
  ) THEN
    DROP POLICY "Usuários podem ver documentos da sua unidade" ON documents;
  END IF;
END $$;

CREATE POLICY "Usuários podem ver documentos da sua unidade"
  ON documents
  FOR SELECT
  TO authenticated
  USING (unit = current_setting('app.current_unit'));
