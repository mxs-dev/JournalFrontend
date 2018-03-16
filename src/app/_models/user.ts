export class User {
    public static readonly ROLE_STUDENT = 'Role[student]';
    public static readonly ROLE_PARENT  = 'Role[parent]';
    public static readonly ROLE_TEACHER = 'Role[teacher]';
    public static readonly ROLE_MODER   = 'Role[moder]';
    public static readonly ROLE_ADMIN   = 'Role[admin]';

    public static readonly STATUS_ACTIVE = 1;
    public static readonly STATUS_UNCONFIRMED = -1;
    public static readonly STATUS_DELETED  = -99;
    public static readonly STATUS_DISABLED = 0;

    public id: number;
    public password: string;
    public email: string;

    public name: string;
    public surname: string;
    public patronymic: string;

    public role: string;
    public status: number;


    public createdAt: Date;
    public createdBy: number;
    public updatedAt: Date;
    public updatedBy: number;

    public lastLoginAt: Date;


    public isAdmin() {
        return (this.role === User.ROLE_ADMIN);
    }

    public isTeacher() {
        return (this.role === User.ROLE_TEACHER);
    }

    public isStudent() {
        return (this.role === User.ROLE_STUDENT);
    }

    public get FullName() {
        return `${this.name} ${this.surname} ${this.patronymic}`;
    }

    public get shortFullName() {
        const n = (this.name[0]).toUpperCase();
        const p = (this.patronymic[0]).toUpperCase();

        return `${this.surname} ${n}.${p}.`;
    }
}