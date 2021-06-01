import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRecipe } from '../../../shared/interfaces/recipe.interface';
import { RecipesService } from '../service/recipes.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../../shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns = ['name', 'user', 'actions'];
  // MatTableDataSource - designed for filtering, sorting and pagination of a client-side data array
  dataSource: MatTableDataSource<IRecipe> = new MatTableDataSource<IRecipe>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recipeService: RecipesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.recipeService.fetchRecipes().subscribe((data: IRecipe[]) => {
      this.dataSource = new MatTableDataSource<IRecipe>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteRecipe(element: any): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '300px',
      data: {
        messageTitle: `Delete Recipe`,
        message: `Are you sure to delete ${element.name} recipe?`,
        buttonTitle: `Delete`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.deleteRecipeById(element).subscribe((res) => {
          this._snackBar.open('Recepie Successful Deleted!', '', {
            duration: 3000,
          });
          this.fetchRecipes();
        });
      }
    });
  }
}
