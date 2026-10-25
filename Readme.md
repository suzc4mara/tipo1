# Tipo 1 — Educação em Diabetes

Site informativo em português sobre Diabetes Mellitus Tipo 1 (DM1). O conteúdo reúne orientações educativas sobre autocuidado, monitoramento da glicemia, alimentação, atividade física e sinais de alerta.

> **Aviso:** o conteúdo é apenas educativo e não substitui avaliação, diagnóstico ou orientação de profissionais de saúde. As metas de glicemia são individuais; converse com sua equipe de saúde.

## Conteúdo do site

- Apresentação do DM1, cuidados cotidianos e dúvidas frequentes.
- Cartões interativos com informações rápidas e orientações sobre quando buscar ajuda.
- Simulador educativo de glicemia, com referências que variam conforme o momento da medição.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Formulário de contato que prepara uma mensagem no aplicativo de e-mail do usuário.
- Política de privacidade e download do aplicativo Tipo 1 para Android.
- Layout responsivo e recursos de acessibilidade, incluindo suporte à preferência por movimento reduzido.

## Como executar localmente

O projeto é um site estático: não precisa instalar dependências nem compilar arquivos.

1. Abra um terminal na pasta do projeto.
2. Inicie um servidor HTTP local:

   ```powershell
   py -m http.server 8000
   ```

3. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

Também é possível abrir `index.html` diretamente, mas o servidor local é recomendado para testar os caminhos dos arquivos e o download do APK.

## Publicação

Publique os arquivos do projeto em um serviço de hospedagem de sites estáticos, preservando a estrutura de pastas. A página inicial é `index.html`; mantenha junto dela o CSS, o JavaScript, os arquivos SVG e `app-release.apk`. A política de privacidade fica em `politica-de-privacidade/index.html`.

## Arquivos principais

| Arquivo ou pasta | Descrição |
| --- | --- |
| `index.html` | Página inicial e conteúdo educativo. |
| `style.css` | Estilos, layout responsivo e temas. |
| `script.js` | Simulador de glicemia e interações da página. |
| `politica-de-privacidade/index.html` | Texto da política de privacidade. |
| `politica-de-privacidade.html` | Redirecionamento para a política de privacidade. |
| `logo_*.svg`, `logo_topo.svg` | Logotipos e ícone do site. |
| `app-release.apk` | Pacote de instalação do aplicativo para Android, disponibilizado para download. |

## Contato

Use o formulário no site ou escreva para [tipo1diabetes.suporte@gmail.com](mailto:tipo1diabetes.suporte@gmail.com).