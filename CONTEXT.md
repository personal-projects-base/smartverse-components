# Contexto do projeto — smartverse-components

Este é o documento canônico de contexto e continuidade do projeto. Toda evolução da biblioteca deve partir das decisões registradas aqui. Quando uma decisão arquitetural mudar, este arquivo deve ser atualizado no mesmo trabalho.

## 1. Objetivo

`smartverse-components` é uma biblioteca Angular independente para padronizar componentes, serviços auxiliares e experiências visuais dos novos frontends da Smartverse.

A implementação inicial usa `church-lite-frontend/src/app/shared` como referência funcional e visual, mas a biblioteca é um produto separado e desacoplado.

## 2. Decisões permanentes

- O `church-lite-frontend` não será migrado para esta biblioteca.
- Nenhum componente será removido ou movido do Church Lite.
- O Church Lite continuará usando suas implementações locais devido ao acoplamento existente.
- A biblioteca será usada em frontends novos e em novos projetos.
- Código do Church Lite pode servir como base, mas deve ser adaptado antes de entrar na biblioteca.
- A biblioteca não pode importar arquivos, environments, configurações, serviços ou regras de negócio de outro frontend.
- Integrações variáveis devem ser fornecidas por inputs, outputs, providers, interfaces ou injection tokens.
- Os componentes públicos usam o prefixo `sv-`.
- Componentes devem ser standalone. `SmartverseComponentsModule` existe apenas como conveniência para consumidores baseados em NgModule.

## 3. Stack e compatibilidade atual

- Angular: `21.x`
- PrimeNG: `21.x`
- PrimeIcons: `7.x`
- PrimeFlex: `3.x`
- RxJS: `7.8.x`
- TypeScript: `5.9.x`
- Empacotamento: Angular Package Format por `ng-packagr`
- Pacote npm: `smartverse-components`
- Versão atual: `0.1.0`

Angular e PrimeNG são `peerDependencies`. O frontend consumidor é responsável por instalar e configurar o tema, animações, ícones e estilos globais.

## 4. Estrutura do repositório

```text
smartverse-components/
├── CONTEXT.md
├── README.md
├── angular.json
├── package.json
├── docs/
│   ├── index.html
│   ├── assets/
│   │   ├── app.js
│   │   ├── components.js
│   │   └── styles.css
│   └── downloads/
│       ├── versions.json
│       └── smartverse-components-0.1.0.tgz
└── projects/smartverse-components/
    ├── ng-package.json
    ├── package.json
    └── src/
        ├── assets/i18n/
        ├── lib/
        ├── public-api.ts
        └── styles/
```

## 5. Componentes públicos

### Dados

- `sv-datatable` — `DatatableComponent`
- `sv-account-balances` — `AccountBalancesComponent`
- `sv-mobile-tree-list` — `MobileTreeListComponent`

### Navegação

- `sv-sidebar` — `SidebarComponent`
- `sv-sidebar-submenu` — `SidebarSubmenuComponent`

### Formulários

- `sv-input-text` — `InputTextComponent`
- `sv-input-number` — `InputNumberComponent`
- `sv-input-mask` — `InputMaskComponent`
- `sv-input-date` — `InputDateComponent`
- `sv-dropdown` — `DropdownComponent`
- `sv-auto-complete` — `AutoCompleteComponent`
- `sv-multi-select` — `MultiSelectComponent`
- `sv-image-upload` — `ImageUploadComponent`

### Feedback e ações

- `sv-loading` — `LoadingComponent`
- `sv-screen-report-button` — `ScreenReportButtonComponent`

Toda classe destinada ao consumidor deve ser exportada em `projects/smartverse-components/src/public-api.ts`.

## 6. Serviços e recursos públicos

- `TranslateService`
- `CrudService`
- `FieldsService`
- `ToastService`
- `ModalService`
- `ThemeService`
- `PostalCodeService`
- `ImageUploadService`
- `ScreenReportService`
- `BaseComponent`
- `AppControlValueAccessor`
- `RequestData`
- modelos do Datatable, Sidebar e relatórios
- utilitários de arquivo e árvore

## 7. Contrato de configuração

O frontend consumidor registra a biblioteca com:

```ts
provideSmartverseComponents({
  translationAssetsPath: '/assets/i18n',
  defaultLanguage: 'pt-BR',
  filterStoragePrefix: 'meu-front:datatable-filters',
  endpoints: {
    metadata: 'api/{service}/metadata',
    postalCode: 'api/address/postal-code',
    requestUpload: 'api/storage/upload-url',
    requestDownload: 'api/storage/download-url',
    deleteObject: 'api/storage/object',
    screenReports: 'api/reports/by-screen',
    generateScreenReport: 'api/reports/generate'
  }
})
```

As opções possuem valores padrão e podem ser sobrescritas parcialmente.

Traduções customizadas de backend são opcionais e devem implementar `TranslationOverridesLoader`, registrado pelo token `SMARTVERSE_TRANSLATION_OVERRIDES`.

## 8. Datatable

O Datatable é um dos pilares da biblioteca e deve preservar:

- paginação desktop;
- carregamento incremental mobile;
- filtros dinâmicos;
- pesquisa rápida;
- ordenação;
- persistência de filtros e ordenação;
- ações de adicionar, editar e excluir;
- confirmação de exclusão;
- integração opcional com relatórios;
- compatibilidade com tradução.

Regras atuais:

- `config.showReports` é `false` por padrão.
- `config.storageKey` habilita persistência no `sessionStorage`.
- o prefixo da chave é definido por `filterStoragePrefix`.
- `onRefresh` emite `RequestData`.
- no carregamento incremental mobile, `RequestData.append` é `true`.
- a linguagem de filtros atual segue o protocolo Smartverse: `field operator value`.

