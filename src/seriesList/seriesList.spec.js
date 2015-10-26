'use strict';

var seriesList = require('seriesList/seriesList');

describe('seriesList', function() {
  it('should display single value', function() {
    expect(seriesList(['a'])).toEqual('a');
  });

  it('should display `and` between two values', function() {
    expect(seriesList(['a', 'b'])).toEqual('a and b');
  });

  it('should comma separate series with oxford comma', function() {
    expect(seriesList(['a', 'b', 'c'])).toEqual('a, b, and c');
  });

  it('should be empty on empty value', function() {
    expect(seriesList([])).toEqual('');
  });

  it('should be empty on undefined value', function() {
    expect(seriesList()).toEqual('');
  });
});
