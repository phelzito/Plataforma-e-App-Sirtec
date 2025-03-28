/*
  # Habilitar RLS e criar políticas de segurança

  1. Segurança
    - Habilitar RLS para todas as tabelas
    - Criar políticas de acesso para cada tabela
    - Restringir acesso baseado em roles
*/

-- Habilitar RLS para tabelas
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Políticas para anúncios
CREATE POLICY "Leitura de anúncios" 
ON announcements 
FOR SELECT 
USING (true);

CREATE POLICY "Criação de anúncios"
ON announcements
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'admin');

-- Políticas para notícias
CREATE POLICY "Leitura de notícias"
ON news
FOR SELECT
USING (true);

CREATE POLICY "Criação de notícias"
ON news
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'admin');

-- Políticas para documentos
CREATE POLICY "Leitura de documentos"
ON documents
FOR SELECT
USING (true);

CREATE POLICY "Criação de documentos"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'admin');
