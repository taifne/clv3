import { Exclude, Expose } from 'class-transformer';

export class User {
    id: number | string;
    @Expose({ groups: ['me', 'admin'] })
    email: string | null;
    @Exclude({ toPlainOnly: true })
    username: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}