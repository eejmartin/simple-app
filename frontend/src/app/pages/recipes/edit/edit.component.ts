import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../service/recipes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  items: FormArray = new FormArray([]);
  page!: string;
  recipeId!: string;
  pageName!: string;

  measument_units = [
    {
      value: 'g',
      name: 'g / gram',
    },
    {
      value: 'Kg',
      name: 'Kilogram',
    },
    {
      value: 'cL',
      name: 'Centilitre',
    },
    {
      value: 'mL',
      name: 'Millilitre',
    },
    {
      value: 'L',
      name: 'Litre',
    },
    {
      value: 'teaspon',
      name: 'Teaspon',
    },
    {
      value: 'tablespon',
      name: 'Tablespon',
    },
    {
      value: 'cup',
      name: 'Cup',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private readonly recipeService: RecipesService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.url.subscribe((params) => {
      this.page = params[0].path;
    });
    this.route.paramMap.subscribe((param) => {
      this.recipeId = param.get('id') as string;
    });
  }

  ngOnInit(): void {
    this.pageName = this.page === 'create' ? 'Create Recipe' : 'Edit Recipe';
    this.createForm();
    if (this.page === 'edit') {
      this.loadRecipe(this.recipeId);
    }
  }

  createForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(
        { value: '', disabled: this.page === 'edit' ? true : false },
        Validators.required
      ),
      description: new FormControl(''),
      ingredients: this.formBuilder.array([this.createItem()]),
    });
  }

  createItem(item?: any): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(item ? item.name : '', Validators.required),
      quantity: new FormControl(item ? item.quantity : '', Validators.required),
      measument_units: new FormControl(
        item ? item.measument_units : '',
        Validators.required
      ),
      description: new FormControl(item ? item.description : ''),
    });
  }

  addItem(): void {
    this.items = this.formGroup.get('ingredients') as FormArray;
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items = this.formGroup.get('ingredients') as FormArray;
    this.items.removeAt(index);
  }

  onSubmit(value: any) {
    if (this.page === 'create') {
      this.recipeService.createRecipe(value).subscribe((res) => {
        this.formGroup.reset();
        this._snackBar.open('Recepie Successful Created!', '', {
          duration: 3000,
        });
        this.router.navigate(['../../'], {
          relativeTo: this.route,
        });
      });
    } else {
      value._id = this.recipeId;
      this.recipeService.updateRecipe(value).subscribe((res) => {
        this.formGroup.reset();
        this._snackBar.open('Recepie Successful Updated!', '', {
          duration: 3000,
        });
        this.router.navigate(['../../'], {
          relativeTo: this.route,
        });
      });
    }
  }

  loadRecipe(recipeId: string) {
    this.recipeService.getRecipeById(recipeId).subscribe((data) => {
      this.formGroup.patchValue({
        name: data.name,
        description: data.description,
      });
      this.items = this.formGroup.get('ingredients') as FormArray;
      this.items.removeAt(0);
      data.ingredients?.forEach((element) => {
        this.items.push(this.createItem(element));
      });
    });
  }

  getErrorByFormControll(field: string, index: number, array: string) {
    if (array) {
      return this.formControl(index).controls[`${field}`].hasError('required')
        ? 'Field is required'
        : '';
    } else {
      return this.formGroup.get(`${field}`)?.hasError('required')
        ? 'Field is required'
        : '';
    }
  }

  get formGroups() {
    // inform typescript that usersForm.get('users') returns a FormArray
    return this.formGroup.get('ingredients') as FormArray;
  }

  formControl(index: number) {
    // inform typescript that usersForm.get('users') returns a FormGroup
    return this.formGroups.controls[index] as FormGroup;
  }
}
