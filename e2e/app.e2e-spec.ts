import { QuickstepClientPage } from './app.po';

describe('quickstep-client App', function() {
  let page: QuickstepClientPage;

  beforeEach(() => {
    page = new QuickstepClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
