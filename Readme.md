# Tipo 1 — Educação em Diabetes

Site informativo em português sobre Diabetes Mellitus Tipo 1 (DM1), com conteúdo educativo sobre autocuidado, monitoramento da glicemia, alimentação, atividade física e sinais de alerta.

> **Aviso:** o conteúdo é apenas educativo e não substitui avaliação, diagnóstico ou orientação de profissionais de saúde. As metas de glicemia são individuais; converse com sua equipe de saúde.

## Conteúdo do site

- Informações sobre DM1, cuidados cotidianos e dúvidas frequentes.
- Cartões interativos com orientações e informações rápidas.
- Simulador educativo de glicemia, com referências que variam conforme o momento da medição.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Formulário de contato que prepara uma mensagem no aplicativo de e-mail do usuário.
- Política de privacidade e informações sobre o aplicativo Tipo 1 para Android.
- Layout responsivo e recursos de acessibilidade, incluindo suporte à preferência por movimento reduzido.

## Como executar localmente

O projeto é um site estático: não precisa instalar dependências nem compilar arquivos.

1. Abra um terminal na pasta do projeto.
2. Inicie um servidor HTTP local:

   ```powershell
   py -m http.server 8000
   ```

3. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

Também é possível abrir `index.html` diretamente, mas o servidor local é recomendado para testar os caminhos dos arquivos. O APK não está incluído nesta cópia local.

## Arquivos principais

| Arquivo ou pasta | Descrição |
| --- | --- |
| `index.html` | Página inicial e conteúdo educativo. |
| `assets/css/style.css` | Estilos gerais, layout responsivo e temas. |
| `assets/css/privacy.css` | Estilos da política de privacidade. |
| `assets/js/script.js` | Simulador de glicemia e interações da página. |
| `politica-de-privacidade/index.html` | Texto da política de privacidade. |
| `politica-de-privacidade.html` | Redirecionamento para a política de privacidade. |
| `assets/images/` | Logotipos e ícone do site. |

## Contato

Escreva para [tipo1diabetes.suporte@gmail.com](mailto:tipo1diabetes.suporte@gmail.com).
