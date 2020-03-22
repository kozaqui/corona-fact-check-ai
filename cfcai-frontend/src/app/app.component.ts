import { Component, Host, HostBinding } from '@angular/core';
import { NewsVerifyService } from './news-verify.service';
import { IValidation } from './IValidation.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.cover-container') coverContainer = true;
  @HostBinding('class.d-flex') dFlex = true;
  @HostBinding('class.w-100') coverW100 = true;
  @HostBinding('class.h-100') h100 = true;
  @HostBinding('class.p-3') p3 = true;
  @HostBinding('class.mx-auto') mxAuto = true;
  @HostBinding('class.flex-column') mxFlexColumn = true;

  public reliableSourceExcerpt = 'Excerpt from the reliable source will appear here';
  public urlPlaceholder = 'url of reliable content will appear here';
  public url = '';

  public model = {
    article: ''
  };

  public validationModel: IValidation = {
    reliability: 0,
    sources: [],
    is_related: false,
    original_text: '',
    validated_text: 'xs'
  };
  private validationDefault = { ...this.validationModel };
  constructor(private newsVerifyService: NewsVerifyService) {

  }

  onClick() {
    this.validationModel = { ...this.validationDefault };
    this.newsVerifyService.verify(this.model.article).subscribe(
      (response: IValidation) => {
        setTimeout(() => { this.validationModel = { ...response }; }, 0);
        this.validationModel = response;
        if (this.validationModel.is_related) {
          if (this.validationModel.reliability > 0.3) {
            this.reliableSourceExcerpt = this.validationModel.validated_text;
          } else {
            this.reliableSourceExcerpt = 'This is most probably a fake news! Check the related content';
          }
          this.url = this.validationModel.sources[0];
          this.urlPlaceholder = this.url.substring(0, Math.min(this.url.length, 45)) + '...';
        } else {
          this.url = '';
          this.urlPlaceholder = 'no link';
          this.reliableSourceExcerpt = `We couldn't recognize your article as related to Coronavirus`;
        }
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
