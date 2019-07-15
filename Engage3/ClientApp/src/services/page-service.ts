import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class PageService 
{
  private readonly _pages: Array<Page>;

  public constructor()
  {
    const pages = new Array<Page>();

    this._pages = pages;
  }

  public getPages(): Promise<Array<Page>>
  {
    return Promise.resolve(this._pages);
  }

  public getPage(id: number): Promise<Page>
  {
    return Promise.resolve(this._pages.find(t => t.id == id) as Page);
  }

  public createorUpdatePage(data: Page): Promise<Page>
  {
    const existing = this._pages.findIndex(t => t.id == data.id);
    if (existing < 0)
    {
      const category: Page = {
        id: (this._pages.length > 0) ? this._pages.length + 1 : 1,
        webPageCategoryId: data.webPageCategoryId,
        webPageName: data.webPageName,
        webPageContent: data.webPageContent,
        webPageTitle: data.webPageTitle
      };
      this._pages.push(category);
      return Promise.resolve(category);
    }
     
    else
    {
      this._pages[existing].webPageName = data.webPageName;
      this._pages[existing].webPageCategoryId = data.webPageCategoryId;
      this._pages[existing].webPageTitle = data.webPageTitle;
      this._pages[existing].webPageContent = data.webPageContent;
      return Promise.resolve(this._pages[existing]);
    }
  }
}


interface Page
{
  id: number;
  webPageCategoryId: number;
  webPageName: string;
  webPageTitle: string;
  webPageContent: string;
}
