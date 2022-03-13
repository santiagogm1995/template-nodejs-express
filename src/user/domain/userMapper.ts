import { plainToClass } from "class-transformer";
import { iMapper } from "../../common/domain/iMapper";
import { getValueFromJSON } from "../../utils/getKeyFromJson";
import { UserDTO } from "./userDTO";
import { UserEntity } from "./userEntity";

export class UserMapper implements iMapper<UserEntity, UserDTO> {
  toDTO(obj: UserEntity): UserDTO {
    const dto = new UserDTO();
    dto.user = obj.user;
    dto.status = obj.status;
    dto.created_at = obj.created_at;
    dto.updated_at = obj.updated_at;
    dto.timeZone = obj.timeZone;
    dto.publicProfile = obj.publicProfile;
    return dto;
  }
  toEntity(obj: UserDTO): UserEntity {
    return plainToClass(UserEntity, obj);
  }
}
