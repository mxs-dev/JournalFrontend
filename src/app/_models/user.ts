export class User {
    public static readonly ROLE_STUDENT = 10;
    public static readonly ROLE_PARENT  = 20;
    public static readonly ROLE_TEACHER = 50;
    public static readonly ROLE_ADMIN   = 99;
    
    public static readonly STATUS_ACTIVE   =  1;
    public static readonly STATUS_DELETED  = -1;
    public static readonly STATUS_DISABLED =  0;

    public id       :number;
    public username :string;
    public password :string;    
    public email    :string;
    
    public name       :string;
    public surname    :string;
    public patronymic :string;

    public role   :number;
    public status :number;

    public authKey     :string;
    public accessToken :string;

    public createdAt :Date;
    public createdBy :number;
    public updatedAt :Date;
    public updatedBy :number;

    public lastLoginAt :Date;
}