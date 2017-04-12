import { PhotoUploaderAngular2Page } from './app.po';

describe('photo-uploader-angular2 App', () => {
  let page: PhotoUploaderAngular2Page;

  beforeEach(() => {
    page = new PhotoUploaderAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
