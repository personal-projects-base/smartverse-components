const {createApp} = Vue;

const CodeBlock = {
  props: {code: {type: String, required: true}, language: {type: String, default: 'Shell'}},
  data: () => ({copied: false}),
  methods: {
    async copy() {
      try {
        await navigator.clipboard.writeText(this.code);
        this.copied = true;
        window.setTimeout(() => this.copied = false, 1400);
      } catch (_) {
        this.copied = false;
      }
    }
  },
  template: `
    <div class="code-block">
      <div class="code-toolbar"><span>{{ language }}</span><button class="copy-button" type="button" @click="copy">{{ copied ? 'Copiado' : 'Copiar' }}</button></div>
      <pre><code v-text="code"></code></pre>
    </div>`
};

const DocStep = {
  props: {number: String, title: String},
  template: `<section class="doc-step"><div class="step-number">{{ number }}</div><div class="step-content"><h2>{{ title }}</h2><slot></slot></div></section>`
};

const ApiTable = {
  props: {title: String, rows: {type: Array, default: () => []}},
  template: `
    <section v-if="rows.length" class="api-section">
      <h2>{{ title }}</h2>
      <div class="api-table-wrap"><table class="api-table">
        <thead><tr><th>Nome</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></thead>
        <tbody><tr v-for="row in rows" :key="row.name"><td>{{ row.name }}</td><td>{{ row.type }}</td><td>{{ row.default }}</td><td>{{ row.description }}</td></tr></tbody>
      </table></div>
    </section>`
};

const ComponentPage = {
  props: {component: {type: Object, required: true}},
  components: {CodeBlock, ApiTable},
  template: `
    <section class="page">
      <header class="page-heading">
        <div class="eyebrow">{{ component.category }}</div>
        <h1>{{ component.name }}</h1>
        <p>{{ component.summary }}</p>
        <div class="component-meta"><span>{{ component.selector }}</span><span>{{ component.className }}</span><span>standalone</span></div>
      </header>
      <h2>Importação</h2>
      <code-block :code="component.importCode" language="TypeScript"></code-block>
      <api-table title="Inputs" :rows="component.inputs"></api-table>
      <api-table title="Outputs" :rows="component.outputs"></api-table>
      <h2>Exemplo completo</h2>
      <h3>Componente TypeScript</h3>
      <code-block :code="component.tsCode" language="TypeScript"></code-block>
      <h3>Template HTML</h3>
      <code-block :code="component.htmlCode" language="HTML"></code-block>
      <template v-if="component.notes?.length">
        <h2>Comportamento e integração</h2>
        <ul class="notes"><li v-for="note in component.notes" :key="note">{{ note }}</li></ul>
      </template>
    </section>`
};

