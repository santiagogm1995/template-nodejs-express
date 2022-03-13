import { Expose } from "class-transformer";
import { IsBoolean, IsDateString, IsString, MaxLength } from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user:
 *         type: string
 *         length: 255
 *        status:
 *          type: string
 *          length: 2
 *        createdAt:
 *          type: string
 *          format: iso-8601
 *        updatedAt:
 *          type: string
 *          format: iso-8601
 *        timeZone:
 *          type: string
 *          length: 3
 *        publicProfile:
 *         type: boolean
 */
export class UserDTO {
  @Expose({ name: "user" })
  @IsString()
  @MaxLength(255)
  public user: string;

  @Expose({ name: "status" })
  @IsString()
  @MaxLength(2)
  public status: string;

  @Expose({ name: "createdAt" })
  @IsDateString()
  public created_at: Date;

  @Expose({ name: "updatedAt" })
  @IsDateString()
  public updated_at: Date;

  @Expose({ name: "timeZone" })
  @IsString()
  @MaxLength(3)
  public timeZone: string;

  @Expose({ name: "publicProfile" })
  @IsBoolean()
  public publicProfile: boolean;

  constructor() {
    this.user = "";
    this.status = "";
    this.created_at = new Date();
    this.updated_at = new Date();
    this.timeZone = "";
    this.publicProfile = false;
  }
}
