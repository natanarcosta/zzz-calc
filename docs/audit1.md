# ZZZ Calc — Auditoria técnica: Contexts e persistência

Nesta tarefa, investigue exclusivamente o gerenciamento de estado e a persistência de dados do projeto.

## Restrições

- Não modifique nenhum arquivo.
- Não crie arquivos.
- Não execute comandos.
- Não instale dependências.
- Utilize somente ferramentas de leitura e listagem de arquivos.
- Caminhos sempre relativos à raiz, sem `./` ou `../`.
- Não conclua nada apenas pelo nome de arquivos ou funções.

## Arquivos iniciais

Leia integralmente:

- src/contexts/CharacterContext.tsx
- src/contexts/ResourceContext.tsx

Depois, investigue os hooks, utils e bibliotecas utilizados diretamente por esses arquivos.

Localize também a implementação de persistência de dados, caso exista.

## O que preciso descobrir

1. Quais estados existem e quais são suas estruturas?
2. Quais funções modificam esses estados?
3. Como os componentes acessam esses estados?
4. Existe persistência em localStorage, IndexedDB ou outro mecanismo?
5. Quais dados são persistidos?
6. Quando os dados são carregados e salvos?
7. Existe tratamento para dados inválidos ou estruturas antigas?
8. Quais partes desse sistema precisam permanecer intactas durante o redesign?

## Formato da resposta

Para cada conclusão, indique o arquivo e a função ou trecho responsável.

Separe:
- Fatos comprovados pelo código.
- Hipóteses ainda não verificadas.
- Recomendações para o redesign.

Não invente funcionalidades.

Finalize com um resumo da arquitetura de estado e persistência.

Não prossiga para outras partes da auditoria.