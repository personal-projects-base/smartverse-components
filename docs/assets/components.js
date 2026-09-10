const controlInputs = [
  {name: 'formControl / ngModel', type: 'Angular Forms', default: '—', description: 'Valor controlado por Reactive Forms ou Template-driven Forms.'},
  {name: 'name', type: 'string', default: "''", description: 'Nome do controle usado também na validação.'},
  {name: 'field', type: 'FormGroup', default: 'undefined', description: 'Formulário usado para consultar a validade do controle.'},
  {name: 'label', type: 'string', default: "''", description: 'Rótulo exibido no float label.'},
  {name: 'guidance', type: 'string', default: "''", description: 'Texto de orientação exibido pelo tooltip.'},
  {name: 'type', type: 'string', default: "''", description: 'Tipo semântico do campo quando suportado pelo componente.'},
  {name: 'focus', type: 'boolean', default: 'false', description: 'Solicita foco automático ao renderizar.'},
  {name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o controle. Também responde a setDisabledState do Angular Forms.'},
];

const noOutputs = [];

window.SMARTVERSE_DOC_COMPONENTS = [
  {
    slug: 'datatable', name: 'Datatable', className: 'DatatableComponent', selector: 'sv-datatable', category: 'Dados',
    summary: 'Tabela responsiva com paginação, ordenação, filtros persistentes, ações CRUD, carregamento incremental mobile e relatórios opcionais.',
    importCode: `import {Action, DataTable, DatatableComponent, RequestData} from 'smartverse-components';`,
    inputs: [
      {name: 'config', type: 'DataTable', default: 'new DataTable()', description: 'Dados, colunas, paginação, filtros, chave de armazenamento e configuração de relatórios.'},
      {name: 'loading', type: 'boolean', default: 'false', description: 'Indica carregamento e controla o próximo lote no mobile.'},
      {name: 'createDisabled', type: 'boolean', default: 'false', description: 'Desabilita as ações para criar o primeiro ou um novo registro.'},
      {name: 'createDisabledReason', type: 'string', default: "''", description: 'Motivo mostrado em tooltip quando a criação está bloqueada.'},
    ],
    outputs: [
      {name: 'onRegister', type: '{ data: unknown; action: Action }', default: '—', description: 'Emitido para adicionar, editar ou excluir. Action.DELETE=0, EDIT=1 e ADD=2.'},
      {name: 'onRefresh', type: 'RequestData', default: '—', description: 'Solicita dados com size, offset, filter, order e append.'},
    ],
    tsCode: String.raw`import {Component} from '@angular/core';
import {Action, DataTable, DatatableComponent, RequestData} from 'smartverse-components';

@Component({
  selector: 'app-users-page',
  imports: [DatatableComponent],
  templateUrl: './users-page.html'
})
export class UsersPage {
  loading = false;
  table: DataTable = Object.assign(new DataTable(), {
    values: [],
    fields: [
      {field: 'name', header: 'user_name', width: '45%'},
      {field: 'email', header: 'user_email', width: '40%'},
      {field: 'createdAt', header: 'created_at', customValue: 'DATE'}
    ],
    filters: [
      {field: 'name', label: 'user_name', operator: 'eq'},
      {field: 'status', label: 'status', type: 'select', options: [
        {label: 'active', value: 'ACTIVE'},
        {label: 'inactive', value: 'INACTIVE'}
      ]}
    ],
    totalRecords: 0,
    page: 1,
    size: 10,
    storageKey: 'users',
    showReports: true
  });

  load(request: RequestData): void {
    // Chame sua API e atualize values, totalRecords e page.
  }

  register(event: {data: unknown; action: Action}): void {
    // Abra o formulário ou confirme a operação solicitada.
  }
}`,
    htmlCode: String.raw`<sv-datatable
  [config]="table"
  [loading]="loading"
  [createDisabled]="false"
  (onRefresh)="load($event)"
  (onRegister)="register($event)">
  <button datatableToolbarAction type="button">Exportar CSV</button>
</sv-datatable>`,
    notes: [
      'O protocolo de filtros segue o padrão Smartverse: field operator value. O frontend recebe o texto pronto em RequestData.filter.',
      'Defina storageKey para restaurar filtros e ordenação via sessionStorage. O prefixo global é configurável.',
      'Relatórios só são consultados quando config.showReports for true.',
      'No mobile, RequestData.append=true indica que o novo lote deve ser acrescentado aos valores atuais.'
    ]
  },
  {
    slug: 'sidebar', name: 'Sidebar', className: 'SidebarComponent', selector: 'sv-sidebar', category: 'Navegação',
    summary: 'Navegação lateral responsiva e desacoplada, com marca, usuário, menus recursivos, badges, logout e área projetável no rodapé.',
    importCode: `import {SidebarComponent, SidebarMenuItem, SidebarUser} from 'smartverse-components';`,
    inputs: [
      {name: 'brand', type: 'string', default: "'Smartverse'", description: 'Nome da aplicação exibido no cabeçalho.'},
      {name: 'logoUrl', type: 'string', default: 'undefined', description: 'URL opcional do logotipo.'},
      {name: 'items', type: 'SidebarMenuItem[]', default: '[]', description: 'Árvore de menus, submenus, rotas, ícones e badges.'},
      {name: 'user', type: 'SidebarUser', default: 'undefined', description: 'Identificação e avatar do usuário.'},
      {name: 'logoutLabel', type: 'string', default: "'Sair'", description: 'Texto da ação de logout.'},
      {name: 'showLogout', type: 'boolean', default: 'true', description: 'Controla a exibição do botão de logout.'},
      {name: 'expanded', type: 'boolean', default: 'true', description: 'Estado aberto/fechado, compatível com two-way binding.'},
    ],
    outputs: [
      {name: 'expandedChange', type: 'boolean', default: '—', description: 'Mudança do estado aberto; permite [(expanded)].'},
      {name: 'itemSelected', type: 'SidebarMenuItem', default: '—', description: 'Item final selecionado pelo usuário.'},
      {name: 'logout', type: 'void', default: '—', description: 'Solicita logout; autenticação e limpeza ficam no frontend.'},
    ],
    tsCode: String.raw`import {Component} from '@angular/core';
import {SidebarComponent, SidebarMenuItem, SidebarUser} from 'smartverse-components';

@Component({imports: [SidebarComponent], templateUrl: './shell.html'})
export class ShellComponent {
  sidebarOpen = true;
  user: SidebarUser = {
    name: 'Ana Silva',
    subtitle: 'Administradora',
    imageUrl: '/assets/profile.jpg'
  };
  menu: SidebarMenuItem[] = [
    {id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', route: ['/dashboard']},
    {id: 'people', label: 'Pessoas', icon: 'pi pi-users', children: [
      {id: 'members', label: 'Membros', route: ['/members']},
      {id: 'groups', label: 'Grupos', route: ['/groups'], badge: 4}
    ]},
    {id: 'premium', label: 'Relatórios', route: ['/reports'], disabled: true}
  ];

  signOut(): void { /* execute o logout da aplicação */ }
}`,
    htmlCode: String.raw`<sv-sidebar
  brand="Minha aplicação"
  logoUrl="/assets/logo.svg"
  [items]="menu"
  [user]="user"
  [(expanded)]="sidebarOpen"
  (logout)="signOut()">
  <div sidebar-footer>Conteúdo opcional: plano, perfil ou ajuda</div>
</sv-sidebar>`,
    notes: [
      'A sidebar não acessa cookies, APIs de usuário, assinatura ou notificações. O frontend fornece todos esses dados.',
      'Use visible=false para ocultar um item, disabled=true para bloqueá-lo e badge para contadores.',
      'Os itens filhos são recursivos e aceitam qualquer profundidade.',
      'Em telas de até 600px o menu vira um drawer com backdrop.'
    ]
  },
  {
    slug: 'sidebar-submenu', name: 'Sidebar Submenu', className: 'SidebarSubmenuComponent', selector: 'sv-sidebar-submenu', category: 'Navegação',
    summary: 'Renderizador recursivo da árvore de navegação. Normalmente é usado internamente pela Sidebar, mas também está disponível isoladamente.',
    importCode: `import {SidebarMenuItem, SidebarSubmenuComponent} from 'smartverse-components';`,
    inputs: [{name: 'items', type: 'SidebarMenuItem[]', default: '[]', description: 'Itens que serão renderizados recursivamente.'}],
    outputs: [{name: 'itemSelected', type: 'SidebarMenuItem', default: '—', description: 'Item navegável ou acionável selecionado.'}],
    tsCode: String.raw`items: SidebarMenuItem[] = [
  {id: 'settings', label: 'Configurações', icon: 'pi pi-cog', children: [
    {id: 'profile', label: 'Perfil', route: ['/settings/profile']}
  ]}
];`,
    htmlCode: String.raw`<sv-sidebar-submenu [items]="items" (itemSelected)="selected($event)" />`,
    notes: ['Prefira sv-sidebar para o shell completo.', 'Itens com children expandem localmente; itens com route usam RouterLink.']
  },
  {
    slug: 'input-text', name: 'Input Text', className: 'InputTextComponent', selector: 'sv-input-text', category: 'Formulários',
    summary: 'Campo textual integrado ao Angular Forms, com input simples ou textarea, float label, orientação, validação e autofoco.',
    importCode: `import {InputTextComponent} from 'smartverse-components';`,
    inputs: [...controlInputs, {name: 'fieldType', type: "'input-text' | 'textarea'", default: "'input-text'", description: 'Alterna entre campo de uma linha e área de texto.'}], outputs: noOutputs,
    tsCode: String.raw`form = this.formBuilder.group({ name: ['', Validators.required], notes: [''] });`,
    htmlCode: String.raw`<form [formGroup]="form">
  <sv-input-text formControlName="name" name="name" [field]="form"
    label="Nome *" guidance="Informe o nome completo" [focus]="true" />
  <sv-input-text formControlName="notes" name="notes" [field]="form"
    label="Observações" fieldType="textarea" />
</form>`,
    notes: ['Importe ReactiveFormsModule no componente consumidor.', 'A validade visual é atualizada quando FieldsService.verifyIsValid() é chamado.']
  },
  {
    slug: 'input-number', name: 'Input Number', className: 'InputNumberComponent', selector: 'sv-input-number', category: 'Formulários',
    summary: 'Entrada numérica baseada no InputNumber do PrimeNG e compatível com ControlValueAccessor.',
    importCode: `import {InputNumberComponent} from 'smartverse-components';`, inputs: controlInputs, outputs: noOutputs,
    tsCode: String.raw`form = this.formBuilder.group({ amount: [null, [Validators.required, Validators.min(0)]] });`,
    htmlCode: String.raw`<sv-input-number formControlName="amount" name="amount" [field]="form"
  label="Valor *" guidance="Informe um valor maior ou igual a zero" />`,
    notes: ['O valor emitido é numérico ou null.', 'O estado disabled do FormControl é refletido automaticamente.']
  },
  {
    slug: 'input-mask', name: 'Input Mask', className: 'InputMaskComponent', selector: 'sv-input-mask', category: 'Formulários',
    summary: 'Campo com máscara PrimeNG para telefone, documento, CEP e outros valores formatados.',
    importCode: `import {InputMaskComponent} from 'smartverse-components';`,
    inputs: [...controlInputs, {name: 'mask', type: 'string', default: "''", description: 'Máscara no formato aceito pelo PrimeNG InputMask.'}],
    outputs: [{name: 'blurred', type: 'void', default: '—', description: 'Emitido quando o campo perde o foco.'}],
    tsCode: String.raw`form = this.formBuilder.group({ phone: [''], postalCode: [''] });`,
    htmlCode: String.raw`<sv-input-mask formControlName="phone" name="phone" [field]="form"
  label="Telefone" mask="(99) 99999-9999" />
<sv-input-mask formControlName="postalCode" name="postalCode" [field]="form"
  label="CEP" mask="99999-999" (blurred)="lookupPostalCode()" />`,
    notes: ['Use 9 para dígitos conforme a sintaxe do PrimeNG.', 'O evento blurred é útil para consultas como CEP.']
  },
  {
    slug: 'input-date', name: 'Input Date', className: 'InputDateComponent', selector: 'sv-input-date', category: 'Formulários',
    summary: 'Seletor de data e data/hora usando o DatePicker do PrimeNG e Angular Forms.',
    importCode: `import {InputDateComponent} from 'smartverse-components';`,
    inputs: [...controlInputs, {name: 'showTime', type: 'boolean', default: 'false', description: 'Exibe seleção de hora junto à data.'}], outputs: noOutputs,
    tsCode: String.raw`form = this.formBuilder.group({ startAt: [new Date(), Validators.required] });`,
    htmlCode: String.raw`<sv-input-date formControlName="startAt" name="startAt" [field]="form"
  label="Início *" [showTime]="true" />`,
    notes: ['O locale visual do calendário deve ser configurado globalmente pelo providePrimeNG do frontend.', 'O valor padrão é Date ou null.']
  },
  {
    slug: 'dropdown', name: 'Dropdown', className: 'DropdownComponent', selector: 'sv-dropdown', category: 'Formulários',
    summary: 'Seletor de uma opção baseado no Select do PrimeNG, integrado ao Angular Forms.',
    importCode: `import {DropdownComponent} from 'smartverse-components';`,
    inputs: [...controlInputs,
      {name: 'options', type: 'unknown[]', default: '[]', description: 'Lista de opções.'},
      {name: 'optionLabel', type: 'string', default: "''", description: 'Campo usado como rótulo.'},
      {name: 'optionValue', type: 'string', default: "''", description: 'Campo usado como valor; sem ele o objeto inteiro é selecionado.'}], outputs: noOutputs,
    tsCode: String.raw`statuses = [{label: 'Ativo', value: 'ACTIVE'}, {label: 'Inativo', value: 'INACTIVE'}];`,
    htmlCode: String.raw`<sv-dropdown formControlName="status" name="status" [field]="form"
  label="Status" [options]="statuses" optionLabel="label" optionValue="value" />`,
    notes: ['Use optionValue quando quiser armazenar apenas uma propriedade.', 'Sem optionValue, o FormControl recebe a opção completa.']
  },
  {
    slug: 'auto-complete', name: 'Auto Complete', className: 'AutoCompleteComponent', selector: 'sv-auto-complete', category: 'Formulários',
    summary: 'Busca remota paginada enquanto o usuário digita, usando o protocolo de filtros e paginação Smartverse.',
    importCode: `import {AutoCompleteComponent} from 'smartverse-components';`,
    inputs: [...controlInputs,
      {name: 'optionLabel', type: 'string', default: "''", description: 'Propriedade exibida e pesquisada.'},
      {name: 'route', type: 'string', default: "''", description: 'Endpoint consultado pelo CrudService.'},
      {name: 'defaultFilter', type: 'string', default: "''", description: 'Filtro sempre combinado com a busca digitada.'}],
    outputs: [{name: 'onSelectChange', type: 'void', default: '—', description: 'Emitido após selecionar uma sugestão.'}],
    tsCode: String.raw`form = this.formBuilder.group({ person: [null, Validators.required] });`,
    htmlCode: String.raw`<sv-auto-complete formControlName="person" name="person" [field]="form"
  label="Pessoa *" route="people" optionLabel="name"
  defaultFilter="status eq ACTIVE" (onSelectChange)="personChanged()" />`,
    notes: ['A resposta do endpoint deve possuir contents: unknown[].', 'A consulta usa size=5, offset=0 e monta optionLabel eq texto.']
  },
  {
    slug: 'multi-select', name: 'Multi Select', className: 'MultiSelectComponent', selector: 'sv-multi-select', category: 'Formulários',
    summary: 'Seleção múltipla por opções locais ou carregadas de um endpoint Smartverse.',
    importCode: `import {MultiSelectComponent} from 'smartverse-components';`,
    inputs: [...controlInputs,
      {name: 'options', type: 'unknown[]', default: '[]', description: 'Opções locais; substituídas pela resposta remota quando route for informado.'},
      {name: 'optionLabel', type: 'string', default: "'name'", description: 'Propriedade exibida.'},
      {name: 'dataKey', type: 'string', default: "'id'", description: 'Identidade única das opções.'},
      {name: 'route', type: 'string', default: "''", description: 'Endpoint opcional para carregar opções.'},
      {name: 'defaultFilter', type: 'string', default: "''", description: 'Filtro enviado na carga remota.'},
      {name: 'filter', type: 'boolean', default: 'true', description: 'Ativa busca local dentro das opções.'},
      {name: 'display', type: "'comma' | 'chip'", default: "'chip'", description: 'Forma de exibição dos itens selecionados.'},
      {name: 'pageSize', type: 'number', default: '100', description: 'Quantidade solicitada na carga remota.'}], outputs: noOutputs,
    tsCode: String.raw`form = this.formBuilder.group({ teams: [[]] });`,
    htmlCode: String.raw`<sv-multi-select formControlName="teams" name="teams" [field]="form"
  label="Equipes" route="teams" optionLabel="name" dataKey="id"
  defaultFilter="active eq true" display="chip" />`,
    notes: ['Omita route para trabalhar apenas com options.', 'A resposta remota deve possuir contents: unknown[].']
  },
  {
    slug: 'image-upload', name: 'Image Upload', className: 'ImageUploadComponent', selector: 'sv-image-upload', category: 'Formulários',
    summary: 'Upload por URL pré-assinada, preview, exclusão e recorte opcional com ngx-image-cropper.',
    importCode: `import {ImageUploadComponent} from 'smartverse-components';`,
    inputs: [...controlInputs,
      {name: 'imageUrl', type: 'string | null', default: 'null', description: 'URL atual usada no preview.'},
      {name: 'tokenImageUrl', type: 'string', default: "''", description: 'Chave do arquivo no storage.'},
      {name: 'ownerId', type: 'string', default: "''", description: 'Pasta do proprietário; quando omitida é gerado um UUID.'},
      {name: 'cropAspectRatio', type: 'number', default: 'undefined', description: 'Ativa recorte com a proporção indicada, por exemplo 1 para quadrado.'},
      {name: 'cropResizeWidth', type: 'number', default: '1600', description: 'Largura usada no redimensionamento do recorte.'}],
    outputs: [
      {name: 'eventLoading', type: 'void', default: '—', description: 'Emitido ao iniciar e encerrar operações; pode alternar um loading externo.'},
      {name: 'eventImageToken', type: 'string', default: '—', description: 'Nova chave do arquivo após upload ou string vazia após exclusão.'}],
    tsCode: String.raw`imageUrl: string | null = null;
imageToken = '';
uploading = false;
setToken(token: string): void { this.imageToken = token; }`,
    htmlCode: String.raw`<sv-image-upload
  [imageUrl]="imageUrl"
  [tokenImageUrl]="imageToken"
  ownerId="user-42"
  [cropAspectRatio]="1"
  [cropResizeWidth]="800"
  (eventLoading)="uploading = !uploading"
  (eventImageToken)="setToken($event)" />`,
    notes: ['Aceita arquivos de até 5 MB.', 'Configure requestUpload, requestDownload e deleteObject no provideSmartverseComponents.', 'O backend deve devolver {url: string} para upload e download pré-assinados.']
  },
  {
    slug: 'loading', name: 'Loading', className: 'LoadingComponent', selector: 'sv-loading', category: 'Feedback',
    summary: 'Overlay de carregamento simples para operações assíncronas.',
    importCode: `import {LoadingComponent} from 'smartverse-components';`,
    inputs: [{name: 'showLoading', type: 'boolean', default: 'false', description: 'Exibe ou oculta o overlay.'}], outputs: noOutputs,
    tsCode: String.raw`loading = false;`, htmlCode: String.raw`<sv-loading [showLoading]="loading" />`,
    notes: ['Mantenha um estado booleano por página ou operação.', 'Pode ser combinado com finalize() do RxJS.']
  },
  {
    slug: 'account-balances', name: 'Account Balances', className: 'AccountBalancesComponent', selector: 'sv-account-balances', category: 'Dados',
    summary: 'Resumo visual de saldos bancários e caixas com total consolidado.',
    importCode: `import {AccountBalanceItem, AccountBalancesComponent} from 'smartverse-components';`,
    inputs: [{name: 'accounts', type: 'AccountBalanceItem[]', default: '[]', description: 'Contas com id, descrição, saldo, tipo BANK/CASH e estado opcional.'}], outputs: noOutputs,
    tsCode: String.raw`accounts: AccountBalanceItem[] = [
  {id: '1', description: 'Banco principal', detail: 'Agência 0001', balance: 1250.50, type: 'BANK'},
  {id: '2', description: 'Caixa da sede', balance: 300, type: 'CASH', open: true}
];`,
    htmlCode: String.raw`<sv-account-balances [accounts]="accounts" />`,
    notes: ['BANK e CASH são agrupados automaticamente.', 'O total é calculado pela soma de todos os itens.']
  },
  {
    slug: 'mobile-tree-list', name: 'Mobile Tree List', className: 'MobileTreeListComponent', selector: 'sv-mobile-tree-list', category: 'Dados',
    summary: 'Lista hierárquica mobile com expansão recursiva, ações por nó e carregamento incremental.',
    importCode: `import {Column, MobileTreeAction, MobileTreeListComponent} from 'smartverse-components';`,
    inputs: [
      {name: 'nodes', type: 'TreeNode[]', default: '[]', description: 'Nós no formato {data, children}; data deve possuir id.'},
      {name: 'fields', type: 'Column[]', default: '[]', description: 'Campos exibidos em cada cartão.'},
      {name: 'loading', type: 'boolean', default: 'false', description: 'Estado do carregamento incremental.'},
      {name: 'hasMore', type: 'boolean', default: 'false', description: 'Indica existência de outro lote.'}],
    outputs: [
      {name: 'loadMore', type: 'void', default: '—', description: 'Solicita outro lote ao aproximar o sentinel.'},
      {name: 'treeAction', type: 'MobileTreeAction', default: '—', description: 'Ação add, edit ou delete e os dados do nó.'}],
    tsCode: String.raw`fields = [{field: 'description', header: 'Descrição'}];
nodes = [{data: {id: '1', description: 'Matriz'}, children: [
  {data: {id: '2', description: 'Filial norte'}, children: []}
]}];`,
    htmlCode: String.raw`<sv-mobile-tree-list [nodes]="nodes" [fields]="fields"
  [loading]="loading" [hasMore]="hasMore"
  (loadMore)="nextPage()" (treeAction)="handleAction($event)" />`,
    notes: ['O carregamento automático é ativado em viewport de até 768px.', 'Campos aninhados podem usar caminhos como parent.name.']
  },
  {
    slug: 'screen-report-button', name: 'Screen Report Button', className: 'ScreenReportButtonComponent', selector: 'sv-screen-report-button', category: 'Ações',
    summary: 'Descobre relatórios associados à tela e abre o PDF gerado pelo backend.',
    importCode: `import {ScreenReportButtonComponent} from 'smartverse-components';`,
    inputs: [
      {name: 'screen', type: 'string', default: "'' (obrigatório)", description: 'Identificador ou rota da tela usado para localizar relatórios.'},
      {name: 'data', type: 'Record<string, unknown>', default: '{} (obrigatório)', description: 'Payload enviado para gerar o relatório.'},
      {name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueia a geração.'},
      {name: 'outlined', type: 'boolean', default: 'true', description: 'Aplica aparência outlined ao botão.'}], outputs: noOutputs,
    tsCode: String.raw`reportData = {filter: 'status eq ACTIVE', order: 'name asc'};`,
    htmlCode: String.raw`<sv-screen-report-button
  screen="/users"
  [data]="reportData"
  [disabled]="loading"
  [outlined]="true" />`,
    notes: ['Configure screenReports e generateScreenReport globalmente.', 'A listagem deve devolver {reports: [{id, name}]}.', 'A geração deve devolver {report: string} com o PDF em Base64.']
  }
];
