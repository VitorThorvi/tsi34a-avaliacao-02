# TSI34A - Avaliação 02

## Qual a diferença entre testes unitários e testes E2E (End to End) em aplicações mobile?

Os testes unitários, normalmente feitos com Jest em projetos React Native, servem para validar funções, hooks ou componentes específicos

Eles rodam direto no terminal, de forma bem rápida e sem precisar de emulador, sendo ideais para garantir que a lógica e o comportamento da applicação estejam corretos.

Já os testes E2E, como os criados com Maestro, simulam o uso real do app.

Rodando em um emulador ou em um dispositivo físico, eles verificam se o app funciona de ponta a ponta. 

Enquanto o teste E2E testa mais a experiência do usuário, o teste unitário foca em testar de fato o código e de forma isolada.

---

## Como executar os testes unitários

```bash
yarn test
```
executará o Jest com o preset jest-expo.

## Como executar os testes E2E

```bash
maestro test maestro-workspace/testFlow.yaml
```

