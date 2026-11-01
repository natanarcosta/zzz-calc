# ZZZ Calc — Fase 1: Auditoria técnica e visual

Quero preparar o projeto ZZZ Calc para uma reformulação completa de sua identidade visual, inspirada na interface e na direção artística de Zenless Zone Zero.

**Nesta etapa, sua tarefa é exclusivamente analisar o projeto e elaborar um diagnóstico. NÃO implemente nada.**

## 1. Restrições obrigatórias

- Não modifique, crie, renomeie ou exclua arquivos.
- Não instale ou remova dependências.
- Não execute comandos que possam alterar o projeto.
- Não faça alterações em código, estilos ou configurações.
- Não presuma funcionalidades ou estruturas que não tenha inspecionado.
- Utilize ferramentas de leitura e pesquisa de arquivos disponíveis no Continue.
- Ao chamar ferramentas de leitura, utilize caminhos relativos à raiz do projeto, sem prefixos `./` ou `../`.
- Utilize `/` como separador de diretórios.

## 2. O que investigar

### A. Estrutura e tecnologias
- Examine o `package.json`.
- Identifique as tecnologias, bibliotecas e versões utilizadas.
- Mapeie a estrutura de diretórios de `src`.
- Identifique o ponto de entrada da aplicação e sua organização geral.

### B. Interface atual
- Identifique todas as páginas, telas e componentes principais.
- Investigue como os componentes estão organizados e reutilizados.
- Identifique a estrutura de navegação.
- Examine os arquivos CSS, Tailwind e estilos globais.
- Identifique se já existem tokens, variáveis ou padrões visuais.

### C. Estado e funcionalidades
- Identifique os Contexts, hooks e demais mecanismos de gerenciamento de estado.
- Mapeie as principais funcionalidades e cálculos.
- Identifique como os dados são compartilhados entre componentes.
- Investigue como funciona a persistência local dos dados.
- Identifique funcionalidades que não podem ser afetadas pelo redesign.

### D. Assets e identidade visual
- Investigue os diretórios de imagens, ícones, retratos de personagens e materiais.
- Identifique quais assets já existem e podem ser reutilizados.
- Identifique como as imagens são referenciadas e carregadas.
- Avalie os padrões visuais atuais e os principais pontos que precisam ser reformulados.

### E. Dependências e limitações
- Identifique bibliotecas de interface, ícones, gráficos e componentes.
- Avalie o que já pode ser utilizado para implementar o novo visual.
- Identifique limitações técnicas ou riscos de compatibilidade.
- Não recomende instalar bibliotecas novas sem justificar sua necessidade.

## 3. Direção visual pretendida

A nova identidade visual deve ser inspirada em Zenless Zone Zero:

- Superfícies escuras, com grafite e preto como base.
- Laranja como cor principal e amarelo ácido como cor secundária.
- Tipografia expressiva, com títulos condensados.
- Elementos geométricos, formas angulares e detalhes gráficos.
- Interface com personalidade, sem parecer um dashboard administrativo genérico.
- Aproveitamento dos retratos e assets existentes do jogo.

O dashboard deverá priorizar informações úteis, como personagens selecionados, recursos disponíveis, materiais necessários e déficits de materiais.

A aplicação deve continuar funcional, responsiva e preservar integralmente seus cálculos e dados.

## 4. Resultado esperado

Apresente um relatório organizado com:

1. **Resumo técnico:** tecnologias, arquitetura e organização geral.
2. **Mapa da interface:** páginas, componentes e principais relações.
3. **Mapa de funcionalidades:** cálculos, estados, contexts, hooks e persistência.
4. **Inventário visual:** estilos existentes, assets disponíveis e oportunidades de reutilização.
5. **Riscos:** pontos que exigem cuidado especial durante a reformulação.
6. **Proposta de arquitetura visual:** como organizar tokens, estilos globais e componentes reutilizáveis.
7. **Plano de implementação incremental:** ordem recomendada para executar o redesign, começando pelo design system e dashboard.
8. **Arquivos envolvidos:** liste os arquivos que provavelmente precisarão ser criados ou modificados em cada etapa.

Sempre que possível, cite os caminhos exatos dos arquivos que sustentam suas conclusões.

Diferencie claramente fatos que você verificou de hipóteses ou recomendações.

**Importante: finalize com o relatório e aguarde minhas instruções. Não comece a implementação.**