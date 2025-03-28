/*
  # Atualização das políticas de RLS para logs de atividades

  1. Segurança
    - Atualizar política para usar a coluna correta `profiles.user_id`
*/

-- Remover política existente se ela existir
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'activity_log'
      AND policyname = 'Administradores podem ver todos os logs'
  ) THEN
    DROP POLICY "Administradores podem ver todos os logs" ON activity_log;
  END IF;
END $$;

-- Criar nova política
CREATE POLICY "Administradores podem ver todos os logs"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ));
