import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('establishments')
class Establishments {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  CNPJ: string;

  @Column()
  password: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;
}

export default Establishments;
