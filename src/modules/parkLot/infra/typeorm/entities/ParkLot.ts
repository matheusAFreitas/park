import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

@Entity('parkLot')
class ParkLot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  parkProvider: Vehicle;
}

export default ParkLot;
