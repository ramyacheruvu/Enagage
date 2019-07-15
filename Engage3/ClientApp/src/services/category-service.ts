import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class CategoryService 
{
  private readonly _categories: Array<Category>;

  public constructor()
  {
    const categories = new Array<Category>();
    this._categories = categories;
  }

  public getCategories(): Promise<Array<Category>>
  {
    return Promise.resolve(this._categories);
  }

  public getCategory(id: number): Promise<Category>
  {
    return Promise.resolve(this._categories.find(t => t.id == id) as Category);
  }

  public createorUpdateCategory(data: Category): Promise<Category>
  {
    const existing = this._categories.findIndex(t => t.id == data.id);
    if (existing < 0)
    {
      const category: Category = {
        id: (this._categories.length > 0) ? this._categories.length + 1 : 1,
        webPageCategoryName: data.webPageCategoryName,
        parentCategoryId: data.parentCategoryId
      };
      this._categories.push(category);
      return Promise.resolve(category);
    }
     
    else
    {
      this._categories[existing].webPageCategoryName = data.webPageCategoryName;
      this._categories[existing].parentCategoryId = data.parentCategoryId;
      return Promise.resolve(this._categories[existing]);
    }
  }
}



 interface Category
{
  id: number;
  webPageCategoryName: string;
  parentCategoryId: number;

 }
