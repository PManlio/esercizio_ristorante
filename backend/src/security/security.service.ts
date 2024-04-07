import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {

    private salt;
    private saltOrRounds = 10;

    constructor(){
        this.generateSalt();
    };

    async generateSalt() { this.salt = await bcrypt.genSalt(this.saltOrRounds); }

    async generatePassword(password): Promise<string> {
        return await bcrypt.hash(password, this.salt);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

}