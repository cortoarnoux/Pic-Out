import { PicOutBackOfficePage } from './app.po';

describe('pic-out-back-office App', () => {
  let page: PicOutBackOfficePage;

  beforeEach(() => {
    page = new PicOutBackOfficePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
