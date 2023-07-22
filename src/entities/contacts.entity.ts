
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from 'typeorm';
import User from './users.entity';

@Entity('contacts')
class Contact {
    @PrimaryGeneratedColumn('increment')
    id:number 

    @Column({type:'varchar', length:45 })
    name:string

    @Column({type:'varchar', length:45, unique:true})
    email:string

    @Column({type:'varchar', length:15 })
    telefone:string

    @CreateDateColumn({type:'date'})
    createdAt: string

    @UpdateDateColumn({type:'date'})
    updatedAt:string

    @DeleteDateColumn({type:'date'})
    deletedAt:string

    @ManyToOne(() => User, user => user.contacts)
    @JoinColumn()
    user: User;
}

export default Contact;
