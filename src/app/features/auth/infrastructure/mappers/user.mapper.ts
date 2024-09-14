import { User, UserCredential } from "@angular/fire/auth";
import { BaseMapper } from "@app/shared/mappers/base.mapper";
import { IUserState } from "@app/shared/states/interfaces";

export class UserCredentialMapper extends BaseMapper<UserCredential, User> {
  override from(dto: any) {
    return { uid: dto.user.uid, ...dto.user.emailProfile };
  }
  override mapList(entities: any[]): any[] {
    throw new Error("Method not implemented.");
  }
  override mapListFrom(dtos: any[]): any[] {
    throw new Error("Method not implemented.");
  }
  override to(entity: UserCredential): IUserState {
    return entity.user as IUserState;
  }
}
