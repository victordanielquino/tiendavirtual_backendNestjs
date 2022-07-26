import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import {
  ProductCreateDto,
  ProductFilterDto,
  ProductUpdateDto,
} from '../../../core/models/dtos/product.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Public } from 'src/core/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products') // AGRUPAR APIS CON SWAGGER
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Lista of products' })
  getProductsAll(@Query() params: ProductFilterDto) {
    return this.productService.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: ProductCreateDto) {
    return this.productService.create(payload);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: ProductUpdateDto,
  ) {
    return this.productService.update(productId, payload);
  }
  @Put(':productId/category/:categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  addCategoryInProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryInProduct(productId, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
  @Delete(':productId/category/:categoryId')
  deleteCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryOfProduct(productId, categoryId);
  }
}
