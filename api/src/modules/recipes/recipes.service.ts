import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipes } from '../../schemas/recipes.schema';
import { Model } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';
import { plainToClass } from 'class-transformer';
import {
  ResponseRecipeDto,
  ResponseRecipesDto,
} from '../../dto/recipe/responseRecipeDto';
import { CreateRecipeDto } from '../../dto/recipe/createRecipeDto';
import { RecipeDto } from '../../dto/recipe/recipeDto';
import { catchError, map } from 'rxjs/operators';
import { UserDto } from '../../dto/user/userDto';
import { REQUEST } from '@nestjs/core';
import { User } from '../../schemas/user.schema';
import { UpdateRecipeDto } from '../../dto/recipe/updateRecipeDto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipes.name) private readonly recipesModel: Model<Recipes>,
    @Inject(REQUEST) private request
  ) {}

  findAll(includeDeleted?: boolean): Observable<ResponseRecipesDto> {
    let query = {};
    if (!includeDeleted) {
      query = { deleted: false };
    }
    return from(
      this.recipesModel
        .find(query)
        .populate('User')
        .exec()
        .then((recipes) => {
          let res = [];
          recipes.forEach((recipe, i) => {
            const re = recipe['_doc'];
            const resRecipes = plainToClass(ResponseRecipeDto, re);
            resRecipes.user = resRecipes.user['userName'];
            res.push(resRecipes);
          });
          return new ResponseRecipesDto(res);
        })
    );
  }

  findOneById(recipeId: string): Observable<ResponseRecipeDto> {
    return from(
      this.recipesModel
        .findOne({ _id: recipeId, deleted: false })
        .exec()
        .then((recipe) => {
          const re = recipe['_doc'];
          const resRecipe = plainToClass(ResponseRecipeDto, re);
          return resRecipe;
        })
    );
  }

  create(createRecipeDto: CreateRecipeDto): Observable<ResponseRecipeDto> {
    const user = this.request.user;

    const newRecipe = new RecipeDto();
    newRecipe.name = createRecipeDto.name;
    newRecipe.ingredients = createRecipeDto.ingredients;
    newRecipe.deleted = false;
    newRecipe.description = createRecipeDto.description;
    newRecipe.user = user;

    const saveRecipe = new this.recipesModel(newRecipe);
    return from(saveRecipe.save()).pipe(
      map((recipe: Recipes) => {
        const recipeDoc = { ...recipe['_doc'] };
        return plainToClass(ResponseRecipeDto, recipeDoc);
      }),
      catchError((error) => throwError(error))
    );
  }

  update(updateRecipeDto: UpdateRecipeDto): Observable<ResponseRecipeDto> {
    return from(
      this.recipesModel.findByIdAndUpdate(
        {
          _id: updateRecipeDto._id,
        },
        updateRecipeDto
      )
    ).pipe(
      map((recipe: Recipes) => {
        const recipeDoc = { ...recipe['_doc'] };
        return plainToClass(ResponseRecipeDto, recipeDoc);
      }),
      catchError((error) => throwError(error))
    );
  }

  deleteOne(recipeId: string): Observable<any> {
    return from(
      this.recipesModel
        .findOne({ _id: recipeId })
        .exec()
        .then((recipe) => {
          const setDeleteRecipe = recipe['_doc'] as UpdateRecipeDto;
          setDeleteRecipe.deleted = true;
          return from(
            this.recipesModel
              .findByIdAndUpdate(
                {
                  _id: recipeId,
                },
                setDeleteRecipe
              )
              .then((recipe: Recipes) => {
                const recipeDoc = { ...recipe['_doc'] };
                return plainToClass(ResponseRecipeDto, recipeDoc);
              })
          );
        })
    );
  }
}
