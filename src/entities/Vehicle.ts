import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Establishments from './Establishments';

@Entity('vehicles')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Establishments)
  @JoinColumn({ name: 'provider_id' })
  VehicleProvider: Establishments;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column()
  placa: string;

  @Column()
  tipo: string;
}

export default Vehicle;
