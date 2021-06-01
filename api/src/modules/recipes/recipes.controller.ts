import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HasRoles } from '../../auth/decorators/role.decorators';
import { ROLE } from '../../enums/roleAuthority.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Observable, of } from 'rxjs';
import {
  ResponseRecipeDto,
  ResponseRecipesDto,
} from '../../dto/recipe/responseRecipeDto';
import { CreateRecipeDto } from '../../dto/recipe/createRecipeDto';
import { catchError, map } from 'rxjs/operators';
import { isObjectEmtpy } from '../../utils/hellper';
import { UpdateRecipeDto } from '../../dto/recipe/updateRecipeDto';

@Controller('/recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findDeletedFalse(
    @Query() query
  ): Observable<ResponseRecipesDto | ResponseRecipeDto | any> {
    if (isObjectEmtpy(query)) {
      return this.recipesService.findOneById(query.id);
    }
    return this.recipesService.findAll(false);
  }

  @Get('/all')
  @HasRoles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(): Observable<ResponseRecipesDto | any> {
    return this.recipesService.findAll(true);
  }

  @Post()
  @HasRoles(ROLE.ADMIN, ROLE.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body() recipe: CreateRecipeDto
  ): Observable<ResponseRecipeDto | Object> {
    return this.recipesService.create(recipe).pipe(
      map((recipe: ResponseRecipeDto) => recipe),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Put()
  @HasRoles(ROLE.ADMIN, ROLE.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Body() recipe: UpdateRecipeDto
  ): Observable<ResponseRecipeDto | Object> {
    return this.recipesService.update(recipe).pipe(
      map((recipe: ResponseRecipeDto) => recipe),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Delete()
  @HasRoles(ROLE.ADMIN, ROLE.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteOne(@Query() query): Observable<boolean | any> {
    return this.recipesService.deleteOne(query.id);
  }
}
