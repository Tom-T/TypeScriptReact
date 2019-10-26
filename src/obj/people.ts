import { BaseEntity, Entity, ObjectIdColumn, Column } from "typeorm";

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
  static findById(Id: number) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { Id })
      .getOne();
  }
  static findByEmail(Email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { Email })
      .getOne();
  }
}
@Entity()
export class Owner extends People {
  @Column()
  Scanning: boolean | undefined; //If they do open/scan or not


}
@Entity()
export class User extends People {

  @Column()
  Owner: number | undefined;  //Used to describe which homeowner this user belongs to.

  @Column()
  Box: string | undefined; //Optionally used to identify this user at the address. Eg "Unit 23", or "Apt J" (without Unit/Apt)
}