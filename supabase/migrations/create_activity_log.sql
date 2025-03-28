/*
  # Criação da tabela de logs de atividades

  1. Nova Tabela
    - `activity_log`
      - `id` (uuid, chave primária)
      - `user_id` (uuid, referência ao usuário)
      - `action` (texto, ação realizada)
      - `details` (jsonb, detalhes da ação)
      - `ip_address` (texto, endereço IP)
      - `user_agent` (texto, agente do usuário)
      - `created_at` (timestamp, data de criação)

  2. Segurança
    - Habilitar RLS na tabela `activity_log`
    - Criar política para administradores acessarem todos os logs
*/

CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  action text NOT NULL,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Administradores podem ver todos os logs"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);
