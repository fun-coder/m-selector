import MSelector from '../lib/m-selector';

const dom = document.getElementById('selector');

const selector = new MSelector(dom);

var getOptions = (start, end) => {
  let ops = [];
  for (let i = start; i <= end; i++) ops.push({label: `label-${i}`, value: i});
  return ops;
};

selector.setOptions(getOptions(1, 1000));

selector.defaultValue = 2;

selector.start();


selector.on('value', value => console.log('select value', value));


// setTimeout(() => {
//   selector.setOptions(getOptions(1, 9));
//   selector.start();
// }, 1000);


