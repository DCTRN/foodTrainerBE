import { Controller, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';

@Controller('product')
@UseGuards(JwtAccessAuthGuard)
export class ProductController {}
