$(function() {
  var items;

  var itemEl = $('#item-added');
  var itemsEl = $('#items');
  var addBtn = $('#add');
  var clearBtn = $('#clear');

  function initialization() {
    items = [];
    itemsEl.text('-- None --');
  }

  addBtn.click(function() {
    var itemVal = itemEl.val();
    if (itemVal) {
      items.push(itemVal);
      itemEl.val('');
      itemsEl.text(seriesList(items));
    }
  });

  clearBtn.click(initialization);

  initialization();
});