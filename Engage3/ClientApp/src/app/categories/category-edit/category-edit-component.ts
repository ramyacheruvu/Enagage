import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { BaseComponent } from '../../base/base-component';
import { Params, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/services/category-service';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit-view.html'
})


export class CategoryEditComponent extends BaseComponent implements OnInit
{
  public categoryForm: any;
  private Id;
  public parentCategories: Category[];

  public ngOnInit(): void
  {
    this.route.params.forEach((params: Params) =>
    {
      this.Id = params['id'];

      if (!this.Id)
        this.addNewForm();
      else
        this.populateData();
    });
  }


  constructor(@Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService, private _service: CategoryService, private route: ActivatedRoute)
  {
    super(baseUrl, formBuilder, toasterService);

    this.initializeForm();
    this.populateDropdownData();
  }

  private initializeForm(): void
  {
    this.categoryForm = this._formBuilder.group({
      webPageCategoryName: [null, Validators.required],
      parentCategoryId: [null],
      id: 0
    });
  }

  private populateDropdownData(): void
  {

    this._service.getCategories()
      .then((t) =>
      {
        if (this.Id)
        {
          var patCat = t.findIndex(x => x.id === this.Id);
          t.splice(patCat, 1);
        }
        this.parentCategories = t;

      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });

  }

  public save(): void
  {
    const data = this.categoryForm.value;
    this._service.createorUpdateCategory(data)
      .then(() =>
      {
        this._toasterService.popSaveSuccessToast();
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });

  }

  public populateData(): void
  {
    this._service.getCategory(this.Id)
      .then((t) =>
      {
        this.categoryForm.patchValue({
          webPageCategoryName: t.webPageCategoryName,
          id: t.id,
          parentCategoryId: t.parentCategoryId
        });
      })
      .catch(() =>
      {
        this._toasterService.popErrorToast();
      });
  }

  public addNewForm(): void
  {
    this.categoryForm.patchValue({
      webPageCategoryName: null,
      parentCategoryId: null,
      id: 0
    });
  }
}

interface Category
{
  id: number;
  webPageCategoryName: string;
  parentCategoryId: number;
}
