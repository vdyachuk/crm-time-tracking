import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AccountService } from './account.service';

@Module({
    imports: [HttpModule],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}
