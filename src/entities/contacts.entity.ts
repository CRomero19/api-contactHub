import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './users.entity';

@Entity('contacts')
class Contact {
    @PrimaryGeneratedColumn('increment')
    id:number 

    @Column({type:'date' })
    date:string

    @Column({type:'time' })
    hour:string

    @ManyToOne(() => User, user => user.contacts)
    @JoinColumn()
    user: User;
}

export default Contact;
