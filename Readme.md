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

## Aplicativo para Android

O APK não é versionado neste repositório para manter os arquivos do projeto mais leves. O botão de download aponta para `app-release.apk` na raiz do site; disponibilize o arquivo nesse caminho no host para que o download funcione. O APK poderá ser baixado pelo botão da página inicial.

## Como executar localmente

O projeto é um site estático: não precisa instalar dependências nem compilar arquivos.

1. Abra um terminal na pasta do projeto.
2. Inicie um servidor HTTP local:

   ```powershell
   py -m http.server 8000
   ```

3. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

Também é possível abrir `index.html` diretamente, mas o servidor local é recomendado para testar os caminhos dos arquivos. O APK não está incluído nesta cópia local.

## Publicação

Publique os arquivos do projeto em um serviço de hospedagem de sites estáticos, preservando a estrutura de pastas. A página inicial é `index.html`; os estilos, o JavaScript e os SVGs ficam em `assets/`, e a política de privacidade fica em `politica-de-privacidade/index.html`. Configure o host para disponibilizar o APK em `/app-release.apk`.

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
| `app-release.apk` | Arquivo opcional fornecido pelo host; não versionado neste repositório. |

## Contato

Use o formulário no site ou escreva para [tipo1diabetes.suporte@gmail.com](mailto:tipo1diabetes.suporte@gmail.com).
