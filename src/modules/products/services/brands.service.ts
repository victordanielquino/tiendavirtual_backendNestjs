import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../../../core/models/entities';
import { BrandCreateDto, BrandUpdateDto } from '../../../core/models/dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
    if (!brand) throw new NotFoundException(`Brand #${id} not exits.`);
    return brand;
  }

  async create(data: BrandCreateDto) {
    const newBrand = this.brandsRepo.create(data); // se instancia pero no se guarda
    return this.brandsRepo.save(newBrand); // se guarda
  }

  async update(id: number, change: BrandUpdateDto) {
    const brand = await this.brandsRepo.findOneBy({ id: id });
    this.brandsRepo.merge(brand, change);
    return this.brandsRepo.save(brand);
  }

  remove(id: number) {
    return this.brandsRepo.delete(id);
  }
}
