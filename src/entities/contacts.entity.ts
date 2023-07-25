import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './users.entity';

@Entity('contacts')
class Contact {
    @PrimaryGeneratedColumn('increment')
    id:number 

    @Column({type:'varchar', length:45 , unique:true})
    name:string

    @Column({type:'varchar', length:45})
    email:string

    @Column({type:'varchar', length:15 })
    telefone:string

    @CreateDateColumn({type:'date'})
    createdAt: string | Date

    @UpdateDateColumn({type:'date'})
    updatedAt:string | Date

    @ManyToOne(() => User, user => user.contacts, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}

export default Contact;