Mudanças no protocolo de filtros ou paginação devem manter compatibilidade ou ser introduzidas por adapter/configuração.

## 9. Sidebar

A Sidebar é visual e não conhece regras de uma aplicação específica.

Ela recebe:

- marca e logotipo;
- usuário e fotografia;
- itens recursivos de menu;
- rotas;
- badges;
- estado aberto/fechado;
- visibilidade e bloqueio dos itens;
- conteúdo projetado no rodapé.

Ela emite:

- mudança de expansão;
- item selecionado;
- solicitação de logout.

Não devem ser codificados dentro dela:

- perfis como `MEMBER`;
- endpoints de usuário;
- polling de notificações;
- cookies de autenticação;
- regras de assinatura;
- nomes de rotas do produto;
- planos ou permissões específicas.

Essas responsabilidades pertencem ao frontend consumidor.

## 10. Traduções

A biblioteca inclui traduções padrão em:

- `pt-BR`
- `en-US`
- `es-ES`

Os arquivos ficam no pacote em `assets/i18n`. O consumidor deve copiá-los para seus assets públicos ou fornecer traduções próprias pelo caminho configurado.

Toda chave adicionada em template ou TypeScript deve ser incluída nos três arquivos no mesmo trabalho. Não adicionar texto de interface fixo em um único idioma quando ele puder aparecer para o usuário final.

O locale de componentes PrimeNG, como o DatePicker, pertence à configuração global do frontend consumidor.

## 11. Distribuição e downloads

O pacote é gerado por:

```bash
npm run pack
```

Saída principal:

```text
dist/smartverse-components-<versão>.tgz
```

Cada release também deve ser copiada para:

```text
docs/downloads/smartverse-components-<versão>.tgz
```

`docs/downloads/versions.json` deve receber a nova versão, mantendo as versões anteriores disponíveis.

Não substituir silenciosamente o conteúdo de uma versão já publicada. Se o código do pacote mudar, incrementar a versão antes de publicar.

## 12. Versionamento

Seguir Semantic Versioning:

- `PATCH`: correção compatível, por exemplo `0.1.1`.
- `MINOR`: novo componente ou funcionalidade compatível, por exemplo `0.2.0`.
- `MAJOR`: quebra de API pública, por exemplo `1.0.0` ou `2.0.0` após a estabilização.

Ao alterar a versão:

1. atualizar o `package.json` da biblioteca;
2. atualizar a versão apresentada na documentação;
3. gerar o pacote;
4. copiar o `.tgz` para `docs/downloads`;
5. atualizar `versions.json`;
6. testar a instalação em um projeto consumidor;
7. criar uma tag Git correspondente, como `v0.2.0`.

## 13. Documentação

A documentação estática usa Vue 3 por CDN, sem Vite ou etapa de compilação.

- `docs/index.html` contém a estrutura da aplicação.
- `docs/assets/app.js` controla navegação, configuração e páginas gerais.
- `docs/assets/components.js` contém a documentação estruturada dos componentes.
- `docs/assets/styles.css` contém todo o visual responsivo.
- `docs/.nojekyll` evita processamento do conteúdo pelo Jekyll.

O GitHub Pages deve ser configurado para publicar a pasta `/docs` da branch escolhida.

Endereço esperado:

```text
https://personal-projects-base.github.io/smartverse-components/
```

Ao criar ou alterar uma API pública, atualizar a documentação no mesmo trabalho. Cada componente deve documentar:

- classe e seletor;
- importação;
- finalidade;
- inputs;
- outputs;
- exemplo TypeScript;
- exemplo HTML;
- comportamento, contratos e cuidados de integração.

## 14. Fluxo obrigatório para mudanças

1. Ler este `CONTEXT.md`.
2. Verificar o estado do Git e preservar mudanças não relacionadas.
3. Implementar sem criar dependências com frontends consumidores.
4. Exportar novas APIs pelo `public-api.ts`.
5. Incluir novas traduções nos três idiomas.
6. Atualizar a documentação Vue.
7. Executar `npm run build`.
8. Quando houver release, executar `npm run pack` e atualizar `docs/downloads`.
9. Validar a instalação do `.tgz` em um diretório ou projeto consumidor.
10. Atualizar este documento se houver nova decisão arquitetural.

## 15. Critérios para novos componentes

Um componente pode entrar na biblioteca quando:

- for útil em mais de um frontend;
- não importar arquivos de uma aplicação;
- possuir API pública clara;
- permitir configuração de comportamento variável;
- funcionar com componentes standalone;
- respeitar os tokens visuais do PrimeNG;
- considerar desktop, mobile e acessibilidade;
- considerar SSR antes de acessar `window`, `document`, storage ou APIs exclusivas do navegador;
- possuir documentação de uso.

Regras de negócio específicas devem permanecer no frontend ou ser expressas por contratos externos.

## 16. Estado atual

- Biblioteca compilando com sucesso.
- Pacote `0.1.0` sendo gerado com sucesso.
- Instalação do `.tgz` validada em diretório consumidor temporário.
- Documentação Vue validada sintaticamente e inspecionada visualmente em Chrome desktop.
- Pacote disponível em `docs/downloads`.
- Repositório remoto: `https://github.com/personal-projects-base/smartverse-components.git`.

## 17. Próximos passos sugeridos

- adicionar testes unitários próprios da biblioteca;
- criar uma aplicação de demonstração Angular para testes visuais reais;
- adicionar CI para build e validação da documentação;
- automatizar versionamento e atualização de downloads;
- avaliar publicação futura no GitHub Packages;
- evoluir os protocolos de dados para adapters tipados;
- reduzir os `any` herdados dos componentes-base.
