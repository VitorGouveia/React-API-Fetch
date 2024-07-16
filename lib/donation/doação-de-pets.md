<aside>
<img src="/icons/chess-king_red.svg" alt="/icons/chess-king_red.svg" width="40px" /> Doar o Pet para o dono ideal.

</aside>

---

# 💡 Brainstorming

> Como facilitar a doação desse Pet?

Essa funcionalidade está altamente acoplada com [Adoção de Pets](https://www.notion.so/Ado-o-de-Pets-fc7ea2ffb81841db9ca6ca329a6422e6?pvs=21), já que a ideia é que uma pessoa cadastre seu Pet na plataforma e conforme o tempo vai passando recebe mensagens em seu WhatsApp com interessados em adotar o Pet.

Porém, a diferença é que o contexto de doação inclui o cadastro do Pet, que deve ser pensado para que todas as propriedades ajudem quem quer adotar lá em [Adoção de Pets](https://www.notion.so/Ado-o-de-Pets-fc7ea2ffb81841db9ca6ca329a6422e6?pvs=21).

A ideia então é:

1. Cadastro da PF ou ONG na plataforma

   Deixar o cadastro de conta facilitada para que a pessoa doe o Pet.

2. Cadastro completo de Pets na plataforma

   Quanto mais detalhes tiver o Pet mais preciso será a busca que quem procura um Pet.

   - Propriedades de anúncio de pet.
     - Nome
     - Idade
     - Espécie
       Peixe, pássado, cachorro, gato.
     - Raça
     - Porte
       Pequeno, Grande.
     - Nível de Energia
       Baixo, Alto.
     - Nível de Independência
       Sempre precisa de companhia, pouca ou nenhuma companhia.
     - Ambiente
       Interno, Externo.
     - Características Especiais
       O usuário poderá cadastrar condições especiais como “intolerância a lactose”, “medo de patos”, “não dorme sozinho” e etc
   - **Informações Essenciais:**
     - Nome, idade, raça, porte, sexo, pelagem, castração/vacinação.
     - Histórico de saúde (se relevante), comportamento geral (dócil, brincalhão etc.).
     - Necessidades, características específicas (faz xixi no chão quando o pote está sem comida), restrições alimentares
   - **Fotos e Vídeos de Alta Qualidade:**
     - Múltiplas fotos mostrando o pet em diferentes situações (em casa, brincando, passeando etc.).
     - Vídeos curtos e dinâmicos que capturem a personalidade do pet.
   - **Texto Descritivo Cativante:**
     - Descrever a personalidade do pet de forma criativa e original.
     - Destacar seus pontos fortes e características únicas.
     - Mencionar suas necessidades e expectativas para um novo lar.
     - Mencionar porque está doando.

3. Contato direto com ONGs e Adotantes que querem adotar um Pet com aquelas propriedades.

   ONGs e Adotantes que querem um Pet com aquelas propriedades serão notificados assim que o cadastro do Pet for realizado

---

### 🎯 Tasks

- [x] Cadastro de Pessoa Física ou ONG na plataforma
  - [x] Cadastro
    - Enviar e-mail assim que fizer o cadastro (utilizar a biblioteca de emails para Node.js)
      - https://react.email/
  - [x] Login
  - [x] Poder alterar informações cadastrais
- [x] Cadastro de Pets na plataforma
  - [x] Criar, alterar e remover um Pet da plataforma
  > Avisar quantas ONGs e Adotantes procuram um Pet com aquelas propriedades.
- [x] Ter acesso aos pedidos de adoção na plataforma
  Como a conversa entre quem quer adotar e quem está doando será realizada via WhatsApp então não vamos nos preocupar com implementar uma funcionalidade de chat na plataforma.
  Porém na plataforma vamos ter a funcionalidade de intenção de adoção, onde a pessoa vai preencher os dados necessários para criar o documento legal de adoção em PDF, e ai pessoa que está doando poderá escolher aceitar ou negar o pedido de adoção.
  > Menu ⇒ Perfil ⇒ Pedidos de Adoção
- [x] Receber notificações quando alguém se interessar por um Pet

---

- [ ] Splash screen
- [ ] App e responsivo iguais

```
Doação
Usuário -> Cadastro -> Registro de Pet para Doação -> Feedback de Pesquisas Salvas
Usuário -> Login -> Intenções de Doação
Usuário -> Login -> Pet -> Intenções de Doação -> Lista com os dados preenchidos, escolhe se aceita ou não -> WhatsApp
```
