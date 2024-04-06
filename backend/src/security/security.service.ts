import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
    
    constructor(){};

    private saltOrRounds = 10;

    async generatePassword(password): Promise<string> {
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        let tmpHashPw = await this.generatePassword(password);
        return await bcrypt.compare(tmpHashPw, hashedPassword);
    }

}