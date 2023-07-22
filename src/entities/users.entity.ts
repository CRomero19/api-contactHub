import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import Contact from "./contacts.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id:number 

    @Column({type:'varchar', length:45 })
    name:string

    @Column({type:'varchar', length:45, unique:true})
    email:string

    @Column({type:'boolean',default:false})
    admin:boolean

    @Column({type:'varchar', length:120})
    password:string

    @Column({type:'varchar', length:15 })
    telefone:string

    @CreateDateColumn({type:'date'})
    createdAt: string

    @UpdateDateColumn({type:'date'})
    updatedAt:string

    @DeleteDateColumn({type:'date'})
    deletedAt:string

    @OneToMany(() => Contact, (contact:Contact) => contact.user)
    contacts: Contact[];

    @BeforeInsert() 
    @BeforeUpdate()
    hashPassword() { 

    const isEncrypted: number = getRounds(this.password); 

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
}
}

export default User;