createApp({
  components: {CodeBlock, DocStep, ApiTable, ComponentPage},
  data() {
    return {
      version: '0.1.0',
      route: 'overview',
      query: '',
      mobileNav: false,
      components: window.SMARTVERSE_DOC_COMPONENTS,
      startNav: [
        {id: 'overview', label: 'Visão geral', icon: '⌂'},
        {id: 'quickstart', label: 'Primeiros passos', icon: '→'},
        {id: 'configuration', label: 'Configuração', icon: '⚙'}
      ],
      features: [
        {icon: '◫', title: 'Standalone primeiro', text: 'Importe componentes individualmente ou utilize o módulo agregador para projetos baseados em NgModule.'},
        {icon: '⌁', title: 'Integrações configuráveis', text: 'Endpoints, traduções, persistência, upload e relatórios são definidos pelo frontend consumidor.'},
        {icon: '◈', title: 'Identidade PrimeNG', text: 'A biblioteca acompanha os tokens visuais do tema PrimeNG escolhido pela aplicação.'}
      ],
      configurationRows: [
        {name: 'translationAssetsPath', type: 'string', default: "'/assets/i18n'", description: 'Diretório HTTP dos JSON de tradução.'},
        {name: 'defaultLanguage', type: 'string', default: "'pt-BR'", description: 'Idioma usado quando não for possível resolver o idioma solicitado.'},
        {name: 'supportedLanguages', type: 'Record<string, string>', default: 'PORTUGUESE, ENGLISH, SPANISH', description: 'Mapeamento entre códigos de domínio e locales.'},
        {name: 'filterStoragePrefix', type: 'string', default: "'smartverse:datatable-filters'", description: 'Prefixo das chaves gravadas no sessionStorage.'},
        {name: 'endpoints.metadata', type: 'string', default: "'anonymous/rest/{service}/metadata'", description: 'Endpoint de metadados; {service} é substituído automaticamente.'},
        {name: 'endpoints.postalCode', type: 'string', default: "'lookupPostalCode'", description: 'Consulta de endereço por CEP.'},
        {name: 'endpoints.requestUpload', type: 'string', default: "'requestUpload'", description: 'Solicita URL pré-assinada de upload.'},
        {name: 'endpoints.requestDownload', type: 'string', default: "'requestUrl'", description: 'Solicita URL temporária de leitura.'},
        {name: 'endpoints.deleteObject', type: 'string', default: "'deleteObject'", description: 'Remove um objeto do storage.'},
        {name: 'endpoints.screenReports', type: 'string', default: "'getScreenReports'", description: 'Lista relatórios associados a uma tela.'},
        {name: 'endpoints.generateScreenReport', type: 'string', default: "'generateScreenReport'", description: 'Gera um relatório PDF.'}
      ],
      services: [
        {icon: '文', name: 'TranslateService', description: 'Carrega JSON por idioma, resolve locale e aplica substituições opcionais.', usage: "inject(TranslateService).translate('key')"},
        {icon: '↔', name: 'CrudService', description: 'Operações HTTP genéricas e listagem no protocolo RequestData.', usage: "crud.list<User>('users', request)"},
        {icon: '✓', name: 'FieldsService', description: 'Criação de formulários dinâmicos e disparo de validação visual.', usage: 'fields.verifyIsValid()'},
        {icon: '!', name: 'ToastService', description: 'Facade success, warn, info e error sobre o MessageService do PrimeNG.', usage: "toast.success({summary: 'Pronto', detail: 'Salvo'})"},
        {icon: '▣', name: 'ModalService', description: 'Abre DynamicDialog com uma configuração consistente.', usage: 'modal.open({component: EditorComponent, data})'},
        {icon: '☼', name: 'ThemeService', description: 'Controla a classe app-dark no elemento raiz.', usage: 'theme.setDarkMode(true)'},
        {icon: '⌖', name: 'PostalCodeService', description: 'Consulta endereço usando o endpoint configurado.', usage: "postalCode.lookup('01001000')"},
        {icon: '⇧', name: 'ImageUploadService', description: 'URLs pré-assinadas, upload binário, download e exclusão.', usage: "upload.onRequestUpload('folder/image.jpg')"},
        {icon: '▤', name: 'ScreenReportService', description: 'Lista relatórios de tela e solicita PDF em Base64.', usage: "reports.getByScreen('/users')"}
      ],
      installCode: 'npm install ./smartverse-components-0.1.0.tgz',
      configurationCode: String.raw`import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideSmartverseComponents} from 'smartverse-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({theme: {preset: Aura}}),
    provideSmartverseComponents({
      translationAssetsPath: '/assets/i18n',
      filterStoragePrefix: 'meu-front:datatable-filters'
    })
  ]
};`,
      stylesCode: String.raw`// angular.json
"styles": [
  "node_modules/primeflex/primeflex.css",
  "node_modules/primeicons/primeicons.css",
  "src/styles.scss"
],
"assets": [
  {"glob": "**/*", "input": "public"},
  {
    "glob": "**/*.json",
    "input": "node_modules/smartverse-components/assets/i18n",
    "output": "assets/i18n"
  }
]`,
      standaloneCode: String.raw`import {Component} from '@angular/core';
import {DatatableComponent, InputTextComponent, LoadingComponent} from 'smartverse-components';

@Component({
  selector: 'app-example',
  imports: [DatatableComponent, InputTextComponent, LoadingComponent],
  templateUrl: './example.html'
})
export class ExampleComponent {}`,
      fullConfigurationCode: String.raw`provideSmartverseComponents({
  translationAssetsPath: '/assets/i18n',
  defaultLanguage: 'pt-BR',
  supportedLanguages: {
    PORTUGUESE: 'pt-BR',
    ENGLISH: 'en-US',
    SPANISH: 'es-ES'
  },
  filterStoragePrefix: 'finance-app:filters',
  endpoints: {
    metadata: 'api/{service}/metadata',
    postalCode: 'api/address/postal-code',
    requestUpload: 'api/storage/upload-url',
    requestDownload: 'api/storage/download-url',
    deleteObject: 'api/storage/object',
    screenReports: 'api/reports/by-screen',
    generateScreenReport: 'api/reports/generate'
  }
})`,
      overrideLoaderCode: String.raw`import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  SMARTVERSE_TRANSLATION_OVERRIDES,
  TranslationOverride,
  TranslationOverridesLoader
} from 'smartverse-components';

@Injectable()
export class ApiTranslationLoader implements TranslationOverridesLoader {
  constructor(private readonly http: HttpClient) {}
  load(language: string) {
    return this.http.get<TranslationOverride[]>('/api/translations', {
      params: {language}
    });
  }
}

// Em app.config.ts:
{provide: SMARTVERSE_TRANSLATION_OVERRIDES, useClass: ApiTranslationLoader}`,
      scssCode: String.raw`// Em um SCSS de componente consumidor
@use 'smartverse-components/styles/entity-page';

// Ou configure includePaths no angular.json e use:
@use 'entity-page';`
    };
  },
  computed: {
    filteredComponents() {
      const query = this.query.toLocaleLowerCase('pt-BR');
      if (!query) return this.components;
      return this.components.filter(component =>
        [component.name, component.selector, component.category, component.summary]
          .some(value => value.toLocaleLowerCase('pt-BR').includes(query))
      );
    },
    currentComponent() {
      if (!this.route.startsWith('component/')) return null;
      return this.components.find(component => component.slug === this.route.slice('component/'.length)) ?? null;
    },
    downloadUrl() {
      return `./downloads/smartverse-components-${this.version}.tgz`;
    },
    pagesInstallCode() {
      const path = location.pathname.replace(/\/[^/]*$/, '').replace(/\/$/, '');
      return `npm install ${location.origin}${path}/downloads/smartverse-components-${this.version}.tgz`;
    }
  },
  created() {
    this.updateRoute();
    window.addEventListener('hashchange', this.updateRoute);
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.updateRoute);
  },
  methods: {
    updateRoute() {
      this.route = decodeURIComponent(location.hash.slice(1)) || 'overview';
      this.mobileNav = false;
      window.scrollTo({top: 0});
    },
    closeMobileNav() { this.mobileNav = false; }
  }
}).mount('#app');
