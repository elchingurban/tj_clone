import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

import { titleToSlug } from '../utils/slugGenerator';
import { transliterate } from '../utils/transliterate';

// import { titleToSlug } from 'utils/slugGenerator';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}
  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async popular() {
    // return this.repository.find({
    //   order: {
    //     views: 'DESC',
    //   },
    // });
    const qb = this.repository.createQueryBuilder('post');

    qb.orderBy('views', 'DESC');
    qb.limit(2);
    const [posts, total] = await qb.getManyAndCount();
    // console.log(posts[0].title);

    return {
      posts,
      total,
    };
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.limit(dto.limit || 10);
    qb.take(dto.take || 10);

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || '',
    });

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.body) {
      qb.where(`p.body ILIKE :body`);
    }

    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }

    if (dto.tag) {
      qb.andWhere(`p.tags ILIKE :tag`);
    }
    // console.log(qb.getSql());

    const [items, total] = await qb.getManyAndCount();
    const latin = transliterate(items[0].title);
    console.log(titleToSlug(latin));

    return { items, total };
  }

  async findOne(id: number) {
    // const find = await this.repository.findOne({ where: { id } });
    // if (!find) {
    //   throw new NotFoundException('Article not found');
    // }
    // return find;
    await this.repository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePostDto) {
    const find = await this.repository.update(id, dto);
    if (!find) {
      throw new NotFoundException('Article not found');
    }
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const find = await this.repository.delete(id);
    if (!find) {
      throw new NotFoundException('Article not found');
    }
    return this.repository.delete(id);
  }
}
