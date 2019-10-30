import { BaseEntity, Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class People extends BaseEntity {

  @ObjectIdColumn()
  id: number | undefined;

  @Column("varchar:")
  firstName: string | undefined;

  @Column("varchar")
  lastName: string | undefined;

  @Column("varchar")
  email: string | undefined;

  @Column("varchar")
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

  @Column("boolean")
  Scanning: boolean | undefined; //If they do open/scan or not
}

@Entity()
export class User extends People {

  @Column("int")
  Owner: number | undefined;  //Used to describe which homeowner this user belongs to.

  @Column("varchar")
  Box: string | undefined; //Optionally used to identify this user at the address. Eg "Unit 23", or "Apt J" (without Unit/Apt)
}