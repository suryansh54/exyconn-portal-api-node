import chai from 'chai';
const expect = chai.expect;

const verifyResponseItems = (expector: any, matcher: string) => {
  expect(expector).to.contain(matcher);
};

export default verifyResponseItems;
