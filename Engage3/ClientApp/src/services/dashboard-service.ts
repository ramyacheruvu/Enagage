import { Injectable } from '@angular/core';
import { CategoryService } from 'src/services/category-service';
import { PageService } from 'src/services/page-service';

@Injectable({ providedIn: 'root' })
export class DashboardService 
{
  private  _pageCategories: Array<PageCategory>;
  private  categories: Array<Category>;


  public constructor(private _categoryService: CategoryService, private _pageService: PageService)
  {
     this._pageCategories = new Array<PageCategory>();
    this.categories = new Array<Category>();
  }


  public ChildPages(categoryId: number): WebPage[]
  {
   var pages = new Array<WebPage>();
  var childPages = new Array<WebPage>();

    this._pageService.getPages()
      .then((t) =>
      {
        pages = t;
        if (pages)
        {
          pages.forEach(function (page)
          {
            if (page.webPageCategoryId == categoryId)
              childPages.push(page);

          });
          return childPages;
        }
      
      })
      .catch();

    return childPages;
  }

  public getChildPageCategories(categoryId): PageCategory[]
  {
    let childPageCategories = new Array<PageCategory>();

    let parentsCurrentCat = this.filterCurrentasParent(categoryId);

    for (let i = 0; i < parentsCurrentCat.length; i++)
    {
      var current = parentsCurrentCat[i];
      const childPages = this.ChildPages(current.id);
      const childCategories = this.getChildPageCategories(current.id);

      const pageCategory: PageCategory = {
        WebPageCategoryName: current.webPageCategoryName,
        WebPages: childPages,
        ChildCategories: childCategories
      };
       childPageCategories.push(pageCategory);
    }
    return childPageCategories;
  }

  public getPageCategories(): Promise<Array<PageCategory>>
  {
    this._pageCategories = new Array<PageCategory>();
    this._categoryService.getCategories()
      .then((t) =>
      {
        this.categories = t;
        if (this.categories.length > 0)
        {
          let parentsCategories = this.categories.filter(this.filterParents);

          for (let i = 0; i < parentsCategories.length; i++)
          {
            var parent = parentsCategories[i];

            const childPages = this.ChildPages(parent.id);
            const childCategories = this.getChildPageCategories(parent.id);

            const pageCategory: PageCategory = {
              WebPageCategoryName: parent.webPageCategoryName,
              WebPages: childPages,
              ChildCategories: childCategories
            };
            this._pageCategories.push(pageCategory);
          }
        }
        })
      .catch();

        return Promise.resolve(this._pageCategories);
  }

  private filterParents(category: Category)
  {
    return category.parentCategoryId == null;
  }

  private filterCurrentasParent(categoryId: number)
  {
    return this.categories.filter(x => x.parentCategoryId == categoryId);
  }
}


interface PageCategory
{
  WebPageCategoryName: string,
  WebPages: Array<WebPage>,
  ChildCategories: Array<PageCategory>
}

interface WebPage
{
  id: number;
  webPageCategoryId: number;
  webPageName: string;
  webPageTitle: string;
  webPageContent: string;
}


interface Category
{
  id: number;
  webPageCategoryName: string;
  parentCategoryId: number;
}
