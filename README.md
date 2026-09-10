# smartverse-components

Biblioteca Angular 21 de componentes reutilizáveis da Smartverse, criada a partir dos componentes do Church Lite sem alterar o projeto original.

## Instalação local

```bash
npm install
npm run pack
npm install ../smartverse-components/dist/smartverse-components-0.1.0.tgz
```

O frontend consumidor também deve instalar as `peerDependencies` Angular, PrimeNG, PrimeIcons, PrimeFlex e `ngx-image-cropper`.

## Configuração

```ts
import {provideHttpClient} from '@angular/common/http';
import {provideSmartverseComponents} from 'smartverse-components';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideSmartverseComponents({
      translationAssetsPath: '/assets/i18n',
      filterStoragePrefix: 'meu-front:datatable-filters',
      endpoints: {
        screenReports: 'getScreenReports',
        generateScreenReport: 'generateScreenReport'
      }
    })
  ]
};
```

Configure o tema do PrimeNG no frontend. Inclua também `primeicons/primeicons.css` e, quando necessário, `primeflex/primeflex.css` nos estilos da aplicação.

Para usar os arquivos de tradução fornecidos pelo pacote, copie `node_modules/smartverse-components/assets/i18n` para os assets da aplicação ou aponte `translationAssetsPath` para traduções próprias.

## Uso standalone

```ts
import {DatatableComponent, SidebarComponent} from 'smartverse-components';

@Component({
  imports: [DatatableComponent, SidebarComponent]
})
export class ExampleComponent {}
```

Os seletores públicos usam o prefixo `sv-`, por exemplo: `sv-datatable`, `sv-sidebar`, `sv-input-text` e `sv-loading`.

O relatório da tabela é opt-in: defina `config.showReports = true`. Endpoints, tradução, upload e persistência podem ser configurados sem acoplamento com o Church Lite.
