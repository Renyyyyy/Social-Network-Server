export class ProfileDto {
    readonly id: number;
    readonly about: string;
    readonly user: {
        id: number;
        nickname: string
    }
}