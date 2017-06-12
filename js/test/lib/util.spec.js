import expect from 'expect';
describe('formatDate', () => {
  it('should generate correct year format', () => {
    expect(util.formatDate(1456391570000, 'yyyyMMdd', {
      year: '2-digit',
      month: '2-digit'
    })).toBe('160225');
  });
  it('should generate correct month format', () => {
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: 'short'
    })).toBe('Feb 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: 'long'
    })).toBe('February 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: '2-digit'
    })).toBe('02 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
    })).toBe('2 25, 2016 | 5:12 pm');
  });
  it('should generate correct date format', () => {
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn')).toBe('2 25, 2016 | 5:12 pm');
  });
  it('should generate correct other format', () => {
    expect(util.formatDate(1456391570000, 'yyyy-MM-dd hh:mm:ss')).toBe('2016-2-25 17:12:50');
  });
});