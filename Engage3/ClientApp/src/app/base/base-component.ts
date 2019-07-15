import { Inject, Injectable} from '@angular/core';
import { ToasterHelperService } from 'src/helpers/toaster-helper';
import { ToasterConfig } from 'angular2-toaster';
import { FormBuilder } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class BaseComponent
{
  public _baseUrl: string;
  
  public _formBuilder: FormBuilder;
  public _toasterService: ToasterHelperService;
  public toasterConfig: ToasterConfig;

  constructor( @Inject('BASE_URL') baseUrl: string, formBuilder: FormBuilder, toasterService: ToasterHelperService)
  {
    this._baseUrl = baseUrl;
    this._formBuilder = formBuilder;
    this._toasterService = toasterService;
    this.toasterConfig = this._toasterService.getConfig();
  }

}
