import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Mike1900', description: 'Login'})
    readonly login: string;
    @ApiProperty({example: 'Mike', description: 'Name'})
    readonly nickname: string;
    @ApiProperty({example: 'verystrongpassword', description: 'Password'})
    readonly password: string;
}