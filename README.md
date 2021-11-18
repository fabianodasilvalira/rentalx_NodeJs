
# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Só administrador será responssável pelo cadastro.
Não deve ser possível cadastrar um carro com uma placa ja cadastrada.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrao true.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possivel listar os carros pela categoria
Deve ser possivel listar os carros pela marca
Deve ser possivel listar os carros pela nome do carro

**RN**
O usuário não precisa estar logado no sistema para listar os carros.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros.

**RN**
Só administrador será responssável pelo cadastro.
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carro.


**RNF**
Utilizar o multer para upload do arquivo

**RN**
Só administrador será responssável pelo cadastro.
O usuario deve e pode cadastrar mais de uma imagem para o mesmo carro.

# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 hora
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo Carro

