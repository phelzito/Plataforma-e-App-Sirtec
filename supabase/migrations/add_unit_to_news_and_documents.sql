/*
  # Adicionar coluna unit às tabelas news e documents

  1. Alterações
    - Adicionar coluna `unit` (text) às tabelas `news` e `documents`
    - Criar índices nas colunas `unit`
    - Atualizar políticas de RLS para usar a nova coluna
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news' AND column_name = 'unit'
  ) THEN
    ALTER TABLE news ADD COLUMN unit text NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'unit'
  ) THEN
    ALTER TABLE documents ADD COLUMN unit text NOT NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_news_unit ON news(unit);
CREATE INDEX IF NOT EXISTS idx_documents_unit ON documents(unit);

-- Atualizar políticas de RLS
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
