import {BaseEntity, Entity, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class People extends BaseEntity {

  @ObjectIdColumn()
  id: number | undefined;

  @Column()
  firstName: string | undefined;

  @Column()
  lastName: string | undefined;

  @Column()
  email: string | undefined;
  
  @Column()
  password: string | undefined;

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
        .where("user.firstName = :firstName", { firstName })
        .andWhere("user.lastName = :lastName", { lastName })
        .getMany();
}
}
@Entity()
export class User extends People{


}