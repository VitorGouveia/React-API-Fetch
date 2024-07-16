### **`Objetivo`**

Adotar o Pet ideal.

---

- [Encontrar o pet ideal na plataforma de **Adoção & Doação**](#encontrar-o-pet-ideal-na-plataforma-de-adoção--doação)

  > Primeiramente é necessário que o usuário encontre o pet ideal na plataforma através de filtros na busca.

- [Adotar o pet ideal sem criação de conta](#adotar-o-pet-ideal-sem-criação-de-conta)
  > Depois, o usuário tem que adotar o pet sem muita burocracia de forma rápida e sem criar conta.

---

### Encontrar o pet ideal na plataforma de **Adoção & Doação**

> Primeiramente é necessário que o usuário encontre o pet ideal na plataforma através de filtros na busca

- [ ] Sistema de pesquisa com **Filtros Avançados**

  > Além da **pesquisa automática** vão existir filtros que o usuário pode utilizar para filtrar pets, tem que ser um sistema escalável pois vamos adicionais mais propriedades no futuro.

  Deve ser uma seção na landing page.

  <details>
    <summary>Filtros</summary>

- Entidade doadora (ONGs, Loja, Pessoa)
- Localização do registro
- Filtrar propriedades do pet:

  - Idade
  - Espécie
  - Raça
  - Porte
  - Sexo
  - Pelagem
  - Necessidades especiais
  - Nível de Energia
  - Nível de independência
  - Ambiente

  </details>

- [ ] **Pesquisa Automática** que sugira pets compatíveis com o perfil do candidato.

  > Fazer perguntas sobre o candidato através de um botão, a pessoa vai clicar esse botão na parte de pesquisa e as perguntas vão surgir.

  Deve ser uma seção na landing page.

  <details>
    <summary>Perguntas</summary>
    
  - Nome, sobrenome, email, localização
  - Tipo do imóvel que mora
  - Presença de crianças/outros animais
  - Se já teve animais antes
  - Estilo de vida
  - Tempo disponível com o pet
  - Perguntar sobre presença de perigo para o animal
  - Motivação da adoção
  - Expectativas

  </details>

- [ ] Sistema de **Salvar Pesquisa**

  > Ao clicar em salvar a pesquisa deve abrir um modal perguntando e-mail para criar a conta do usuário, aí vamos criar a conta (nova entidade) e quando surgir um pet com as propriedades filtradas vamos notificar na plataforma e no e-mail.

  Deve ser um botão que deve surgir após a pesquisa for realizada, com resultados ou não.

- [ ] Implementar **Página do Pet**
  > O usuário deve conseguir visualizar todas as propriedades do Pet em uma página específica, com vídeos, fotos, quem está doando, porque…

---

### Adotar o pet ideal sem criação de conta

> Depois, o usuário tem que adotar o pet sem muita burocracia de forma rápida e sem criar conta.

- [ ] Implementar **Intenção de Adoção**

  > Assim que o usuário decidir que quer adotar aquele pet ele vai poder criar uma **intenção de adoção.**

- Para o lado de quem está adotando o Pet deve-se receber na plataforma uma notificação caso tenha sido aceito ou rejeitado.
- Também ao criar uma intenção de doação irão surgir diversas perguntar que o candidato deverá responder, esses dados serão enviados ao doador.
- Caso o usuário esteja logado as informações devem ser atribuidas a dele, caso esteja deslogado deve-se criar uma conta apenas com Nome e e-mail dele e atribuir as propriedades.

  Não deve ser possível adotar o próprio pet.

  <details>
    <summary>
      Perguntas
    </summary>

  - Tipo do imóvel que mora
  - Presença de crianças/outros animais
  - Já teve animais antes
  - Estilo de vida
  - Tempo disponível com o pet
  - Perguntar sobre presença de perigo para o animal
  - Motivação da adoção
  - Expectativas
  - Idade
  </details>
